/**
 * @license
 * pathfinding-visualiser <http://github.com/Tyriar/pathfinding-visualiser>
 * Copyright 2012 Daniel Imms <http://www.growingwiththeweb.com>
 * Released under the MIT license <http://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE>
 */
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['core', 'canvas-helper', 'map'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./core'), require('./canvas-helper'), require('./map'));
  }
}(this, function (core, canvasHelper, Map) {
  'use strict';

  var module = {};

  var map;
  var algorithmDelegate;
  var resizeTimeout;
  var paintNodesTimeout;

  module.init = function (canvasElement) {
    canvasHelper.setCanvas(canvasElement);
    core.setCanvasDimensions(canvasHelper.getCanvasWidth(), canvasHelper.getCanvasHeight());

    map = new Map(core.MAP_WIDTH, core.MAP_HEIGHT);

    module.clear();

    window.addEventListener('resize', resizeWindow);
  };

  module.setAlgorithm = function (algorithm) {
    algorithmDelegate = algorithm;
  };

  module.setGoalToMouse = function (e) {
    var position = getPosition(e);
    // Convert from mouse to map coords
    position.x = Math.floor(position.x / core.MAP_SCALE);
    position.y = Math.floor(position.y / core.MAP_SCALE);
    map.setGoal(position.x, position.y);
  };

  module.clear = function () {
    if (paintNodesTimeout) {
      clearTimeout(paintNodesTimeout);
    }
    canvasHelper.clearCanvas();
    map.clear();
  };

  module.run = function (callback, getSpeed) {
    if (paintNodesTimeout) {
      clearTimeout(paintNodesTimeout);
    }
    canvasHelper.clearCanvas();
    canvasHelper.drawObstacles(map);

    var startTime = window.performance.now();
    algorithmDelegate.run(map, function (results, queuedPaints, goalNode, openList, finish) {
      var message = '';
      var duration = finish - startTime;
      results.push({ result: 'Operation took ' + duration.toFixed(2) + 'ms' });
      for (var i = 0; i < results.length; i++) {
        var r = results[i];
        if (r.colour) {
          message += '<pathfinding-visualiser-summary-line hascolour colour="' + r.colour + '">' +
              r.result + '</pathfinding-visualiser-summary-line>';
        } else {
          message += '<pathfinding-visualiser-summary-line>' + r.result + '</pathfinding-visualiser-summary-line>';
        }
      }

      canvasHelper.drawStartGoal(map.start.x, map.start.y);
      paintNodes(queuedPaints, goalNode, openList, getSpeed ? getSpeed : 0);

      callback(message);
    });
  };

  module.generateMap = function (mapScale, obstacleDensity, obstacleSize) {
    if (paintNodesTimeout) {
      clearTimeout(paintNodesTimeout);
    }
    core.setMapScale(mapScale);
    canvasHelper.clearCanvas();
    map.generate(core.MAP_WIDTH, core.MAP_HEIGHT, obstacleDensity, obstacleSize);
    canvasHelper.drawObstacles(map);
  };

  function paintNodes(queuedPaints, goalNode, openList, getSpeed) {
    if (!queuedPaints.length) {
      return;
    }
    var paint = queuedPaints.shift();
    if (paint.x !== map.start.x || paint.y !== map.start.y) {
      paint.f.call(null, paint.x, paint.y);
    }
    if (queuedPaints.length) {
      if (getSpeed) {
        paintNodesTimeout = setTimeout(function () {
          paintNodes(queuedPaints, goalNode, openList, getSpeed);
        }, getSpeed());
      } else {
        if (queuedPaints.length % 200 === 0) {
          // Prevent max call stack and let renderer catch up
          setTimeout(function () {
            paintNodes(queuedPaints, goalNode, openList, getSpeed);
          }, 0);
        } else {
          paintNodes(queuedPaints, goalNode, openList, getSpeed);
        }
      }
    } else {
      // Only draw the path if a path was found
      if (goalNode) {
        canvasHelper.drawStartGoal(goalNode.x, goalNode.y);
        canvasHelper.drawPath(goalNode, openList);
      }
    }
  }

  function getPosition(e) {
    var target;
    if (!e) {
      e = window.event;
    }
    if (e.target) {
      target = e.target;
    }
    else if (e.srcElement) {
      target = e.srcElement;
    }
    if (target.nodeType === 3) {
      target = target.parentNode;
    }

    var x = e.pageX - target.offsetLeft;
    var y = e.pageY - target.offsetTop;

    return { 'x': x, 'y': y };
  }

  function resizeWindow() {
    window.clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeMap, 200);
  }

  function resizeMap() {
    core.setCanvasDimensions(canvasHelper.getCanvasWidth(), canvasHelper.getCanvasHeight());
    module.clear();
    module.generateMap();
    map.setGoal(core.MAP_WIDTH - 1, core.MAP_HEIGHT - 1);
  }

  return module;
}));
