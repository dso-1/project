import * as React from 'react';
import { Button } from '@/shadcn/button';
import { Input } from '@/shadcn/input';
import { Textarea } from '@/shadcn/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/card';
import { Field, FieldGroup, FieldLabel } from '@/shadcn/field';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shadcn/select';
import { Badge } from '@/shadcn/badge';
import { XIcon, PlusIcon, Loader2Icon } from 'lucide-react';
import type { Room, CreateRoomInput, UpdateRoomInput } from '../types';

interface RoomFormProps {
	room?: Room;
	onSubmit: (data: CreateRoomInput | UpdateRoomInput) => Promise<void>;
	onCancel: () => void;
	isLoading?: boolean;
}

export function RoomForm({
	room,
	onSubmit,
	onCancel,
	isLoading,
}: RoomFormProps) {
	const [facilities, setFacilities] = React.useState<string[]>(
		room?.facilities || [],
	);
	const [newFacility, setNewFacility] = React.useState('');

	const isEditing = !!room;

	const addFacility = () => {
		if (newFacility.trim() && !facilities.includes(newFacility.trim())) {
			setFacilities([...facilities, newFacility.trim()]);
			setNewFacility('');
		}
	};

	const removeFacility = (facility: string) => {
		setFacilities(facilities.filter((f) => f !== facility));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const data: CreateRoomInput = {
			name: formData.get('name') as string,
			capacity: parseInt(formData.get('capacity') as string, 10),
			facilities,
			description: (formData.get('description') as string) || undefined,
			location: (formData.get('location') as string) || undefined,
			image: (formData.get('image') as string) || undefined,
			status:
				(formData.get('status') as
					| 'AVAILABLE'
					| 'MAINTENANCE'
					| 'UNAVAILABLE') || 'AVAILABLE',
		};

		await onSubmit(data);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>{isEditing ? 'Edit Room' : 'Create New Room'}</CardTitle>
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
									defaultValue={room?.name}
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
									defaultValue={room?.capacity}
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
									defaultValue={room?.location || ''}
									placeholder="e.g., Gedung F, Lantai 1"
								/>
							</Field>

							<Field>
								<FieldLabel htmlFor="status">Status *</FieldLabel>
								<Select
									name="status"
									defaultValue={room?.status || 'AVAILABLE'}
								>
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
							<FieldLabel htmlFor="image">Image URL</FieldLabel>
							<Input
								id="image"
								name="image"
								type="url"
								defaultValue={room?.image || ''}
								placeholder="https://example.com/room-image.jpg"
							/>
						</Field>

						<Field>
							<FieldLabel htmlFor="description">Description</FieldLabel>
							<Textarea
								id="description"
								name="description"
								defaultValue={room?.description || ''}
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
								<Button type="button" variant="outline" onClick={addFacility}>
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
												className="rounded-full hover:bg-muted p-0.5"
											>
												<XIcon className="h-3 w-3" />
											</button>
										</Badge>
									))}
								</div>
							)}
						</Field>
					</FieldGroup>

					<div className="flex justify-end gap-3 pt-4 border-t">
						<Button type="button" variant="outline" onClick={onCancel}>
							Cancel
						</Button>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? (
								<>
									<Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
									{isEditing ? 'Updating...' : 'Creating...'}
								</>
							) : isEditing ? (
								'Update Room'
							) : (
								'Create Room'
							)}
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
