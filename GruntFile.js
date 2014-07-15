module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      dist: {
        files: [{
          expand: true,
          src: 'src/**/*.js',
          dest: 'dist'
        }]
      }
    },
    vulcanize: {
      dist: {
        options: {
          strip: true,
          inline: true
        },
        files: {
          'dist.html': 'index.html'
        }
      },
      dev: {
        options: {
          inline: true
        },
        files: {
          'dist.html': 'index.html'
        }
      }
    },
    copy: {
      dist: {
        files: [{
          src: 'dist.html',
          dest: 'dist/index.html'
        }, {
          expand: true,
          flatten: true,
          src: 'node_modules/js-data-structures/src/**/*.js',
          dest: 'dist/vendor/js-data-structures/'
        }, {
          src: 'images/**/*.*',
          dest: 'dist/'
        }]
      },
      dev: {
        files: [{
          expand: true,
          src: 'src/**/*.js',
          dest: 'dist'
        }]
      }
    },
    clean: {
      dist: [
        'dist.html'
      ]
    },
    jasmine_node: {
      coverage: { },
      options: {
        extensions: 'js',
        specNameMatcher: '.*-spec',
        captureExceptions: true
      }
    }
  });

  var tasks = [
    'grunt-contrib-clean',
    'grunt-contrib-copy',
    'grunt-contrib-uglify',
    'grunt-jasmine-node-coverage',
    'grunt-vulcanize'
  ];

  for (var i = 0; i < tasks.length; i++) {
    grunt.loadNpmTasks(tasks[i]);
  }

  grunt.registerTask('dist', [
    'uglify:dist',
    'vulcanize:dist',
    'copy:dist',
    'clean:dist'
  ]);

  grunt.registerTask('dev', [
    'vulcanize:dev',
    'copy:dist',
    'copy:dev',
    'clean:dist'
  ]);

  grunt.registerTask('coverage', [
    'jasmine_node'
  ]);

  grunt.registerTask('default', [
    'dev'
  ]);
};
