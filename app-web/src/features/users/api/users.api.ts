import { createServerFn } from '@tanstack/react-start';
import { prisma } from '@/shared/lib/prisma';
import { hash } from 'bcryptjs';

export const getUsersFn = createServerFn({ method: 'GET' }).handler(
	async () => {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				email: true,
				name: true,
				nim: true,
				role: true,
				createdAt: true,
				_count: {
					select: {
						reservations: true,
					},
				},
			},
			orderBy: { createdAt: 'desc' },
		});
		return users;
	},
);

export const getUserByIdFn = createServerFn({ method: 'POST' })
	.inputValidator((id: string) => id)
	.handler(async ({ data: id }) => {
		const user = await prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				email: true,
				name: true,
				nim: true,
				role: true,
				createdAt: true,
				reservations: {
					take: 5,
					orderBy: { createdAt: 'desc' },
					include: {
						room: {
							select: { name: true },
						},
					},
				},
			},
		});
		return user;
	});

export const updateUserRoleFn = createServerFn({ method: 'POST' })
	.inputValidator((data: { id: string; role: 'ADMIN' | 'MAHASISWA' }) => data)
	.handler(async ({ data }) => {
		const user = await prisma.user.update({
			where: { id: data.id },
			data: { role: data.role },
			select: {
				id: true,
				email: true,
				name: true,
				role: true,
			},
		});
		return user;
	});

export const deleteUserFn = createServerFn({ method: 'POST' })
	.inputValidator((id: string) => id)
	.handler(async ({ data: id }) => {
		await prisma.reservation.deleteMany({ where: { userId: id } });

		await prisma.user.delete({ where: { id } });
		return { success: true };
	});

export const createUserFn = createServerFn({ method: 'POST' })
	.inputValidator(
		(data: {
			email: string;
			password: string;
			name: string;
			nim?: string;
			role: 'ADMIN' | 'MAHASISWA';
		}) => data,
	)
	.handler(async ({ data }) => {
		const existingUser = await prisma.user.findUnique({
			where: { email: data.email.toLowerCase() },
		});

		if (existingUser) {
			return { success: false, error: 'Email already exists' };
		}

		const hashedPassword = await hash(data.password, 12);

		const user = await prisma.user.create({
			data: {
				email: data.email.toLowerCase(),
				password: hashedPassword,
				name: data.name,
				nim: data.nim,
				role: data.role,
			},
			select: {
				id: true,
				email: true,
				name: true,
				role: true,
			},
		});

		return { success: true, user };
	});

export const getUserStatsFn = createServerFn({ method: 'GET' }).handler(
	async () => {
		const [total, admins, students] = await Promise.all([
			prisma.user.count(),
			prisma.user.count({ where: { role: 'ADMIN' } }),
			prisma.user.count({ where: { role: 'MAHASISWA' } }),
		]);

		return { total, admins, students };
	},
);
