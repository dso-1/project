import { createFileRoute } from '@tanstack/react-router';
import { useQueries } from '@tanstack/react-query';
import {
	getDashboardStatsFn,
	getRecentActivityFn,
} from '@/features/dashboard/api/dashboard.api';
import { AdminDashboardPage } from '@/features/dashboard/components/admin-dashboard-page';
import { getRoomStatsFn } from '@/features/rooms/api/rooms.api';
import { Card, CardContent, CardHeader } from '@/shadcn/card';
import { PageErrorFallback } from '@/shared/components/page-error-fallback';

export const Route = createFileRoute('/_authenticated/admin/')({
	component: AdminDashboardRoute,
});

function AdminDashboardRoute() {
	const [dashboardStatsQuery, roomStatsQuery, recentActivityQuery] = useQueries({
		queries: [
			{
				queryKey: ['admin-dashboard', 'stats'],
				queryFn: () => getDashboardStatsFn(),
			},
			{
				queryKey: ['admin-dashboard', 'room-stats'],
				queryFn: () => getRoomStatsFn(),
			},
			{
				queryKey: ['admin-dashboard', 'recent-activity'],
				queryFn: () => getRecentActivityFn(),
			},
		],
	});

	const isLoading =
		dashboardStatsQuery.isPending ||
		roomStatsQuery.isPending ||
		recentActivityQuery.isPending;
	const hasError =
		dashboardStatsQuery.isError ||
		roomStatsQuery.isError ||
		recentActivityQuery.isError;
	const retry = () => {
		dashboardStatsQuery.refetch();
		roomStatsQuery.refetch();
		recentActivityQuery.refetch();
	};

	if (isLoading) {
		return <AdminDashboardSkeleton />;
	}

	if (
		hasError ||
		!dashboardStatsQuery.data ||
		!roomStatsQuery.data ||
		!recentActivityQuery.data
	) {
		return (
			<PageErrorFallback
				title="Dashboard admin belum dapat dimuat"
				description="Data dashboard gagal diambil. Halaman tetap terbuka dan Anda bisa mencoba memuat ulang data ini."
				onRetry={retry}
			/>
		);
	}

	return (
		<AdminDashboardPage
			dashboardStats={dashboardStatsQuery.data}
			roomStats={roomStatsQuery.data}
			recentActivity={recentActivityQuery.data}
		/>
	);
}

function AdminDashboardSkeleton() {
	return (
		<div className="space-y-8">
			<div className="space-y-2">
				<div className="h-9 w-64 animate-pulse rounded bg-muted" />
				<div className="h-5 w-80 animate-pulse rounded bg-muted" />
			</div>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: 4 }).map((_, index) => (
					<Card key={index.toString()}>
						<CardHeader className="space-y-3">
							<div className="h-4 w-28 animate-pulse rounded bg-muted" />
							<div className="h-8 w-16 animate-pulse rounded bg-muted" />
							<div className="h-4 w-24 animate-pulse rounded bg-muted" />
						</CardHeader>
					</Card>
				))}
			</div>
			<div className="grid gap-6 lg:grid-cols-2">
				{Array.from({ length: 2 }).map((_, index) => (
					<Card key={index.toString()}>
						<CardHeader className="space-y-3">
							<div className="h-5 w-40 animate-pulse rounded bg-muted" />
							<div className="h-4 w-52 animate-pulse rounded bg-muted" />
						</CardHeader>
						<CardContent className="space-y-4">
							{Array.from({ length: 3 }).map((__, row) => (
								<div
									key={row.toString()}
									className="h-16 animate-pulse rounded bg-muted"
								/>
							))}
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
