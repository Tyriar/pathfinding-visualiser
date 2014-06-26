var canvasHelper = (function () {
  'use strict';

  var module = {};

  var PATH_WIDTH       = 4;
  var BACKGROUND_COLOR = '#EEE';
  var OBSTACLE_COLOR   = '#2D2D30';
  var PATH_COLOR       = '#0C0';
  var VISITED_COLOR    = '#44F';

  var context;

  module.setCanvas = function (canvasElement) {
    if (canvasElement && canvasElement.getContext) {
      context = canvasElement.getContext('2d');
    }
  }

  module.drawObstacles = function (map) {
    for (var x = 0; x < core.MAP_WIDTH; x++) {
      for (var y = 0; y < core.MAP_HEIGHT; y++) {
        if (!map[x][y]) {
          module.drawObstacle(x, y);
        }
      }
    }
  }

  module.drawObstacle = function (x, y) {
    module.drawNode(x, y, OBSTACLE_COLOR);
  };

  module.clearObstacle = function (x, y) {
    module.drawNode(x, y, BACKGROUND_COLOR);
  };

  module.drawVisited = function (x, y) {
    module.drawNode(x, y, VISITED_COLOR);
  };

  module.drawStartGoal = function (x, y) {
    module.drawNode(x, y, PATH_COLOR);
  };

  module.drawNode = function (x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * core.MAP_SCALE, y * core.MAP_SCALE, core.MAP_SCALE, core.MAP_SCALE);
  };

  module.clearCanvas = function () {
    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(0, 0, core.CANVAS_WIDTH, core.CANVAS_HEIGHT);
  }

  module.draw = function (closed, open, startNode, goalNode) {
    canvasHelper.drawStartGoal(goalNode.x, goalNode.y);
    canvasHelper.drawStartGoal(startNode.x, startNode.y);

    context.beginPath();
    context.moveTo((goalNode.x + 0.5) * core.MAP_SCALE, (goalNode.y + 0.5) * core.MAP_SCALE);

    while (goalNode.parent) {
      goalNode = goalNode.parent;
      context.lineTo((goalNode.x + 0.5) * core.MAP_SCALE, (goalNode.y + 0.5) * core.MAP_SCALE);
    }

    context.strokeStyle = PATH_COLOR;
    context.lineWidth = PATH_WIDTH;
    context.stroke();
    context.closePath();
  }

  return module;
})();
