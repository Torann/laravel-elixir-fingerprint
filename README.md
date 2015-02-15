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

Our `rev-manifest.json` file:
```json
{
  "fonts/fontello.eot": "fonts/fontello-ee7f7979.eot",
  "fonts/fontello.svg": "fonts/fontello-9cc6a21a.svg",
  "fonts/fontello.ttf": "fonts/fontello-13276407.ttf",
  "fonts/fontello.woff": "fonts/fontello-e25c919d.woff"
}
```

CSS Before Fingerprinting:
```css
@font-face {
  font-family: 'fontello';
  src: url("fonts/fontello.eot");
  src: url("fonts/fontello.eot") format('embedded-opentype'),
       url("fonts/fontello.woff") format('woff'),
       url("fonts/fontello.ttf") format('truetype'),
       url("fonts/fontello.svg") format('svg');
  font-weight: normal;
  font-style: normal;
}
```

CSS After Fingerprinting:
```css
@font-face {
  font-family: 'fontello';
  src: url("/build/fonts/fontello-ee7f7979.eot");
  src: url("/build/fonts/fontello-ee7f7979.eot") format('embedded-opentype'),
       url("/build/fonts/fontello-e25c919d.woff") format('woff'),
       url("/build/fonts/fontello-13276407.ttf") format('truetype'),
       url("/build/fonts/fontello-9cc6a21a.svg") format('svg');
  font-weight: normal;
  font-style: normal;
}
```

As you can see, the after shows the font files replaced with the versioned ones in the `rev-manifest.json` file.


### Full Documentation

[https://github.com/vincentmac/gulp-fingerprint](https://github.com/vincentmac/gulp-fingerprint)


## License

[MIT](http://opensource.org/licenses/MIT) © [Vincent Mac](http://simplicity.io)
