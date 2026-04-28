import { createFileRoute } from '@tanstack/react-router';
import {
	getReservationsFn,
	getReservationStatsFn,
} from '@/features/reservations/api/reservations.api';
import { AdminReservationsPage } from '@/features/reservations/components/admin-reservations-page';

export const Route = createFileRoute('/_authenticated/admin/reservations')({
	loader: async () => {
		const [reservations, stats] = await Promise.all([
			getReservationsFn(),
			getReservationStatsFn(),
		]);
		return { reservations, stats };
	},
	component: AdminReservationsRoute,
});

function AdminReservationsRoute() {
	const { reservations, stats } = Route.useLoaderData();
	return <AdminReservationsPage reservations={reservations} stats={stats} />;
}
