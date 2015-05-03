/*!
 * Copyright 2012 Daniel Imms
 * Released under the MIT license
 * http://github.com/Tyriar/pathfinding-visualiser/blob/master/LICENSE
 */
var tests = require('../helpers/algorithm-tests');
var algorithm = require('../../src/algorithms/a-star-array');

describe('a-star-array', function () {
  'use strict';

  tests(algorithm);
});
