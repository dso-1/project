import { createServerFn } from '@tanstack/react-start';
import { compare, hash } from 'bcryptjs';
import { prisma } from '@/shared/lib/prisma';

interface LoginResult {
	success: boolean;
	user?: {
		id: string;
		email: string;
		name: string;
		role: 'ADMIN' | 'MAHASISWA';
	};
	error?: string;
}

export const loginFn = createServerFn({ method: 'POST' })
	.inputValidator((data: { email: string; password: string }) => data)
	.handler(async ({ data }): Promise<LoginResult> => {
		const { email, password } = data;

		const user = await prisma.user.findUnique({
			where: { email: email.toLowerCase() },
		});

		if (!user) {
			return {
				success: false,
				error: 'Invalid email or password',
			};
		}

		const isValidPassword = await compare(password, user.password);

		if (!isValidPassword) {
			return {
				success: false,
				error: 'Invalid email or password',
			};
		}

		return {
			success: true,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				role: user.role,
			},
		};
	});

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
	return { success: true };
});

export const validateUserFn = createServerFn({ method: 'POST' })
	.inputValidator((userId: string) => userId)
	.handler(async ({ data: userId }) => {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { id: true, email: true, name: true, role: true },
		});

		if (!user) {
			return { isValid: false, user: null };
		}

		return { isValid: true, user };
	});

export const registerFn = createServerFn({ method: 'POST' })
	.inputValidator(
		(data: { email: string; password: string; name: string; nim?: string }) =>
			data,
	)
	.handler(async ({ data }) => {
		const existingUser = await prisma.user.findUnique({
			where: { email: data.email.toLowerCase() },
		});

		if (existingUser) {
			return {
				success: false,
				error: 'Email already registered',
			};
		}

		if (data.nim) {
			const existingNim = await prisma.user.findUnique({
				where: { nim: data.nim },
			});

			if (existingNim) {
				return {
					success: false,
					error: 'NIM already registered',
				};
			}
		}

		const hashedPassword = await hash(data.password, 12);

		const user = await prisma.user.create({
			data: {
				email: data.email.toLowerCase(),
				password: hashedPassword,
				name: data.name,
				nim: data.nim,
				role: 'MAHASISWA',
			},
		});

		return {
			success: true,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				role: user.role,
			},
		};
	});
