var gulp = require('gulp');

$ = require('gulp-load-plugins')();
//　ここで使いたい機能をrequireする

gulp.task('svg-min', function() {
  gulp.src(['./icons/*.svg'])
      .pipe($.svgmin())
      .pipe(gulp.dest('./icons'));
});

gulp.task('fonts', ['svg-min'], function() {
  gulp.src(['./fonts'])
      .pipe($.clean());

  gulp.src(['./icons/*.svg'])
      .pipe($.plumber($.util.log))
      .pipe($.iconfontCss({
        fontName: 'icon-font',
        path: './sass/templates/_icons.scss',
        targetPath: '../sass/_icons.scss',
        fontPath: "./fonts/"
      }))
      .pipe($.iconfont({
        fontName: 'icon-font',
        appendCodepoints: false
      }))
      .pipe(gulp.dest('./fonts'));
})

// sass
gulp.task('sass', function() {
  gulp.src('sass/**/*.scss') // コンパイル対象となる.scssファイルの場所
      .pipe($.plumber()) // エラーが出てもwatchを止めない
      .pipe($.sass()) // sassをコンパイル
      .pipe($.autoprefixer()) // ベンダープレフィックスを入れる
      .pipe(gulp.dest('./css')); // コンパイル後のcssの出力先
});

// styledocco
gulp.task('styledocco', function() {
  gulp.src('./sass/**/docco.scss') // スタイルガイドを生成する対象となる.scssファイルの場所
    .pipe($.styledocco({
      out: 'docs',
      name: 'StyleGuide',
      'no-minify': false
    })); // styledoccoの設定
});

// js
gulp.task('js', function() {
  gulp.src(['js/**/*.js', '!js/min/**/*.js']) // 圧縮対象となる.jsファイルの場所(圧縮済みディレクトリは除外)
    .pipe($.plumber()) // エラーが出てもwatchを止めない
    .pipe($.uglify()) // jsを圧縮
    .pipe(gulp.dest('./js/min/')); // 圧縮後のjsの出力先
});

// defaultタスク(「gulp」で実行できる)
/*
 * 【gulp.watch】
 * gulp.watch('watchする対象', ['実行するタスク']);
 * これが基本形。対象が複数存在する場合は配列に格納する。
 */
gulp.task('default', function() {
  gulp.watch(['js/**/*.js', '!js/min/**/*.js'], ['js']);
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('sass/**/docco.scss', ['styledocco']);
});