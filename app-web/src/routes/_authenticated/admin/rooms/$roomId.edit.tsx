import { createFileRoute, useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { AdminRoomEditPage } from '@/features/rooms/components/admin-room-edit-page';
import { getRoomByIdFn } from '@/features/rooms/api/rooms.api';
import { Card, CardContent, CardHeader } from '@/shadcn/card';
import { PageErrorFallback } from '@/shared/components/page-error-fallback';

export const Route = createFileRoute(
	'/_authenticated/admin/rooms/$roomId/edit',
)({
	component: EditRoomRoute,
});

function EditRoomRoute() {
	const { roomId } = useParams({ from: '/_authenticated/admin/rooms/$roomId/edit' });
	const roomQuery = useQuery({
		queryKey: ['admin-room', roomId],
		queryFn: () => getRoomByIdFn({ data: roomId }),
	});

	if (roomQuery.isPending) {
		return <EditRoomSkeleton />;
	}

	if (roomQuery.isError) {
		return (
			<PageErrorFallback
				title="Detail ruangan belum dapat dimuat"
				description="Data ruangan gagal diambil. Anda bisa mencoba lagi tanpa keluar dari halaman ini."
				onRetry={() => roomQuery.refetch()}
			/>
		);
	}

	if (!roomQuery.data) {
		return (
			<PageErrorFallback
				title="Ruangan tidak ditemukan"
				description="Data ruangan yang Anda buka tidak tersedia atau sudah dihapus."
			/>
		);
	}

	return <AdminRoomEditPage room={roomQuery.data} />;
}

function EditRoomSkeleton() {
	return (
		<div className="space-y-6">
			<div className="flex items-center gap-4">
				<div className="h-10 w-10 animate-pulse rounded bg-muted" />
				<div className="space-y-2">
					<div className="h-9 w-40 animate-pulse rounded bg-muted" />
					<div className="h-5 w-64 animate-pulse rounded bg-muted" />
				</div>
			</div>
			<Card>
				<CardHeader className="space-y-3">
					<div className="h-5 w-32 animate-pulse rounded bg-muted" />
					<div className="h-4 w-48 animate-pulse rounded bg-muted" />
				</CardHeader>
				<CardContent className="space-y-4">
					{Array.from({ length: 8 }).map((_, index) => (
						<div
							key={index.toString()}
							className="h-12 animate-pulse rounded bg-muted"
						/>
					))}
				</CardContent>
			</Card>
		</div>
	);
}
