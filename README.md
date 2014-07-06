# pathfinding-visualiser

[![Build Status](https://secure.travis-ci.org/Tyriar/pathfinding-visualiser.png)](http://travis-ci.org/Tyriar/pathfinding-visualiser)
[![Code climate](https://codeclimate.com/github/Tyriar/pathfinding-visualiser.png)](https://codeclimate.com/github/Tyriar/pathfinding-visualiser)
[![Dependency Status](https://gemnasium.com/Tyriar/pathfinding-visualiser.svg)](https://gemnasium.com/Tyriar/pathfinding-visualiser)

Visualises pathfinding algorithms allowing customisation of algorithm, map generation and animation. The UI is build on [Polymer's][5] paper elements.

 - [Live version][1]
 - [A* article][2]

## Setup

```
bower install
npm install
```

## Building

```
# if grunt isn't installed
npm install -g grunt-cli

# dev build
grunt

# prod build (minifies, merges polymer elements)
grunt dist
```

## Testing

```
npm test
```

## Contributing

Make sure there's an [issue open][4] or file one yourself. Try to match the coding style and make sure [jshint][3] shows no warnings.

## Running locally

Due to browser security features, HTML imports don't work when running a page from your file system. A simple server can be started on the current directory with Python like so:

```
# Non-Windows
python -m SimpleHTTPServer 8000

# Windows
python -m http.server 8000
```


  [1]: http://www.growingwiththeweb.com/projects/pathfinding-visualiser/
  [2]: http://www.growingwiththeweb.com/2012/06/a-pathfinding-algorithm.html
  [3]: http://www.jshint.com/
  [4]: https://github.com/Tyriar/pathfinding-visualiser/issues?state=open
  [5]: http://www.polymer-project.org/
