/**
 * @license
 * pathfinding-visualiser <http://github.com/Tyriar/pathfinding-visualiser>
 * Copyright 2014 Daniel Imms <http://www.growingwiththeweb.com>
 * Released under the MIT license <http://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE>
 */
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['a-star-heap', 'fibonacci-heap'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./a-star-heap'),
                             require('../../bower_components/js-data-structures/lib/fibonacci-heap'));
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
