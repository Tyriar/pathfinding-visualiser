/*! pathfinding-visualiser | (c) 2014 Daniel Imms | https://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE */
// UMD pattern: https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['core', 'canvas-helper', 'map-node', 'a-star-common'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./core'), require('./canvas-helper'), require('./map-node'), require('./a-star-common'));
  } else {
    root.aStarArray = factory(core, canvasHelper, MapNode, aStarCommon);
  }
}(this, function (core, canvasHelper, MapNode, aStarCommon) {
  'use strict';

  var COST_STRAIGHT = 1;
  var COST_DIAGONAL = 1.414;

  var module = {};

  module.run = function (map, callback) {
    var i;
    var closedList = [];
    var openList = [];
    var start = map.start;
    var goal = map.goal;


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
        canvasHelper.draw(closedList, openList, start, current);
        callback('Map size = ' + core.MAP_WIDTH + 'x' + core.MAP_HEIGHT + '<br />' +
                 'Total number of nodes = ' + core.MAP_WIDTH * core.MAP_HEIGHT + '<br />' +
                 'Number of nodes in open list = ' + openList.length + '<br />' +
                 'Number of nodes in closed list = ' + closedList.length);
        return;
      }

      openList.splice(lowestF, 1);
      closedList.push(current);
      canvasHelper.drawVisited(current.x, current.y);

      var neighbours = aStarCommon.getNeighbourNodes(map, current);
      addNodesToOpenList(neighbours, goal, openList, closedList);
    }

    callback('No path exists');
  };

  function addNodesToOpenList(nodes, goal, openList, closedList) {
    for (var i = 0; i < nodes.length; i++) {
      // Skip if in closed list
      if (indexOfNode(closedList, nodes[i]) === -1) {
        var index = indexOfNode(openList, nodes[i]);
        if (index === -1) {
          nodes[i].f = nodes[i].g +
              aStarCommon.heuristic(nodes[i], goal);
          openList.push(nodes[i]);
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
