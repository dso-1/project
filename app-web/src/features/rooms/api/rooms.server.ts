import { prisma } from '@/shared/lib/prisma';
import type { RoomStatus } from '@/shared/lib/prisma';

export async function getRooms(status?: RoomStatus) {
	return prisma.room.findMany({
		where: status ? { status } : undefined,
		orderBy: { name: 'asc' },
	});
}

export async function getRoom(id: string) {
	return prisma.room.findUnique({
		where: { id },
	});
}

export async function createRoom(data: {
	name: string;
	capacity: number;
	facilities: string[];
	image?: string;
	description?: string;
	location?: string;
	status?: RoomStatus;
}) {
	return prisma.room.create({
		data: {
			name: data.name,
			capacity: data.capacity,
			facilities: data.facilities,
			image: data.image,
			description: data.description,
			location: data.location,
			status: data.status || 'AVAILABLE',
		},
	});
}

export async function updateRoom(
	id: string,
	data: {
		name?: string;
		capacity?: number;
		facilities?: string[];
		image?: string;
		description?: string;
		location?: string;
		status?: RoomStatus;
	},
) {
	return prisma.room.update({
		where: { id },
		data,
	});
}

export async function deleteRoom(id: string) {
	await prisma.room.delete({
		where: { id },
	});
	return true;
}

export async function getAvailableRooms(startTime: Date, endTime: Date) {
	return prisma.room.findMany({
		where: {
			status: 'AVAILABLE',
			reservations: {
				none: {
					status: 'APPROVED',
					OR: [
						{
							startTime: { lte: endTime },
							endTime: { gte: startTime },
						},
					],
				},
			},
		},
		orderBy: { name: 'asc' },
	});
}

export async function seedRooms() {
	const existingRooms = await prisma.room.count();

	if (existingRooms > 0) {
		return { success: true, message: 'Rooms already exist' };
	}

	await prisma.room.createMany({
		data: [
			{
				name: 'Lab Komputer 1',
				capacity: 40,
				facilities: ['Projector', 'AC', 'Whiteboard', 'Computer'],
				description: 'Laboratory with 40 computers for programming classes',
				location: 'Gedung F, Lantai 1',
				status: 'AVAILABLE',
			},
			{
				name: 'Lab Komputer 2',
				capacity: 35,
				facilities: ['Projector', 'AC', 'Whiteboard', 'Computer'],
				description: 'Laboratory with 35 computers for networking classes',
				location: 'Gedung F, Lantai 1',
				status: 'AVAILABLE',
			},
			{
				name: 'Ruang Seminar A',
				capacity: 100,
				facilities: ['Projector', 'AC', 'Sound System', 'Podium', 'Microphone'],
				description: 'Large seminar room for presentations and events',
				location: 'Gedung F, Lantai 2',
				status: 'AVAILABLE',
			},
			{
				name: 'Ruang Rapat 1',
				capacity: 20,
				facilities: ['Projector', 'AC', 'Whiteboard', 'Conference Table'],
				description: 'Meeting room for small group discussions',
				location: 'Gedung F, Lantai 3',
				status: 'AVAILABLE',
			},
			{
				name: 'Lab Multimedia',
				capacity: 30,
				facilities: ['Projector', 'AC', 'Green Screen', 'Camera', 'Computer'],
				description: 'Multimedia lab for video editing and production',
				location: 'Gedung G, Lantai 1',
				status: 'MAINTENANCE',
			},
		],
	});

	return { success: true, message: '5 sample rooms created' };
}
