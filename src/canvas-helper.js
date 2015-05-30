/**
 * @license
 * pathfinding-visualiser <http://github.com/Tyriar/pathfinding-visualiser>
 * Copyright 2014 Daniel Imms <http://www.growingwiththeweb.com>
 * Released under the MIT license <http://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE>
 */
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['core'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./core'));
  }
}(this, function (core) {
  'use strict';

  var module = {};

  var PATH_WIDTH = 4;

  module.BACKGROUND_COLOUR = '#F5F5F5';
  module.OBSTACLE_COLOUR = '#212121';
  module.PATH_COLOUR = '#12c700';
  module.CLOSED_LIST_COLOUR = '#01579b';
  module.OPEN_LIST_COLOUR = '#29b6f6';

  var canvas;
  var context;

  module.setCanvas = function (canvasElement) {
    canvas = canvasElement;
    if (canvas && canvas.getContext) {
      context = canvas.getContext('2d');
    }
  };

  module.drawObstacles = function (map) {
    for (var x = 0; x < core.MAP_WIDTH; x++) {
      for (var y = 0; y < core.MAP_HEIGHT; y++) {
        if (!map[x][y]) {
          module.drawObstacle(x, y);
        }
      }
    }
  };

  module.drawObstacle = function (x, y) {
    module.drawNode(x, y, module.OBSTACLE_COLOUR);
  };

  module.clearObstacle = function (x, y) {
    module.drawNode(x, y, module.BACKGROUND_COLOUR);
  };

  module.drawVisited = function (x, y) {
    module.drawNode(x, y, module.CLOSED_LIST_COLOUR);
  };

  module.drawOpenListNode = function (x, y) {
    module.drawNode(x, y, module.OPEN_LIST_COLOUR);
  };

  module.drawStartGoal = function (x, y) {
    module.drawNode(x, y, module.PATH_COLOUR);
  };

  module.drawNode = function (x, y, COLOUR) {
    context.fillStyle = COLOUR;
    context.fillRect(x * core.MAP_SCALE, y * core.MAP_SCALE, core.MAP_SCALE, core.MAP_SCALE);
  };

  module.clearCanvas = function () {
    context.fillStyle = module.BACKGROUND_COLOUR;
    context.fillRect(0, 0, core.CANVAS_WIDTH, core.CANVAS_HEIGHT);
  };

  module.draw = function (closedList, openList, startNode, goalNode) {
    module.drawStartGoal(goalNode.x, goalNode.y);
    module.drawStartGoal(startNode.x, startNode.y);

    context.beginPath();
    context.moveTo((goalNode.x + 0.5) * core.MAP_SCALE, (goalNode.y + 0.5) * core.MAP_SCALE);

    for (var i = 0; i < openList.length; i++) {
      module.drawOpenListNode(openList[i].x, openList[i].y);
    }

    while (goalNode.parent) {
      goalNode = goalNode.parent;
      context.lineTo((goalNode.x + 0.5) * core.MAP_SCALE, (goalNode.y + 0.5) * core.MAP_SCALE);
    }

    context.strokeStyle = module.PATH_COLOUR;
    context.lineWidth = PATH_WIDTH;
    context.stroke();
    context.closePath();
  };

  module.drawPath = function (goalNode) {
    context.beginPath();
    context.moveTo((goalNode.x + 0.5) * core.MAP_SCALE, (goalNode.y + 0.5) * core.MAP_SCALE);

    while (goalNode.parent) {
      goalNode = goalNode.parent;
      context.lineTo((goalNode.x + 0.5) * core.MAP_SCALE, (goalNode.y + 0.5) * core.MAP_SCALE);
    }

    context.strokeStyle = module.PATH_COLOUR;
    context.lineWidth = PATH_WIDTH;
    context.stroke();
    context.closePath();
  };

  module.getCanvasWidth = function () {
    canvas.setAttribute('width', canvas.clientWidth);
    return canvas.clientWidth;
  };

  module.getCanvasHeight = function () {
    canvas.setAttribute('height', canvas.clientHeight);
    return canvas.clientHeight;
  };

  return module;
}));
