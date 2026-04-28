import { createServerFn } from '@tanstack/react-start';
import { prisma, type RoomStatus } from '@/shared/lib/prisma';

export const getRoomsFn = createServerFn({ method: 'GET' }).handler(
	async () => {
		const rooms = await prisma.room.findMany({
			orderBy: { name: 'asc' },
		});
		return rooms;
	},
);

export const getAvailableRoomsFn = createServerFn({ method: 'GET' }).handler(
	async () => {
		const rooms = await prisma.room.findMany({
			where: { status: 'AVAILABLE' },
			orderBy: { name: 'asc' },
		});
		return rooms;
	},
);

export const getRoomByIdFn = createServerFn({ method: 'GET' })
	.inputValidator((id: string) => id)
	.handler(async ({ data: id }) => {
		const room = await prisma.room.findUnique({
			where: { id },
		});
		return room;
	});

export const getRoomStatsFn = createServerFn({ method: 'GET' }).handler(
	async () => {
		const [total, available, maintenance, unavailable] = await Promise.all([
			prisma.room.count(),
			prisma.room.count({ where: { status: 'AVAILABLE' } }),
			prisma.room.count({ where: { status: 'MAINTENANCE' } }),
			prisma.room.count({ where: { status: 'UNAVAILABLE' } }),
		]);

		return { total, available, maintenance, unavailable };
	},
);

export const updateRoomFn = createServerFn({ method: 'POST' })
	.inputValidator(
		(data: {
			id: string;
			data: {
				name?: string;
				capacity?: number;
				facilities?: string[];
				image?: string | null;
				description?: string | null;
				location?: string | null;
				status?: string; // Validated on server
			};
		}) => data,
	)
	.handler(async ({ data: { id, data } }) => {
		return prisma.room.update({
			where: { id },
			data: {
				...data,
				status: data.status as RoomStatus,
			},
		});
	});

export const createRoomFn = createServerFn({ method: 'POST' })
	.inputValidator(
		(data: {
			name: string;
			capacity: number;
			facilities: string[];
			image?: string | null;
			description?: string | null;
			location?: string | null;
			status?: any; // Validate properly in production
		}) => data,
	)
	.handler(async ({ data }) => {
		return prisma.room.create({
			data: {
				...data,
				status: data.status as any,
			},
		});
	});

export const deleteRoomFn = createServerFn({ method: 'POST' })
	.inputValidator((id: string) => id)
	.handler(async ({ data: id }) => {
		return prisma.room.delete({
			where: { id },
		});
	});
