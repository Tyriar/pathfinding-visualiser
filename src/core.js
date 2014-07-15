/*! pathfinding-visualiser | (c) 2014 Daniel Imms */
/*! https://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE */
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  }
}(this, function () {
  'use strict';

  var module = {};

  module.CANVAS_WIDTH  = 640;
  module.CANVAS_HEIGHT = 480;
  module.MAP_SCALE     = 10; // Must be a divisor or CANVAS_WIDTH and CANVAS_HEIGHT
  module.MAP_WIDTH     = module.CANVAS_WIDTH / module.MAP_SCALE;
  module.MAP_HEIGHT    = module.CANVAS_HEIGHT / module.MAP_SCALE;

  module.setCanvasDimensions = function (width, height) {
    module.CANVAS_WIDTH  = width;
    module.CANVAS_HEIGHT = height;
    updateMapDimensions();
  };

  module.setMapScale = function (mapScale) {
    if (mapScale !== undefined) {
      module.MAP_SCALE = mapScale;
      updateMapDimensions();
    }
  };

  module.timeNow = function () {
    if (typeof performance !== 'undefined') {
      return performance.now();
    }
    // Fake performance for node.js
    return 0;
  };

  function updateMapDimensions() {
    module.MAP_WIDTH  = Math.floor(module.CANVAS_WIDTH / module.MAP_SCALE);
    module.MAP_HEIGHT = Math.floor(module.CANVAS_HEIGHT / module.MAP_SCALE);
  }

  return module;
}));
