import * as React from 'react';

interface Reservation {
	id: string;
	status: string;
	purpose: string;
	startTime: string | Date;
	endTime: string | Date;
	createdAt: string | Date;
	notes?: string | null;
	room: { name: string };
}

export function useStudentHistory(reservations: Reservation[]) {
	const [filter, setFilter] = React.useState('ALL');
	const [cancelTarget, setCancelTarget] = React.useState<string | null>(null);

	const filteredBookings = reservations.filter((booking) => {
		return filter === 'ALL' || booking.status === filter;
	});

	const requestCancel = (id: string) => {
		setCancelTarget(id);
	};

	const confirmCancel = (onCancel: (id: string) => void) => {
		if (cancelTarget) {
			onCancel(cancelTarget);
			setCancelTarget(null);
		}
	};

	const dismissCancel = () => {
		setCancelTarget(null);
	};

	return {
		filter,
		setFilter,
		filteredBookings,
		cancelTarget,
		requestCancel,
		confirmCancel,
		dismissCancel,
	};
}
