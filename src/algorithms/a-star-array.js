/**
 * @license
 * pathfinding-visualiser <http://github.com/Tyriar/pathfinding-visualiser>
 * Copyright 2014 Daniel Imms <http://www.growingwiththeweb.com>
 * Released under the MIT license <http://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE>
 */
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['core', 'canvas-helper', 'map-node', 'a-star-common'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('../core'),
                             require('../canvas-helper'),
                             require('../map-node'),
                             require('./a-star-common'));
  }
}(this, function (core, canvasHelper, MapNode, aStarCommon) {
  'use strict';

  var module = {};

  module.run = function (map, callback) {
    var i;
    var closedList = [];
    var openList = [];
    var start = map.start;
    var goal = map.goal;
    var queuedPaints = [];

    start.f = start.g + aStarCommon.heuristic(start, goal);
    openList.push(start);

    while (openList.length > 0) {
      var lowestF = 0;
      for (i = 1; i < openList.length; i++) {
        if (openList[i].f < openList[lowestF].f) {
          lowestF = i;
        }
      }
      var current = openList[lowestF];

      if (current.equals(goal)) {
        var finish = core.timeNow();
        var message = aStarCommon.buildSummaryMessage(
            map, openList.length, closedList.length);
        callback(message, queuedPaints, current, openList, finish);
        return;
      }

      openList.splice(lowestF, 1);
      closedList.push(current);

      queuedPaints.push({
        f: canvasHelper.drawVisited,
        x: current.x,
        y: current.y
      });

      var neighbours = aStarCommon.getNeighbourNodes(map, current);
      addNodesToOpenList(neighbours, goal, openList, closedList, queuedPaints);
    }

    callback([{ result: 'No path exists' }], queuedPaints, undefined, undefined, core.timeNow());
  };

  function addNodesToOpenList(nodes, goal, openList, closedList, queuedPaints) {
    for (var i = 0; i < nodes.length; i++) {
      // Skip if in closed list
      if (indexOfNode(closedList, nodes[i]) === -1) {
        var index = indexOfNode(openList, nodes[i]);
        if (index === -1) {
          nodes[i].f = nodes[i].g +
              aStarCommon.heuristic(nodes[i], goal);
          openList.push(nodes[i]);
          queuedPaints.push({
            f: canvasHelper.drawOpenListNode,
            x: nodes[i].x,
            y: nodes[i].y
          });
        } else if (nodes[i].g < openList[index].g) {
          nodes[i].f = nodes[i].g +
              aStarCommon.heuristic(nodes[i], goal);
          openList[index] = nodes[i];
        }
      }
    }
  }

  function indexOfNode(array, node) {
    for (var i = 0; i < array.length; i++) {
      if (node.equals(array[i])) {
        return i;
      }
    }
    return -1;
  }

  return module;
}));
