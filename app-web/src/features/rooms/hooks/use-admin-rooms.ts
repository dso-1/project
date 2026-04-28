import * as React from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { getRoomsFn, deleteRoomFn } from '../api/rooms.api';
import type { Room } from '@prisma/client';
import { toast } from 'sonner';

export function useAdminRooms() {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [statusFilter, setStatusFilter] = React.useState<string>('ALL');
	const [deleteTarget, setDeleteTarget] = React.useState<string | null>(null);

	const queryClient = useQueryClient();
	const router = useRouter();

	const { data: rooms = [], refetch } = useQuery({
		queryKey: ['rooms'],
		queryFn: () => getRoomsFn(),
	});

	const filteredRooms = rooms.filter((room: Room) => {
		const matchesSearch = room.name
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesStatus =
			statusFilter === 'ALL' || room.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	const deleteMutation = useMutation({
		mutationFn: (roomId: string) => deleteRoomFn({ data: roomId }),
		onSuccess: () => {
			toast.success('Room deleted successfully');
			queryClient.invalidateQueries({ queryKey: ['rooms'] });
			router.invalidate();
		},
		onError: (error) => {
			toast.error('Failed to delete room');
			console.error(error);
		},
	});

	const requestDelete = (roomId: string) => {
		setDeleteTarget(roomId);
	};

	const confirmDelete = () => {
		if (deleteTarget) {
			deleteMutation.mutate(deleteTarget);
			setDeleteTarget(null);
		}
	};

	const cancelDelete = () => {
		setDeleteTarget(null);
	};

	return {
		searchQuery,
		setSearchQuery,
		statusFilter,
		setStatusFilter,
		filteredRooms,
		deleteTarget,
		requestDelete,
		confirmDelete,
		cancelDelete,
		isDeleting: deleteMutation.isPending,
		refetch,
	};
}
