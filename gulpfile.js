"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var htmlmin = require("gulp-htmlmin");
var include = require("posthtml-include");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var run = require("run-sequence");
var del = require("del");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

gulp.task("style", function () {
  gulp.src("src/sass/styles.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("dist/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(server.stream());
});

gulp.task("sprite", function () {
  return gulp.src("src/img/for_sprite/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("dist/img"));

});

gulp.task("html", function () {
  return gulp.src("*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));
});

gulp.task("scripts", function () {
  return gulp.src("src/js/own/**/*.js")
    .pipe(concat("main.js"))
    .pipe(gulp.dest("dist/js"))
    .pipe(uglify())
    .pipe(rename("common.min.js"))
    .pipe(gulp.dest("dist/js"));
});

gulp.task("images", function () {
  return gulp.src("src/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("dist/img"));
});

gulp.task("webp", function () {
  return gulp.src("src/img/content-images/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("dist/img/content-images"));
});

gulp.task("serve", function () {
  server.init({
    server: "dist/"
  });
  gulp.watch("src/sass/**/*.scss", ["style"]);
  gulp.watch("*.html", ["html"]);
});


gulp.task("copy", function () {
  return gulp.src([
    "src/js/vendor/**/*.js",
  ], {
    base: "./src/js/vendor/"
  })
    .pipe(gulp.dest("dist/js"));
});

gulp.task("clean", function () {
  return del("dist");
});

gulp.task("build", function (done) {
  run(
    "clean",
    "copy",
    "style",
    "sprite",
    "html",
    "scripts",
    done);
});

gulp.task("build-full", function (done) {
  run(
    "build",
    "images",
    "webp",
    done);
});
