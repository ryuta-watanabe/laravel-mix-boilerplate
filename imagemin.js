/*
 compress images
 */
const imagemin = require('imagemin-keep-folder');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');

imagemin(['src/assets/img/**/*.{jpg,png,gif,svg}'], {
	plugins: [
		imageminMozjpeg({ quality: 80 }),
		imageminPngquant({ quality: [0.6, 0.8] }),
		imageminGifsicle(),
		imageminSvgo(),
	],
	replaceOutputDir: output => {
		return output.replace(/img\//, '../../prod/assets/img/');
	},
}).then(() => {
	console.log('Images optimized');
});
