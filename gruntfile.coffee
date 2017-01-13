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
        }, {
            expand: true
            cwd: "demo"
            src: "**/*.coffee"
            dest: "demo"
            ext: ".js"
        }]
    uglify:
      options:
        sourceMap: false
        banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * (c) 2014-<%= grunt.template.today("yyyy") %> Bndy.Net (http://www.bndy.net)\n' + 
            ' */\n'
      my_target:
        files: [{
          expand: true
          cwd: "dist"
          src: "**/*.js"
          dest: "dist"
          ext: ".min.js"
        }]
    sass:
      dist: 
        files: [{
          expand: true
          cwd: "src"
          src: "**/*.scss"
          dest: "dist"
          ext: ".css"
        }, {
          expand: true
          cwd: "demo"
          src: "**/*.sccc"
          dest: "demo"
          ext: ".css"
        }]
    watch:
      scripts:
        options: {
          spawn: false
        }
        files: ["src/**/*.scss", "src/**/*.coffee", "demo/**/*.coffee", "demo/**/*.scss"]
        tasks: ["sass", "coffee"]


  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-sass"
  
  grunt.registerTask "default", ["coffee", "sass", "uglify"]