import { createFileRoute } from '@tanstack/react-router';
import { AdminRoomEditPage } from '@/features/rooms/components/admin-room-edit-page';
import { getRoomByIdFn } from '@/features/rooms/api/rooms.api';
import { notFound } from '@tanstack/react-router';

export const Route = createFileRoute(
	'/_authenticated/admin/rooms/$roomId/edit',
)({
	loader: async ({ params: { roomId } }) => {
		const room = await getRoomByIdFn({ data: roomId });
		if (!room) {
			throw notFound();
		}
		return { room };
	},
	component: EditRoomRoute,
});

function EditRoomRoute() {
	const { room } = Route.useLoaderData();
	return <AdminRoomEditPage room={room} />;
}
