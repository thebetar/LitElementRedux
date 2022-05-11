import { esbuildPlugin } from '@web/dev-server-esbuild';
import { importMapsPlugin } from '@web/dev-server-import-maps';

export default {
	testRunnerHtml: (testFramework) =>
		`<html>
		<body>
			<script>window.process = { env: { NODE_ENV: "development" } }</script>
			<script type="module" src="${testFramework}"></script>
		</body>
    </html>`,
	files: ['src/**/*.spec.ts'],
	concurrency: 10,
	nodeResolve: true,
	coverage: true,
	coverageConfig: {
		exclude: ['./src/mocks/**/*', './node_modules/**/*'],
		threshold: {
			statements: 90
		}
	},
	silent: true,
	plugins: [
		importMapsPlugin({
			inject: {
				importMap: {
					imports: {
						'@lion/ajax': './src/mocks/ajax.ts'
					}
				}
			}
		}),
		esbuildPlugin({ ts: true })
	]
};
