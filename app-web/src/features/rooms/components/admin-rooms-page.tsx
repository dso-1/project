import type * as React from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Button } from '@/shadcn/button';
import { Badge } from '@/shadcn/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shadcn/card';
import {
	TrashIcon,
	UsersIcon,
	SearchIcon,
	DoorOpenIcon,
	PlusIcon,
	PencilIcon,
} from 'lucide-react';
import { Input } from '@/shadcn/input';
import { useAdminRooms } from '../hooks/use-admin-rooms'; // Import hook

const statusConfig = {
	AVAILABLE: {
		label: 'Available',
		className: 'bg-green-500/20 text-green-700 border-green-500/30',
	},
	MAINTENANCE: {
		label: 'Maintenance',
		className: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30',
	},
	UNAVAILABLE: {
		label: 'Unavailable',
		className: 'bg-red-500/20 text-red-700 border-red-500/30',
	},
};

export function AdminRoomsPage() {
	const {
		searchQuery,
		setSearchQuery,
		statusFilter,
		setStatusFilter,
		filteredRooms,
		handleDelete,
	} = useAdminRooms();

	return (
		<div className="space-y-6">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
			>
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Room Management</h1>
					<p className="text-muted-foreground">
						Manage all rooms and their availability
					</p>
				</div>
				<Link to="/admin/rooms/create">
					<Button className="gap-2">
						<PlusIcon className="h-4 w-4" />
						Add New Room
					</Button>
				</Link>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				<Card>
					<CardContent className="pt-6">
						<div className="flex flex-col gap-4 sm:flex-row">
							<div className="relative flex-1">
								<SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									placeholder="Search rooms..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="pl-10"
								/>
							</div>
							<div className="flex gap-2">
								{['ALL', 'AVAILABLE', 'MAINTENANCE', 'UNAVAILABLE'].map(
									(status) => (
										<Button
											key={status}
											variant={statusFilter === status ? 'default' : 'outline'}
											size="sm"
											onClick={() => setStatusFilter(status)}
											className="text-xs"
										>
											{status === 'ALL'
												? 'All'
												: statusConfig[status as keyof typeof statusConfig]
														?.label || status}
										</Button>
									),
								)}
							</div>
						</div>
					</CardContent>
				</Card>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<Card>
					<CardHeader>
						<CardTitle>All Rooms</CardTitle>
						<CardDescription>
							{filteredRooms.length} room{filteredRooms.length !== 1 && 's'}{' '}
							found
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b text-left text-sm text-muted-foreground">
										<th className="pb-3 font-medium">Room</th>
										<th className="pb-3 font-medium">Location</th>
										<th className="pb-3 font-medium">Capacity</th>
										<th className="pb-3 font-medium">Facilities</th>
										<th className="pb-3 font-medium">Status</th>
										<th className="pb-3 text-right font-medium">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y">
									{filteredRooms.map((room, index) => {
										const status =
											statusConfig[room.status as keyof typeof statusConfig];
										return (
											<motion.tr
												key={room.id}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ duration: 0.4, delay: index * 0.05 }}
												className="group"
											>
												<td className="py-4">
													<div className="flex items-center gap-3">
														<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-primary/20 to-primary/5">
															<DoorOpenIcon className="h-5 w-5 text-primary" />
														</div>
														<div>
															<p className="font-medium">{room.name}</p>
															<p className="text-xs text-muted-foreground">
																ID: {room.id}
															</p>
														</div>
													</div>
												</td>
												<td className="py-4">
													<span className="text-sm">{room.location}</span>
												</td>
												<td className="py-4">
													<div className="flex items-center gap-1.5 text-sm">
														<UsersIcon className="h-4 w-4 text-muted-foreground" />
														{room.capacity}
													</div>
												</td>
												<td className="py-4">
													<div className="flex flex-wrap gap-1">
														{room.facilities.slice(0, 2).map((facility) => (
															<Badge
																key={facility}
																variant="outline"
																className="text-xs"
															>
																{facility}
															</Badge>
														))}
														{room.facilities.length > 2 && (
															<Badge variant="outline" className="text-xs">
																+{room.facilities.length - 2}
															</Badge>
														)}
													</div>
												</td>
												<td className="py-4">
													<Badge className={status.className}>
														{status.label}
													</Badge>
												</td>
												<td className="py-4">
													<div className="flex justify-end gap-2">
														<Link
															to="/admin/rooms/$roomId/edit"
															params={{ roomId: room.id }}
														>
															<Button variant="ghost" size="icon">
																<PencilIcon className="h-4 w-4" />
															</Button>
														</Link>
														<Button
															variant="ghost"
															size="icon"
															className="text-destructive hover:text-destructive"
															onClick={() => handleDelete(room.id)}
														>
															<TrashIcon className="h-4 w-4" />
														</Button>
													</div>
												</td>
											</motion.tr>
										);
									})}
								</tbody>
							</table>

							{filteredRooms.length === 0 && (
								<div className="py-12 text-center">
									<DoorOpenIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
									<p className="mt-4 text-muted-foreground">No rooms found</p>
									<p className="text-sm text-muted-foreground">
										Try adjusting your search or filters
									</p>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}
