import * as React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { loginFn } from '@/features/auth/api/auth.server';

export function useLoginForm() {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);
		setError(null);

		const formData = new FormData(event.currentTarget);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		try {
			const result = await loginFn({ data: { email, password } });

			if (result.success && result.user) {
				login(result.user);

				if (result.user.role === 'ADMIN') {
					navigate({ to: '/admin' });
				} else {
					navigate({ to: '/student' });
				}
			} else {
				setError(result.error || 'Login failed');
			}
		} catch (_err) {
			setError('An unexpected error occurred');
		} finally {
			setIsLoading(false);
		}
	}

	return {
		isLoading,
		error,
		handleSubmit,
	};
}
