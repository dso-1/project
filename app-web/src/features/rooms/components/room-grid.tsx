import { RoomCard } from './room-card';
import type { Room } from '../types';

interface RoomGridProps {
	rooms: Room[];
	isAdmin?: boolean;
	onBook?: (room: Room) => void;
	onEdit?: (room: Room) => void;
	onDelete?: (room: Room) => void;
	isLoading?: boolean;
}

export function RoomGrid({
	rooms,
	isAdmin,
	onBook,
	onEdit,
	onDelete,
	isLoading,
}: RoomGridProps) {
	if (isLoading) {
		return (
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 6 }).map((_, i) => (
					<div
						key={i.toString()}
						className="h-[380px] animate-pulse rounded-lg bg-muted"
					/>
				))}
			</div>
		);
	}

	if (rooms.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
				<div className="rounded-full bg-muted p-4 mb-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="h-8 w-8 text-muted-foreground"
					>
						<title>room</title>
						<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
						<polyline points="9 22 9 12 15 12 15 22" />
					</svg>
				</div>
				<p className="text-lg font-medium">No rooms found</p>
				<p className="text-sm text-muted-foreground">
					{isAdmin
						? 'Create a new room to get started'
						: 'No rooms available at the moment'}
				</p>
			</div>
		);
	}

	return (
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{rooms.map((room) => (
				<RoomCard
					key={room.id}
					room={room}
					isAdmin={isAdmin}
					onBook={() => onBook?.(room)}
					onEdit={() => onEdit?.(room)}
					onDelete={() => onDelete?.(room)}
				/>
			))}
		</div>
	);
}
