import { createFileRoute } from '@tanstack/react-router';
import { useQueries } from '@tanstack/react-query';
import {
	getReservationStatsFn,
	getReservationsFn,
} from '@/features/reservations/api/reservations.api';
import { AdminReservationsPage } from '@/features/reservations/components/admin-reservations-page';
import { Card, CardContent } from '@/shadcn/card';
import { PageErrorFallback } from '@/shared/components/page-error-fallback';

export const Route = createFileRoute('/_authenticated/admin/reservations')({
	component: AdminReservationsRoute,
});

function AdminReservationsRoute() {
	const [reservationsQuery, statsQuery] = useQueries({
		queries: [
			{
				queryKey: ['admin-reservations', 'list'],
				queryFn: () => getReservationsFn(),
			},
			{
				queryKey: ['admin-reservations', 'stats'],
				queryFn: () => getReservationStatsFn(),
			},
		],
	});

	if (reservationsQuery.isPending || statsQuery.isPending) {
		return <AdminReservationsSkeleton />;
	}

	if (
		reservationsQuery.isError ||
		statsQuery.isError ||
		!reservationsQuery.data ||
		!statsQuery.data
	) {
		return (
			<PageErrorFallback
				title="Data reservasi belum dapat dimuat"
				description="Daftar reservasi atau statistik gagal diambil. Anda bisa mencoba memuat ulang section ini."
				onRetry={() => {
					reservationsQuery.refetch();
					statsQuery.refetch();
				}}
			/>
		);
	}

	return (
		<AdminReservationsPage
			reservations={reservationsQuery.data}
			stats={statsQuery.data}
		/>
	);
}

function AdminReservationsSkeleton() {
	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<div className="h-9 w-56 animate-pulse rounded bg-muted" />
				<div className="h-5 w-72 animate-pulse rounded bg-muted" />
			</div>
			<div className="grid gap-4 sm:grid-cols-4">
				{Array.from({ length: 4 }).map((_, index) => (
					<Card key={index.toString()}>
						<CardContent className="space-y-3 py-6">
							<div className="h-10 w-10 animate-pulse rounded-lg bg-muted" />
							<div className="h-7 w-14 animate-pulse rounded bg-muted" />
							<div className="h-4 w-20 animate-pulse rounded bg-muted" />
						</CardContent>
					</Card>
				))}
			</div>
			<div className="flex gap-2">
				{Array.from({ length: 4 }).map((_, index) => (
					<div
						key={index.toString()}
						className="h-9 w-20 animate-pulse rounded bg-muted"
					/>
				))}
			</div>
			<div className="space-y-4">
				{Array.from({ length: 4 }).map((_, index) => (
					<Card key={index.toString()}>
						<CardContent className="h-36 animate-pulse" />
					</Card>
				))}
			</div>
		</div>
	);
}
