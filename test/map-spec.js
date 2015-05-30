/**
 * @license
 * pathfinding-visualiser <http://github.com/Tyriar/pathfinding-visualiser>
 * Copyright 2014 Daniel Imms <http://www.growingwiththeweb.com>
 * Released under the MIT license <http://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE>
 */
var Map = require('../src/map');

describe('map', function () {
  'use strict';

  var map;

  beforeEach(function () {
    map = new Map(100, 100);
  });

  describe('clear', function () {
    it('should remove all obstacles from the map', function () {
      map[40][60] = false;
      map[45][60] = false;
      map[2][34] = false;
      map[23][8] = false;
      map.clear();
      expect(map[40][60]).toBe(true);
      expect(map[45][60]).toBe(true);
      expect(map[2][34]).toBe(true);
      expect(map[23][8]).toBe(true);
    });

    it('should reset the goal', function () {
      map.setGoal(5,5);
      map.clear();
      expect(map.goal.x).toBe(99);
      expect(map.goal.y).toBe(99);
    });
  });

  describe('setGoal', function () {
    it('should set the goal if it\'s on the map', function () {
      map.setGoal(1,1);
      expect(map.goal.x).toBe(1);
      expect(map.goal.y).toBe(1);
    });

    it('should not set the goal if it\'s off the map', function () {
      map.setGoal(150,50);
      expect(map.goal.x).toBe(99);
      expect(map.goal.y).toBe(99);
    });
  });

  describe('isOnMap', function () {
    it('should return true for a coordinate in the middle of the map', function () {
      expect(map.isOnMap(50,50)).toBe(true);
    });

    it('should return true for a coordinate on the left edge of the map', function () {
      expect(map.isOnMap(0,50)).toBe(true);
    });

    it('should return true for a coordinate on the right edge of the map', function () {
      expect(map.isOnMap(99,50)).toBe(true);
    });

    it('should return true for a coordinate on the bottom edge of the map', function () {
      expect(map.isOnMap(50,99)).toBe(true);
    });

    it('should return true for a coordinate on the top edge of the map', function () {
      expect(map.isOnMap(50,0)).toBe(true);
    });

    it('should return true for a coordinate on the top-left corner of the map', function () {
      expect(map.isOnMap(0,0)).toBe(true);
    });

    it('should return true for a coordinate on the top-right corner of the map', function () {
      expect(map.isOnMap(99,0)).toBe(true);
    });

    it('should return true for a coordinate on the bottom-left corner of the map', function () {
      expect(map.isOnMap(0,99)).toBe(true);
    });

    it('should return true for a coordinate on the bottom-right corner of the map', function () {
      expect(map.isOnMap(99,99)).toBe(true);
    });

    it('should return false for a coordinate just outside the left edge of the map', function () {
      expect(map.isOnMap(-1,50)).toBe(false);
    });

    it('should return false for a coordinate just outside the right edge of the map', function () {
      expect(map.isOnMap(100,50)).toBe(false);
    });

    it('should return false for a coordinate just outside the bottom edge of the map', function () {
      expect(map.isOnMap(50,-1)).toBe(false);
    });

    it('should return false for a coordinate just outside the top edge of the map', function () {
      expect(map.isOnMap(50,100)).toBe(false);
    });
  });

  describe('placeObstacles', function () {
    it('should not place obstacles on the start node', function () {
      expect(map.start.x).toBe(0);
      expect(map.start.y).toBe(0);
      map.placeObstacles(0, 0, 10);
      expect(map[1][0]).toBe(false);
      expect(map[0][1]).toBe(false);
      expect(map[0][0]).toBe(true);
    });

    it('should not place obstacles on the goal node', function () {
      expect(map.goal.x).toBe(99);
      expect(map.goal.y).toBe(99);
      map.placeObstacles(99, 99, 10);
      expect(map[98][99]).toBe(false);
      expect(map[99][98]).toBe(false);
      expect(map[99][99]).toBe(true);
    });
  });

  describe('generate', function () {
    it('should set the width and height of the map', function () {
      map.generate(50, 50, 20, 4);
      expect(map.width).toBe(50);
      expect(map.height).toBe(50);
    });

    it('should create <obstacleDensity>% obstacles on the map', function () {
      map.generate(10, 10, 30, 1);
      var count = 0;
      for (var x = 0; x < map.width; x++) {
        for (var y = 0; y < map.height; y++) {
          if (!map[x][y]) {
            count++;
          }
        }
      }
      var expectedCount = map.width * map.height * 0.3;
      expect(count).toBe(expectedCount);
    });

    it('should not lock up with an obstacleSize of 0', function () {
      map.generate(100, 100, 30, 0);
      expect(true).toBe(true);
    });

    it('should not lock up with an obstacleDensity of 100', function () {
      map.generate(100, 100, 100, 1);
      expect(true).toBe(true);
    });
  });
});
