/*!
 * Copyright 2012 Daniel Imms
 * Released under the MIT license
 * http://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE
 */
(function () {
  'use strict';

  Polymer({
    is: 'pv-summary',
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
