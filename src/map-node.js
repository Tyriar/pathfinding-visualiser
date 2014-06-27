// UMD pattern: https://github.com/umdjs/umd/blob/master/returnExportsGlobal.js
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return (root.MapNode = factory());
    });
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.MapNode = factory();
  }
}(this, function () {
  'use strict';

  function MapNode(x, y, parent, cost) {
    this.x = x;
    this.y = y;
    this.g = 0;
    this.f = 0;
    this.parent = parent;
    if (parent) {
      this.g = parent.g + cost;
    }
  }

  MapNode.prototype.equals = function (other) {
    return this.x == other.x && this.y == other.y;
  };

  return MapNode;
}));
