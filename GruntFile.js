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
        },
      },
    },
    copy: {
      dist: {
        files: [{
          src: 'dist.html',
          dest: 'dist/index.html'
        }, {
          src: 'bower_components/requirejs/**/*.js',
          dest: 'dist/'
        }, {
          src: 'bower_components/platform/**/*.js',
          dest: 'dist/'
        }, {
          src: 'bower_components/js-data-structures/**/*.js',
          dest: 'dist/'
        }, {
          src: 'images/**/*.svg',
          dest: 'dist/'
        }]
      }
    },
    clean: {
      dist: [
        'dist.html'
      ]
    }
  });

  var tasks = [
    'grunt-contrib-clean',
    'grunt-contrib-copy',
    'grunt-contrib-uglify',
    'grunt-vulcanize'
  ];

  for (var i = 0; i < tasks.length; i++) {
    grunt.loadNpmTasks(tasks[i]);
  }

  grunt.registerTask('build', [
    'uglify:dist',
    'vulcanize:dist',
    'copy:dist',
    'clean:dist'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
