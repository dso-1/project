import { createMiddleware } from '@tanstack/react-start';
import { redirect } from '@tanstack/react-router';

export const authMiddleware = createMiddleware().server(async ({ next }) => {
	return next();
});

export async function requireAuth() {
	if (typeof window !== 'undefined') {
		const storedUser = localStorage.getItem('user');
		if (!storedUser) {
			throw redirect({ to: '/login' });
		}
		try {
			return JSON.parse(storedUser);
		} catch {
			localStorage.removeItem('user');
			throw redirect({ to: '/login' });
		}
	}
	return null;
}

export async function redirectIfLoggedIn() {
	if (typeof window !== 'undefined') {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			try {
				const user = JSON.parse(storedUser);
				if (user.role === 'ADMIN') {
					throw redirect({ to: '/admin' });
				} else {
					throw redirect({ to: '/student' });
				}
			} catch (e) {
				if (
					e instanceof Response ||
					(e && typeof e === 'object' && 'to' in e)
				) {
					throw e;
				}
				localStorage.removeItem('user');
			}
		}
	}
}

export function getCurrentUser() {
	if (typeof window !== 'undefined') {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			try {
				return JSON.parse(storedUser);
			} catch {
				return null;
			}
		}
	}
	return null;
}
