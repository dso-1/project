import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getAvailableRoomsFn } from '@/features/rooms/api/rooms.api';
import { StudentRoomsPage } from '@/features/rooms/components/student-rooms-page';
import { Card, CardContent } from '@/shadcn/card';
import { PageErrorFallback } from '@/shared/components/page-error-fallback';

export const Route = createFileRoute('/_authenticated/student/rooms')({
	component: StudentRoomsRoute,
});

function StudentRoomsRoute() {
	const roomsQuery = useQuery({
		queryKey: ['student-rooms', 'available'],
		queryFn: () => getAvailableRoomsFn(),
	});

	if (roomsQuery.isPending) {
		return <StudentRoomsSkeleton />;
	}

	if (roomsQuery.isError || !roomsQuery.data) {
		return (
			<PageErrorFallback
				title="Daftar ruangan belum dapat dimuat"
				description="Data ruangan gagal diambil. Halaman tetap terbuka dan bisa dicoba lagi."
				onRetry={() => roomsQuery.refetch()}
			/>
		);
	}

	return <StudentRoomsPage rooms={roomsQuery.data} />;
}

function StudentRoomsSkeleton() {
	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<div className="h-9 w-52 animate-pulse rounded bg-muted" />
				<div className="h-5 w-72 animate-pulse rounded bg-muted" />
			</div>
			<div className="h-10 w-full max-w-md animate-pulse rounded bg-muted" />
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 6 }).map((_, index) => (
					<Card key={index.toString()}>
						<CardContent className="h-80 animate-pulse" />
					</Card>
				))}
			</div>
		</div>
	);
}
