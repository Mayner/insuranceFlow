var /*config = require('./config'),*/
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    image = require('gulp-image'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    del = require('del'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    replace = require('gulp-replace');

//压缩css,压缩后的文件放入dist/css
gulp.task('minifycss', function () {
    return gulp.src('css/*.css')
        .pipe(cssnano()) //压缩
        .pipe(gulp.dest('dist/css'));//输出
});
//合并并压缩css，合并压缩后的文件放入dist/css
gulp.task('concatminifycss', function () {
    return gulp.src('css/*.css')
        .pipe(concat('main.css'))    //合并所有css到main.css
        .pipe(gulp.dest('dist/css'))    //输出main.css到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(cssnano())//压缩
        .pipe(gulp.dest('dist/css'));//输出
});

//压缩js，压缩后的文件放入dist/js
gulp.task('minifyjs', function () {
    return gulp.src('js/*.js')
        .pipe(uglify())//压缩
        //.pipe(uglify({
        //    mangle: false //压缩过程跳过变量名使其不被压缩
        //}))
        .pipe(gulp.dest('dist/js'));//输出
});

//合并并压缩js，合并压缩后的文件放入dist/js
gulp.task('concatminifyjs', function () {
    return gulp.src('js/*.js')
        .pipe(concat('main.js'))    //合并所有js到main.js
        .pipe(gulp.dest('dist/js'))    //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())//压缩
        .pipe(gulp.dest('dist/js'));//输出
});

//压缩图片，压缩后的文件放入dist/images
gulp.task('image', function () {
    gulp.src('images/*.+(jpg|png|gif|svg|ico)')
        .pipe(image())//压缩
        .pipe(gulp.dest('dist/images'));//输出
});
//以下压缩图片不失真
gulp.task('imagemin', function () {
    gulp.src('images/*.+(jpg|png|gif|svg|ico)')
        .pipe(imagemin())//压缩
        .pipe(gulp.dest('dist/images'));//输出
});

//压缩html，压缩后的文件放入dist/pages
/*gulp.task('minifyhtml', function () {
    return gulp.src('pages/!*.html')
        .pipe(replace('__VERSION', Date.now().toString(16)))
        .pipe(htmlmin({collapseWhitespace: true}))//压缩
        .pipe(gulp.dest('dist/pages'))//输出
        .pipe(livereload());
});*/

gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,  //清除HTML注释
        collapseWhitespace: true,  //压缩HTML
        collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input checked />
        removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
        minifyJS: true,  //压缩页面JS
        minifyCSS: true  //压缩页面CSS
    };
    return gulp.src('pages/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/pages'));
});

//压缩jsp，压缩后的文件放入dist/insure
gulp.task('testjspmin', function () {
    var options = {
        removeComments: true,  //清除HTML注释
        collapseWhitespace: true,  //压缩HTML
        collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input checked />
        removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
        minifyJS: true,  //压缩页面JS
        minifyCSS: true  //压缩页面CSS
    };
    return gulp.src('insure/*.jsp')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/insure'));
});

//执行压缩前，先删除dest文件夹里的内容
gulp.task('clean', function () {
    del.sync(['dist/*'])
});

//编译less到css
gulp.task("less", function () {
    gulp.src('css/*.less')
        .pipe(less())
        .pipe(gulp.dest("dist/css"));

});
//监视文件的变化
gulp.task("watch", function () {
    //livereload.listen();
    gulp.watch('./pages/*.html', ['testHtmlmin']);
    gulp.watch('./css/*.css', ['minifycss']);
    gulp.watch('./css/*.less', ['less']);
    gulp.watch('./js/*.js', ['minifyjs']);
});

//默认命令，在cmd中输入gulp后，执行的就是这个命令
gulp.task('default', function () {
    // 将你的默认的任务代码放在这
    //gulp.start('clean', 'minifycss', 'imagemin', 'minifyjs');
    gulp.start('clean', 'minifycss', 'imagemin', 'minifyjs', 'testHtmlmin');
    //合并并压缩
    //gulp.start('clean', 'concatminifycss', 'imagemin', 'concatminifyjs', 'testHtmlmin');
});

//额外
//自动监听
//gulp.task('auto', ['minifycss', 'imagemin', 'minifyjs', 'watch']);