import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
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
	DoorOpenIcon,
	CalendarIcon,
	UsersIcon,
	ClockIcon,
	PlusIcon,
	ArrowRightIcon,
	CheckIcon,
	XIcon,
} from 'lucide-react';

interface AdminDashboardPageProps {
	dashboardStats: {
		totalRooms: number;
		pendingReservations: number;
		todayReservations: number;
		totalUsers: number;
	};
	roomStats: {
		total: number;
		available: number;
		maintenance: number;
		unavailable: number;
	};
	recentActivity: {
		id: string;
		startTime: string | Date;
		status: string;
		room: { name: string };
		user: { name: string };
	}[];
}

export function AdminDashboardPage({
	dashboardStats,
	roomStats,
	recentActivity,
}: AdminDashboardPageProps) {
	return (
		<div className="space-y-8">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
			>
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
					<p className="text-muted-foreground">
						Welcome back! Here is an overview of Go Reserve.
					</p>
				</div>
				<Link to="/admin/rooms/create">
					<Button>
						<PlusIcon className="mr-2 h-4 w-4" />
						Add New Room
					</Button>
				</Link>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
				className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
			>
				<StatsCard
					title="Total Rooms"
					value={dashboardStats.totalRooms.toString()}
					description={`${roomStats.available} available`}
					icon={<DoorOpenIcon className="h-5 w-5" />}
				/>
				<StatsCard
					title="Pending Reservations"
					value={dashboardStats.pendingReservations.toString()}
					description="Awaiting approval"
					icon={<ClockIcon className="h-5 w-5" />}
					trend={
						dashboardStats.pendingReservations > 0
							? { value: dashboardStats.pendingReservations, isPositive: false }
							: undefined
					}
				/>
				<StatsCard
					title="Active Bookings"
					value={dashboardStats.todayReservations.toString()}
					description="Today"
					icon={<CalendarIcon className="h-5 w-5" />}
				/>
				<StatsCard
					title="Total Users"
					value={dashboardStats.totalUsers.toString()}
					description="Registered users"
					icon={<UsersIcon className="h-5 w-5" />}
				/>
			</motion.div>

			<div className="grid gap-6 lg:grid-cols-2">
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<Card>
						<CardHeader>
							<CardTitle>Recent Reservations</CardTitle>
							<CardDescription>
								Latest reservation requests from database
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{recentActivity.length > 0 ? (
									recentActivity.slice(0, 3).map((reservation) => (
										<div
											key={reservation.id}
											className="flex items-center justify-between rounded-lg border p-4"
										>
											<div className="space-y-1">
												<p className="font-medium">{reservation.room.name}</p>
												<p className="text-sm text-muted-foreground">
													{reservation.user.name} •{' '}
													{new Date(reservation.startTime).toLocaleDateString()}{' '}
													•{' '}
													{new Date(reservation.startTime).toLocaleTimeString(
														[],
														{ hour: '2-digit', minute: '2-digit' },
													)}
												</p>
											</div>
											<div className="flex items-center gap-2">
												<Badge
													className={
														reservation.status === 'PENDING'
															? 'bg-yellow-500/20 text-yellow-700'
															: reservation.status === 'APPROVED'
																? 'bg-green-500/20 text-green-700'
																: 'bg-red-500/20 text-red-700'
													}
												>
													{reservation.status}
												</Badge>
												{reservation.status === 'PENDING' && (
													<div className="flex gap-1">
														<Button
															size="icon"
															variant="ghost"
															className="h-7 w-7 text-red-600"
														>
															<XIcon className="h-4 w-4" />
														</Button>
														<Button
															size="icon"
															variant="ghost"
															className="h-7 w-7 text-green-600"
														>
															<CheckIcon className="h-4 w-4" />
														</Button>
													</div>
												)}
											</div>
										</div>
									))
								) : (
									<p className="text-center text-muted-foreground py-4">
										No recent reservations
									</p>
								)}
							</div>
							<Link
								to="/admin/reservations"
								className="mt-4 flex items-center justify-center gap-1 text-sm text-primary hover:underline"
							>
								View all reservations
								<ArrowRightIcon className="h-4 w-4" />
							</Link>
						</CardContent>
					</Card>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.25 }}
				>
					<Card>
						<CardHeader>
							<CardTitle>Room Status</CardTitle>
							<CardDescription>Current availability overview</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<span className="text-sm">Available</span>
									<div className="flex items-center gap-2">
										<div className="h-2 w-32 overflow-hidden rounded-full bg-muted">
											<div
												className="h-full rounded-full bg-green-500"
												style={{
													width: `${roomStats.total > 0 ? (roomStats.available / roomStats.total) * 100 : 0}%`,
												}}
											/>
										</div>
										<span className="text-sm font-medium">
											{roomStats.available}
										</span>
									</div>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">Maintenance</span>
									<div className="flex items-center gap-2">
										<div className="h-2 w-32 overflow-hidden rounded-full bg-muted">
											<div
												className="h-full rounded-full bg-yellow-500"
												style={{
													width: `${roomStats.total > 0 ? (roomStats.maintenance / roomStats.total) * 100 : 0}%`,
												}}
											/>
										</div>
										<span className="text-sm font-medium">
											{roomStats.maintenance}
										</span>
									</div>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">Unavailable</span>
									<div className="flex items-center gap-2">
										<div className="h-2 w-32 overflow-hidden rounded-full bg-muted">
											<div
												className="h-full rounded-full bg-red-500"
												style={{
													width: `${roomStats.total > 0 ? (roomStats.unavailable / roomStats.total) * 100 : 0}%`,
												}}
											/>
										</div>
										<span className="text-sm font-medium">
											{roomStats.unavailable}
										</span>
									</div>
								</div>
							</div>
							<Link
								to="/admin/rooms"
								className="mt-6 flex items-center justify-center gap-1 text-sm text-primary hover:underline"
							>
								Manage rooms
								<ArrowRightIcon className="h-4 w-4" />
							</Link>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</div>
	);
}
