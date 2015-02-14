var gulp = require('gulp');
var fingerprint = require('gulp-fingerprint');
var utilities = require('laravel-elixir/ingredients/commands/Utilities');
var elixir = require('laravel-elixir');

elixir.extend('fingerprint', function(src, output) {

    src = utilities.prefixDirToFiles('public', src);

    var config = this;
    var manifestFile = '/public/build/rev-manifest.json';

    gulp.task('fingerprint', function() {

        var manifest = require(__dirname + '/../..' + manifestFile);

        var options = {
            base: '/',
            prefix: '/build/'
        };

        return gulp.src(src)
            .pipe(fingerprint(manifest, options))
            .pipe(gulp.dest(output || config.cssOutput));
    });

    this.registerWatcher('fingerprint', manifestFile);

    return this.queueTask('fingerprint');
});