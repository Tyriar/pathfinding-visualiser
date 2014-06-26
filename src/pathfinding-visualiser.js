/* 
 * canvas-astar.js
 * MIT licensed
 *
 * Created by Daniel Imms, http://www.growingwiththeweb.com
 */

var pathfindingVisualiser = (function (core, canvasHelper) {
  'use strict';

  var module = {};

  var context;
  var map;
  var start;
  var goal;
  var isMouseDown;
  var algorithmDelegate;

  module.init = function (canvasElement) {
    canvasHelper.setCanvas(canvasElement);

    map = [];
    start = new core.Node(0, 0);
    goal = new core.Node(core.MAP_WIDTH - 1, core.MAP_HEIGHT - 1);
    isMouseDown = false;

    registerEvents(canvasElement);
    module.clear();
  };

  module.setAlgorithm = function (algorithm) {
    algorithmDelegate = algorithm;
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
    canvasHelper.clearCanvas();
    canvasHelper.drawObstacles(map);
    algorithmDelegate.run(map, start, goal, callback);
  };

  function registerEvents(canvasElement) {
    canvasElement.addEventListener('mousedown', canvasMouseDown);
    canvasElement.addEventListener('mousemove', canvasMouseMove);
    canvasElement.addEventListener('mouseup', canvasMouseUp);
  }

  function canvasMouseDown(e) {
    isMouseDown = true;
    placeObstacles(e);
  }

  function canvasMouseUp() {
    isMouseDown = false;
  }

  function canvasMouseMove(e) {
    if (isMouseDown)
      placeObstacles(e);
  }

  function placeObstacles(e) {
    var mouse = getPosition(e);
    mouse.x = Math.floor(mouse.x / core.MAP_SCALE);
    mouse.y = Math.floor(mouse.y / core.MAP_SCALE);

    for (var x = mouse.x - 2; x <= mouse.x + 2; x++) {
      for (var y = mouse.y - 2; y <= mouse.y + 2; y++) {
        if (e.which == 1) { // left-click
          if (isOnMap(x, y) && map[x][y]) {
            map[x][y] = false;
            canvasHelper.drawObstacle(x, y);
          }
        } else if (e.which == 3) { // right-click
          if (isOnMap(x, y) && !map[x][y]) {
            map[x][y] = true;
            canvasHelper.clearObstacle(x, y);
          }
        }
      }
    }
  }

  function isOnMap(x, y) {
    return x >= 0 && x < core.MAP_WIDTH && y >= 0 && y < core.MAP_HEIGHT;
  }

  function getPosition(e) {
    var target;
    if (!e)
      e = window.event;
    if (e.target)
      target = e.target;
    else if (e.srcElement)
      target = e.srcElement;
    if (target.nodeType == 3)
      target = target.parentNode;

    var x = e.pageX - target.offsetLeft;
    var y = e.pageY - target.offsetTop;

    return { 'x': x, 'y': y };
  }

  return module;
})(core, canvasHelper);
