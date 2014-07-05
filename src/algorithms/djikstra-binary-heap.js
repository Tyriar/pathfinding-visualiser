/*! pathfinding-visualiser | (c) 2014 Daniel Imms | https://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE */
// UMD pattern: https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['core', 'canvas-helper', 'binary-heap', 'map-node', 'djikstra-common'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('../core'),
                             require('../canvas-helper'),
                             require('../../bower_components/js-data-structures/src/binary-heap'),
                             require('../map-node'),
                             require('./djikstra-common'));
  } else {
    root.djikstraBinaryHeap = factory(core, canvasHelper, BinaryHeap, MapNode, aStarCommon);
  }
}(this, function (core, canvasHelper, BinaryHeap, MapNode, djikstraCommon) {
  'use strict';

  var module = {};

  module.run = function (map, callback) {
    var distance = {};
    var queue = new BinaryHeap();
    var queueNodes = {};
    var queuedPaints = [];
    var x, y, i;

    var startKey = map.start.getHashKey();
    distance[startKey] = 0;

    queue.insert(0, map.start);

    while (!queue.isEmpty()) {
      var min = queue.extractMinimum();
      var minKey = min.value.getHashKey();
      var neighbours = djikstraCommon.getNeighbourNodes(map, min.value, queueNodes);

      for (i = 0; i < neighbours.length; i++) {
        var neighbour = neighbours[i];
        var neighbourKey = neighbour.getHashKey();
        var alt = distance[minKey] + neighbour.g;

        if (typeof queueNodes[neighbourKey] === 'undefined' &&
            (typeof distance[neighbourKey] === 'undefined' || alt < distance[neighbourKey])) {
          distance[neighbourKey] = alt;
          neighbour.parent = min.value;

          if (neighbour.equals(map.goal)) {
            var finish = core.timeNow();
            var visitedNodeCount = 0;
            var distanceKeys = Object.keys(distance);
            for (var j = 0; j < distanceKeys.length; j++) {
              if (distance[distanceKeys[j]] < Number.MAX_VALUE) {
                visitedNodeCount++;
              }
            }
            var message = djikstraCommon.buildSummaryMessage(map, visitedNodeCount);
            callback(message, queuedPaints, neighbour, [], finish);
            return;
          }

          if (typeof queueNodes[neighbourKey] === 'undefined') {
            queuedPaints.push({
              f: canvasHelper.drawVisited,
              x: neighbours[i].x,
              y: neighbours[i].y
            });
            queue.insert(alt, neighbour);
          } else {
            queue.decreaseKey(queueNodes[neighbourKey], alt);
          }
        }
      }
    }

    callback([{ result: 'No path exists' }], queuedPaints, undefined, undefined, core.timeNow());
  };

  return module;
}));
