/*
 * grunt-template-html
 * https://github.com/Lam/grunt-template-html
 *
 * Copyright (c) 2013 Lam Te
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    template: {
      dev: {
        engine: 'handlebars',
        cwd: 'test/fixtures/',
        partials: ['test/fixtures/modules/*.hbs'],
        data: 'test/fixtures/data/data.json',
        options: {
        },
        files: [
        {
          expand: true,     // Enable dynamic expansion.
          cwd: 'test/fixtures',      // Src matches are relative to this path.
          src: '*.hbs', // Actual pattern(s) to match.
          dest: 'tmp/',   // Destination path prefix.
          ext: '.html'  // Dest filepaths will have this extension.
        }
      ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'template', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
