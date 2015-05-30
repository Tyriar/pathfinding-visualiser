module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      dist: {
        options: {
          configFile: '.eslintrc',
        },
        src: [
          'pathfinding-visualiser.js',
          'src/**/*.js',
          'sub-components/**/*.js'
        ]
      }
    },

    jasmine_node: {
      task_name: {
        options: {
          coverage: {},
          forceExit: true,
          match: '.',
          matchAll: false,
          specFolders: ['test'],
          extensions: 'js',
          specNameMatcher: 'spec',
          captureExceptions: true,
          junitreport: {
            report: false,
            savePath : './build/reports/jasmine/',
            useDotNotation: true,
            consolidate: true
          }
        },
        src: [
          'bower_components/requirejs/require.js',
          'src/**/*.js'
        ]
      }
    }
  });

  var tasks = [
    'grunt-eslint',
    'grunt-jasmine-node-coverage',
  ];

  for (var i = 0; i < tasks.length; i++) {
    grunt.loadNpmTasks(tasks[i]);
  }

  grunt.registerTask('coverage', [
    'jasmine_node'
  ]);

  grunt.registerTask('default', [
    'eslint',
    'coverage'
  ]);
};
