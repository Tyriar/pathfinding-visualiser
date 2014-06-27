// UMD pattern: https://github.com/umdjs/umd/blob/master/returnExportsGlobal.js
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['core', 'canvas-helper', 'map-node'], function (core, canvasHelper, MapNode) {
      return (root.aStarArray = factory(core, canvasHelper, Node));
    });
  } else if (typeof exports === 'object') {
    module.exports = factory(require('core'), require('canvas-helper'), require('map-node'));
  } else {
    root.aStarArray = factory(core, canvasHelper, MapNode);
  }
}(this, function (core, canvasHelper, Node) {
  'use strict';

  var COST_STRAIGHT = 1;
  var COST_DIAGONAL = 1.414;

  var module = {};

  module.run = function (map, start, goal, callback) {
    var i;
    var closed = [];
    var open = [start];
    var cameFrom = [];

    open[0].f = open[0].g + heuristic(open[0], goal);

    while (open.length > 0) {
      var lowestF = 0;
      for (i = 1; i < open.length; i++) {
        if (open[i].f < open[lowestF].f) {
          lowestF = i;
        }
      }
      var current = open[lowestF];

      if (current.equals(goal)) {
        canvasHelper.draw(closed, open, start, current);
        callback('Map size = ' + core.MAP_WIDTH + 'x' + core.MAP_HEIGHT + '<br />' +
                 'Total number of nodes = ' + core.MAP_WIDTH * core.MAP_HEIGHT + '<br />' +
                 'Number of nodes in open list = ' + open.length + '<br />' +
                 'Number of nodes in closed list = ' + closed.length);
        return;
      }

      open.splice(lowestF, 1);
      closed[closed.length] = current;
      canvasHelper.drawVisited(current.x, current.y);

      var neighbors = neighborNodes(map, current);
      for (i = 0; i < neighbors.length; i++) {
        if (indexOfNode(closed, neighbors[i]) == -1) { // Skip if in closed list
          var index = indexOfNode(open, neighbors[i]);
          if (index == -1) {
            neighbors[i].f = neighbors[i].g + heuristic(neighbors[i], goal);
            open[open.length] = neighbors[i];
          } else if (neighbors[i].g < open[index].g) {
            neighbors[i].f = neighbors[i].g + heuristic(neighbors[i], goal);
            open[index] = neighbors[i];
          }
        }
      }
    }

    callback('No path exists');
  };

  function neighborNodes(map, n) {
    var neighbors = [];
    var count = 0;

    if (n.x > 0) {
      if (map[n.x - 1][n.y]) {
        neighbors[count++] = new Node(n.x - 1, n.y, n, COST_STRAIGHT);
      }
      if (n.y > 0 && map[n.x - 1][n.y - 1]) {
        if (map[n.x - 1][n.y] && map[n.x][n.y - 1]) {
          neighbors[count++] = new Node(n.x - 1, n.y - 1, n, COST_DIAGONAL);
        }
      }
      if (n.y < core.MAP_HEIGHT && map[n.x - 1][n.y + 1]) {
        if (map[n.x - 1][n.y] && map[n.x][n.y + 1]) {
          neighbors[count++] = new Node(n.x - 1, n.y + 1, n, COST_DIAGONAL);
        }
      }
    }
    if (n.x < core.MAP_WIDTH - 1) {
      if (map[n.x + 1][n.y]) {
        neighbors[count++] = new Node(n.x + 1, n.y, n, COST_STRAIGHT);
      }
      if (n.y > 0 && map[n.x + 1][n.y - 1]) {
        if (map[n.x + 1][n.y] && map[n.x][n.y - 1]) {
          neighbors[count++] = new Node(n.x + 1, n.y - 1, n, COST_DIAGONAL);
        }
      }
      if (n.y < core.MAP_HEIGHT && map[n.x + 1][n.y + 1]) {
        if (map[n.x + 1][n.y] && map[n.x][n.y + 1]) {
          neighbors[count++] = new Node(n.x + 1, n.y + 1, n, COST_DIAGONAL);
        }
      }
    }
    if (n.y > 0 && map[n.x][n.y - 1]) {
      neighbors[count++] = new Node(n.x, n.y - 1, n, COST_STRAIGHT);
    }
    if (n.y < core.MAP_HEIGHT - 1 && map[n.x][n.y + 1]) {
      neighbors[count++] = new Node(n.x, n.y + 1, n, COST_STRAIGHT);
    }

    return neighbors;
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
    return diagonalDistance(node, goal);
  }

  function manhattanDistance(node, goal) {
    return Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y);
  }

  function diagonalUniformDistance(node, goal) {
    return Math.max(Math.abs(node.x - goal.x), Math.abs(node.y - goal.y));
  }

  function diagonalDistance(node, goal) {
    var dmin = Math.min(Math.abs(node.x - goal.x), Math.abs(node.y - goal.y));
    var dmax = Math.max(Math.abs(node.x - goal.x), Math.abs(node.y - goal.y));
    return COST_DIAGONAL * dmin + COST_STRAIGHT * (dmax - dmin);
  }

  function euclideanDistance(node, goal) {
    return Math.sqrt(Math.abs(node.x - goal.x) ^ 2 + Math.abs(node.y - goal.y) ^ 2);
  }

  return module;
}));
