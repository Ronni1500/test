"use strict"

var gulp = require('gulp'),
	server = require('browser-sync').create(),
	rimraf = require('rimraf'),
	watch = require('gulp-watch'),
	include = require('gulp-include'),
	gulpif = require('gulp-if'),
	plumber = require('gulp-plumber'),
	wait = require('gulp-wait'),
	// images
	filter = require('gulp-filter'),
	imagemin = require('gulp-imagemin'),
	// js
	order = require('gulp-order'),
	concat = require('gulp-concat'),
	minify = require('gulp-minify'),
	jsValidate = require('gulp-jsvalidate'),
	// css
	prefixer = require('gulp-autoprefixer'),
	scss = require('gulp-sass'),
	scssGlob = require('gulp-sass-glob'),
	sourcemaps = require('gulp-sourcemaps'),
	cssnano = require('gulp-cssnano'),
	// png sprites
	spritesmith = require('gulp.spritesmith'),
	merge = require('merge-stream'),
	// svg sprites
	svgSprite = require('gulp-svg-sprites'),
	// fonts
	font2css = require('gulp-font2css').default,
	// modernizr
	mkdirp = require('mkdirp'),
	fs = require('fs'),
	mdrnzr = require('modernizr');

/* ==== SETTINGS ============================================================ */

var settings = {
	isDev: false,
	isBitrix: false,
	bitrixTemplate: 'main',
	timeout: 0,
	cssPrefixer: ['last 3 versions'],
	tasks: [
		'html',
		'images',
		'uploads',
		'js',
		'css',
		// 'sprites-png',
		'sprites-svg',
		// 'modernizr',
		// 'fonts'
	],
	path: {
		root: __dirname,
		in: __dirname + '/source',
		out: __dirname + '/www', // для битрикса меняется ниже
	},
	server: {
		baseDir: './',
		path: __dirname + '/www',
		host: 'localhost',
		port: 8080,
		tunnel: false,
		open: false,
		// open: 'tunnel',
		logLevel: 'silent',
		// logLevel: 'info',
		middleware: function (req, res, next) {
			if (/\.json|\.txt|\.html/.test(req.url) && req.method.toUpperCase() == 'POST') {
				console.log('[POST => GET] : ' + req.url);
				req.method = 'GET';
			}
			next();
		}
	},
};

if (settings.isBitrix) {
	settings.path.out = __dirname + '/www/local/templates/' + settings.bitrixTemplate;
}

/* ==== TASKS =============================================================== */

// html
(() => {
	gulp.task('html:build', () => {
		if (settings.isBitrix) return true;

		let src = settings.path.in + '/html/views/**/*';
		let dest = settings.path.out;

		return gulp.src(src)
			.pipe(include())
			.pipe(gulp.dest(dest));
	});
	gulp.task('html:watch', () => {
		watch([
			settings.path.in + '/html/**/*',
			settings.path.in + '/images/sprites.svg'
		], () => {
			gulp.start('html:build', server.reload);
		});
	});
})();

// js
(() => {
	gulp.task('js:build', () => {
		let src = settings.path.in + '/js/**/*.js';
		let dest = settings.path.out + '/js';

		gulp.src(src)
			.pipe(plumber())
			.pipe(jsValidate())
			.pipe(include())
			.pipe(order([
				"plugins.js",
				"*.js"
			]))
			.pipe(concat('main.js'))
			.pipe(minify({
				ext: {
					src: '.js',
					min: '.min.js'
				}
			}))
			.pipe(gulp.dest(dest));
	});
	gulp.task('js:watch', () => {
		watch([
			settings.path.in + '/js/**/*.js'
		], () => {
			gulp.start('js:build', server.reload);
		});
	});
})();

// css
(() => {
	gulp.task('css:build', () => {
		let src = settings.path.in + '/scss/**/*.scss';
		let dest = settings.path.out + '/css';

		return gulp.src(src)
			.pipe(plumber())
			.pipe(include())
			.pipe(gulpif(
				settings.isDev && !settings.isBitrix,
				sourcemaps.init()
			))
			.pipe(wait(settings.timeout)) // fix #8 (not atomic save)
			.pipe(scssGlob())
			.pipe(scss({
				errLogToConsole: false
			}))
			.pipe(prefixer({
				browsers: settings.cssPrefixer
			}))
			.pipe(cssnano({
				zindex: false,
				discardUnused: {
					fontFace: false
				}
			}))
			.pipe(gulpif(
				settings.isDev && !settings.isBitrix,
				sourcemaps.write('.')
			))
			.pipe(gulp.dest(dest));
	});
	gulp.task('css:watch', () => {
		watch([
			settings.path.in + '/scss/**/*.scss'
		], () => {
			gulp.start('css:build', server.reload);
		});
	});
})();

// images
(() => {
	gulp.task('images:build', () => {
		let src = settings.path.in + '/images/**/*.{jpg,jpeg,gif,png,svg}';
		let dest = settings.path.out + '/images';
		let exSvg = filter(['**', '!**/*.svg'], {
			restore: true
		});

		setTimeout(() => {
			return gulp.src(src)
				.pipe(exSvg)
				.pipe(gulpif(
					!settings.isDev,
					imagemin({
						progressive: true,
						interlaced: true
					})
				))
				.pipe(exSvg.restore)
				.pipe(gulp.dest(dest));
		}, 1000);
	});
	gulp.task('images:watch', () => {
		watch([
			settings.path.in + '/images/**/*.{jpg,jpeg,gif,png,svg}',
		], () => {
			gulp.start('images:build', server.reload);
		});
	});
})();

