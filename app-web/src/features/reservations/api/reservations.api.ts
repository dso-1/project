import { createServerFn } from '@tanstack/react-start';
import { prisma } from '@/shared/lib/prisma';

export const getReservationsFn = createServerFn({ method: 'GET' }).handler(
	async () => {
		const reservations = await prisma.reservation.findMany({
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
						nim: true,
					},
				},
				room: {
					select: {
						id: true,
						name: true,
						location: true,
					},
				},
			},
			orderBy: { createdAt: 'desc' },
		});
		return reservations;
	},
);

export const getUserReservationsFn = createServerFn({ method: 'POST' })
	.inputValidator((userId: string) => userId)
	.handler(async ({ data: userId }) => {
		const reservations = await prisma.reservation.findMany({
			where: { userId },
			include: {
				room: {
					select: {
						id: true,
						name: true,
						location: true,
					},
				},
			},
			orderBy: { createdAt: 'desc' },
		});
		return reservations;
	});

export const getReservationStatsFn = createServerFn({ method: 'GET' }).handler(
	async () => {
		const [total, pending, approved, rejected] = await Promise.all([
			prisma.reservation.count(),
			prisma.reservation.count({ where: { status: 'PENDING' } }),
			prisma.reservation.count({ where: { status: 'APPROVED' } }),
			prisma.reservation.count({ where: { status: 'REJECTED' } }),
		]);

		return { total, pending, approved, rejected };
	},
);

export const getUserStatsFn = createServerFn({ method: 'POST' })
	.inputValidator((userId: string) => userId)
	.handler(async ({ data: userId }) => {
		const [total, pending, approved, rejected] = await Promise.all([
			prisma.reservation.count({ where: { userId } }),
			prisma.reservation.count({ where: { userId, status: 'PENDING' } }),
			prisma.reservation.count({ where: { userId, status: 'APPROVED' } }),
			prisma.reservation.count({ where: { userId, status: 'REJECTED' } }),
		]);

		return { total, pending, approved, rejected };
	});

export const updateReservationStatusFn = createServerFn({ method: 'POST' })
	.inputValidator(
		(data: { id: string; status: 'APPROVED' | 'REJECTED' | 'CANCELLED' }) =>
			data,
	)
	.handler(async ({ data }) => {
		const reservation = await prisma.reservation.update({
			where: { id: data.id },
			data: { status: data.status },
			include: {
				user: {
					select: { name: true, email: true },
				},
				room: {
					select: { name: true },
				},
			},
		});
		return reservation;
	});

export const createReservationFn = createServerFn({ method: 'POST' })
	.inputValidator(
		(data: {
			userId: string;
			roomId: string;
			startTime: string;
			endTime: string;
			purpose: string;
		}) => data,
	)
	.handler(async ({ data }) => {
		const conflicting = await prisma.reservation.findFirst({
			where: {
				roomId: data.roomId,
				status: { in: ['PENDING', 'APPROVED'] },
				OR: [
					{
						startTime: { lte: new Date(data.startTime) },
						endTime: { gt: new Date(data.startTime) },
					},
					{
						startTime: { lt: new Date(data.endTime) },
						endTime: { gte: new Date(data.endTime) },
					},
					{
						startTime: { gte: new Date(data.startTime) },
						endTime: { lte: new Date(data.endTime) },
					},
				],
			},
		});

		if (conflicting) {
			return {
				success: false,
				error: 'This time slot conflicts with an existing reservation',
			};
		}

		const reservation = await prisma.reservation.create({
			data: {
				userId: data.userId,
				roomId: data.roomId,
				startTime: new Date(data.startTime),
				endTime: new Date(data.endTime),
				purpose: data.purpose,
				status: 'PENDING',
			},
		});

		return { success: true, reservation };
	});

export const deleteReservationFn = createServerFn({ method: 'POST' })
	.inputValidator((id: string) => id)
	.handler(async ({ data: id }) => {
		await prisma.reservation.delete({ where: { id } });
		return { success: true };
	});
