import type * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/shadcn/button';
import { Badge } from '@/shadcn/badge';
import { Card, CardContent } from '@/shadcn/card';
import {
	CheckIcon,
	XIcon,
	ClockIcon,
	CalendarIcon,
	UserIcon,
	DoorOpenIcon,
	Loader2Icon,
} from 'lucide-react';
import { useAdminReservations } from '../hooks/use-admin-reservations';

const statusConfig = {
	PENDING: {
		label: 'Pending',
		className: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30',
		icon: ClockIcon,
	},
	APPROVED: {
		label: 'Approved',
		className: 'bg-green-500/20 text-green-700 border-green-500/30',
		icon: CheckIcon,
	},
	REJECTED: {
		label: 'Rejected',
		className: 'bg-red-500/20 text-red-700 border-red-500/30',
		icon: XIcon,
	},
	CANCELLED: {
		label: 'Cancelled',
		className: 'bg-gray-500/20 text-gray-700 border-gray-500/30',
		icon: XIcon,
	},
};

function formatDate(date: Date | string) {
	const d = new Date(date);
	return d.toLocaleDateString('en-US', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	});
}

function formatTime(date: Date | string) {
	const d = new Date(date);
	return d.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	});
}

interface AdminReservationsPageProps {
	reservations: {
		id: string;
		status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
		purpose: string;
		startTime: string | Date;
		endTime: string | Date;
		room: { name: string };
		user: { name: string; email: string; nim: string | null };
	}[];
	stats: {
		pending: number;
		approved: number;
		rejected: number;
		total: number;
	};
}

export function AdminReservationsPage({
	reservations: initialReservations,
	stats: initialStats,
}: AdminReservationsPageProps) {
	const {
		stats,
		statusFilter,
		setStatusFilter,
		loadingId,
		filteredReservations,
		handleApprove,
		handleReject,
	} = useAdminReservations(initialReservations, initialStats);

	return (
		<div className="space-y-6">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
				<p className="text-muted-foreground">
					Manage and approve room booking requests
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
				className="grid gap-4 sm:grid-cols-4"
			>
				<Card className="bg-yellow-500/10 border-yellow-500/20">
					<CardContent>
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/20">
								<ClockIcon className="h-5 w-5 text-yellow-700" />
							</div>
							<div>
								<p className="text-2xl font-bold">{stats.pending}</p>
								<p className="text-sm text-muted-foreground">Pending</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent>
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20">
								<CheckIcon className="h-5 w-5 text-green-700" />
							</div>
							<div>
								<p className="text-2xl font-bold">{stats.approved}</p>
								<p className="text-sm text-muted-foreground">Approved</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent>
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20">
								<XIcon className="h-5 w-5 text-red-700" />
							</div>
							<div>
								<p className="text-2xl font-bold">{stats.rejected}</p>
								<p className="text-sm text-muted-foreground">Rejected</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent>
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
								<CalendarIcon className="h-5 w-5 text-primary" />
							</div>
							<div>
								<p className="text-2xl font-bold">{stats.total}</p>
								<p className="text-sm text-muted-foreground">Total</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.15 }}
				className="flex gap-2"
			>
				{['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((status) => (
					<Button
						key={status}
						variant={statusFilter === status ? 'default' : 'outline'}
						size="sm"
						onClick={() => setStatusFilter(status)}
					>
						{status === 'ALL'
							? 'All'
							: statusConfig[status as keyof typeof statusConfig]?.label ||
								status}
					</Button>
				))}
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="space-y-4"
			>
				{filteredReservations.map((reservation, index) => {
					const status =
						statusConfig[reservation.status as keyof typeof statusConfig];
					const StatusIcon = status?.icon || ClockIcon;
					const isLoading = loadingId === reservation.id;

					return (
						<motion.div
							key={reservation.id}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.4, delay: index * 0.03 }}
						>
							<Card className="overflow-hidden">
								<CardContent className="p-0">
									<div className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
										<div className="flex-1 space-y-3">
											<div className="flex items-start gap-3">
												<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
													<UserIcon className="h-5 w-5 text-primary" />
												</div>
												<div>
													<p className="font-semibold">
														{reservation.user.name}
													</p>
													<p className="text-sm text-muted-foreground">
														{reservation.user.nim || 'N/A'} •{' '}
														{reservation.user.email}
													</p>
												</div>
											</div>

											<div className="rounded-lg bg-muted/50 p-3">
												<p className="font-medium">{reservation.purpose}</p>
												<div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
													<span className="flex items-center gap-1">
														<DoorOpenIcon className="h-4 w-4" />
														{reservation.room.name}
													</span>
													<span className="flex items-center gap-1">
														<CalendarIcon className="h-4 w-4" />
														{formatDate(reservation.startTime)}
													</span>
													<span className="flex items-center gap-1">
														<ClockIcon className="h-4 w-4" />
														{formatTime(reservation.startTime)} -{' '}
														{formatTime(reservation.endTime)}
													</span>
												</div>
											</div>
										</div>

										<div className="flex flex-col items-end gap-3">
											<Badge className={status?.className}>
												<StatusIcon className="mr-1 h-3 w-3" />
												{status?.label}
											</Badge>

											{reservation.status === 'PENDING' && (
												<div className="flex gap-2">
													<Button
														size="sm"
														variant="outline"
														className="text-red-600 hover:bg-red-50 hover:text-red-700"
														onClick={() => handleReject(reservation.id)}
														disabled={isLoading}
													>
														{isLoading ? (
															<Loader2Icon className="h-4 w-4 animate-spin" />
														) : (
															<>
																<XIcon className="mr-1.5 h-4 w-4" />
																Reject
															</>
														)}
													</Button>
													<Button
														size="sm"
														className="bg-green-600 hover:bg-green-700"
														onClick={() => handleApprove(reservation.id)}
														disabled={isLoading}
													>
														{isLoading ? (
															<Loader2Icon className="h-4 w-4 animate-spin" />
														) : (
															<>
																<CheckIcon className="mr-1.5 h-4 w-4" />
																Approve
															</>
														)}
													</Button>
												</div>
											)}
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					);
				})}

				{filteredReservations.length === 0 && (
					<Card>
						<CardContent className="py-12 text-center">
							<CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
							<p className="mt-4 text-muted-foreground">
								No reservations found
							</p>
						</CardContent>
					</Card>
				)}
			</motion.div>
		</div>
	);
}
