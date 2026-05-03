import { useQuery } from '@tanstack/react-query';
import { getPublicStatsFn } from '@/features/dashboard/api/dashboard.api';
import {
	getAvailableRoomsFn,
	getRoomStatsFn,
} from '@/features/rooms/api/rooms.api';

export function usePublicStats() {
	return useQuery({
		queryKey: ['landing', 'public-stats'],
		queryFn: () => getPublicStatsFn(),
	});
}

export function useLandingRoomStats() {
	return useQuery({
		queryKey: ['landing', 'room-stats'],
		queryFn: () => getRoomStatsFn(),
	});
}

export function useLandingAvailableRooms() {
	return useQuery({
		queryKey: ['landing', 'available-rooms'],
		queryFn: () => getAvailableRoomsFn(),
	});
}
