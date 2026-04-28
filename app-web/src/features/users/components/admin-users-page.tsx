import type * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/shadcn/button';
import { Badge } from '@/shadcn/badge';
import { Input } from '@/shadcn/input';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shadcn/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shadcn/dropdown-menu';
import {
	UsersIcon,
	ShieldIcon,
	GraduationCapIcon,
	SearchIcon,
	MoreHorizontalIcon,
	PencilIcon,
	TrashIcon,
	Loader2Icon,
} from 'lucide-react';
import { useAdminUsers } from '../hooks/use-admin-users';

interface AdminUsersPageProps {
	users: {
		id: string;
		name: string;
		email: string;
		nim: string | null;
		role: string;
		createdAt: string | Date;
		_count: { reservations: number };
	}[];
	stats: {
		total: number;
		admins: number;
		students: number;
	};
}

export function AdminUsersPage({
	users: initialUsers,
	stats: initialStats,
}: AdminUsersPageProps) {
	const {
		stats,
		searchQuery,
		setSearchQuery,
		roleFilter,
		setRoleFilter,
		loadingId,
		filteredUsers,
		handleRoleChange,
		handleDelete,
	} = useAdminUsers(initialUsers, initialStats);

	return (
		<div className="space-y-6">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<h1 className="text-3xl font-bold tracking-tight">User Management</h1>
				<p className="text-muted-foreground">
					Manage users and their access roles
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
				className="grid gap-4 sm:grid-cols-3"
			>
				<Card>
					<CardContent>
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
								<UsersIcon className="h-5 w-5 text-primary" />
							</div>
							<div>
								<p className="text-2xl font-bold">{stats.total}</p>
								<p className="text-sm text-muted-foreground">Total Users</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent>
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20">
								<ShieldIcon className="h-5 w-5 text-red-700" />
							</div>
							<div>
								<p className="text-2xl font-bold">{stats.admins}</p>
								<p className="text-sm text-muted-foreground">Administrators</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent>
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
								<GraduationCapIcon className="h-5 w-5 text-blue-700" />
							</div>
							<div>
								<p className="text-2xl font-bold">{stats.students}</p>
								<p className="text-sm text-muted-foreground">Students</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.15 }}
			>
				<Card>
					<CardContent>
						<div className="flex flex-col gap-4 sm:flex-row">
							<div className="relative flex-1">
								<SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									placeholder="Search by name, email, or NIM..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="pl-10"
								/>
							</div>
							<div className="flex gap-2">
								{['ALL', 'ADMIN', 'MAHASISWA'].map((role) => (
									<Button
										key={role}
										variant={roleFilter === role ? 'default' : 'outline'}
										size="sm"
										onClick={() => setRoleFilter(role)}
									>
										{role === 'ALL'
											? 'All'
											: role === 'MAHASISWA'
												? 'Student'
												: 'Admin'}
									</Button>
								))}
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
						<CardTitle>All Users</CardTitle>
						<CardDescription>
							{filteredUsers.length} user{filteredUsers.length !== 1 && 's'}{' '}
							found
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b text-left text-sm text-muted-foreground">
										<th className="pb-3 font-medium">User</th>
										<th className="pb-3 font-medium">NIM</th>
										<th className="pb-3 font-medium">Role</th>
										<th className="pb-3 font-medium">Reservations</th>
										<th className="pb-3 font-medium">Joined</th>
										<th className="pb-3 text-right font-medium">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y">
									{filteredUsers.map((user, index) => {
										const isLoading = loadingId === user.id;

										return (
											<motion.tr
												key={user.id}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ duration: 0.4, delay: index * 0.03 }}
												className="group"
											>
												<td className="py-4">
													<div className="flex items-center gap-3">
														<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
															<span className="text-sm font-medium text-primary">
																{user.name.charAt(0).toUpperCase()}
															</span>
														</div>
														<div>
															<p className="font-medium">{user.name}</p>
															<p className="text-xs text-muted-foreground">
																{user.email}
															</p>
														</div>
													</div>
												</td>
												<td className="py-4">
													<span className="text-sm">{user.nim || '-'}</span>
												</td>
												<td className="py-4">
													<Badge
														className={
															user.role === 'ADMIN'
																? 'bg-red-500/20 text-red-700'
																: 'bg-blue-500/20 text-blue-700'
														}
													>
														{user.role === 'ADMIN' ? (
															<>
																<ShieldIcon className="mr-1 h-3 w-3" />
																Admin
															</>
														) : (
															<>
																<GraduationCapIcon className="mr-1 h-3 w-3" />
																Student
															</>
														)}
													</Badge>
												</td>
												<td className="py-4">
													<span className="text-sm">
														{user._count.reservations}
													</span>
												</td>
												<td className="py-4">
													<span className="text-sm">
														{new Date(user.createdAt).toLocaleDateString()}
													</span>
												</td>
												<td className="py-4">
													<div className="flex justify-end">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	variant="ghost"
																	size="icon"
																	className="h-8 w-8"
																	disabled={isLoading}
																>
																	{isLoading ? (
																		<Loader2Icon className="h-4 w-4 animate-spin" />
																	) : (
																		<MoreHorizontalIcon className="h-4 w-4" />
																	)}
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem
																	onClick={() =>
																		handleRoleChange(
																			user.id,
																			user.role === 'ADMIN'
																				? 'MAHASISWA'
																				: 'ADMIN',
																		)
																	}
																>
																	<PencilIcon className="mr-2 h-4 w-4" />
																	Make{' '}
																	{user.role === 'ADMIN' ? 'Student' : 'Admin'}
																</DropdownMenuItem>
																<DropdownMenuItem
																	onClick={() =>
																		handleDelete(user.id, user.name)
																	}
																	className="text-red-600"
																>
																	<TrashIcon className="mr-2 h-4 w-4" />
																	Delete User
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</div>
												</td>
											</motion.tr>
										);
									})}
								</tbody>
							</table>

							{filteredUsers.length === 0 && (
								<div className="py-12 text-center">
									<UsersIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
									<p className="mt-4 text-muted-foreground">No users found</p>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}
