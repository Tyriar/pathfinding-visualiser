// UMD pattern: https://github.com/umdjs/umd/blob/master/returnExportsGlobal.js
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['core', 'canvas-helper', 'map-node'], function (core, canvasHelper, MapNode) {
      return (root.canvasHelper = factory(core, canvasHelper, MapNode));
    });
  } else if (typeof exports === 'object') {
    module.exports = factory(require('core'), require('canvas-helper'), require('map-node'));
  } else {
    root.canvasHelper = factory(core, canvasHelper, MapNode);
  }
}(this, function (core, canvasHelper, Node) {
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

    map = [];
    start = new Node(0, 0);
    goal = new Node(core.MAP_WIDTH - 1, core.MAP_HEIGHT - 1);
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
    // Only set goal if the coords map to a node
    if (isOnMap(position.x, position.y)) {
      goal.x = position.x;
      goal.y = position.y;
    }
  };

  module.clear = function () {
    canvasHelper.clearCanvas();

    for (var x = 0; x < core.MAP_WIDTH; x++) {
      map[x] = [];
      for (var y = 0; y < core.MAP_HEIGHT; y++) {
        map[x][y] = true;
      }
    }
  };

  module.run = function (callback) {
    var startTime = performance.now();
    canvasHelper.clearCanvas();
    canvasHelper.drawObstacles(map);
    algorithmDelegate.run(map, start, goal, function (result) {
      var duration = performance.now() - startTime;
      result += '<br>Operation took ' + duration.toFixed(2) + 'ms';
      callback(result);
    });
  };

  module.generateMap = function (mapScale, obstacleDensity, obstacleSize) {
    if (mapScale !== undefined) {
      mapConfiguration = {
        mapScale: mapScale,
        obstacleDensity: obstacleDensity,
        obstacleSize: obstacleSize,
      };
    }
    core.setMapScale(mapConfiguration.mapScale);
    module.clear();
    goal.x = core.MAP_WIDTH - 1;
    goal.y = core.MAP_HEIGHT - 1;

    var nodesInMap = core.MAP_WIDTH * core.MAP_HEIGHT;
    var desiredObstacleCount = Math.floor(nodesInMap * mapConfiguration.obstacleDensity / 100);
    var obstacles = 0;

    while (obstacles < desiredObstacleCount) {
      var x = Math.floor(Math.random() * core.MAP_WIDTH);
      var y = Math.floor(Math.random() * core.MAP_HEIGHT);
      obstacles += placeObstacles(x, y, mapConfiguration.obstacleSize);
    }
  };

  function placeObstaclesWithMouse(e) {
    var mouse = getPosition(e);
    mouse.x = Math.floor(mouse.x / core.MAP_SCALE);
    mouse.y = Math.floor(mouse.y / core.MAP_SCALE);

    placeObstacles(x, y, 5);
  }

  function placeObstacles(x, y, size) {
    var obstacleCount = 0;
    var lower = Math.floor(size / 2);
    var upper = Math.ceil(size / 2);

    for (var _x = x - lower; _x <= x + upper; _x++) {
      for (var _y = y - lower; _y <= y + upper; _y++) {
        if (!isOnMap(_x, _y) || !map[_x][_y]) {
          continue;
        }
        if ((_x == start.x && _y == start.y) ||
            (_x == goal.x && _y == goal.y)) {
          continue;
        }
        map[_x][_y] = false;
        canvasHelper.drawObstacle(_x, _y);
        obstacleCount++;
      }
    }
    return obstacleCount;
  }

  function isOnMap(x, y) {
    return x >= 0 && x < core.MAP_WIDTH && y >= 0 && y < core.MAP_HEIGHT;
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
});
