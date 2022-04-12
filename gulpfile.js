const { src, dest, watch, series, parallel } = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

// Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//JavaScript
const terser = require('gulp-terser');

const path = {
  css: 'src/scss/**/*.scss',
  img: 'src/img/**/*.{png,jpg}',
  js: 'src/js/**/*.js'
}
// function para compilar sass a css
function css(done) {
  src(path.css) // Identificar el archivo
    .pipe(sourcemaps.init())
    .pipe( sass() )// Compilar la stylesheet... Para comprimir el css {outputStyle: 'compressed'}
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe( dest('build/css') )

  done();
}

function imagenes() {
  return src(path.img)
          .pipe(imagemin({optimizationLevel: 3}))
          .pipe(dest('build/img'))
}

function versionWebp() {
  return src(path.img)
          .pipe(webp())
          .pipe(dest('build/img'))
}

function versionAvif() {
  const options = {
    quality: 80,
  }
  
  return src(path.img)
          .pipe(avif(options))
          .pipe(dest('build/img'))
}

function javascript(done) {
  src(path.js)
      .pipe(terser())
      .pipe(dest('build/js'))
  
  done();
}

function dev() {
  watch(path.css, css);
  watch(path.js , javascript);
}


exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.javascript = javascript;
exports.dev = dev;
exports.default = series(imagenes, versionWebp, versionAvif, css, javascript,dev);

//series - Se inicia una tarea hasta que finaliza la anterior
//parallel - Todas las tareas inician al mismo tiempo