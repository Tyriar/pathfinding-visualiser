/*!
 * Copyright 2012 Daniel Imms
 * Released under the MIT license
 * http://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE
 */
var tests = require('../helpers/algorithm-tests');
var algorithm = require('../../src/algorithms/a-star-binary-heap');

describe('a-star-binary-heap', function () {
  'use strict';

  tests(algorithm);
});
