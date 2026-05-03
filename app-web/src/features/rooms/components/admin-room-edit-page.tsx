import type { Room, RoomStatus } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useRouter } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import {
	ArrowLeftIcon,
	Loader2Icon,
	PlusIcon,
	UploadIcon,
	XIcon,
} from 'lucide-react';
import type * as React from 'react';
import { toast } from 'sonner';
import { Badge } from '@/shadcn/badge';
import { Button } from '@/shadcn/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shadcn/card';
import { Field, FieldGroup, FieldLabel } from '@/shadcn/field';
import { Input } from '@/shadcn/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shadcn/select';
import { Textarea } from '@/shadcn/textarea';
import { updateRoomFn } from '../api/rooms.api';
import { deleteRoomImageFn, uploadRoomImageFn } from '../api/upload.api';
import { useRoomForm } from '../hooks/use-room-form';

interface AdminRoomEditPageProps {
	room: Room;
}

export function AdminRoomEditPage({ room }: AdminRoomEditPageProps) {
	const navigate = useNavigate();
	const router = useRouter();
	const queryClient = useQueryClient();
	const {
		isLoading,
		setIsLoading,
		facilities,
		newFacility,
		setNewFacility,
		addFacility,
		removeFacility,
		imagePreview,
		imageFile,
		handleImageChange,
		removeImage,
	} = useRoomForm(room.facilities, room.image);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		const formData = new FormData(e.currentTarget);

		try {
			let imageUrl: string | null | undefined;

			// If user selected a new image
			if (imageFile) {
				// Delete old image from R2 if exists
				if (room.image) {
					try {
						await deleteRoomImageFn({ data: { imageUrl: room.image } });
					} catch {
						// Ignore deletion errors
					}
				}

				const base64 = await fileToBase64(imageFile);
				const result = await uploadRoomImageFn({
					data: {
						base64,
						fileName: imageFile.name,
						contentType: imageFile.type,
					},
				});
				imageUrl = result.url;
			} else if (!imagePreview && room.image) {
				// User removed the existing image
				try {
					await deleteRoomImageFn({ data: { imageUrl: room.image } });
				} catch {
					// Ignore deletion errors
				}
				imageUrl = null;
			}

			const data = {
				name: formData.get('name') as string,
				capacity: parseInt(formData.get('capacity') as string, 10),
				location: formData.get('location') as string,
				description: formData.get('description') as string,
				status: formData.get('status') as RoomStatus,
				facilities,
				...(imageUrl !== undefined && { image: imageUrl }),
			};

			await updateRoomFn({ data: { id: room.id, data } });
			toast.success('Room updated successfully');
			queryClient.invalidateQueries({ queryKey: ['rooms'] });
			await router.invalidate();
			navigate({ to: '/admin/rooms' });
		} catch (error) {
			console.error('Failed to update room:', error);
			toast.error('Failed to update room');
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
					<h1 className="text-3xl font-bold tracking-tight">Edit Room</h1>
					<p className="text-muted-foreground">
						Update room information • Room: {room.name}
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
						<CardDescription>Update the room information below</CardDescription>
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
											defaultValue={room.name}
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
											defaultValue={room.capacity}
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
											defaultValue={room.location || ''}
											placeholder="e.g., Gedung F, Lantai 1"
										/>
									</Field>

									<Field>
										<FieldLabel htmlFor="status">Status *</FieldLabel>
										<Select name="status" defaultValue={room.status}>
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
									<FieldLabel>Room Image</FieldLabel>
									<div className="space-y-3">
										{imagePreview ? (
											<div className="relative group w-full max-w-sm">
												<img
													src={imagePreview}
													alt="Room preview"
													className="w-full h-48 object-cover rounded-lg border"
												/>
												<div className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/20 transition-colors" />
												<button
													type="button"
													onClick={removeImage}
													className="absolute top-2 right-2 rounded-full bg-destructive p-1.5 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
												>
													<XIcon className="h-4 w-4" />
												</button>
												<label
													htmlFor="image-upload"
													className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-background p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md border"
												>
													<UploadIcon className="h-4 w-4" />
												</label>
											</div>
										) : (
											<label
												htmlFor="image-upload"
												className="flex h-48 max-w-sm cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/10 transition-colors hover:border-primary/50 hover:bg-muted/20"
											>
												<UploadIcon className="mb-2 h-8 w-8 text-muted-foreground/50" />
												<span className="text-sm font-medium text-muted-foreground">
													Click to upload image
												</span>
												<span className="mt-1 text-xs text-muted-foreground/70">
													PNG, JPG, WebP up to 5MB
												</span>
											</label>
										)}
										<input
											id="image-upload"
											type="file"
											accept="image/png,image/jpeg,image/webp"
											onChange={handleImageChange}
											className="hidden"
										/>
									</div>
								</Field>

								<Field>
									<FieldLabel htmlFor="description">Description</FieldLabel>
									<Textarea
										id="description"
										name="description"
										defaultValue={room.description || ''}
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
											Updating...
										</>
									) : (
										'Update Room'
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

function fileToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result as string;
			const base64 = result.split(',')[1];
			resolve(base64);
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}
