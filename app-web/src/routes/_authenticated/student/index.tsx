import { createFileRoute, redirect } from '@tanstack/react-router';
import {
	getUserStatsFn,
	getUserReservationsFn,
} from '@/features/reservations/api/reservations.api';
import { StudentDashboardPage } from '@/features/dashboard/components/student-dashboard-page';

export const Route = createFileRoute('/_authenticated/student/')({
	loader: async ({ context }) => {
		if (!context.user) {
			throw redirect({ to: '/login' });
		}
		const [stats, reservations] = await Promise.all([
			getUserStatsFn({ data: context.user.id }),
			getUserReservationsFn({ data: context.user.id }),
		]);
		return { stats, reservations };
	},
	component: StudentDashboardRoute,
});

function StudentDashboardRoute() {
	const { stats, reservations } = Route.useLoaderData();
	return <StudentDashboardPage stats={stats} reservations={reservations} />;
}
