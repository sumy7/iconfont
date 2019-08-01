var gulp = require("gulp"),
    clean = require('gulp-clean'),
    iconfont = require('gulp-iconfont'),
    consolidate = require('gulp-consolidate'),
    rename = require('gulp-rename'),
    zip = require('gulp-zip'),
    moment = require('moment'),

    runTimestamp = Math.round(Date.now() / 1000),
    fontName = 'iconfont', // font-family name
    className = 'icon', // class name
    classPrefix = 'icon-'; // 图标class前缀

var baseUnicode = 0xEA00; // unicode起始编码

// 清理输出文件夹
gulp.task('clean', function () {
    return gulp.src('dist', {
        read: false,
        allowEmpty: true
    }).pipe(clean());
});

// svg转iconfont
gulp.task('iconfont', function () {
    return gulp.src('svg/*.svg')
        .pipe(rename(function (path) {
            // 将00x-xx-xx.svg格式的文件名转换为uEAxx-xx-xx.svg
            if (!path.basename.startsWith('u')) {
                let svgName = path.basename.split('-');
                // 将文件名前的序号转换为unicode编码
                let num = baseUnicode + parseInt(svgName[0], 10);
                svgName[0] = `u${num.toString(16).toUpperCase()}`;
                path.basename = svgName.join("-");
            }
        }))
        .pipe(iconfont({
            fontName: fontName,
            prependUnicode: true,
            normalize: true, //如果编译后的字体出现了变形，就要加上normalize、fontHeight选项
            fontHeight: 1001,
            formats: ['ttf', 'eot', 'woff', 'svg'], // 默认：['ttf', 'eot', 'woff'], 还可以加'woff2', 'svg'
            timestamp: runTimestamp // recommended to get consistent builds when watching files
        }))
        .on('glyphs', function (glyphs) {
            // 设置demo模版需要的参数
            var options = {
                glyphs: glyphs.map(function (glyph) {
                    // 字体信息
                    return {
                        name: glyph.name,
                        codepoint: glyph.unicode[0].charCodeAt(0)
                    }
                }),
                fontName: fontName, // 字体名字
                timer: +(new Date()), // 时间戳，编译的时候会放到引用后面
                buildTimestampFormat: moment().format('YYYY-MM-DD HH:mm:ss'), // 编译时间
                fontPath: './fonts/', // css 引用的路径
                className: className,
                classPrefix: classPrefix
            };

            // 字体图标样式
            gulp.src('templates/style.css')
                .pipe(consolidate('lodash', options))
                .pipe(gulp.dest('dist/'));

            // 字体图标演示
            gulp.src('templates/demo.html')
                .pipe(consolidate('lodash', options))
                .pipe(gulp.dest('dist/'));

            // demo样式，实际项目中不需要
            gulp.src('templates/demo.css')
                .pipe(gulp.dest('dist/demo-files/'));

            // index首页，实际项目不需要
            gulp.src('templates/index.html')
                .pipe(consolidate('lodash', options))
                .pipe(gulp.dest('dist/'));

            // http server脚本，实际项目不需要
            gulp.src('server.sh')
                .pipe(gulp.dest('dist/'));
        })
        .pipe(gulp.dest('dist/fonts/'));
});

// 打包zip
gulp.task('package', function () {
    return gulp.src(['dist/**/*.*', '!dist/index.html', '!dist/server.sh'])
        .pipe(zip(`${fontName}.zip`))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', gulp.series('clean', 'iconfont', 'package'));