var Map = require("../../src/map");

module.exports = function (algorithm) {
  describe("given a map of size 2x2 with no obstacles", function () {
    var map;

    beforeEach(function () {
      map = new Map(2, 2);
    });

    it("should return a path", function () {
      var wrapper = {};
      wrapper.callback = function () {

      };
      spyOn(wrapper, 'callback');
      algorithm.run(map, wrapper.callback);
      expect(callback).toHaveBeenCalled();
    });
  });

  describe("given a map with no obstacles", function () {
    it("should return a path", function () {
    });
  });

  describe("given a maze-like map with a path between start and goal", function () {
    it("should return a path", function () {
    });
  });

  describe("given a map densely populated with obstacles with a path between start and goal", function () {
    it("should return a path", function () {
    });
  });

  describe("given a map where the start node is surrounded in obstacles", function () {
    it("should not return a path", function () {
    });
  });

  describe("given a map where the goal node is surrounded in obstacles", function () {
    it("should not return a path", function () {
    });
  });

  describe("given a map with obstacles blocking the middle", function () {
    it("should not return a path", function () {
    });
  });
};
