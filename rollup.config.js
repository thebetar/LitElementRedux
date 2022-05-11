import merge from 'deepmerge';
import { createSpaConfig } from '@open-wc/building-rollup';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

const config = createSpaConfig({
	injectServiceWorker: false
});

export default merge(config, {
	input: './public/index.html',
	output: {
		format: 'cjs'
	},
	plugins: [typescript(), nodeResolve(), babel({ babelHelpers: 'bundled' })]
});
