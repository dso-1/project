import { createFileRoute } from '@tanstack/react-router';
import {
	getDashboardStatsFn,
	getRecentActivityFn,
} from '@/features/dashboard/api/dashboard.api';
import { getRoomStatsFn } from '@/features/rooms/api/rooms.api';
import { AdminDashboardPage } from '@/features/dashboard/components/admin-dashboard-page';

export const Route = createFileRoute('/_authenticated/admin/')({
	loader: async () => {
		const [dashboardStats, roomStats, recentActivity] = await Promise.all([
			getDashboardStatsFn(),
			getRoomStatsFn(),
			getRecentActivityFn(),
		]);
		return { dashboardStats, roomStats, recentActivity };
	},
	component: AdminDashboardRoute,
});

function AdminDashboardRoute() {
	const { dashboardStats, roomStats, recentActivity } = Route.useLoaderData();
	return (
		<AdminDashboardPage
			dashboardStats={dashboardStats}
			roomStats={roomStats}
			recentActivity={recentActivity}
		/>
	);
}
