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
