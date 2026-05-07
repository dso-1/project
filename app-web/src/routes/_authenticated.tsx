import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { DashboardLayout } from '@/features/dashboard/components/dashboard-layout';
import { getSessionFn } from '@/features/auth/api/auth.server';

export const Route = createFileRoute('/_authenticated')({
	beforeLoad: async () => {
		try {
			const session = await getSessionFn();
			if (!session.isValid) {
				throw redirect({ to: '/login' });
			}
			return { user: session.user };
		} catch (e) {
			if (e instanceof Response || (e as { _isRedirect?: boolean })?._isRedirect) {
				throw e;
			}
			throw redirect({ to: '/login' });
		}
	},
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	return (
		<DashboardLayout>
			<Outlet />
		</DashboardLayout>
	);
}
