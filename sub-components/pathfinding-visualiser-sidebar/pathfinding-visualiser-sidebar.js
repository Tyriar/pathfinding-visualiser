/**
 * @license
 * pathfinding-visualiser <http://github.com/Tyriar/pathfinding-visualiser>
 * Copyright 2014 Daniel Imms <http://www.growingwiththeweb.com>
 * Released under the MIT license <http://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE>
 */
/*global Polymer*/
(function () {
  'use strict';

  Polymer({
    is: 'pathfinding-visualiser-sidebar',
    properties: {
      mapScale: {
        type: Number,
        value: 8
      },
      obstacleDensity: {
        type: Number,
        value: 25
      },
      obstacleSize: {
        type: Number,
        value: 6
      },
      animationEnabled: {
        type: Boolean,
        value: true
      },
      speed: {
        type: Number,
        value: 50
      },
      speedMax: {
        type: Number,
        value: 50
      },
      runHandler: {
        type: Function,
        value: undefined
      },
      generateHandler: {
        type: Function,
        value: undefined
      },
      clearHandler: {
        type: Function,
        value: undefined
      },
      toggleDialogHandler: {
        type: Function,
        value: undefined
      },
      onAlgorithmChange: {
        type: Function,
        value: undefined
      }
    },
    algorithmChange: function (e) {
      if (this.onAlgorithmChange) {
        var name = e.target.getAttribute('data-algorithm');
        this.onAlgorithmChange(name);
      }
    },
    isRunDisabled: function () {
      return this.$.runButton.disabled;
    },
    setRunDisabled: function (state) {
      this.$.runButton.disabled = state;
    },
    run: function () {
      if (this.runHandler) {
        this.runHandler();
      }
    },
    generate: function () {
      if (this.generateHandler) {
        this.generateHandler();
      }
    },
    clear: function () {
      if (this.clearHandler) {
        this.clearHandler();
      }
    }
  });
})();
