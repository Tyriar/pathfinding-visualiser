describe('canvas-helper', function () {
  'use strict';

  var canvasHelper;
  var context;
  var canvas;

  beforeEach(function () {
    canvasHelper = require('../src/canvas-helper');
    context = {
      beginPath: function () {},
      fillRect: function () {},
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
  describe('drawNode', function () {
    it('should draw a node at (x, y) position provided', function () {
      spyOn(context, 'fillRect');
      canvasHelper.drawNode(2, 3);
      expect(context.fillRect).toHaveBeenCalled();
      expect(context.fillRect.callCount).toBe(1);
      // Default scale of 10
      expect(context.fillRect.argsForCall[0]).toEqual([20, 30, 10, 10]);
    });

    // TODO: Pull MAP_SCALE in to canvas-helper or make it a parameter
    //it('should draw based on map scale', function () {
    //});
  });
});
