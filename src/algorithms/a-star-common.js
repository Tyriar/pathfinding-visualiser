/**
 * @license
 * pathfinding-visualiser <http://github.com/Tyriar/pathfinding-visualiser>
 * Copyright 2014 Daniel Imms <http://www.growingwiththeweb.com>
 * Released under the MIT license <http://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE>
 */
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['canvas-helper', 'map-node'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('../canvas-helper'),
                             require('../map-node'));
  }
}(this, function (canvasHelper, MapNode) {
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
    return [{
      result: 'Map size = ' + map.width + 'x' + map.height
    }, {
      result: 'Number of nodes in closed list = ' + closedSize,
      colour: canvasHelper.CLOSED_LIST_COLOUR
    }, {
      result: 'Number of nodes in open list = ' + openSize,
      colour: canvasHelper.OPEN_LIST_COLOUR
    }];
  };

  return module;
}));
