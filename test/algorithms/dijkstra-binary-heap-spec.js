/*!
 * Copyright 2012 Daniel Imms
 * Released under the MIT license
 * http://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE
 */
var tests = require('../helpers/algorithm-tests');
var algorithm = require('../../src/algorithms/dijkstra-binary-heap');

describe('dijkstra-binary-heap', function () {
  'use strict';
  
  tests(algorithm);
});
