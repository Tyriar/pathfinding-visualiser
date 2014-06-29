/*! pathfinding-visualiser | (c) 2014 Daniel Imms | https://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE */
// UMD pattern: https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['core', 'canvas-helper', 'binary-heap', 'map-node', 'a-star-common'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./core'), require('./canvas-helper'), require('./binary-heap'), require('./map-node'), require('./a-star-common'));
  } else {
    root.aStarBinaryHeap = factory(core, canvasHelper, BinaryHeap, MapNode, aStarCommon);
  }
}(this, function (core, canvasHelper, BinaryHeap, MapNode, aStarCommon) {
  'use strict';

  var module = {};

  module.run = function (map, callback) {
    var closedList = {};
    var openHash = {};
    var openList = new BinaryHeap();
    var start = map.start;
    var goal = map.goal;
    var queuedPaints = [];

    start.f = start.g + aStarCommon.heuristic(start, goal);
    openHash[start.x + ',' + start.y] = openList.insert(start.f, start);

    while (!openList.isEmpty()) {
      var current = openList.extractMinimum();

      if (current.value.equals(goal)) {
        var finish = performance.now();
        var message = aStarCommon.buildSummaryMessage(
            map, openList.size(), Object.keys(closedList).length);
        var list = openList.list;
        for (var i = 0; i < list.length; i++) {
          list[i] = list[i].value;
        }
        callback(message, queuedPaints, current.value, list, finish);
        return;
      }

      var currentKey = current.value.x + ',' + current.value.y;
      openHash[currentKey] = undefined;
      closedList[currentKey] = current;

      queuedPaints.push({
        f: canvasHelper.drawVisited,
        x: current.value.x,
        y: current.value.y
      });

      var neighbours = aStarCommon.getNeighbourNodes(map, current.value);
      addNodesToOpenList(neighbours, openList, openHash, closedList, goal, queuedPaints);
    }

    callback([{ result: 'No path exists' }], queuedPaints, undefined, undefined, performance.now());
  };

  function addNodesToOpenList(nodes, openList, openHash, closedList, goal, queuedPaints) {
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].x + ',' + nodes[i].y;

      // Skip if in closed list
      if (key in closedList) {
        continue;
      }

      var nodeByHash = openHash[key];

      if (nodeByHash) {
        if (nodes[i].g < nodeByHash.g) {
          nodeByHash.g = nodes[i].g;
          nodeByHash.parent = nodes[i].parent;
          openList.decreaseKey(nodeByHash, nodeByHash.g +
              aStarCommon.heuristic(nodeByHash, goal));
        }
      } else {
        nodes[i].f = nodes[i].g +
            aStarCommon.heuristic(nodes[i], goal);
        openHash[key] = openList.insert(nodes[i].f, nodes[i]);
        queuedPaints.push({
          f: canvasHelper.drawOpenListNode,
          x: nodes[i].x,
          y: nodes[i].y
        });
      }
    }
  }

  return module;
}));
