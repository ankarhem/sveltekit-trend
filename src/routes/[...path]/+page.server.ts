import { invalid } from '@sveltejs/kit';
import { RouteDocument } from '../../graphql-operations';
import { jetshopRequest } from '../../lib/jetshop';
import type { PageServerLoad } from './$types';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ params }) => {
	const result = await jetshopRequest({
		query: RouteDocument,
		variables: {
			path: `/${params.path}`
		}
	});

	if (result.errors) {
		return invalid(500, { errors: result.errors });
	}

	if (!result.data?.route) {
		return invalid(404, { errors: [{ message: 'Route not found' }] });
	}

	return result.data?.route;
};
