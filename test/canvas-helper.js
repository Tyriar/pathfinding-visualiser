describe("canvas-helper", function () {
  var canvasHelper;
  var context;
  var canvas;

  beforeEach(function () {
    canvasHelper = require("../src/canvas-helper");
    context = {
      beginPath: function () {},
      fillPath: function () {},
      fillStyle: function () {},
      lineTo: function () {},
      moveTo: function () {},
      strokeStyle: function () {},
      lineWidth: function () {},
      stroke: function () {},
      closePath: function () {}
    };
    canvas = {
      getContext: function () {
        return context;
      },
      setAttribute: function () {}
    };
    canvasHelper.setCanvas(canvas);
  });

  // TODO: Implement tests
});
