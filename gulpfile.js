var gulp = require('gulp');

//　ここで使いたい機能をrequireする
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var styledocco = require('gulp-styledocco');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var browser = require('browser-sync');

// 開発用サーバーの立ち上げ
gulp.task('server', function() {
  browser({
    server: {
      baseDir: './'
    }
  });
});

// sass
gulp.task('sass', function() {
  gulp.src('sass/**/*.scss') // コンパイル対象となる.scssファイルの場所
      .pipe(plumber()) // エラーが出てもwatchを止めない
      .pipe(sass()) // sassをコンパイル
      .pipe(autoprefixer()) // ベンダープレフィックスを入れる
      .pipe(gulp.dest('./css')) // コンパイル後のcssの出力先
      .pipe(browser.reload({stream:true})); // 開発用サーバー内で立ち上げたブラウザ自動でリロードする
});

// styledocco
gulp.task('styledocco', function() {
  gulp.src('./sass/**/docco.scss') // スタイルガイドを生成する対象となる.scssファイルの場所
    .pipe(styledocco({
      out: 'docs',
      name: 'StyleGuide',
      'no-minify': false
    })); // styledoccoの設定
});

// js
gulp.task('js', function() {
  gulp.src(['js/**/*.js', '!js/min/**/*.js']) // 圧縮対象となる.jsファイルの場所(圧縮済みディレクトリは除外)
    .pipe(plumber()) // エラーが出てもwatchを止めない
    .pipe(uglify()) // jsを圧縮
    .pipe(gulp.dest('./js/min/')); // 圧縮後のjsの出力先
});

// defaultタスク(「gulp」で実行できる)
/*
 * 【gulp.watch】
 * gulp.watch('watchする対象', ['実行するタスク']);
 * これが基本形。対象が複数存在する場合は配列に格納する。
 */
gulp.task('default', ['server'], function() {
  gulp.watch(['js/**/*.js', '!js/min/**/*.js'], ['js']);
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('sass/**/docco.scss', ['styledocco']);
});