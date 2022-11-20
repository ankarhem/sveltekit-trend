import { error } from '@sveltejs/kit';
import { RouteDocument, type RouteQuery } from '../../graphql-operations';
import { jetshopRequest } from '../../lib/jetshop';
import type { PageServerLoad } from './$types';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ params, url }) => {
	const result = await jetshopRequest({
		query: RouteDocument,
		variables: {
			path: `/${params.path}`
		}
	});

	if (result.errors) {
		const err = result.errors?.[0];
		switch (err.extensions?.code) {
			case 'EmptyRoute':
				throw error(404, { message: 'Route not found' });
			default:
				return error(500, { message: 'Internal server error' });
		}
	}

	if (!result.data?.route) {
		throw error(500, { message: 'Internal server error' });
	}

	return result.data.route;
};