// uploads
(() => {
	gulp.task('uploads:build', () => {
		if (settings.isBitrix) return true;

		let src = settings.path.in + '/uploads/**/*';
		let dest = settings.path.out + '/uploads';

		setTimeout(() => {
			return gulp.src(src)
				.pipe(gulp.dest(dest));
		}, 1000);
	});
	gulp.task('uploads:watch', () => {
		watch([
			settings.path.in + '/uploads/**/*'
		], () => {
			gulp.start('uploads:build', server.reload);
		});
	});
})();

// fonts
(() => {
	gulp.task('fonts:build', () => {
		let srcFonts = settings.path.in + '/fonts/**/*.{woff,woff2}';
		let destFonts = settings.path.out + '/fonts';

		let srcJs = settings.path.in + '/fonts/**/*.js';
		let destJs = settings.path.out + '/js';

		let cssFonts = gulp.src(srcFonts)
			.pipe(font2css())
			.pipe(cssnano({
				discardUnused: {
					fontFace: false
				}
			}))
			.pipe(gulp.dest(destFonts));

		let jsFonts = gulp.src(srcJs)
			.pipe(minify({
				ext: {
					src: '.js',
					min: '.min.js'
				}
			}))
			.pipe(gulp.dest(destJs));

		return merge(cssFonts, jsFonts);
	});
	gulp.task('fonts:watch', () => {
		watch([
			settings.path.in + '/fonts/**/*.{woff,woff2}',
			settings.path.in + '/fonts/**/*.js'
		], () => {
			gulp.start('fonts:build', server.reload);
		});
	});
})();

// sprites png
(() => {
	gulp.task('sprites-png:build', () => {
		let src = settings.path.in + '/sprites/**/*.{jpg,jpeg,gif,png}';
		let destImg = settings.path.in + '/images';
		let destCss = settings.path.in + '/scss';

		let spriteData = gulp.src(src)
			.pipe(spritesmith({
				imgName: 'sprites.png',
				imgPath: 'images/sprites.png', // in css
				cssName: '_sprites.scss',
				algorithm: 'binary-tree',
				padding: 1,
				cssVarMap: function (sprite) {
					sprite.name = 's-' + sprite.name;
				}
			}));

		let imgStream = spriteData.img
			.pipe(gulp.dest(destImg));
		let cssStream = spriteData.css
			.pipe(gulp.dest(destCss));

		return merge(imgStream, cssStream);
	});
	gulp.task('sprites-png:watch', () => {
		watch([
			settings.path.in + '/sprites/**/*.{jpg,jpeg,gif,png}'
		], () => {
			gulp.start('sprites-png:build', server.reload);
		});
	});
})();

// sprites svg
(() => {
	gulp.task('sprites-svg:build', () => {
		var src = settings.path.in + '/sprites/**/*.svg';
		var dest = settings.path.in + '/images';

		return gulp.src(src)
			.pipe(svgSprite({
				preview: false,
				mode: 'symbols',
				svgId: 'svg-%f',
				svg: {
					defs: 'sprites.svg',
					symbols: 'sprites.svg'
				}
			}))
			.pipe(gulp.dest(dest));
	});
	gulp.task('sprites-svg:watch', () => {
		watch([
			settings.path.in + '/sprites/**/*.svg'
		], () => {
			gulp.start('sprites-svg:build', server.reload);
		});
	});
})();

// modernizr
(() => {
	gulp.task('modernizr:build', () => {
		let config = require(settings.path.in + '/modernizr-config.json');
		let destDir = settings.path.out + '/js';
		let destFile = settings.path.out + '/js/modernizr.js';

		return mdrnzr.build(config, function (code) {
			mkdirp(destDir, function () {
				fs.writeFile(destFile, code);
			});
		});
	});
	gulp.task('modernizr:watch', () => {
		watch([
			settings.path.in + '/modernizr-config.json'
		], () => {
			gulp.start('modernizr:build', server.reload);
		});
	});
})();

/* ==== BASE TASKS =========================================================== */

// server
gulp.task('server', () => {
	if (settings.isBitrix) return;
	server.init({
		server: {
			baseDir: settings.server.path
		},
		host: settings.server.host,
		port: settings.server.port,
		tunnel: settings.server.tunnel,
		open: settings.server.open,
		notify: false,
		logLevel: settings.server.logLevel,
		logPrefix: "server",
		middleware: settings.server.middleware
	});
});

// clean
gulp.task('clean', () => {
	rimraf(settings.path.out, function () {
		console.log('clean');
	});
});

// default tasks
var tasksBuild = [];
var tasksWatch = [];
settings.tasks.forEach((item, i) => {
	tasksBuild[i] = item + ':build';
	tasksWatch[i] = item + ':watch';
});
gulp.task('build', tasksBuild);
gulp.task('watch', tasksWatch);
gulp.task('default', ['build', 'watch', 'server']);