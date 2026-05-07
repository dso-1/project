import { sealData, unsealData } from 'iron-session';
import {
	getCookie,
	setCookie,
	deleteCookie,
} from '@tanstack/react-start/server';

export interface SessionData {
	user?: {
		id: string;
		email: string;
		name: string;
		role: 'ADMIN' | 'MAHASISWA';
	};
	isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
	isLoggedIn: false,
};

export const sessionOptions = {
	password:
		process.env.SESSION_SECRET ||
		'complex_password_at_least_32_characters_long_for_iron_session',
	cookieName: 'go-reserve-session',
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
		httpOnly: true,
		sameSite: 'lax' as const,
		path: '/',
		maxAge: 60 * 60 * 24 * 7,
	},
};

export async function getSession(): Promise<SessionData | null> {
	const cookie = getCookie(sessionOptions.cookieName);
	if (!cookie) return null;
	try {
		return await unsealData<SessionData>(cookie, {
			password: sessionOptions.password,
		});
	} catch {
		return null;
	}
}

export async function saveSession(data: SessionData) {
	const sealed = await sealData(data, {
		password: sessionOptions.password,
	});
	setCookie(sessionOptions.cookieName, sealed, sessionOptions.cookieOptions);
}

export async function clearSession() {
	deleteCookie(sessionOptions.cookieName, {
		path: '/',
	});
}
