/*! pathfinding-visualiser | (c) 2014 Daniel Imms | https://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE */
// UMD pattern: https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['map-node'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('map-node'));
  } else {
    root.aStarCommon = factory(MapNode);
  }
}(this, function (MapNode) {
  'use strict';

  var COST_STRAIGHT = 1;
  var COST_DIAGONAL = 1.414;

  var module = {};

  module.getNeighbourNodes = function (map, node) {
    var neighbours = [];

    for (var x = node.x - 1; x <= node.x + 1; x++) {
      for (var y = node.y - 1; y <= node.y + 1; y++) {
        if (x === node.x && y === node.y) {
          continue;
        }
        if (!map.isOnMap(x, y) || !map[x][y]) {
          continue;
        }
        var cost = (x === node.x || y === node.y ? COST_STRAIGHT : COST_DIAGONAL);
        neighbours.push(new MapNode(x, y, node, cost));
      }
    }

    return neighbours;
  };

  module.heuristic = function (node, goal) {
    return Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y);
  };

  module.buildSummaryMessage = function (map, openSize, closedSize) {
    return 'Map size = ' + map.width + 'x' + map.height + 
             ' (' + map.width * map.height + ' nodes)<br />' +
           'Number of nodes in open list = ' + openSize + '<br />' +
           'Number of nodes in closed list = ' + closedSize
  };

  return module;
}));
