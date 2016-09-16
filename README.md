# UITable

## Summary

This program provides an easy way to make a table by intuitive User Interface.  
The primary purpose is front-side JavaScript program of concrete5 infotown_table package.

But this program only set input data to to hidden element.  
It may be general-purpose use.

[concrete5 is an Open Source Content Management System (CMS)](https://www.concrete5.org/)  
concrete5 の名称とロゴは、PortlandLabs, Inc とコンクリートファイブジャパン株式会社の登録商標です。


## Usage

Please look at [manual](./manual/manual.md) and examples/index.html.


## Develop environment

### Install npm package to project directory 

You install npm packages topmost project directory.

* 1. Install Babel, Browserify in order to compile ES 2015 and use ES Modules.
* 2. Install Mocha, etc in order to Unit Test.


```
$ cd /path/to/project
$ npm install
```

You watch src directory in order to compile ES 2015 by Babel and Browserify.

    $ npm run watch

You run tests.

    $npm run test

### Install npm package to global if you need.

If you minify JavaScript, install bellow package to global.

[mishoo/UglifyJS2: JavaScript parser / mangler / compressor / beautifier toolkit](https://github.com/mishoo/UglifyJS2)

    $ cd /path/to/project
    $ uglifyjs ./dist/table.js -o ./dist/table.min.js

If you generate JavaScript documentation, install bellow package to global.
 
[YUIDoc - JavaScript Documentation Tool](http://yui.github.io/yuidoc/)

    $ cd /path/to/project
    $ yuidoc -o ./docs ./src

### Task runner(Npm scripts)

This project uses npm scripts. npm script is written in package.json

Watch files and compile by Babel and Browefiry.

    $ cd /path/to/project
    $ npm run watch

Minify JavaScript.

    $ cd /path/to/project
    $ npm run min

Generate JavaScript documentation(YUIDoc).

    $ cd /path/to/project
    $ npm run docs

Unit test.

    $ cd /path/to/project
    $ npm run tests


## LICENSE

Copyright (c) 2016 Hiroshi Sawai <info@info-town.jp>  
UITable is distributed under the MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   
### third-party resource
   
UITable bundles the following third-party resources:

#### jQuery v1.12.4

Copyright jQuery Foundation and other contributors
Released under the MIT license

#### jQuery UI - v1.12.0

Copyright jQuery Foundation and other contributors; Licensed MIT

#### Font Awesome
   
Font Awesome 4.6.3 by @davegandy - http://fontawesome.io - @fontawesome
License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)

