
module.exports = function(grunt) {

  grunt.initConfig({
    test: {
      all: ['test/**/*.js']
    },
    lint: {
      all: [
        'index.js'
      ]
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true,
        strict: false
      },
      globals: {}
    }
  });

  grunt.registerTask('default', 'lint test');

};
