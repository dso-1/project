import { createFileRoute } from '@tanstack/react-router';
import { useQueries } from '@tanstack/react-query';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { StudentDashboardPage } from '@/features/dashboard/components/student-dashboard-page';
import {
	getUserReservationsFn,
	getUserStatsFn,
} from '@/features/reservations/api/reservations.api';
import { Card, CardContent, CardHeader } from '@/shadcn/card';
import { PageErrorFallback } from '@/shared/components/page-error-fallback';

export const Route = createFileRoute('/_authenticated/student/')({
	component: StudentDashboardRoute,
});

function StudentDashboardRoute() {
	const { user, isLoading: isAuthLoading } = useAuth();
	const [statsQuery, reservationsQuery] = useQueries({
		queries: [
			{
				queryKey: ['student-dashboard', user?.id, 'stats'],
				queryFn: () => getUserStatsFn({ data: user!.id }),
				enabled: !!user?.id,
			},
			{
				queryKey: ['student-dashboard', user?.id, 'reservations'],
				queryFn: () => getUserReservationsFn({ data: user!.id }),
				enabled: !!user?.id,
			},
		],
	});

	if (isAuthLoading || statsQuery.isPending || reservationsQuery.isPending) {
		return <StudentDashboardSkeleton />;
	}

	if (!user) {
		return (
			<PageErrorFallback
				title="Sesi pengguna belum tersedia"
				description="Informasi akun tidak ditemukan. Silakan masuk ulang untuk melanjutkan."
			/>
		);
	}

	if (
		statsQuery.isError ||
		reservationsQuery.isError ||
		!statsQuery.data ||
		!reservationsQuery.data
	) {
		return (
			<PageErrorFallback
				title="Dashboard mahasiswa belum dapat dimuat"
				description="Data dashboard gagal diambil. Halaman tetap terbuka dan bisa dicoba lagi."
				onRetry={() => {
					statsQuery.refetch();
					reservationsQuery.refetch();
				}}
			/>
		);
	}

	return (
		<StudentDashboardPage
			stats={statsQuery.data}
			reservations={reservationsQuery.data}
		/>
	);
}

function StudentDashboardSkeleton() {
	return (
		<div className="space-y-8">
			<div className="space-y-2">
				<div className="h-9 w-56 animate-pulse rounded bg-muted" />
				<div className="h-5 w-72 animate-pulse rounded bg-muted" />
			</div>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 3 }).map((_, index) => (
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
						<CardContent className="h-64 animate-pulse" />
					</Card>
				))}
			</div>
		</div>
	);
}
