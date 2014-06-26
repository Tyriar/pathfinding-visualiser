/* 
 * canvas-astar.js
 * MIT licensed
 *
 * Created by Daniel Imms, http://www.growingwiththeweb.com
 */

var pathfindingVisualiser = (function () {
  var CANVAS_WIDTH = 640;
  var CANVAS_HEIGHT = 480;
  var COST_STRAIGHT = 1;
  var COST_DIAGONAL = 1.414;
  var MAP_SCALE = 10; // Must be a divisor or CANVAS_WIDTH and CANVAS_HEIGHT
  var MAP_WIDTH = CANVAS_WIDTH / MAP_SCALE;
  var MAP_HEIGHT = CANVAS_HEIGHT / MAP_SCALE;
  var PATH_WIDTH = 4;

  var BACKGROUND_COLOR = '#EEE';
  var OBSTACLE_COLOR = '#2D2D30';
  var PATH_COLOR = '#0C0';
  var VISITED_COLOR = '#44F';

  var canvas;
  var context;
  var info;
  var map;
  var start;
  var goal;
  var isMouseDown;

  function init(canvasElement, infoElement) {
    canvas = canvasElement;
    info = infoElement;
    if (canvas && canvas.getContext) {
      context = canvas.getContext('2d');

      map = [];
      start = new Node(0, 0);
      goal = new Node(MAP_WIDTH - 1, MAP_HEIGHT - 1);
      isMouseDown = false;

      registerEvents();
      clearMap();
    }
  }

  function registerEvents() {
    canvas.addEventListener('mousedown', canvasMouseDown);
    canvas.addEventListener('mousemove', canvasMouseMove);
    canvas.addEventListener('mouseup', canvasMouseUp);
  }

  function Node(x, y, parent, cost) {
    this.x = x;
    this.y = y;
    this.g = 0;
    this.f = 0;
    this.parent = parent;
    if (parent) {
      this.g = parent.g + cost;
    }
  }

  function canvasMouseDown(e) {
    isMouseDown = true;
    placeObstacles(e);
  }

  function canvasMouseUp() {
    isMouseDown = false;
  }

  function canvasMouseMove(e) {
    if (isMouseDown)
      placeObstacles(e);
  }

  function runAStar() {
    // TODO: Disable button while running again, move to pathfinding-visualiser.html
    //this.setAttribute('disabled', 'disabled');
    clearPath();
    aStar(start, goal);
    //this.removeAttribute('disabled');
  }

  function placeObstacles(e) {
    var mouse = getPosition(e);
    mouse.x = Math.floor(mouse.x / MAP_SCALE);
    mouse.y = Math.floor(mouse.y / MAP_SCALE);

    for (var x = mouse.x - 2; x <= mouse.x + 2; x++) {
      for (var y = mouse.y - 2; y <= mouse.y + 2; y++) {
        if (e.which == 1) { // left-click
          if (isOnMap(x, y) && map[x][y]) {
            map[x][y] = false;
            drawObstacle(x, y);
          }
        } else if (e.which == 3) { // right-click
          if (isOnMap(x, y) && !map[x][y]) {
            map[x][y] = true;
            clearObstacle(x, y);
          }
        }
      }
    }
  }

  function isOnMap(x, y) {
    return x >= 0 && x < MAP_WIDTH && y >= 0 && y < MAP_HEIGHT;
  }

  function getPosition(e) {
    var targ;
    if (!e)
      e = window.event;
    if (e.target)
      targ = e.target;
    else if (e.srcElement)
      targ = e.srcElement;
    if (targ.nodeType == 3)
      targ = targ.parentNode;

    var x = e.pageX - targ.offsetLeft;
    var y = e.pageY - targ.offsetTop;

    return { 'x': x, 'y': y };
  }

  function aStar(start, goal) {
    var closed = [];
    var open = [start];
    var cameFrom = [];

    open[0].f = open[0].g + heuristic(open[0], goal);

    while (open.length > 0) {
      var lowestF = 0;
      for (var i = 1; i < open.length; i++) {
        if (open[i].f < open[lowestF].f) {
          lowestF = i;
        }
      }
      var current = open[lowestF];

      if (nodeCompare(current, goal)) {
        draw(closed, open, current);
        info.innerHTML = 'Map size = ' + MAP_WIDTH + 'x' + MAP_HEIGHT + '<br />' +
                         'Total number of nodes = ' + MAP_WIDTH * MAP_HEIGHT + '<br />' +
                         'Number of nodes in open list = ' + open.length + '<br />' +
                         'Number of nodes in closed list = ' + closed.length;
        return;
      }

      open.splice(lowestF, 1);
      closed[closed.length] = current;
      drawVisited(current.x, current.y);

      var neighbors = neighborNodes(current);
      for (var i = 0; i < neighbors.length; i++) {
        if (indexOfNode(closed, neighbors[i]) == -1) { // Skip if in closed list
          var index = indexOfNode(open, neighbors[i]);
          if (index == -1) {
            neighbors[i].f = neighbors[i].g + heuristic(neighbors[i], goal);
            open[open.length] = neighbors[i];
          } else if (neighbors[i].g < open[index].g) {
            neighbors[i].f = neighbors[i].g + heuristic(neighbors[i], goal);
            open[index] = neighbors[i];
          }
        }
      }
    }

    info.innerHTML = 'No path exists';
  }

  function indexOfNode(array, node) {
    for (var i = 0; i < array.length; i++) {
      if (nodeCompare(node, array[i])) {
        return i;
      }
    }
    return -1;
  }

  function nodeCompare(nodeA, nodeB) {
    return nodeA.x == nodeB.x && nodeA.y == nodeB.y;
  }

  function heuristic(node, goal) {
    return diagonalDistance(node, goal);
  }

  function manhattanDistance(node, goal) {
    return Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y);
  }

  function diagonalUniformDistance(node, goal) {
    return Math.max(Math.abs(node.x - goal.x), Math.abs(node.y - goal.y));
  }

  function diagonalDistance(node, goal) {
    var dmin = Math.min(Math.abs(node.x - goal.x), Math.abs(node.y - goal.y));
    var dmax = Math.max(Math.abs(node.x - goal.x), Math.abs(node.y - goal.y));
    return COST_DIAGONAL * dmin + COST_STRAIGHT * (dmax - dmin);
  }

  function euclideanDistance(node, goal) {
    return Math.sqrt(Math.abs(node.x - goal.x) ^ 2 + Math.abs(node.y - goal.y) ^ 2);
  }

  function neighborNodes(n) {
    var neighbors = [];
    var count = 0;

    if (n.x > 0) {
      if (map[n.x - 1][n.y])
        neighbors[count++] = new Node(n.x - 1, n.y, n, COST_STRAIGHT);
      if (n.y > 0 && map[n.x - 1][n.y - 1]) {
        if (map[n.x - 1][n.y] && map[n.x][n.y - 1])
          neighbors[count++] = new Node(n.x - 1, n.y - 1, n, COST_DIAGONAL);
      }
      if (n.y < MAP_HEIGHT && map[n.x - 1][n.y + 1]) {
        if (map[n.x - 1][n.y] && map[n.x][n.y + 1])
          neighbors[count++] = new Node(n.x - 1, n.y + 1, n, COST_DIAGONAL);
      }
    }
    if (n.x < MAP_WIDTH - 1) {
      if (map[n.x + 1][n.y])
        neighbors[count++] = new Node(n.x + 1, n.y, n, COST_STRAIGHT);
      if (n.y > 0 && map[n.x + 1][n.y - 1]) {
        if (map[n.x + 1][n.y] && map[n.x][n.y - 1])
          neighbors[count++] = new Node(n.x + 1, n.y - 1, n, COST_DIAGONAL);
      }
      if (n.y < MAP_HEIGHT && map[n.x + 1][n.y + 1]) {
        if (map[n.x + 1][n.y] && map[n.x][n.y + 1])
          neighbors[count++] = new Node(n.x + 1, n.y + 1, n, COST_DIAGONAL);
      }
    }
    if (n.y > 0 && map[n.x][n.y - 1])
      neighbors[count++] = new Node(n.x, n.y - 1, n, COST_STRAIGHT);
    if (n.y < MAP_HEIGHT - 1 && map[n.x][n.y + 1])
      neighbors[count++] = new Node(n.x, n.y + 1, n, COST_STRAIGHT);

    neighbors[count++]
    return neighbors;
  }

  function draw(closed, open, goalNode) {
    drawStartGoal(goal.x, goal.y);
    drawStartGoal(start.x, start.y);

    context.beginPath();
    context.moveTo((goalNode.x + 0.5) * MAP_SCALE, (goalNode.y + 0.5) * MAP_SCALE);

    while (goalNode.parent) {
      goalNode = goalNode.parent;
      context.lineTo((goalNode.x + 0.5) * MAP_SCALE, (goalNode.y + 0.5) * MAP_SCALE);
    }

    context.strokeStyle = PATH_COLOR;
    context.lineWidth = PATH_WIDTH;
    context.stroke();
    context.closePath();
  }

  function clearPath() {
    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawObstacles();
  }

  function clearMap() {
    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    for (var x = 0; x < MAP_WIDTH; x++) {
      map[x] = [];
      for (var y = 0; y < MAP_HEIGHT; y++) {
        map[x][y] = true;
      }
    }
  }

  function drawObstacles() {
    for (var x = 0; x < MAP_WIDTH; x++) {
      for (var y = 0; y < MAP_HEIGHT; y++) {
        if (!map[x][y]) {
          drawObstacle(x, y);
        }
      }
    }
  }

  function drawObstacle(x, y) {
    drawNode(x, y, OBSTACLE_COLOR);
  }

  function clearObstacle(x, y) {
    drawNode(x, y, BACKGROUND_COLOR);
  }

  function drawVisited(x, y) {
    drawNode(x, y, VISITED_COLOR);
  }

  function drawStartGoal(x, y) {
    drawNode(x, y, PATH_COLOR);
  }

  function drawNode(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * MAP_SCALE, y * MAP_SCALE, MAP_SCALE, MAP_SCALE);
  }

  return {
    init: init,
    clear: clearMap,
    run: runAStar
  };
})();
