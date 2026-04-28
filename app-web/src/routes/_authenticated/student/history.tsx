import { createFileRoute } from '@tanstack/react-router';
import { getUserReservationsFn } from '@/features/reservations/api/reservations.api';
import { StudentHistoryPage } from '@/features/reservations/components/student-history-page';

export const Route = createFileRoute('/_authenticated/student/history')({
	loader: async ({ context }) => {
		const reservations = await getUserReservationsFn({
			data: context.user.id,
		});
		return { reservations };
	},
	component: StudentHistoryRoute,
});

function StudentHistoryRoute() {
	const { reservations } = Route.useLoaderData();
	return <StudentHistoryPage reservations={reservations} />;
}
