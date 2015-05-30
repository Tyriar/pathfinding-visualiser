/**
 * @license
 * pathfinding-visualiser <http://github.com/Tyriar/pathfinding-visualiser>
 * Copyright 2014 Daniel Imms <http://www.growingwiththeweb.com>
 * Released under the MIT license <http://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE>
 */
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['core', 'canvas-helper', 'map-node', 'dijkstra-common'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('../core'),
                             require('../canvas-helper'),
                             require('../map-node'),
                             require('./dijkstra-common'));
  }
}(this, function (core, canvasHelper, MapNode, dijkstraCommon) {
  'use strict';

  var module = {};

  module.run = function (map, callback, Heap) {
    var distance = {};
    var queue = new Heap();
    var queueNodes = {};
    var queuedPaints = [];
    var i;

    var startKey = map.start.getHashKey();
    distance[startKey] = 0;
    queue.insert(0, map.start);

    while (!queue.isEmpty()) {
      var min = queue.extractMinimum();
      var minKey = min.value.getHashKey();
      var neighbours = dijkstraCommon.getNeighbourNodes(map, min.value, queueNodes);

      queuedPaints.push({
        f: canvasHelper.drawVisited,
        x: min.value.x,
        y: min.value.y
      });

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
            var visitedNodeCount = calculateVisitedNodeCount(distance);
            var message = dijkstraCommon.buildSummaryMessage(map, visitedNodeCount);
            callback(message, queuedPaints, neighbour, [], finish);
            return;
          }

          if (typeof queueNodes[neighbourKey] === 'undefined') {
            queue.insert(alt, neighbour);
          } else {
            queue.decreaseKey(queueNodes[neighbourKey], alt);
          }
        }
      }
    }

    callback([{ result: 'No path exists' }], queuedPaints, undefined, undefined, core.timeNow());
  };

  function calculateVisitedNodeCount(distanceMap) {
    var visitedNodeCount = 0;
    var distanceKeys = Object.keys(distanceMap);
    for (var j = 0; j < distanceKeys.length; j++) {
      if (distanceMap[distanceKeys[j]] < Number.MAX_VALUE) {
        visitedNodeCount++;
      }
    }
    return visitedNodeCount;
  }

  return module;
}));
