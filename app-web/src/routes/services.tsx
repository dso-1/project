import { createFileRoute } from '@tanstack/react-router';
import { ServicesPage } from '@/features/landing/components/services-page';

export const Route = createFileRoute('/services')({
	component: ServicesRoute,
});

function ServicesRoute() {
	return <ServicesPage />;
}
