import { cn } from '@/shared/utils';
import { Card, CardContent, CardFooter, CardHeader } from '@/shadcn/card';
import { Badge } from '@/shadcn/badge';
import { Button } from '@/shadcn/button';
import {
	UsersIcon,
	MapPinIcon,
	WrenchIcon,
	CheckCircleIcon,
	XCircleIcon,
} from 'lucide-react';
import type { Room } from '../types';

interface RoomCardProps {
	room: Room;
	onBook?: () => void;
	onEdit?: () => void;
	onDelete?: () => void;
	isAdmin?: boolean;
}

const statusConfig = {
	AVAILABLE: {
		label: 'Available',
		color: 'bg-green-500/20 text-green-700 border-green-500/30',
		icon: CheckCircleIcon,
	},
	MAINTENANCE: {
		label: 'Maintenance',
		color: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30',
		icon: WrenchIcon,
	},
	UNAVAILABLE: {
		label: 'Unavailable',
		color: 'bg-red-500/20 text-red-700 border-red-500/30',
		icon: XCircleIcon,
	},
};

export function RoomCard({
	room,
	onBook,
	onEdit,
	onDelete,
	isAdmin,
}: RoomCardProps) {
	const status = statusConfig[room.status];
	const StatusIcon = status.icon;

	return (
		<Card className="overflow-hidden transition-all hover:shadow-lg group">
			<div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
				{room.image ? (
					<img
						src={room.image}
						alt={room.name}
						className="h-full w-full object-cover transition-transform group-hover:scale-105"
					/>
				) : (
					<div className="flex h-full items-center justify-center">
						<div className="rounded-full bg-primary/10 p-6">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-12 w-12 text-primary"
							>
								<title>room</title>
								<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
								<polyline points="9 22 9 12 15 12 15 22" />
							</svg>
						</div>
					</div>
				)}

				<Badge
					className={cn(
						'absolute right-3 top-3 flex items-center gap-1.5 border',
						status.color,
					)}
				>
					<StatusIcon className="h-3 w-3" />
					{status.label}
				</Badge>
			</div>

			<CardHeader className="pb-2">
				<h3 className="font-semibold text-lg line-clamp-1">{room.name}</h3>
				{room.location && (
					<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
						<MapPinIcon className="h-3.5 w-3.5" />
						{room.location}
					</div>
				)}
			</CardHeader>

			<CardContent className="pb-3">
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<UsersIcon className="h-4 w-4" />
					<span>Capacity: {room.capacity} people</span>
				</div>

				{room.description && (
					<p className="mt-2 text-sm text-muted-foreground line-clamp-2">
						{room.description}
					</p>
				)}

				{room.facilities.length > 0 && (
					<div className="mt-3 flex flex-wrap gap-1.5">
						{room.facilities.slice(0, 4).map((facility) => (
							<Badge key={facility} variant="secondary" className="text-xs">
								{facility}
							</Badge>
						))}
						{room.facilities.length > 4 && (
							<Badge variant="secondary" className="text-xs">
								+{room.facilities.length - 4} more
							</Badge>
						)}
					</div>
				)}
			</CardContent>

			<CardFooter className="flex gap-2 pt-3 border-t">
				{isAdmin ? (
					<>
						<Button
							variant="outline"
							size="sm"
							className="flex-1"
							onClick={onEdit}
						>
							Edit
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
							onClick={onDelete}
						>
							Delete
						</Button>
					</>
				) : (
					<Button
						className="w-full"
						disabled={room.status !== 'AVAILABLE'}
						onClick={onBook}
					>
						{room.status === 'AVAILABLE' ? 'Book Now' : 'Not Available'}
					</Button>
				)}
			</CardFooter>
		</Card>
	);
}
