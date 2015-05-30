/*!
 * Copyright 2012 Daniel Imms
 * Released under the MIT license
 * http://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE
 */
(function () {
  'use strict';

  Polymer({
    is: 'pathfinding-visualiser-summary-line',

    properties: {
      colour: {
        type: String,
        value: 'transparent'
      }
    },

    observers: [
      'colourChanged(colour)'
    ],

    colourChanged: function (colour) {
      this.$.colour.style.backgroundColor = colour;
    }
  });
})();
