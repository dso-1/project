import { createFileRoute } from '@tanstack/react-router';
import { AdminRoomCreatePage } from '@/features/rooms/components/admin-room-create-page';

export const Route = createFileRoute('/_authenticated/admin/rooms/create')({
	component: AdminRoomCreatePage,
});
