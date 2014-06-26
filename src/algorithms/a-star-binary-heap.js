var aStar = (function (core, canvasHelper, BinaryHeap) {
  'use strict';

  var COST_STRAIGHT = 1;
  var COST_DIAGONAL = 1.414;

  var module = {};

  module.run = function (map, start, goal, callback) {
    var cameFrom = [];
    var closedList = {};
    var openHash = {};
    var openList = new BinaryHeap();

    start.f = start.g + heuristic(start, goal);
    openHash[start.x + ',' + start.y] = openList.insert(start.f, start);

    while (!openList.isEmpty()) {
      var current = openList.extractMinimum();

      if (nodeCompare(current.value, goal)) {
        canvasHelper.draw(closed, openList, start, current.value);
        callback('Map size = ' + core.MAP_WIDTH + 'x' + core.MAP_HEIGHT + '<br />' +
                 'Total number of nodes = ' + core.MAP_WIDTH * core.MAP_HEIGHT + '<br />' +
                 //'Number of nodes in open list = ' + openList.size() + '<br />' +
                 'Number of nodes in closed list = ' + Object.keys(closedList).length);
        return;
      }

      openHash[current.value.x + ',' + current.value.y] = undefined;
      closedList[current.value.x + ',' + current.value.y] = current;
      canvasHelper.drawVisited(current.value.x, current.value.y);

      var neighbors = neighborNodes(map, current.value);
      for (var i = 0; i < neighbors.length; i++) {
        var key = neighbors[i].x + ',' + neighbors[i].y;
        if (!(key in closedList)) { // Skip if in closed list
          var nodeByHash = openHash[key];
          if (nodeByHash) {
            if (neighbors[i].g < nodeByHash.g) {
              nodeByHash.g = neighbors[i].g;
              nodeByHash.parent = neighbors[i].parent;
              openList.decreaseKey(nodeByHash, nodeByHash.g + heuristic(nodeByHash, goal));
            }
          } else {
            neighbors[i].f = neighbors[i].g + heuristic(neighbors[i], goal);
            openHash[key] = openList.insert(neighbors[i].f, neighbors[i]);;
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
      if (map[n.x - 1][n.y])
        neighbors[count++] = new core.Node(n.x - 1, n.y, n, COST_STRAIGHT);
      if (n.y > 0 && map[n.x - 1][n.y - 1]) {
        if (map[n.x - 1][n.y] && map[n.x][n.y - 1])
          neighbors[count++] = new core.Node(n.x - 1, n.y - 1, n, COST_DIAGONAL);
      }
      if (n.y < core.MAP_HEIGHT && map[n.x - 1][n.y + 1]) {
        if (map[n.x - 1][n.y] && map[n.x][n.y + 1])
          neighbors[count++] = new core.Node(n.x - 1, n.y + 1, n, COST_DIAGONAL);
      }
    }
    if (n.x < core.MAP_WIDTH - 1) {
      if (map[n.x + 1][n.y])
        neighbors[count++] = new core.Node(n.x + 1, n.y, n, COST_STRAIGHT);
      if (n.y > 0 && map[n.x + 1][n.y - 1]) {
        if (map[n.x + 1][n.y] && map[n.x][n.y - 1])
          neighbors[count++] = new core.Node(n.x + 1, n.y - 1, n, COST_DIAGONAL);
      }
      if (n.y < core.MAP_HEIGHT && map[n.x + 1][n.y + 1]) {
        if (map[n.x + 1][n.y] && map[n.x][n.y + 1])
          neighbors[count++] = new core.Node(n.x + 1, n.y + 1, n, COST_DIAGONAL);
      }
    }
    if (n.y > 0 && map[n.x][n.y - 1])
      neighbors[count++] = new core.Node(n.x, n.y - 1, n, COST_STRAIGHT);
    if (n.y < core.MAP_HEIGHT - 1 && map[n.x][n.y + 1])
      neighbors[count++] = new core.Node(n.x, n.y + 1, n, COST_STRAIGHT);

    neighbors[count++]
    return neighbors;
  }

  function indexOfNode(array, node) {
    for (var i = 0; i < array.length; i++) {
      if (nodeCompare(node, array[i])) {
        return i;
      }
    }
    return -1;
  }

  function nodeCompare(nodeA, nodeB) {
    return nodeA.x == nodeB.x && nodeA.y == nodeB.y;
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
})(core, canvasHelper, this.BinaryHeap);
