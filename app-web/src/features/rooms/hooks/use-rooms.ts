import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlFetcher } from '@/shared/lib/graphql';
import {
	GET_ROOMS,
	GET_ROOM,
	GET_AVAILABLE_ROOMS,
	CREATE_ROOM,
	UPDATE_ROOM,
	DELETE_ROOM,
} from '../api/rooms.queries';
import type { Room, CreateRoomInput, UpdateRoomInput } from '../types';

interface RoomsQueryResult {
	rooms: Room[];
}

interface RoomQueryResult {
	room: Room | null;
}

interface AvailableRoomsQueryResult {
	availableRooms: Room[];
}

interface CreateRoomResult {
	createRoom: Room;
}

interface UpdateRoomResult {
	updateRoom: Room;
}

interface DeleteRoomResult {
	deleteRoom: boolean;
}

export function useRooms(status?: string) {
	return useQuery({
		queryKey: ['rooms', status],
		queryFn: () =>
			graphqlFetcher<RoomsQueryResult>(GET_ROOMS, {
				variables: status ? { status } : undefined,
			}),
		select: (data) => data.rooms,
	});
}

export function useRoom(id: string) {
	return useQuery({
		queryKey: ['room', id],
		queryFn: () =>
			graphqlFetcher<RoomQueryResult>(GET_ROOM, {
				variables: { id },
			}),
		select: (data) => data.room,
		enabled: !!id,
	});
}

export function useAvailableRooms(startTime?: string, endTime?: string) {
	return useQuery({
		queryKey: ['availableRooms', startTime, endTime],
		queryFn: () =>
			graphqlFetcher<AvailableRoomsQueryResult>(GET_AVAILABLE_ROOMS, {
				variables: { startTime, endTime },
			}),
		select: (data) => data.availableRooms,
		enabled: !!startTime && !!endTime,
	});
}

export function useCreateRoom() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: CreateRoomInput) =>
			graphqlFetcher<CreateRoomResult>(CREATE_ROOM, {
				variables: { input },
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['rooms'] });
		},
	});
}

export function useUpdateRoom() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, input }: { id: string; input: UpdateRoomInput }) =>
			graphqlFetcher<UpdateRoomResult>(UPDATE_ROOM, {
				variables: { id, input },
			}),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['rooms'] });
			queryClient.invalidateQueries({ queryKey: ['room', data.updateRoom.id] });
		},
	});
}

export function useDeleteRoom() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) =>
			graphqlFetcher<DeleteRoomResult>(DELETE_ROOM, {
				variables: { id },
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['rooms'] });
		},
	});
}
