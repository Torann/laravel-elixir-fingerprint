var gulp          = require('gulp'),
    _             = require('underscore'),
    merge         = require('merge-stream'),
    fingerprint   = require('gulp-fingerprint'),
    elixir        = require('laravel-elixir'),
    utilities     = require('laravel-elixir/ingredients/commands/Utilities'),
    notification  = require('laravel-elixir/ingredients/commands/Notification');

elixir.extend('fingerprint', function(src, options) {
    var config = this;

    options = _.extend({
        output: config.cssOutput,
        base: '/',
        prefix: '/build/',
        manifest: '/public/build/rev-manifest.json'
    }, options);

    var watchPath = options.manifest;

    config.saveTask('fingerprint', {
        src: utilities.prefixDirToFiles('public', src),
        options: options
    });

    gulp.task('fingerprint', function() {

        var dataSet = config.collections['fingerprint'];

        var onError = function (e) {
            new notification().error(e, 'Fingerprinting Failed!');
            this.emit('end');
        };

        return merge.apply(this, dataSet.map(function(data) {

            var options  = data.options,
                manifest = require(__dirname + '/../..' + options.manifest);

            return gulp.src(data.src)
                .on('error', onError)
                .pipe(fingerprint(manifest, {
                    base: options.base,
                    prefix: options.prefix
                }))
                .pipe(gulp.dest(options.output))
                .pipe(new notification().message('Fingerprinting Compiled'));
        }));
    });

    this.registerWatcher('fingerprint', watchPath);

    return this.queueTask('fingerprint');
});