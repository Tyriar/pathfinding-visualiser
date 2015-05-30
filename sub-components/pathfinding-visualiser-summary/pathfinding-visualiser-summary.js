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
    is: 'pathfinding-visualiser-summary',
    clear: function () {
      this.$.container.classList.add('exiting');
      this.$.container.classList.remove('visible');
    },
    show: function (html) {
      this.$.container.classList.remove('exiting');
      this.$.container.classList.add('visible');
      this.$.container.innerHTML = html;
    }
  });
})();
