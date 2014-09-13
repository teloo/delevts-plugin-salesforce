module.exports = function(grunt) {
  var jsFiles = [
    'lib/**/*.js'
  ];

  grunt.initConfig({
    watch: {
      scripts: {
        files: jsFiles,
        tasks: ['default']
      }
    },
    jshint: {
      all: jsFiles,
      options: {
        jshintrc: '.jshintrc'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('hint', ['jshint']);
  grunt.registerTask('default', ['hint']);
};
