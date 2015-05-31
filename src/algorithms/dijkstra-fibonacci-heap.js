/**
 * @license
 * pathfinding-visualiser <http://github.com/Tyriar/pathfinding-visualiser>
 * Copyright 2014 Daniel Imms <http://www.growingwiththeweb.com>
 * Released under the MIT license <http://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE>
 */
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['dijkstra-heap', 'fibonacci-heap'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./dijkstra-heap'),
                             require('../../bower_components/js-data-structures/lib/fibonacci-heap'));
  }
}(this, function (dijkstraHeap, FibonacciHeap) {
  'use strict';

  var module = {};

  module.run = function (map, callback) {
    dijkstraHeap.run(map, callback, FibonacciHeap);
  };

  return module;
}));
