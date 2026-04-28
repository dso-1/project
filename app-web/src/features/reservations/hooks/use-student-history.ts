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

	const filteredBookings = reservations.filter((booking) => {
		return filter === 'ALL' || booking.status === filter;
	});

	const handleCancel = (id: string) => {
		if (confirm('Are you sure you want to cancel this booking?')) {
			console.log('Cancelling booking:', id);
			// Ideally impl cancel logic here or pass handler
		}
	};

	return {
		filter,
		setFilter,
		filteredBookings,
		handleCancel,
	};
}
