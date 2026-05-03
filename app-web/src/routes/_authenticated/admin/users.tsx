import { createFileRoute } from '@tanstack/react-router';
import { useQueries } from '@tanstack/react-query';
import { getUserStatsFn, getUsersFn } from '@/features/users/api/users.api';
import { AdminUsersPage } from '@/features/users/components/admin-users-page';
import { Card, CardContent } from '@/shadcn/card';
import { PageErrorFallback } from '@/shared/components/page-error-fallback';

export const Route = createFileRoute('/_authenticated/admin/users')({
	component: AdminUsersRoute,
});

function AdminUsersRoute() {
	const [usersQuery, statsQuery] = useQueries({
		queries: [
			{
				queryKey: ['admin-users', 'list'],
				queryFn: () => getUsersFn(),
			},
			{
				queryKey: ['admin-users', 'stats'],
				queryFn: () => getUserStatsFn(),
			},
		],
	});

	if (usersQuery.isPending || statsQuery.isPending) {
		return <AdminUsersSkeleton />;
	}

	if (usersQuery.isError || statsQuery.isError || !usersQuery.data || !statsQuery.data) {
		return (
			<PageErrorFallback
				title="Data pengguna belum dapat dimuat"
				description="Daftar pengguna atau statistik gagal diambil. Halaman tetap terbuka dan bisa dicoba lagi."
				onRetry={() => {
					usersQuery.refetch();
					statsQuery.refetch();
				}}
			/>
		);
	}

	return <AdminUsersPage users={usersQuery.data} stats={statsQuery.data} />;
}

function AdminUsersSkeleton() {
	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<div className="h-9 w-64 animate-pulse rounded bg-muted" />
				<div className="h-5 w-72 animate-pulse rounded bg-muted" />
			</div>
			<div className="grid gap-4 sm:grid-cols-3">
				{Array.from({ length: 3 }).map((_, index) => (
					<Card key={index.toString()}>
						<CardContent className="space-y-3 py-6">
							<div className="h-10 w-10 animate-pulse rounded-lg bg-muted" />
							<div className="h-7 w-14 animate-pulse rounded bg-muted" />
							<div className="h-4 w-24 animate-pulse rounded bg-muted" />
						</CardContent>
					</Card>
				))}
			</div>
			<Card>
				<CardContent className="space-y-4 py-6">
					<div className="h-10 w-full animate-pulse rounded bg-muted" />
					<div className="flex gap-2">
						{Array.from({ length: 3 }).map((_, index) => (
							<div
								key={index.toString()}
								className="h-9 w-24 animate-pulse rounded bg-muted"
							/>
						))}
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardContent className="space-y-4 py-6">
					{Array.from({ length: 6 }).map((_, index) => (
						<div
							key={index.toString()}
							className="h-14 animate-pulse rounded bg-muted"
						/>
					))}
				</CardContent>
			</Card>
		</div>
	);
}
