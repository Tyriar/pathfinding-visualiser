/*! pathfinding-visualiser | (c) 2014 Daniel Imms */
/*! https://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE */
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['map-node'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./map-node'));
  }
}(this, function (MapNode) {
  'use strict';

  function Map(width, height) {
    this.width         = width;
    this.height        = height;
    this.start         = new MapNode(0, 0);
    this.goal          = new MapNode(width - 1, height - 1);
    this.configuration = undefined;
    this.clear();
  }

  Map.prototype = Array.prototype;
  Map.prototype.constructor = Map;

  Map.prototype.clear = function () {
    this.length = this.width;
    for (var x = 0; x < this.width; x++) {
      if (!this[x]) {
        this[x] = [];
      }
      this[x].length = this.height;
      for (var y = 0; y < this.height; y++) {
        this[x][y] = true;
      }
    }
    this.setGoal(this.width - 1, this.height - 1);
  };

  Map.prototype.generate = function (width, height, obstacleDensity, obstacleSize) {
    if (obstacleSize <= 0 || obstacleDensity > 90) {
      return;
    }

    if (obstacleDensity !== undefined) {
      this.configuration = {
        obstacleDensity: obstacleDensity,
        obstacleSize: obstacleSize,
      };
    }

    this.width = width;
    this.height = height;
    this.clear();

    var nodesInMap = this.width * this.height;
    var desiredObstacleCount = Math.floor(nodesInMap * this.configuration.obstacleDensity / 100);
    var obstacles = 0;

    while (obstacles < desiredObstacleCount) {
      var x = Math.floor(Math.random() * this.width);
      var y = Math.floor(Math.random() * this.height);
      obstacles += this.placeObstacles(x, y, this.configuration.obstacleSize);
    }
  };

  Map.prototype.setGoal = function (x, y) {
    if (this.isOnMap(x, y)) {
      this.goal.x = x;
      this.goal.y = y;
    }
  };

  Map.prototype.isOnMap = function (x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  };

  Map.prototype.placeObstacles = function (x, y, size) {
    var obstacleCount = 0;
    var lower = Math.floor((size - 1) / 2);
    var upper = Math.ceil((size - 1) / 2);

    for (var _x = x - lower; _x <= x + upper; _x++) {
      for (var _y = y - lower; _y <= y + upper; _y++) {
        if (!this.isOnMap(_x, _y) || !this[_x][_y]) {
          continue;
        }
        if ((_x === this.start.x && _y === this.start.y) ||
            (_x === this.goal.x  && _y === this.goal.y)) {
          continue;
        }
        this[_x][_y] = false;
        obstacleCount++;
      }
    }
    return obstacleCount;
  };

  return Map;
}));
