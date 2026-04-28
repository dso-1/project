import { createServerFn } from '@tanstack/react-start';
import { prisma } from '@/shared/lib/prisma';

export const getDashboardStatsFn = createServerFn({ method: 'GET' }).handler(
	async () => {
		const [
			totalRooms,
			availableRooms,
			totalUsers,
			pendingReservations,
			approvedReservations,
			todayReservations,
		] = await Promise.all([
			prisma.room.count(),
			prisma.room.count({ where: { status: 'AVAILABLE' } }),
			prisma.user.count(),
			prisma.reservation.count({ where: { status: 'PENDING' } }),
			prisma.reservation.count({ where: { status: 'APPROVED' } }),
			prisma.reservation.count({
				where: {
					status: 'APPROVED',
					startTime: {
						gte: new Date(new Date().setHours(0, 0, 0, 0)),
						lt: new Date(new Date().setHours(23, 59, 59, 999)),
					},
				},
			}),
		]);

		return {
			totalRooms,
			availableRooms,
			totalUsers,
			pendingReservations,
			approvedReservations,
			todayReservations,
		};
	},
);

export const getRecentActivityFn = createServerFn({ method: 'GET' }).handler(
	async () => {
		const reservations = await prisma.reservation.findMany({
			take: 5,
			include: {
				user: {
					select: {
						name: true,
						email: true,
					},
				},
				room: {
					select: {
						name: true,
					},
				},
			},
			orderBy: { createdAt: 'desc' },
		});

		return reservations;
	},
);

export const getPublicStatsFn = createServerFn({ method: 'GET' }).handler(
	async () => {
		const [totalUsers, totalRooms, totalReservations, approvedRate] =
			await Promise.all([
				prisma.user.count({ where: { role: 'MAHASISWA' } }),
				prisma.room.count(),
				prisma.reservation.count(),
				prisma.reservation.count({ where: { status: 'APPROVED' } }),
			]);

		const approvalPercentage =
			totalReservations > 0
				? Math.round((approvedRate / totalReservations) * 100)
				: 99;

		return {
			activeUsers: totalUsers,
			availableRooms: totalRooms,
			totalReservations,
			approvalRate: approvalPercentage,
		};
	},
);
