module.exports = (grunt) ->
  "use strict"
  grunt.initConfig
    pkg: grunt.file.readJSON "package.json"
    
    banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * (c) 2014-<%= grunt.template.today("yyyy") %> Bndy.Net (http://www.bndy.net)\n' + 
            ' */\n'
    
    clean:
      dist: ["temp", "dist"]
      
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
          dest: "temp/js"
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
          cwd: "src"
          src: "**/*.scss"
          dest: "temp/css"
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
          cwd: "dist"
          src: ["*.css", "!.min.css"]
          dest: "dist"
          ext: ".min.css"
        }]
        
    concat: 
      options:
        separator: ";"
      dist:
        files:
          "dist/angular-more.js": ["temp/js/bootstrap.js", "temp/js/filters/*.js", "temp/js/directives/*.js"]
          "dist/angular-more.css": ["temp/css/**/*.css"]
        
    watch:
      scripts:
        options:
          spawn: false
        files: ["src/**/*.scss", "src/**/*.coffee", "demo/**/*.coffee", "demo/**/*.scss"]
        tasks: ["clean", "coffee", "sass", "concat", "uglify", "cssmin", "usebanner"]

    karma:
      unit:
        options:
          frameworks: ["jasmine"]
          singleRun: true
          browsers: ["PhantomJS"]
          files: [
            "lib/jquery/dist/jquery.js"
            "lib/moment/min/moment-with-locales.js"
            "lib/angular/angular.js"
            "lib/angular-sanitize/angular-sanitize.js"
            "test/lib/angular-mocks.js"
            "lib/angular-date-time-input/src/dateTimeInput.js"
            "lib/angular-bootstrap-datetimepicker/src/js/datetimepicker.js"
            "dist/angular-more.min.js"
            "test/filters.js"
            "test/directives.js"
          ]


  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-cssmin"
  grunt.loadNpmTasks "grunt-sass"
  grunt.loadNpmTasks "grunt-banner"
  grunt.loadNpmTasks "grunt-karma"
  
  grunt.registerTask "default", ["clean", "coffee", "sass", "concat", "uglify", "cssmin", "usebanner"]
  grunt.registerTask "test", ["karma"]