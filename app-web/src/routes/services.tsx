import { createFileRoute } from '@tanstack/react-router';
import {
	getAvailableRoomsFn,
	getRoomStatsFn,
} from '@/features/rooms/api/rooms.api';
import { ServicesPage } from '@/features/landing/components/services-page';

export const Route = createFileRoute('/services')({
	loader: async () => {
		const [rooms, stats] = await Promise.all([
			getAvailableRoomsFn(),
			getRoomStatsFn(),
		]);
		return { rooms, stats };
	},
	component: ServicesRoute,
});

function ServicesRoute() {
	const data = Route.useLoaderData();
	return <ServicesPage {...data} />;
}
