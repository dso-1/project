import type { RoomStatus } from '@/shared/lib/prisma';

export interface Room {
	id: string;
	name: string;
	capacity: number;
	facilities: string[];
	image: string | null;
	description: string | null;
	location: string | null;
	status: RoomStatus;
	createdAt: string;
	updatedAt: string;
}

export interface CreateRoomInput {
	name: string;
	capacity: number;
	facilities: string[];
	image?: string;
	description?: string;
	location?: string;
	status?: RoomStatus;
}

export interface UpdateRoomInput {
	name?: string;
	capacity?: number;
	facilities?: string[];
	image?: string;
	description?: string;
	location?: string;
	status?: RoomStatus;
}
