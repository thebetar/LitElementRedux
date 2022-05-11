import merge from 'deepmerge';
import { createSpaConfig } from '@open-wc/building-rollup';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import tsconfig from './tsconfig.json';

const config = createSpaConfig({
	injectServiceWorker: false
});

export default merge(config, {
	input: './public/index.html',
	plugins: [
		typescript({ typescript: require('typescript') }),
		nodeResolve(),
		babel({ babelHelpers: 'bundled' })
	]
});
