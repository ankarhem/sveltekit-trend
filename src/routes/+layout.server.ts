import { error } from '@sveltejs/kit';
import { NavTreeDocument } from '../graphql-operations';
import { jetshopRequest } from '../lib/jetshop';
import type { LayoutServerLoad } from './$types';

/** @type {import('./$types').LayoutServerLoad} */
export const load: LayoutServerLoad = async () => {
	const result = await jetshopRequest({
		query: NavTreeDocument,
		variables: {
			levels: 1,
			includeHidden: false
		}
	});

	if (result.errors) {
		const err = result.errors?.[0];
		switch (err.extensions?.code) {
			case 'EmptyRoute':
			default:
				throw error(500, { message: 'Internal server error' });
		}
	}

	if (!result.data?.categories) {
		throw error(500, { message: 'Internal server error' });
	}

	return {
		categories: result.data.categories
	};
};
