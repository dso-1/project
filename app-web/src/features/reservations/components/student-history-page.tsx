import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Badge } from '@/shadcn/badge';
import { Button } from '@/shadcn/button';
import { Card, CardContent } from '@/shadcn/card';
import {
	CalendarIcon,
	ClockIcon,
	DoorOpenIcon,
	CheckCircleIcon,
	XCircleIcon,
	HourglassIcon,
	BanIcon,
} from 'lucide-react';
import { useStudentHistory } from '../hooks/use-student-history';

interface StudentHistoryPageProps {
	reservations: {
		id: string;
		status: string;
		purpose: string;
		startTime: string | Date;
		endTime: string | Date;
		createdAt: string | Date;
		notes?: string | null;
		room: { name: string };
	}[];
}

const statusConfig = {
	PENDING: {
		label: 'Pending',
		className: 'bg-yellow-500/20 text-yellow-700',
		icon: HourglassIcon,
	},
	APPROVED: {
		label: 'Approved',
		className: 'bg-green-500/20 text-green-700',
		icon: CheckCircleIcon,
	},
	REJECTED: {
		label: 'Rejected',
		className: 'bg-red-500/20 text-red-700',
		icon: XCircleIcon,
	},
	CANCELLED: {
		label: 'Cancelled',
		className: 'bg-gray-500/20 text-gray-700',
		icon: BanIcon,
	},
};

export function StudentHistoryPage({ reservations }: StudentHistoryPageProps) {
	const { filter, setFilter, filteredBookings, handleCancel } =
		useStudentHistory(reservations);

	return (
		<div className="space-y-6">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<h1 className="text-3xl font-bold tracking-tight">Booking History</h1>
				<p className="text-muted-foreground">
					View and manage your room reservation requests
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
				className="grid gap-4 sm:grid-cols-4"
			>
				<Card
					className="cursor-pointer transition-colors hover:bg-accent"
					onClick={() => setFilter('ALL')}
				>
					<CardContent>
						<p className="text-2xl font-bold">{reservations.length}</p>
						<p className="text-sm text-muted-foreground">Total Bookings</p>
					</CardContent>
				</Card>
				<Card
					className="cursor-pointer transition-colors hover:bg-accent"
					onClick={() => setFilter('PENDING')}
				>
					<CardContent>
						<p className="text-2xl font-bold text-yellow-600">
							{reservations.filter((b) => b.status === 'PENDING').length}
						</p>
						<p className="text-sm text-muted-foreground">Pending</p>
					</CardContent>
				</Card>
				<Card
					className="cursor-pointer transition-colors hover:bg-accent"
					onClick={() => setFilter('APPROVED')}
				>
					<CardContent>
						<p className="text-2xl font-bold text-green-600">
							{reservations.filter((b) => b.status === 'APPROVED').length}
						</p>
						<p className="text-sm text-muted-foreground">Approved</p>
					</CardContent>
				</Card>
				<Card
					className="cursor-pointer transition-colors hover:bg-accent"
					onClick={() => setFilter('REJECTED')}
				>
					<CardContent>
						<p className="text-2xl font-bold text-red-600">
							{reservations.filter((b) => b.status === 'REJECTED').length}
						</p>
						<p className="text-sm text-muted-foreground">Rejected</p>
					</CardContent>
				</Card>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.15 }}
				className="flex gap-2"
			>
				{['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'].map((s) => (
					<Button
						key={s}
						variant={filter === s ? 'default' : 'outline'}
						size="sm"
						onClick={() => setFilter(s)}
					>
						{s === 'ALL'
							? 'All'
							: statusConfig[s as keyof typeof statusConfig]?.label || s}
					</Button>
				))}
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="space-y-4"
			>
				{filteredBookings.map((booking, index) => {
					const status =
						statusConfig[booking.status as keyof typeof statusConfig];
					const StatusIcon = status.icon;

					return (
						<motion.div
							key={booking.id}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.4, delay: index * 0.05 }}
						>
							<Card>
								<CardContent className="p-6">
									<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
										<div className="flex-1 space-y-2">
											<div className="flex items-center gap-3">
												<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
													<DoorOpenIcon className="h-5 w-5 text-primary" />
												</div>
												<div>
													<p className="font-semibold">{booking.room.name}</p>
													<p className="text-sm text-muted-foreground">
														{booking.purpose}
													</p>
												</div>
											</div>
											<div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
												<span className="flex items-center gap-1">
													<CalendarIcon className="h-4 w-4" />
													{new Date(booking.startTime).toLocaleDateString(
														'en-US',
														{
															day: 'numeric',
															month: 'short',
															year: 'numeric',
														},
													)}
												</span>
												<span className="flex items-center gap-1">
													<ClockIcon className="h-4 w-4" />
													{new Date(booking.startTime).toLocaleTimeString(
														'en-US',
														{
															hour: '2-digit',
															minute: '2-digit',
															hour12: false,
														},
													)}{' '}
													-{' '}
													{new Date(booking.endTime).toLocaleTimeString(
														'en-US',
														{
															hour: '2-digit',
															minute: '2-digit',
															hour12: false,
														},
													)}
												</span>
												<span>
													Requested{' '}
													{new Date(booking.createdAt).toLocaleDateString(
														'en-US',
														{
															day: 'numeric',
															month: 'short',
															year: 'numeric',
														},
													)}
												</span>
											</div>
											{booking.notes && (
												<p className="text-sm text-muted-foreground italic">
													Note: {booking.notes}
												</p>
											)}
										</div>

										<div className="flex items-center gap-3">
											<Badge className={status.className}>
												<StatusIcon className="mr-1 h-3 w-3" />
												{status.label}
											</Badge>
											{booking.status === 'PENDING' && (
												<Button
													size="sm"
													variant="outline"
													className="text-red-600"
													onClick={() => handleCancel(booking.id)}
												>
													Cancel
												</Button>
											)}
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					);
				})}

				{filteredBookings.length === 0 && (
					<Card>
						<CardContent className="py-12 text-center">
							<CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
							<p className="mt-4 text-muted-foreground">
								No bookings found for this filter
							</p>
							<Link to="/student/rooms">
								<Button className="mt-4">Browse Rooms</Button>
							</Link>
						</CardContent>
					</Card>
				)}
			</motion.div>
		</div>
	);
}
