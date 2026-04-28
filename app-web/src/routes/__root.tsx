import * as React from 'react';
import {
	HeadContent,
	Scripts,
	createRootRoute,
	Outlet,
	ScrollRestoration,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from '@/shared/lib/query-client';
import { AuthProvider } from '@/features/auth/hooks/use-auth';

import appCss from '@/shared/styles/globals.css?url';

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				title: 'Go Reserve - FILKOM UB Room Reservation',
			},
			{
				name: 'description',
				content:
					'Room reservation system for Faculty of Computer Science, Universitas Brawijaya',
			},
		],
		links: [
			{
				rel: 'stylesheet',
				href: appCss,
			},
		],
	}),

	component: RootComponent,
	shellComponent: RootDocument,
});

import { SmoothScroll } from '@/shared/components/smooth-scroll';

import { Toaster } from '@/shared/components/ui/shadcn/sonner';

function RootComponent() {
	const queryClient = getQueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<SmoothScroll />
				<Toaster richColors={true} />
				<Outlet />
			</AuthProvider>
		</QueryClientProvider>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="min-h-screen bg-background antialiased">
				{children}
				<ScrollRestoration />
				{process.env.NODE_ENV === 'development' && (
					<TanStackDevtools
						config={{
							position: 'bottom-right',
						}}
						plugins={[
							{
								name: 'Tanstack Router',
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
				)}
				<Scripts />
			</body>
		</html>
	);
}
