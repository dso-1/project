import * as React from 'react';

// Define Room interface here or import it if shared.
// For now duplicating to avoid complex refactors of types.
interface Room {
	id: string;
	name: string;
	capacity: number;
	location: string | null;
	facilities: string[];
	description: string | null;
	image: string | null;
}

export function useStudentRooms(rooms: Room[]) {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [selectedRoom, setSelectedRoom] = React.useState<Room | null>(null);
	const [isBookingOpen, setIsBookingOpen] = React.useState(false);

	const handleBookClick = (room: Room) => {
		setSelectedRoom(room);
		setIsBookingOpen(true);
	};

	const closeBookingDialog = () => {
		setIsBookingOpen(false);
	};

	const filteredRooms = rooms.filter(
		(room) =>
			room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			(room.location || '').toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return {
		searchQuery,
		setSearchQuery,
		selectedRoom,
		isBookingOpen,
		handleBookClick,
		closeBookingDialog,
		filteredRooms,
	};
}
