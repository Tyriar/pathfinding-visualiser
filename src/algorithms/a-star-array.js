/*! pathfinding-visualiser | (c) 2014 Daniel Imms | https://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE */
// UMD pattern: https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['core', 'canvas-helper', 'map-node'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./core'), require('./canvas-helper'), require('./map-node'));
  } else {
    root.aStarArray = factory(core, canvasHelper, MapNode);
  }
}(this, function (core, canvasHelper, MapNode) {
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


    start.f = start.g + heuristic(start, goal);
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

      addNodeNeighboursToOpenList(map, openList, closedList, current);
    }

    callback('No path exists');
  };

  function addNodeNeighboursToOpenList(map, openList, closedList, node) {
    var neighbours = neighbourNodes(map, node);
    for (var i = 0; i < neighbours.length; i++) {
      // Skip if in closed list
      if (indexOfNode(closedList, neighbours[i]) === -1) {
        var index = indexOfNode(openList, neighbours[i]);
        if (index === -1) {
          neighbours[i].f = neighbours[i].g + heuristic(neighbours[i], map.goal);
          openList.push(neighbours[i]);
        } else if (neighbours[i].g < openList[index].g) {
          neighbours[i].f = neighbours[i].g + heuristic(neighbours[i], map.goal);
          openList[index] = neighbours[i];
        }
      }
    }
  }

  function neighbourNodes(map, n) {
    var neighbours = [];
    var count = 0;

    if (n.x > 0) {
      if (map[n.x - 1][n.y]) {
        neighbours[count++] = new MapNode(n.x - 1, n.y, n, COST_STRAIGHT);
      }
      if (n.y > 0 && map[n.x - 1][n.y - 1]) {
        if (map[n.x - 1][n.y] && map[n.x][n.y - 1]) {
          neighbours[count++] = new MapNode(n.x - 1, n.y - 1, n, COST_DIAGONAL);
        }
      }
      if (n.y < core.MAP_HEIGHT && map[n.x - 1][n.y + 1]) {
        if (map[n.x - 1][n.y] && map[n.x][n.y + 1]) {
          neighbours[count++] = new MapNode(n.x - 1, n.y + 1, n, COST_DIAGONAL);
        }
      }
    }
    if (n.x < core.MAP_WIDTH - 1) {
      if (map[n.x + 1][n.y]) {
        neighbours[count++] = new MapNode(n.x + 1, n.y, n, COST_STRAIGHT);
      }
      if (n.y > 0 && map[n.x + 1][n.y - 1]) {
        if (map[n.x + 1][n.y] && map[n.x][n.y - 1]) {
          neighbours[count++] = new MapNode(n.x + 1, n.y - 1, n, COST_DIAGONAL);
        }
      }
      if (n.y < core.MAP_HEIGHT && map[n.x + 1][n.y + 1]) {
        if (map[n.x + 1][n.y] && map[n.x][n.y + 1]) {
          neighbours[count++] = new MapNode(n.x + 1, n.y + 1, n, COST_DIAGONAL);
        }
      }
    }
    if (n.y > 0 && map[n.x][n.y - 1]) {
      neighbours[count++] = new MapNode(n.x, n.y - 1, n, COST_STRAIGHT);
    }
    if (n.y < core.MAP_HEIGHT - 1 && map[n.x][n.y + 1]) {
      neighbours[count++] = new MapNode(n.x, n.y + 1, n, COST_STRAIGHT);
    }

    return neighbours;
  }

  function indexOfNode(array, node) {
    for (var i = 0; i < array.length; i++) {
      if (node.equals(array[i])) {
        return i;
      }
    }
    return -1;
  }

  function heuristic(node, goal) {
    // Diagonal distance
    var dmin = Math.min(Math.abs(node.x - goal.x), Math.abs(node.y - goal.y));
    var dmax = Math.max(Math.abs(node.x - goal.x), Math.abs(node.y - goal.y));
    return COST_DIAGONAL * dmin + COST_STRAIGHT * (dmax - dmin);
  }

  return module;
}));
