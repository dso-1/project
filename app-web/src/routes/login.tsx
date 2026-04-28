import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '@/features/auth/components/login-page';
import { redirectIfLoggedIn } from '@/shared/middleware/auth';

export const Route = createFileRoute('/login')({
	beforeLoad: async () => {
		await redirectIfLoggedIn();
	},
	component: LoginPage,
});
