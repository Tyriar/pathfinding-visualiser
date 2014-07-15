(function () {
  'use strict';

  Polymer('pv-summary', {
    clear: function () {
      this.$.container.classList.add('exiting');
      this.$.container.classList.remove('visible');
    },
    show: function (html) {
    this.$.container.classList.remove('exiting');
      this.$.container.classList.add('visible');
      this.innerHTML = html;
    }
  });
})();
