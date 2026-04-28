export interface GraphQLError {
	message: string;
	locations?: Array<{ line: number; column: number }>;
	path?: Array<string | number>;
	extensions?: Record<string, unknown>;
}

export interface GraphQLResponse<T> {
	data?: T;
	errors?: GraphQLError[];
}

export class GraphQLClientError extends Error {
	public errors: GraphQLError[];

	constructor(errors: GraphQLError[]) {
		super(errors.map((e) => e.message).join(', '));
		this.name = 'GraphQLClientError';
		this.errors = errors;
	}
}

interface FetcherOptions {
	variables?: Record<string, unknown>;
	headers?: Record<string, string>;
}

/**
 * Type-safe GraphQL fetcher for use with TanStack Query
 */
export async function graphqlFetcher<T>(
	query: string,
	options: FetcherOptions = {},
): Promise<T> {
	const { variables, headers = {} } = options;

	const response = await fetch('/api/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
		body: JSON.stringify({
			query,
			variables,
		}),
		credentials: 'include', // Include cookies for session
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const result: GraphQLResponse<T> = await response.json();

	if (result.errors && result.errors.length > 0) {
		throw new GraphQLClientError(result.errors);
	}

	if (!result.data) {
		throw new Error('No data returned from GraphQL');
	}

	return result.data;
}

/**
 * Create a typed query function for TanStack Query
 */
export function createGraphQLQuery<
	TData,
	TVariables extends Record<string, unknown> = Record<string, never>,
>(query: string) {
	return async (variables?: TVariables): Promise<TData> => {
		return graphqlFetcher<TData>(query, { variables });
	};
}

/**
 * Create a typed mutation function for TanStack Query
 */
export function createGraphQLMutation<
	TData,
	TVariables extends Record<string, unknown>,
>(mutation: string) {
	return async (variables: TVariables): Promise<TData> => {
		return graphqlFetcher<TData>(mutation, { variables });
	};
}
