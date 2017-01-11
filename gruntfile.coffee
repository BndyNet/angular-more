module.exports = (grunt) ->
  "use strict"
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    clean:
      dist: "dist"
    coffee:
      complie:
        options:
          sourceMap: false 
          bare: true
        files: [{
          expand: true
          cwd: "src"
          src: "**/*.coffee"
          dest: "dist/"
          ext: ".js"
        },{
          expand: true
          cwd: "test"
          src: "**/*.coffee"
          dest: "test"
          ext: ".js"
        }]
    uglify:
      options:
        sourceMap: false
        banner: "/*! <%= pkg.file %> <%= grunt.template.today('yyyy-mm-dd') %> */\n"
      my_target:
        files: [{
          expand: true
          cwd: "src"
          src: "**/*.js"
          dest: "dist"
          ext: ".min.js"
        }]
    sass:
      options:{}
      files: [{
        expand: true
        cwd: "src"
        src: ["*.scss"]
        dest: "dist"
        ext: ".css"
      }]
    watch:
      scripts:
        options: {
          spawn: false
        }
        files: ["src/*.scss", "src/*.coffee"]
        tasks: ["sass", "coffee"]


  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  #grunt.loadNpmTasks "grunt-contrib-sass"
  grunt.registerTask "default", ["coffee", "uglify"]