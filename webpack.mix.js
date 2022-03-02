// webpack.mix.js
const mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug');
const path = require('path');
const glob = require('glob');
require('laravel-mix-polyfill');

const prodDir = 'prod';
const distDir = 'dist';

// mix.webpackConfig({
// 	module: {
// 		rules: [
// 			{
// 				enforce: 'pre',
// 				test: /\.scss$/,
// 				loader: 'import-glob-loader',
// 			},
// 		],
// 	},
// });

mix.autoload({
	jquery: ['$', 'window.jQuery', 'jQuery'],
});

mix.disableSuccessNotifications().browserSync({
	ui: {
		port: 8031,
	},
	server: {
		baseDir: distDir,
		index: 'index.html',
	},
	port: 8030,
	proxy: false,
	files: '**/*',
});

if (mix.inProduction()) {
	mix.setPublicPath(prodDir);
	mix
		.js('src/assets/js/index.js', 'assets/js')
		.polyfill({
			enabled: true,
			useBuiltIns: 'usage',
			targets: {
				firefox: '50',
				ie: 11,
			},
		})
		.extract(['jquery']);

	glob
		.sync(`src/assets/scss/**/*.scss`, {
			ignore: `src/assets/scss/**/_*.scss`,
		})
		.map(file => {
			mix.sass(file, 'assets/css').options({
				// CSSファイル内の画像パスの書き換えを切り替える設定
				// true: 書き換える（デフォルト）
				// false: 書き換えない（こちらを推奨）
				processCssUrls: false,
				// CSSにベンダープレフィックスを自動付与する
				autoprefixer: {
					options: {
						grid: true,
					},
				},
				postCss: [
					require('postcss-object-fit-images'),
					require('css-mqpacker')(),
					require('css-declaration-sorter')({
						order: 'smacss',
					}),
					require('postcss-custom-properties')({
						preserve: false,
					}),
				],
			});
		});

	glob
		.sync(`src/pug/**/*.pug`, {
			ignore: `src/pug/**/_*.pug`,
		})
		.map(file => {
			mix.pug(file, path.relative('src/pug', prodDir), {
				pug: {
					basedir: 'src/pug',
					pretty: true,
				},
			});
		});
} else {
	mix.setPublicPath(distDir);
	mix.webpackConfig({ devtool: 'source-map' });

	mix
		.js('src/assets/js/index.js', 'assets/js')
		.polyfill({
			enabled: true,
			useBuiltIns: 'usage',
			targets: {
				firefox: '50',
				ie: 11,
			},
		})
		.extract(['jquery'])
		.sourceMaps();

	glob
		.sync(`src/assets/scss/**/*.scss`, {
			ignore: `src/assets/scss/**/_*.scss`,
		})
		.map(file => {
			mix
				.sass(file, 'assets/css')
				.options({
					// CSSファイル内の画像パスの書き換えを切り替える設定
					// true: 書き換える（デフォルト）
					// false: 書き換えない（こちらを推奨）
					processCssUrls: false,
					// CSSにベンダープレフィックスを自動付与する
					autoprefixer: {
						options: {
							grid: true,
						},
					},
					postCss: [
						require('postcss-object-fit-images'),
						require('css-mqpacker')(),
						require('css-declaration-sorter')({
							order: 'smacss',
						}),
						require('postcss-custom-properties')({
							preserve: false,
						}),
					],
				})
				.sourceMaps();
		});

	glob
		.sync(`src/pug/**/*.pug`, {
			ignore: `src/pug/**/_*.pug`,
		})
		.map(file => {
			mix.pug(file, path.relative('src/pug', distDir), {
				pug: {
					basedir: 'src/pug',
					pretty: true,
				},
			});
		});

	mix.copy('src/assets/img', distDir + '/assets/img');
}
