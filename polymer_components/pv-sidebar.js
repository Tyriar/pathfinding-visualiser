/*!
 * Copyright 2012 Daniel Imms
 * Released under the MIT license
 * http://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE
 */
(function () {
  'use strict';

  Polymer('pv-sidebar', {
    publish: {
      mapScale: 8,
      obstacleDensity: 25,
      obstacleSize: 6,
      animationEnabled: true,
      speed: 50,
      speedMax: 50,
      runHandler: undefined,
      generateHandler: undefined,
      clearHandler: undefined,
      toggleDialogHandler: undefined,
      isRunDisabled: function () {
        return this.$.runButton.disabled;
      },
      setRunDisabled: function (state) {
        this.$.runButton.disabled = state;
      },
      onAlgorithmChange: undefined
    },
    algorithmChange: function (e) {
      if (this.onAlgorithmChange) {
        var name = e.target.getAttribute('data-algorithm');
        this.onAlgorithmChange(name);
      }
    },
    run: function () {
      if (this.publish.runHandler) {
        this.publish.runHandler();
      }
    },
    generate: function () {
      if (this.publish.generateHandler) {
        this.publish.generateHandler();
      }
    },
    clear: function () {
      if (this.publish.clearHandler) {
        this.publish.clearHandler();
      }
    }
  });
})();
