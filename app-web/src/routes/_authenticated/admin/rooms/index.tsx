import { createFileRoute } from '@tanstack/react-router';
import { AdminRoomsPage } from '@/features/rooms/components/admin-rooms-page';

export const Route = createFileRoute('/_authenticated/admin/rooms/')({
	component: AdminRoomsPage,
});
