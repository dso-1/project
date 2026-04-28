import * as React from 'react';
import { useRouter } from '@tanstack/react-router';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { createReservationFn } from '@/features/reservations/api/reservations.api';

interface Room {
	id: string;
	name: string;
}

interface UseBookingFormProps {
	isOpen: boolean;
	onClose: () => void;
	room: Room | null;
}

export function useBookingForm({ isOpen, onClose, room }: UseBookingFormProps) {
	const { user } = useAuth();
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const [formData, setFormData] = React.useState({
		date: '',
		startTime: '',
		endTime: '',
		purpose: '',
	});

	React.useEffect(() => {
		if (isOpen) {
			setFormData({
				date: new Date().toISOString().split('T')[0],
				startTime: '09:00',
				endTime: '11:00',
				purpose: '',
			});
			setError(null);
		}
	}, [isOpen]);

	const updateField = (field: keyof typeof formData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!user || !room) return;

		setIsSubmitting(true);
		setError(null);

		try {
			const startDateTime = new Date(
				`${formData.date}T${formData.startTime}:00`,
			);
			const endDateTime = new Date(`${formData.date}T${formData.endTime}:00`);

			const res = await createReservationFn({
				data: {
					userId: user.id,
					roomId: room.id,
					startTime: startDateTime.toISOString(),
					endTime: endDateTime.toISOString(),
					purpose: formData.purpose,
				},
			});

			if (res.success) {
				alert('Booking successful!');
				router.invalidate();
				onClose();
			} else {
				setError(res.error || 'Failed to create reservation');
			}
		} catch (err) {
			setError('An error occurred. Please try again.');
			console.error(err);
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		formData,
		updateField,
		isSubmitting,
		error,
		handleSubmit,
	};
}
