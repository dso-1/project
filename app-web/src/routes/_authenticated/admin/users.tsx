import { createFileRoute } from '@tanstack/react-router';
import { getUsersFn, getUserStatsFn } from '@/features/users/api/users.api';
import { AdminUsersPage } from '@/features/users/components/admin-users-page';

export const Route = createFileRoute('/_authenticated/admin/users')({
	loader: async () => {
		const [users, stats] = await Promise.all([getUsersFn(), getUserStatsFn()]);
		return { users, stats };
	},
	component: AdminUsersRoute,
});

function AdminUsersRoute() {
	const { users, stats } = Route.useLoaderData();
	return <AdminUsersPage users={users} stats={stats} />;
}
