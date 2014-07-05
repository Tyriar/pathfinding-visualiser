/*! pathfinding-visualiser | (c) 2014 Daniel Imms | https://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE */
// UMD pattern: https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['core', 'canvas-helper', 'fibonacci-heap', 'map-node', 'djikstra-common'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('../core'),
                             require('../canvas-helper'),
                             require('../../bower_components/js-data-structures/src/fibonacci-heap'),
                             require('../map-node'),
                             require('./djikstra-common'));
  } else {
    root.djikstraFibonacciHeap = factory(core, canvasHelper, FibonacciHeap, MapNode, aStarCommon);
  }
}(this, function (core, canvasHelper, FibonacciHeap, MapNode, djikstraCommon) {
  'use strict';

  var module = {};

  module.run = function (map, callback) {
    var distance = {};
    var queue = new FibonacciHeap();
    var queueNodes = {};
    var queuedPaints = [];
    var x, y, i;

    var startKey = map.start.getHashKey();
    distance[startKey] = 0;

    for (x = 0; x < map.width; x++) {
      for (y = 0; y < map.height; y++) {
        if (map.isOnMap(x, y)) {
          var key = x + ',' + y;
          if (distance[key] === undefined) {
            distance[key] = Number.MAX_VALUE;
          }
          var node = new MapNode(x, y);
          var heapNode = queue.insert(distance[key], node);
          queueNodes[key] = heapNode;
        }
      }
    }

    while (!queue.isEmpty()) {
      var min = queue.extractMinimum();
      var minKey = min.getHashKey();
      var neighbours = djikstraCommon.getNeighbourNodes(map, min.value, queueNodes);

      for (i = 0; i < neighbours.length; i++) {
        var neighbour = neighbours[i];
        var neighbourKey = neighbour.getHashKey();
        var alt = distance[minKey] + neighbour.g;

        if (alt < distance[neighbourKey]) {
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

          queuedPaints.push({
            f: canvasHelper.drawVisited,
            x: neighbours[i].x,
            y: neighbours[i].y
          });
          queue.decreaseKey(queueNodes[neighbourKey], alt);
        }
      }
    }

    callback([{ result: 'No path exists' }], queuedPaints, undefined, undefined, core.timeNow());
  };

  return module;
}));
