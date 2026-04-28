import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';
import { DashboardLayout } from '@/features/dashboard/components/dashboard-layout';

export const Route = createFileRoute('/_authenticated')({
	beforeLoad: async () => {
		if (typeof window !== 'undefined') {
			const storedUser = localStorage.getItem('user');
			if (!storedUser) {
				throw redirect({ to: '/login' });
			}
			try {
				const user = JSON.parse(storedUser);
				return { user };
			} catch {
				localStorage.removeItem('user');
				throw redirect({ to: '/login' });
			}
		}

		return { user: null };
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
