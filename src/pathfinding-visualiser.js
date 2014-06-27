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

  var context;
  var map;
  var start;
  var goal;
  var isMouseDown;
  var algorithmDelegate;
  var mapConfiguration;

  module.init = function (canvasElement) {
    canvasHelper.setCanvas(canvasElement);
    core.setCanvasDimensions(canvasHelper.getCanvasWidth(), canvasHelper.getCanvasHeight());

    map = new Map(core.MAP_WIDTH, core.MAP_HEIGHT);
    isMouseDown = false;

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
    algorithmDelegate.run(map, function (result) {
      var duration = performance.now() - startTime;
      result += '<br>Operation took ' + duration.toFixed(2) + 'ms';
      callback(result);
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
    if (target.nodeType == 3) {
      target = target.parentNode;
    }

    var x = e.pageX - target.offsetLeft;
    var y = e.pageY - target.offsetTop;

    return { 'x': x, 'y': y };
  }

  var resizeTimeout;

  function resizeWindow(e) {
    window.clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeMap, 200);
  }

  function resizeMap() {
    core.setCanvasDimensions(canvasHelper.getCanvasWidth(), canvasHelper.getCanvasHeight());
    module.clear();
    module.generateMap();
    goal.x = core.MAP_WIDTH - 1;
    goal.y = core.MAP_HEIGHT - 1;
  }

  return module;
}));
