/**
 * @license
 * pathfinding-visualiser <http://github.com/Tyriar/pathfinding-visualiser>
 * Copyright 2014 Daniel Imms <http://www.growingwiththeweb.com>
 * Released under the MIT license <http://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE>
 */
var MapNode = require('../src/map-node');

describe('map-node', function () {
  'use strict';

  var node;

  beforeEach(function () {
    node = new MapNode(10, 10);
  });

  describe('equals', function () {
    it('should return true for a given the same node', function () {
      expect(node.equals(node)).toBe(true);
    });

    it('should return true for a given a different node with the same x/y', function () {
      var other = new MapNode(10, 10);
      expect(node.equals(other)).toBe(true);
    });

    it('should return false for a given a node with x + 1', function () {
      var other = new MapNode(11, 10);
      expect(node.equals(other)).toBe(false);
    });

    it('should return false for a given a node with x - 1', function () {
      var other = new MapNode(9, 10);
      expect(node.equals(other)).toBe(false);
    });

    it('should return false for a given a node with y + 1', function () {
      var other = new MapNode(10, 11);
      expect(node.equals(other)).toBe(false);
    });

    it('should return false for a given a node with y - 1', function () {
      var other = new MapNode(10, 9);
      expect(node.equals(other)).toBe(false);
    });

    it('should return false for a given a node with the radically different x,y values', function () {
      var other = new MapNode(105, 78);
      expect(node.equals(other)).toBe(false);
    });
  });
});
