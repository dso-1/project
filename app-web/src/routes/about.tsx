import { createFileRoute } from '@tanstack/react-router';
import { AboutPage } from '@/features/landing/components/about-page';

export const Route = createFileRoute('/about')({
	component: AboutRoute,
});

function AboutRoute() {
	return <AboutPage />;
}
