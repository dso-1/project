import { TanStackDevtools } from '@tanstack/react-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import type * as React from 'react';
import { AuthProvider } from '@/features/auth/hooks/use-auth';
import { getQueryClient } from '@/shared/lib/query-client';

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
	return (
		<AuthProvider>
			<SmoothScroll />
			<Toaster richColors={true} />
			<Outlet />
		</AuthProvider>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient();

	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="min-h-screen bg-background antialiased">
				<QueryClientProvider client={queryClient}>
					{children}
					<ScrollRestoration />
					{process.env.NODE_ENV === 'development' && (
						<TanStackDevtools
							config={{
								position: 'bottom-right',
							}}
							plugins={[
								{
									name: 'Tanstack Query',
									render: <ReactQueryDevtoolsPanel />,
								},
								{
									name: 'Tanstack Router',
									render: <TanStackRouterDevtoolsPanel />,
								},
							]}
						/>
					)}
					<Scripts />
				</QueryClientProvider>
			</body>
		</html>
	);
}
