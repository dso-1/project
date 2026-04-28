import { createFileRoute } from '@tanstack/react-router';
import { getAvailableRoomsFn } from '@/features/rooms/api/rooms.api';
import { StudentRoomsPage } from '@/features/rooms/components/student-rooms-page';

export const Route = createFileRoute('/_authenticated/student/rooms')({
	loader: async () => {
		const rooms = await getAvailableRoomsFn();
		return { rooms };
	},
	component: StudentRoomsRoute,
});

function StudentRoomsRoute() {
	const { rooms } = Route.useLoaderData();
	return <StudentRoomsPage rooms={rooms} />;
}
