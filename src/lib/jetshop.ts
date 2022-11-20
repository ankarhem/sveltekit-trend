import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { gqlRequest } from './gqlRequest';

type FunctionParams<T> = T extends (args: infer P) => any ? P : never;

const createGqlFetcher = ({ endpoint, headers }: { endpoint: string; headers?: HeadersInit }) => {
	return <T extends TypedDocumentNode<any, any>>(
		props: Omit<FunctionParams<typeof gqlRequest<T>>, 'endpoint'>
	) => {
		return gqlRequest<T>({
			endpoint,
			headers: headers
				? {
						...headers,
						...props.headers
				  }
				: props.headers,
			...props
		}).then((response) => response.json());
	};
};

export const jetshopRequest = createGqlFetcher({
	endpoint: `https://storeapi.jetshop.io/`,
	headers: {
		token: '359fd7c1-8e72-4270-b899-2bda9ae6ef57',
		shopid: 'demostore'
	}
});
