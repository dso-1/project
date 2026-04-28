import type * as React from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Button } from '@/shadcn/button';
import { Input } from '@/shadcn/input';
import { Textarea } from '@/shadcn/textarea';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shadcn/card';
import { Field, FieldGroup, FieldLabel } from '@/shadcn/field';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shadcn/select';
import { Badge } from '@/shadcn/badge';
import { ArrowLeftIcon, PlusIcon, XIcon, Loader2Icon } from 'lucide-react';
import { useRoomForm } from '../hooks/use-room-form';

import { createRoomFn } from '../api/rooms.api';
import { toast } from 'sonner';

export function AdminRoomCreatePage() {
	const navigate = useNavigate();
	const {
		isLoading,
		setIsLoading,
		facilities,
		newFacility,
		setNewFacility,
		addFacility,
		removeFacility,
	} = useRoomForm();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		const formData = new FormData(e.currentTarget);

		const data = {
			name: formData.get('name') as string,
			capacity: parseInt(formData.get('capacity') as string, 10),
			location: formData.get('location') as string,
			description: formData.get('description') as string,
			status: formData.get('status') as any, // Cast locally
			facilities,
		};

		try {
			await createRoomFn({ data });
			toast.success('Room created successfully');
			navigate({ to: '/admin/rooms' });
		} catch (error) {
			console.error('Failed to create room:', error);
			toast.error('Failed to create room');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="flex items-center gap-4"
			>
				<Link to="/admin/rooms">
					<Button variant="ghost" size="icon">
						<ArrowLeftIcon className="h-5 w-5" />
					</Button>
				</Link>
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Create Room</h1>
					<p className="text-muted-foreground">
						Add a new room to the reservation system
					</p>
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				<Card>
					<CardHeader>
						<CardTitle>Room Details</CardTitle>
						<CardDescription>
							Fill in the information below to create a new room
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							<FieldGroup>
								<div className="grid gap-4 sm:grid-cols-2">
									<Field>
										<FieldLabel htmlFor="name">Room Name *</FieldLabel>
										<Input
											id="name"
											name="name"
											placeholder="e.g., Lab Komputer 1"
											required
										/>
									</Field>

									<Field>
										<FieldLabel htmlFor="capacity">Capacity *</FieldLabel>
										<Input
											id="capacity"
											name="capacity"
											type="number"
											min="1"
											placeholder="e.g., 40"
											required
										/>
									</Field>
								</div>

								<div className="grid gap-4 sm:grid-cols-2">
									<Field>
										<FieldLabel htmlFor="location">Location</FieldLabel>
										<Input
											id="location"
											name="location"
											placeholder="e.g., Gedung F, Lantai 1"
										/>
									</Field>

									<Field>
										<FieldLabel htmlFor="status">Status *</FieldLabel>
										<Select name="status" defaultValue="AVAILABLE">
											<SelectTrigger id="status">
												<SelectValue placeholder="Select status" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="AVAILABLE">Available</SelectItem>
												<SelectItem value="MAINTENANCE">Maintenance</SelectItem>
												<SelectItem value="UNAVAILABLE">Unavailable</SelectItem>
											</SelectContent>
										</Select>
									</Field>
								</div>

								<Field>
									<FieldLabel htmlFor="description">Description</FieldLabel>
									<Textarea
										id="description"
										name="description"
										placeholder="Describe the room and its features..."
										rows={3}
									/>
								</Field>

								<Field>
									<FieldLabel>Facilities</FieldLabel>
									<div className="flex gap-2">
										<Input
											value={newFacility}
											onChange={(e) => setNewFacility(e.target.value)}
											placeholder="e.g., Projector"
											onKeyDown={(e) => {
												if (e.key === 'Enter') {
													e.preventDefault();
													addFacility();
												}
											}}
										/>
										<Button
											type="button"
											variant="outline"
											onClick={addFacility}
										>
											<PlusIcon className="h-4 w-4" />
										</Button>
									</div>
									{facilities.length > 0 && (
										<div className="mt-3 flex flex-wrap gap-2">
											{facilities.map((facility) => (
												<Badge
													key={facility}
													variant="secondary"
													className="flex items-center gap-1 pr-1"
												>
													{facility}
													<button
														type="button"
														onClick={() => removeFacility(facility)}
														className="rounded-full p-0.5 hover:bg-muted"
													>
														<XIcon className="h-3 w-3" />
													</button>
												</Badge>
											))}
										</div>
									)}
								</Field>
							</FieldGroup>

							<div className="flex justify-end gap-3 border-t pt-6">
								<Link to="/admin/rooms">
									<Button type="button" variant="outline">
										Cancel
									</Button>
								</Link>
								<Button type="submit" disabled={isLoading}>
									{isLoading ? (
										<>
											<Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
											Creating...
										</>
									) : (
										'Create Room'
									)}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}
