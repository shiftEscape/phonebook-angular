# phonebook-angular

A simple phonebook app made with Node.js + Express and Angular.js

### Installation
You need Gulp and Bower installed globally:

```sh
$ npm install -g gulp
$ npm install -g bower
```

```sh
$ git clone [git-repo-url] phonebook
$ cd phonebook
$ npm install
$ bower install
```

### Build
To build and run the server just use:
```sh
$ gulp
```
By default, this will build the assets in the environment of (development) and runs on 8000 PORT.

To specify environment to production, use --env argument and type 'production'
```sh
$ gulp --env production
```
Specify port number by --port argument
```sh
$ gulp --port [port number]
```