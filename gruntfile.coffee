module.exports = (grunt) ->
  "use strict"
  grunt.initConfig
    pkg: grunt.file.readJSON "package.json"
    
    banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * (c) 2014-<%= grunt.template.today("yyyy") %> Bndy.Net (http://www.bndy.net)\n' + 
            ' */\n'
    
    clean:
      dist: "dist"
      
    usebanner:
      taskName:
        options: 
          position: "top"
          banner: "<%= banner %>"
          linkbreak: true
        files:
          src: ["dist/**/*.css", "dist/**/*.js"]
      
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
      my_target:
        files: [{
          expand: true
          cwd: "dist"
          src: ["**/*.js", "!**/*.min.js"]
          dest: "dist"
          ext: ".min.js"
        }]
        
    sass:
      dist:
        files: [{
          expand: true
          cwd: "src/directives"
          src: "*.scss"
          dest: "dist/css"
          ext: ".css"
        }, {
          expand: true
          cwd: "demo"
          src: "**/*.sccc"
          dest: "demo"
          ext: ".css"
        }]
        
    cssmin:
      options:
        shorthandCompacting: false
        roundingPrecision: -1
      target:
        files: [{
          expand: true
          cwd: "dist/css"
          src: ["*.css", "!.min.css"]
          dest: "dist/css"
          ext: ".min.css"
        }]
          
    watch:
      scripts:
        options:
          spawn: false
        files: ["src/**/*.scss", "src/**/*.coffee", "demo/**/*.coffee", "demo/**/*.scss"]
        tasks: ["sass", "coffee"]


  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-cssmin"
  grunt.loadNpmTasks "grunt-sass"
  grunt.loadNpmTasks "grunt-banner"
  
  grunt.registerTask "default", ["clean", "coffee", "sass", "uglify", "cssmin", "usebanner"]