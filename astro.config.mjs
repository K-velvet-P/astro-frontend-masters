// astro.config.mjs
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import solid from '@astrojs/solid-js';

export default defineConfig({
	integrations: [
		solid({
			include: ['**/solid/*'],
		}),
		react({
			include: ['**/react/*'],
		}),
	],
});
