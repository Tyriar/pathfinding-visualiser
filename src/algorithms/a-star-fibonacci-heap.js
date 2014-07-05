/*! pathfinding-visualiser | (c) 2014 Daniel Imms | https://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE */
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['a-star-heap', 'fibonacci-heap'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./a-star-heap'),
                             require('../../bower_components/js-data-structures/src/fibonacci-heap'));
  }
}(this, function (aStarHeap, FibonacciHeap) {
  'use strict';

  var module = {};

  module.run = function (map, callback) {
    aStarHeap.run(map, callback, FibonacciHeap, function (heap) {
      var list = [];
      while (!heap.isEmpty()) {
        list.push(heap.extractMinimum().value);
      }
      return list;
    });
  };

  return module;
}));
