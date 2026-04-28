export interface SessionData {
	userId: string;
	email: string;
	name: string;
	role: 'ADMIN' | 'MAHASISWA';
	isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
	userId: '',
	email: '',
	name: '',
	role: 'MAHASISWA',
	isLoggedIn: false,
};
