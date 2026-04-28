import { getIronSession, SessionOptions } from 'iron-session';

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

export const sessionOptions: SessionOptions = {
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

export async function getSessionFromRequest(
	request: Request,
	response: Response,
) {
	const session = await getIronSession<SessionData>(
		request,
		response,
		sessionOptions,
	);
	return session;
}
