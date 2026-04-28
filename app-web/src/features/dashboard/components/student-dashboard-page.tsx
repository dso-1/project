import { Link } from '@tanstack/react-router';
import { StatsCard } from '@/features/dashboard/components/stats-card';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shadcn/card';
import { Button } from '@/shadcn/button';
import { Badge } from '@/shadcn/badge';
import {
	CalendarIcon,
	ClockIcon,
	DoorOpenIcon,
	ArrowRightIcon,
	CheckCircleIcon,
	XCircleIcon,
	HourglassIcon,
	BanIcon,
} from 'lucide-react';

interface StudentDashboardPageProps {
	stats: {
		approved: number;
		pending: number;
		total: number;
	};
	reservations: {
		id: string;
		startTime: string | Date;
		status: string;
		room: { name: string };
	}[];
}

export function StudentDashboardPage({
	stats,
	reservations,
}: StudentDashboardPageProps) {
	const recentBookings = reservations.slice(0, 3);

	const statusConfig = {
		APPROVED: {
			label: 'Approved',
			color: 'bg-green-500/20 text-green-700',
			icon: CheckCircleIcon,
		},
		PENDING: {
			label: 'Pending',
			color: 'bg-yellow-500/20 text-yellow-700',
			icon: HourglassIcon,
		},
		REJECTED: {
			label: 'Rejected',
			color: 'bg-red-500/20 text-red-700',
			icon: XCircleIcon,
		},
		CANCELLED: {
			label: 'Cancelled',
			color: 'bg-gray-500/20 text-gray-700',
			icon: BanIcon,
		},
	};

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
				<p className="text-muted-foreground">
					Welcome back! Manage your room reservations here.
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<StatsCard
					title="Active Bookings"
					value={stats.approved.toString()}
					description="Approved reservations"
					icon={<CalendarIcon className="h-5 w-5" />}
				/>
				<StatsCard
					title="Pending Requests"
					value={stats.pending.toString()}
					description="Awaiting approval"
					icon={<ClockIcon className="h-5 w-5" />}
				/>
				<StatsCard
					title="Total Bookings"
					value={stats.total.toString()}
					description="All time"
					icon={<CheckCircleIcon className="h-5 w-5" />}
				/>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<Card className="h-max">
					<CardHeader>
						<CardTitle>Quick Actions</CardTitle>
						<CardDescription>
							Book rooms and manage reservations
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-4 sm:flex-row">
						<Link to="/student/rooms" className="flex-1">
							<Button className="w-full gap-2" size="lg">
								<DoorOpenIcon className="h-5 w-5" />
								Browse Rooms
							</Button>
						</Link>
						<Link to="/student/history" className="flex-1">
							<Button variant="outline" className="w-full gap-2" size="lg">
								<CalendarIcon className="h-5 w-5" />
								My Bookings
							</Button>
						</Link>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Recent Bookings</CardTitle>
						<CardDescription>Your latest reservation requests</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{recentBookings.length === 0 ? (
								<p className="text-sm text-muted-foreground">
									No recent bookings found.
								</p>
							) : (
								recentBookings.map((booking) => {
									const status =
										statusConfig[booking.status as keyof typeof statusConfig];
									const StatusIcon = status.icon;

									return (
										<div
											key={booking.id}
											className="flex items-center justify-between rounded-lg border p-3"
										>
											<div>
												<p className="font-medium text-sm">
													{booking.room.name}
												</p>
												<p className="text-xs text-muted-foreground">
													{new Date(booking.startTime).toLocaleDateString(
														'en-US',
														{
															weekday: 'short',
															month: 'short',
															day: 'numeric',
														},
													)}{' '}
													•{' '}
													{new Date(booking.startTime).toLocaleTimeString(
														'en-US',
														{
															hour: '2-digit',
															minute: '2-digit',
															hour12: false,
														},
													)}
												</p>
											</div>
											<Badge className={status.color}>
												<StatusIcon className="mr-1 h-3 w-3" />
												{status.label}
											</Badge>
										</div>
									);
								})
							)}
						</div>
						<Link
							to="/student/history"
							className="mt-4 flex items-center justify-center gap-1 text-sm text-primary hover:underline"
						>
							View all bookings
							<ArrowRightIcon className="h-4 w-4" />
						</Link>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
