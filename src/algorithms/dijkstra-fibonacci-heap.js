/*! pathfinding-visualiser | (c) 2014 Daniel Imms */
/*! https://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE */
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['dijkstra-heap', 'fibonacci-heap'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./dijkstra-heap'),
                             require('../../node_modules/js-data-structures/src/fibonacci-heap'));
  }
}(this, function (dijkstraHeap, FibonacciHeap) {
  'use strict';

  var module = {};

  module.run = function (map, callback) {
    dijkstraHeap.run(map, callback, FibonacciHeap);
  };

  return module;
}));
