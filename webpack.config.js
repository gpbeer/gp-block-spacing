const toml = require( 'toml' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' );
const path = require( 'path' );

let localEnv;

// Check if local.json exists
try {
	localEnv = require( './local.json' ).devURL;
} catch ( err ) {
	// Fallback if it does not
	localEnv = 'http://localhost';
}

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry,
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /.toml/,
				type: 'json',
				parser: {
					parse: toml.parse,
				},
			},
		],
	},
	resolve: {
		alias: {
			...defaultConfig.resolve.alias,
			'@styles': path.resolve( __dirname, 'src/styles/' ),
		},
	},
	optimization: {
		...defaultConfig.optimization,
	},
	plugins: [
		...defaultConfig.plugins,
		new BrowserSyncPlugin(
			{
				host: 'localhost',
				port: 3000,
				proxy: localEnv,
				open: false,
				files: [ 'build/*.php', 'build/*.js', 'build/*.css' ],
			},
			{
				injectCss: true,
				reload: false,
			}
		),
	],
};
