import * as React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { logoutFn, validateUserFn } from '@/features/auth/api/auth.server';

interface User {
	id: string;
	email: string;
	name: string;
	role: 'ADMIN' | 'MAHASISWA';
}

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (user: User) => void;
	logout: () => Promise<void>;
	refreshUser: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = React.useState<User | null>(null);
	const [isLoading, setIsLoading] = React.useState(true);
	const navigate = useNavigate();

	const refreshUser = React.useCallback(async () => {
		try {
			const storedUser = localStorage.getItem('user');
			if (storedUser) {
				const parsedUser = JSON.parse(storedUser) as User;

				const result = await validateUserFn({ data: parsedUser.id });

				if (result.isValid && result.user) {
					setUser(result.user);
					localStorage.setItem('user', JSON.stringify(result.user));
				} else {
					setUser(null);
					localStorage.removeItem('user');
				}
			} else {
				setUser(null);
			}
		} catch (err) {
			console.error('Error refreshing user:', err);

			const storedUser = localStorage.getItem('user');
			if (storedUser) {
				try {
					setUser(JSON.parse(storedUser));
				} catch {
					localStorage.removeItem('user');
					setUser(null);
				}
			}
		} finally {
			setIsLoading(false);
		}
	}, []);

	React.useEffect(() => {
		refreshUser();
	}, [refreshUser]);

	const login = React.useCallback((userData: User) => {
		setUser(userData);
		localStorage.setItem('user', JSON.stringify(userData));
	}, []);

	const logout = React.useCallback(async () => {
		try {
			await logoutFn();
		} catch (err) {
			console.error('Logout error:', err);
		} finally {
			setUser(null);
			localStorage.removeItem('user');
			navigate({ to: '/login' });
		}
	}, [navigate]);

	const value = React.useMemo(
		() => ({
			user,
			isLoading,
			isAuthenticated: !!user,
			login,
			logout,
			refreshUser,
		}),
		[user, isLoading, login, logout, refreshUser],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = React.useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}

export function useUser() {
	const { user } = useAuth();
	return user;
}

export function useIsAdmin() {
	const { user } = useAuth();
	return user?.role === 'ADMIN';
}
