import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

/** @type {import('./$types').Actions} */
export const actions: Actions = {
	default: async ({ request, url }) => {
		const form = await request.formData();
		const _fromUrl = form.get('_fromUrl');

		if (typeof _fromUrl !== 'string') {
			throw redirect(303, '/');
		}

		console.log(form);

		throw redirect(303, _fromUrl);
	}
};
