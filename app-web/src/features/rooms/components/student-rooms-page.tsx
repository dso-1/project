import type * as React from 'react';
import { Link } from '@tanstack/react-router'; // Only if needed? Actually useRouter is for invalidation.
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/shadcn/badge';
import { Button } from '@/shadcn/button';
import { Card, CardContent } from '@/shadcn/card';
import { Input } from '@/shadcn/input';
import { Label } from '@/shadcn/label';
import { Textarea } from '@/shadcn/textarea';
import {
	DoorOpenIcon,
	UsersIcon,
	SearchIcon,
	MapPinIcon,
	XIcon,
	Loader2Icon,
} from 'lucide-react';
import { useStudentRooms } from '../hooks/use-student-rooms';
import { useBookingForm } from '../hooks/use-booking-form';

// Moving Room interface here for now, or importing if it exists elsewhere.
// It was defined locally in the route file.
interface Room {
	id: string;
	name: string;
	capacity: number;
	location: string | null;
	facilities: string[];
	description: string | null;
	image: string | null;
}

interface StudentRoomsPageProps {
	rooms: Room[];
}

export function StudentRoomsPage({ rooms }: StudentRoomsPageProps) {
	const {
		searchQuery,
		setSearchQuery,
		selectedRoom,
		isBookingOpen,
		handleBookClick,
		closeBookingDialog,
		filteredRooms,
	} = useStudentRooms(rooms);

	return (
		<div className="space-y-6">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<h1 className="text-3xl font-bold tracking-tight">Browse Rooms</h1>
				<p className="text-muted-foreground">
					Find and book available rooms for your activities
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				<div className="relative max-w-md">
					<SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						placeholder="Search rooms by name or location..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-10"
					/>
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
			>
				{filteredRooms.map((room, index) => (
					<motion.div
						key={room.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: index * 0.05 }}
						whileHover={{ y: -5 }}
					>
						<Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
							<div className="flex h-40 items-center justify-center bg-linear-to-br from-primary/20 to-primary/5">
								{room.image ? (
									<img
										src={room.image}
										alt={room.name}
										className="h-full w-full object-cover"
									/>
								) : (
									<DoorOpenIcon className="h-16 w-16 text-primary/30" />
								)}
							</div>

							<CardContent className="p-5">
								<div className="mb-3 flex items-start justify-between">
									<div>
										<h3 className="font-semibold">{room.name}</h3>
										<p className="flex items-center gap-1 text-sm text-muted-foreground">
											<MapPinIcon className="h-3 w-3" />
											{room.location || 'No location info'}
										</p>
									</div>
									<Badge className="bg-green-500/20 text-green-700">
										Available
									</Badge>
								</div>

								<p className="mb-3 text-sm text-muted-foreground line-clamp-2">
									{room.description || 'No description available'}
								</p>

								<div className="mb-4 flex items-center gap-3 text-sm">
									<span className="flex items-center gap-1 text-muted-foreground">
										<UsersIcon className="h-4 w-4" />
										{room.capacity} seats
									</span>
								</div>

								<div className="mb-4 flex flex-wrap gap-1">
									{room.facilities.slice(0, 3).map((facility) => (
										<Badge key={facility} variant="outline" className="text-xs">
											{facility}
										</Badge>
									))}
									{room.facilities.length > 3 && (
										<Badge variant="outline" className="text-xs">
											+{room.facilities.length - 3}
										</Badge>
									)}
								</div>

								<Button
									className="w-full"
									onClick={() => handleBookClick(room)}
								>
									Book Now
								</Button>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</motion.div>

			{filteredRooms.length === 0 && (
				<Card>
					<CardContent className="py-12 text-center">
						<SearchIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
						<p className="mt-4 text-muted-foreground">No rooms found</p>
						<p className="text-sm text-muted-foreground">
							Try adjusting your search query
						</p>
					</CardContent>
				</Card>
			)}

			<BookingDialog
				isOpen={isBookingOpen}
				onClose={closeBookingDialog}
				room={selectedRoom}
			/>
		</div>
	);
}

function BookingDialog({
	isOpen,
	onClose,
	room,
}: {
	isOpen: boolean;
	onClose: () => void;
	room: Room | null;
}) {
	const { formData, updateField, isSubmitting, error, handleSubmit } =
		useBookingForm({ isOpen, onClose, room });

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 bg-black/50 min-h-screen backdrop-blur-sm"
						onClick={onClose}
					/>

					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4"
					>
						<Card className="overflow-hidden shadow-xl">
							<div className="flex items-center justify-between border-b p-4">
								<h2 className="text-lg font-semibold">Book {room?.name}</h2>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8"
									onClick={onClose}
								>
									<XIcon className="h-4 w-4" />
								</Button>
							</div>

							<form onSubmit={handleSubmit}>
								<CardContent className="space-y-4 p-4">
									{error && (
										<div className="rounded-md bg-red-500/10 p-3 text-sm text-red-600">
											{error}
										</div>
									)}

									<div className="grid gap-2">
										<Label htmlFor="date">Date</Label>
										<Input
											id="date"
											type="date"
											required
											value={formData.date}
											onChange={(e) => updateField('date', e.target.value)}
										/>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div className="grid gap-2">
											<Label htmlFor="startTime">Start Time</Label>
											<Input
												id="startTime"
												type="time"
												required
												value={formData.startTime}
												onChange={(e) =>
													updateField('startTime', e.target.value)
												}
											/>
										</div>
										<div className="grid gap-2">
											<Label htmlFor="endTime">End Time</Label>
											<Input
												id="endTime"
												type="time"
												required
												value={formData.endTime}
												onChange={(e) => updateField('endTime', e.target.value)}
											/>
										</div>
									</div>

									<div className="grid gap-2">
										<Label htmlFor="purpose">Purpose</Label>
										<Textarea
											id="purpose"
											placeholder="e.g. Group Project Discussion"
											required
											value={formData.purpose}
											onChange={(e) => updateField('purpose', e.target.value)}
										/>
									</div>
								</CardContent>

								<div className="flex justify-end gap-2 border-t p-4 bg-muted/50">
									<Button type="button" variant="outline" onClick={onClose}>
										Cancel
									</Button>
									<Button type="submit" disabled={isSubmitting}>
										{isSubmitting && (
											<Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
										)}
										Confirm Booking
									</Button>
								</div>
							</form>
						</Card>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
