import * as React from 'react';

export function useContactForm() {
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [submitted, setSubmitted] = React.useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		await new Promise((resolve) => setTimeout(resolve, 1500));

		setIsSubmitting(false);
		setSubmitted(true);
	};

	const resetForm = () => {
		setSubmitted(false);
	};

	return {
		isSubmitting,
		submitted,
		handleSubmit,
		resetForm,
	};
}
