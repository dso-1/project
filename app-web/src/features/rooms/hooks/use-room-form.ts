import * as React from 'react';
import { toast } from 'sonner';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

export function useRoomForm(
	initialFacilities: string[] = [],
	initialImage?: string | null,
) {
	const [isLoading, setIsLoading] = React.useState(false);
	const [facilities, setFacilities] =
		React.useState<string[]>(initialFacilities);
	const [newFacility, setNewFacility] = React.useState('');
	const [imageFile, setImageFile] = React.useState<File | null>(null);
	const [imagePreview, setImagePreview] = React.useState<string | null>(
		initialImage || null,
	);

	const addFacility = () => {
		if (newFacility.trim() && !facilities.includes(newFacility.trim())) {
			setFacilities([...facilities, newFacility.trim()]);
			setNewFacility('');
		}
	};

	const removeFacility = (facility: string) => {
		setFacilities(facilities.filter((f) => f !== facility));
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!ALLOWED_TYPES.includes(file.type)) {
			toast.error('Invalid file type. Please upload PNG, JPG, or WebP.');
			return;
		}

		if (file.size > MAX_FILE_SIZE) {
			toast.error('File too large. Maximum size is 5MB.');
			return;
		}

		setImageFile(file);
		const url = URL.createObjectURL(file);
		setImagePreview(url);
	};

	const removeImage = () => {
		setImageFile(null);
		setImagePreview(null);
	};

	// Cleanup object URL on unmount
	React.useEffect(() => {
		return () => {
			if (imagePreview && imagePreview.startsWith('blob:')) {
				URL.revokeObjectURL(imagePreview);
			}
		};
	}, [imagePreview]);

	return {
		isLoading,
		setIsLoading,
		facilities,
		newFacility,
		setNewFacility,
		addFacility,
		removeFacility,
		imageFile,
		imagePreview,
		handleImageChange,
		removeImage,
	};
}
