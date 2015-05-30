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

  module.getNeighbourNodes = function (map, node, queueNodes) {
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
        var key = x + ',' + y;
        var neighbour;
        if (typeof queueNodes[key] === 'undefined') {
          neighbour = new MapNode(x, y);
        } else {
          neighbour = queueNodes[key].value;
        }
        neighbour.g = cost;
        neighbours.push(neighbour);
      }
    }

    return neighbours;
  };

  module.buildSummaryMessage = function (map, visitedNodeCount) {
    return [{
      result: 'Map size = ' + map.width + 'x' + map.height
    }, {
      result: 'Number of visited nodes = ' + visitedNodeCount,
      colour: canvasHelper.CLOSED_LIST_COLOUR
    }];
  };

  return module;
}));
