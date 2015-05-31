/**
 * @license
 * pathfinding-visualiser <http://github.com/Tyriar/pathfinding-visualiser>
 * Copyright 2014 Daniel Imms <http://www.growingwiththeweb.com>
 * Released under the MIT license <http://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE>
 */
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['a-star-heap', 'binary-heap'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./a-star-heap'),
                             require('../../bower_components/js-data-structures/lib/binary-heap'));
  }
}(this, function (aStarHeap, BinaryHeap) {
  'use strict';

  var module = {};

  module.run = function (map, callback) {
    aStarHeap.run(map, callback, BinaryHeap, function (heap) {
      var list = heap.list;
      for (var i = 0; i < list.length; i++) {
        list[i] = list[i].value;
      }
      return list;
    });
  };

  return module;
}));
