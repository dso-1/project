import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { getUserReservationsFn } from '@/features/reservations/api/reservations.api';
import { StudentHistoryPage } from '@/features/reservations/components/student-history-page';
import { Card, CardContent } from '@/shadcn/card';
import { PageErrorFallback } from '@/shared/components/page-error-fallback';

export const Route = createFileRoute('/_authenticated/student/history')({
	component: StudentHistoryRoute,
});

function StudentHistoryRoute() {
	const { user, isLoading: isAuthLoading } = useAuth();
	const reservationsQuery = useQuery({
		queryKey: ['student-history', user?.id],
		queryFn: () => getUserReservationsFn({ data: user!.id }),
		enabled: !!user?.id,
	});

	if (isAuthLoading || reservationsQuery.isPending) {
		return <StudentHistorySkeleton />;
	}

	if (!user) {
		return (
			<PageErrorFallback
				title="Sesi pengguna belum tersedia"
				description="Informasi akun tidak ditemukan. Silakan masuk ulang untuk melihat histori booking."
			/>
		);
	}

	if (reservationsQuery.isError || !reservationsQuery.data) {
		return (
			<PageErrorFallback
				title="Histori booking belum dapat dimuat"
				description="Data histori gagal diambil. Halaman tetap terbuka dan bisa dicoba lagi."
				onRetry={() => reservationsQuery.refetch()}
			/>
		);
	}

	return <StudentHistoryPage reservations={reservationsQuery.data} />;
}

function StudentHistorySkeleton() {
	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<div className="h-9 w-56 animate-pulse rounded bg-muted" />
				<div className="h-5 w-72 animate-pulse rounded bg-muted" />
			</div>
			<div className="grid gap-4 sm:grid-cols-4">
				{Array.from({ length: 4 }).map((_, index) => (
					<Card key={index.toString()}>
						<CardContent className="h-24 animate-pulse" />
					</Card>
				))}
			</div>
			<div className="flex gap-2">
				{Array.from({ length: 5 }).map((_, index) => (
					<div
						key={index.toString()}
						className="h-9 w-24 animate-pulse rounded bg-muted"
					/>
				))}
			</div>
			<div className="space-y-4">
				{Array.from({ length: 4 }).map((_, index) => (
					<Card key={index.toString()}>
						<CardContent className="h-32 animate-pulse" />
					</Card>
				))}
			</div>
		</div>
	);
}
