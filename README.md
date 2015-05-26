# pathfinding-visualiser

[![Build Status](http://img.shields.io/travis/Tyriar/pathfinding-visualiser.svg?style=flat)](http://travis-ci.org/Tyriar/pathfinding-visualiser)
[![Code climate](http://img.shields.io/codeclimate/github/Tyriar/pathfinding-visualiser.svg?style=flat)](https://codeclimate.com/github/Tyriar/pathfinding-visualiser)
[![Test coverage](http://img.shields.io/codeclimate/coverage/github/Tyriar/pathfinding-visualiser.svg?style=flat)](https://codeclimate.com/github/Tyriar/pathfinding-visualiser)
[![Dependency Status](http://img.shields.io/gemnasium/Tyriar/pathfinding-visualiser.svg?style=flat)](https://gemnasium.com/Tyriar/pathfinding-visualiser)

Visualises pathfinding algorithms allowing customisation of algorithm, map generation and animation. The UI is build on [Polymer's][5] paper elements.

 - [Live version][1]
 - [A* article][2]

## Setup

```bash
# if grunt or bower aren't installed
npm install -g grunt-cli
npm install -g bower

bower install
npm install
```

## Building

```bash
# dev build
grunt

# prod build (minifies, merges polymer elements)
grunt dist
```

## Testing

```bash
npm test

# generate coverage report in ./coverage/
grunt coverage
```

## Contributing

Make sure there's an [issue open][4] or file one yourself. Try to match the coding style and make sure [jshint][3] shows no warnings.

## Running locally

Due to browser security features, HTML imports don't work when running a page from your file system. A simple server can be started on the current directory with Python like so:

```bash
python3 -m http.server
```


  [1]: http://www.growingwiththeweb.com/projects/pathfinding-visualiser/
  [2]: http://www.growingwiththeweb.com/2012/06/a-pathfinding-algorithm.html
  [3]: http://www.jshint.com/
  [4]: https://github.com/Tyriar/pathfinding-visualiser/issues?state=open
  [5]: http://www.polymer-project.org/
