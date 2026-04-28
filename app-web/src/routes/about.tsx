import { createFileRoute } from '@tanstack/react-router';
import { getPublicStatsFn } from '@/features/dashboard/api/dashboard.api';
import { getRoomStatsFn } from '@/features/rooms/api/rooms.api';
import { AboutPage } from '@/features/landing/components/about-page';

export const Route = createFileRoute('/about')({
	loader: async () => {
		const [publicStats, roomStats] = await Promise.all([
			getPublicStatsFn(),
			getRoomStatsFn(),
		]);
		return { publicStats, roomStats };
	},
	component: AboutRoute,
});

function AboutRoute() {
	const data = Route.useLoaderData();
	return <AboutPage {...data} />;
}
