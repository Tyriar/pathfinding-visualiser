/*! pathfinding-visualiser | (c) 2012-2014 Daniel Imms | https://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE */
// UMD pattern: https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['core', 'canvas-helper', 'map'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./core'), require('./canvas-helper'), require('./map'));
  } else {
    root.canvasHelper = factory(core, canvasHelper, Map);
  }
}(this, function (core, canvasHelper, Map) {
  'use strict';

  var module = {};

  var map;
  var algorithmDelegate;
  var resizeTimeout;

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
    canvasHelper.clearCanvas();
    map.clear();
  };

  module.run = function (callback) {
    var startTime = performance.now();
    canvasHelper.clearCanvas();
    canvasHelper.drawObstacles(map);
    algorithmDelegate.run(map, function (results) {
      var message = '';
      var duration = performance.now() - startTime
      results.push({ result: 'Operation took ' + duration.toFixed(2) + 'ms' });
      for (var i = 0; i < results.length; i++) {
        var r = results[i];
        if (r.colour) {
          message += '<pv-summary-line hascolour colour="' + r.colour + '">' +
              r.result + '</pv-summary-line>';
        } else {
          message += '<pv-summary-line>' + r.result + '</pv-summary-line>';
        }
      }
      callback(message);
    });
  };

  module.generateMap = function (mapScale, obstacleDensity, obstacleSize) {
    core.setMapScale(mapScale);
    canvasHelper.clearCanvas();
    map.generate(core.MAP_WIDTH, core.MAP_HEIGHT, obstacleDensity, obstacleSize);
    canvasHelper.drawObstacles(map);
  };

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
