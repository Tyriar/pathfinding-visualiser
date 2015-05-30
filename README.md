# pathfinding-visualiser

[![Build Status](http://img.shields.io/travis/Tyriar/pathfinding-visualiser.svg?style=flat)](http://travis-ci.org/Tyriar/pathfinding-visualiser)
[![Code climate](http://img.shields.io/codeclimate/github/Tyriar/pathfinding-visualiser.svg?style=flat)](https://codeclimate.com/github/Tyriar/pathfinding-visualiser)
[![Test coverage](http://img.shields.io/codeclimate/coverage/github/Tyriar/pathfinding-visualiser.svg?style=flat)](https://codeclimate.com/github/Tyriar/pathfinding-visualiser)
[![Dependency Status](http://img.shields.io/gemnasium/Tyriar/pathfinding-visualiser.svg?style=flat)](https://gemnasium.com/Tyriar/pathfinding-visualiser)

Visualises pathfinding algorithms allowing customisation of algorithm, map generation and animation. The UI is build on [Polymer's][5] paper elements.

 - [Live version][1]
 - [A* article][2]

## Installing dependencies

```bash
# if bower is not installed
npm install -g bower

npm install
bower install
```

## Running

[polyserve][6] is used to serve the demo so bower dependencies are referenced correctly to enable pathfinding-visualiser to be [reuseable][7].

```bash
npm run serve

# Navigate to http://localhost:8080/components/pathfinding-visualiser/demo/
```

## Testing

```bash
npm test

# generate coverage report in ./coverage/
npm coverage
```

## Contributing

Make sure there's an [issue open][4] or file one yourself. Try to match the coding style and make sure [jshint][3] shows no warnings.



  [1]: http://www.growingwiththeweb.com/projects/pathfinding-visualiser/
  [2]: http://www.growingwiththeweb.com/2012/06/a-pathfinding-algorithm.html
  [3]: http://www.jshint.com/
  [4]: https://github.com/Tyriar/pathfinding-visualiser/issues?state=open
  [5]: http://www.polymer-project.org/
  [6]: https://github.com/PolymerLabs/polyserve
  [7]: https://www.polymer-project.org/1.0/docs/start/reusableelements.html
