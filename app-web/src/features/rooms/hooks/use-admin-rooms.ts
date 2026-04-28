import * as React from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRoomsFn, deleteRoomFn } from '../api/rooms.api'; // Ensure this exists and is exported
import type { Room } from '@prisma/client';
import { toast } from 'sonner';

export function useAdminRooms() {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [statusFilter, setStatusFilter] = React.useState<string>('ALL');

	const { data: rooms = [], refetch } = useQuery({
		queryKey: ['rooms'],
		queryFn: () => getRoomsFn(),
		staleTime: 5 * 60 * 1000,
	});

	const filteredRooms = rooms.filter((room: Room) => {
		const matchesSearch = room.name
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesStatus =
			statusFilter === 'ALL' || room.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	const queryClient = useQueryClient();

	const deleteMutation = useMutation({
		mutationFn: (roomId: string) => deleteRoomFn({ data: roomId }),
		onSuccess: () => {
			toast.success('Room deleted successfully');
			queryClient.invalidateQueries({ queryKey: ['rooms'] });
		},
		onError: (error) => {
			toast.error('Failed to delete room');
			console.error(error);
		},
	});

	const handleDelete = (roomId: string) => {
		if (confirm('Are you sure you want to delete this room?')) {
			deleteMutation.mutate(roomId);
		}
	};

	return {
		searchQuery,
		setSearchQuery,
		statusFilter,
		setStatusFilter,
		filteredRooms,
		handleDelete,
		refetch,
	};
}
