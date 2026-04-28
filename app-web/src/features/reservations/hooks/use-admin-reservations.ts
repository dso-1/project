import * as React from 'react';
import { updateReservationStatusFn } from '@/features/reservations/api/reservations.api';

interface Reservation {
	id: string;
	status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
	purpose: string;
	startTime: string | Date;
	endTime: string | Date;
	room: { name: string };
	user: { name: string; email: string; nim: string | null };
}

interface Stats {
	pending: number;
	approved: number;
	rejected: number;
	total: number;
}

export function useAdminReservations(
	initialReservations: Reservation[],
	initialStats: Stats,
) {
	const [reservations, setReservations] = React.useState(initialReservations);
	const [stats, setStats] = React.useState(initialStats);
	const [statusFilter, setStatusFilter] = React.useState<string>('ALL');
	const [loadingId, setLoadingId] = React.useState<string | null>(null);

	const filteredReservations = reservations.filter((res) => {
		return statusFilter === 'ALL' || res.status === statusFilter;
	});

	const handleApprove = async (id: string) => {
		setLoadingId(id);
		try {
			await updateReservationStatusFn({ data: { id, status: 'APPROVED' } });

			setReservations((prev) =>
				prev.map((r) => (r.id === id ? { ...r, status: 'APPROVED' } : r)),
			);
			setStats((prev) => ({
				...prev,
				pending: prev.pending - 1,
				approved: prev.approved + 1,
			}));
		} catch (err) {
			console.error('Approve error:', err);
		} finally {
			setLoadingId(null);
		}
	};

	const handleReject = async (id: string) => {
		if (!confirm('Are you sure you want to reject this reservation?')) return;

		setLoadingId(id);
		try {
			await updateReservationStatusFn({ data: { id, status: 'REJECTED' } });

			setReservations((prev) =>
				prev.map((r) => (r.id === id ? { ...r, status: 'REJECTED' } : r)),
			);
			setStats((prev) => ({
				...prev,
				pending: prev.pending - 1,
				rejected: prev.rejected + 1,
			}));
		} catch (err) {
			console.error('Reject error:', err);
		} finally {
			setLoadingId(null);
		}
	};

	return {
		reservations,
		stats,
		statusFilter,
		setStatusFilter,
		loadingId,
		filteredReservations,
		handleApprove,
		handleReject,
	};
}
