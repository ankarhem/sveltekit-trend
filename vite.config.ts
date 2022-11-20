import { sveltekit } from '@sveltejs/kit/vite';
import { VitePluginFonts } from 'vite-plugin-fonts';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [
		sveltekit(),
		VitePluginFonts({
			google: {
				preconnect: true,
				injectTo: 'head-prepend',
				families: ['Source Sans Pro']
			}
		})
	]
};

export default config;
