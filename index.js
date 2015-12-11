var gulp = require('gulp'),
    fingerprint = require('gulp-fingerprint'),
    Elixir = require('laravel-elixir');

var config = Elixir.config;

Elixir.extend('fingerprint', function(src, options) {

    var paths = prepGulpPaths(src, options.output);

    var manifestFile = (options.buildPath || config.get('public.versioning.buildFolder')) + '/rev-manifest.json';

    new Elixir.Task('fingerprint', function() {
        this.log(paths.src, paths.output);

        var onError = function (e) {
            new Elixir.Notification().error(e, 'Fingerprinting Failed!');
            this.emit('end');
        };

        var manifest = require(__dirname + '/../../' + manifestFile);

        return gulp.src(paths.src.path)
            .on('error', onError)
            .pipe(fingerprint(manifest, {
                base: options.base || '/',
                prefix: options.prefix || '/build/'
            }))
            .pipe(gulp.dest(paths.output.baseDir))
            .pipe(new Elixir.Notification('Fingerprinting Compiled'));
    })
    .watch(manifestFile);
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|array} src
 * @param  {string|null}  buildPath
 * @return {object}
 */
var prepGulpPaths = function(src, buildPath) {
    src = Array.isArray(src) ? src : [src];

    return new Elixir.GulpPaths()
        .src(src)
        .output(buildPath || config.get('public.versioning.buildFolder'));
};