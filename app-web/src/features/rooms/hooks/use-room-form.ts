import * as React from 'react';

export function useRoomForm(initialFacilities: string[] = []) {
	const [isLoading, setIsLoading] = React.useState(false);
	const [facilities, setFacilities] =
		React.useState<string[]>(initialFacilities);
	const [newFacility, setNewFacility] = React.useState('');

	const addFacility = () => {
		if (newFacility.trim() && !facilities.includes(newFacility.trim())) {
			setFacilities([...facilities, newFacility.trim()]);
			setNewFacility('');
		}
	};

	const removeFacility = (facility: string) => {
		setFacilities(facilities.filter((f) => f !== facility));
	};

	return {
		isLoading,
		setIsLoading,
		facilities,
		newFacility,
		setNewFacility,
		addFacility,
		removeFacility,
	};
}
