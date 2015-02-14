# Laravel Elixir Fingerprint [![Build Status](https://travis-ci.org/vincentmac/gulp-fingerprint.svg?branch=master)](https://travis-ci.org/vincentmac/gulp-fingerprint)

### Install

```sh
$ npm install laravel-elixir-fingerprint --save-dev
```

### Example

```javascript
var elixir = require('laravel-elixir');

require('laravel-elixir-fingerprint');

elixir(function (mix) {
    mix.fingerprint(
        'public/build/css/*.css', 
        'public/build/css/'
    );
});
```

### Full Documentation

[https://github.com/vincentmac/gulp-fingerprint](https://github.com/vincentmac/gulp-fingerprint)


## License

[MIT](http://opensource.org/licenses/MIT) © [Vincent Mac](http://simplicity.io)