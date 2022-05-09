import { createBasicConfig } from '@open-wc/building-rollup';

const config = createBasicConfig();

delete config.output.dir;

export default {
	...config,
	input: 'out-tsc/index.js',
	output: {
		...config.output,
		file: 'public/bundle.js'
	},
	watch: {
		...config.watch,
		include: 'out-tsc/**/*'
	},
	treekshake: false
};
