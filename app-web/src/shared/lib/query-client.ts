import { QueryClient } from '@tanstack/react-query';

export function createQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
				gcTime: 5 * 60 * 1000,
				retry: 1,
				refetchOnWindowFocus: false,
			},
			mutations: {
				retry: 0,
			},
		},
	});
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
	if (typeof window === 'undefined') {
		return createQueryClient();
	}

	if (!browserQueryClient) {
		browserQueryClient = createQueryClient();
	}

	return browserQueryClient;
}
