/**
 * @license
 * pathfinding-visualiser <http://github.com/Tyriar/pathfinding-visualiser>
 * Copyright 2014 Daniel Imms <http://www.growingwiththeweb.com>
 * Released under the MIT license <http://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE>
 */
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

  describe('drawObstacle', function () {
    it('should drawNode at (x, y) position provided', function () {
      spyOn(canvasHelper, 'drawNode');
      canvasHelper.drawObstacle(2, 3);
      expect(canvasHelper.drawNode).toHaveBeenCalled();
      expect(canvasHelper.drawNode.callCount).toBe(1);
      expect(canvasHelper.drawNode.argsForCall[0]).toEqual([2, 3, canvasHelper.OBSTACLE_COLOUR]);
    });
  });

  describe('drawVisited', function () {
    it('should drawNode at (x, y) position provided', function () {
      spyOn(canvasHelper, 'drawNode');
      canvasHelper.drawVisited(2, 3);
      expect(canvasHelper.drawNode).toHaveBeenCalled();
      expect(canvasHelper.drawNode.callCount).toBe(1);
      expect(canvasHelper.drawNode.argsForCall[0]).toEqual([2, 3, canvasHelper.CLOSED_LIST_COLOUR]);
    });
  });

  describe('drawOpenListNode', function () {
    it('should drawNode at (x, y) position provided', function () {
      spyOn(canvasHelper, 'drawNode');
      canvasHelper.drawOpenListNode(2, 3);
      expect(canvasHelper.drawNode).toHaveBeenCalled();
      expect(canvasHelper.drawNode.callCount).toBe(1);
      expect(canvasHelper.drawNode.argsForCall[0]).toEqual([2, 3, canvasHelper.OPEN_LIST_COLOUR]);
    });
  });

  describe('drawStartGoal', function () {
    it('should drawNode at (x, y) position provided', function () {
      spyOn(canvasHelper, 'drawNode');
      canvasHelper.drawStartGoal(2, 3);
      expect(canvasHelper.drawNode).toHaveBeenCalled();
      expect(canvasHelper.drawNode.callCount).toBe(1);
      expect(canvasHelper.drawNode.argsForCall[0]).toEqual([2, 3, canvasHelper.PATH_COLOUR]);
    });
  });
});
