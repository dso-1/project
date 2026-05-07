import { redirect } from '@tanstack/react-router';
import { createMiddleware } from '@tanstack/react-start';
import { getSessionFn } from '@/features/auth/api/auth.server';

export const authMiddleware = createMiddleware().server(async ({ next }) => {
	return next();
});

export async function requireAuth() {
	try {
		const session = await getSessionFn();
		if (!session.isValid) {
			throw redirect({ to: '/login' });
		}
		return session.user;
	} catch (e) {
		if (e instanceof Response || (e as { _isRedirect?: boolean })?._isRedirect) {
			throw e;
		}
		throw redirect({ to: '/login' });
	}
}

export async function redirectIfLoggedIn() {
	try {
		const session = await getSessionFn();
		if (session.isValid && session.user) {
			if (session.user.role === 'ADMIN') {
				throw redirect({ to: '/admin' });
			} else {
				throw redirect({ to: '/student' });
			}
		}
	} catch (e) {
		if (e instanceof Response || (e as { _isRedirect?: boolean })?._isRedirect) {
			throw e;
		}
	}
}

export async function getCurrentUser() {
	try {
		const session = await getSessionFn();
		return session.isValid ? session.user : null;
	} catch {
		return null;
	}
}
