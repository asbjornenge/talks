#### GLOBALS ####

'use strict'

module.exports = (grunt) ->

    #### LOAD / CONFIG ####

    require('time-grunt')(grunt)
    require('load-grunt-tasks')(grunt)

    config =
        app: 'app'
        dist: 'dist'

    #### INITCONFIG ####

    @initConfig
        yeoman : config,
        pkg    : @file.readJSON 'package.json'

        ## STYLUS
        #

        stylus:
            server:
                files:
                    '.tmp/styles/main.css' : ['<%= yeoman.app %>/styles/*.styl']

        ## CONCAT (for build only - else useminPrepare - or not? Might not be used anymore...)
        #

        concat:
            dist:
                src  : ['.tmp/css/app.css'],
                dest : '<%= yeoman.dist %>/rebl.css'


        ## CSSMIN (for build only - else useminPrepare)
        #

        cssmin:
            dist:
                options:
                    banner : '/* BANNER */'
                files:
                    '<%= yeoman.dist %>/rebl.css' : ['<%= yeoman.dist %>/rebl.css']

        ## USEMIN PREPARE
        #

        useminPrepare:
            html: '<%= yeoman.app %>/index.html'
            options:
                dest: '<%= yeoman.dist %>'

        ## HTMLREFS
        #

        htmlrefs:
            dist:
                src: '<%= yeoman.app %>/index.html'
                dest : '<%= yeoman.dist %>'

        ## WATCH
        #

        watch:
            styles:
                files: ['<%= yeoman.app %>/styles/{,*/}*.styl']
                tasks: ['stylus:server']
            livereload:
                options:
                    livereload: '<%= connect.options.livereload %>'
                files : [
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/**/*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    'tests/{,*/}*.js',
                ]

        ## MOCHA
        #

        mocha:
            all:
                options:
                    run: true
                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']

        ## SERVER
        #

        connect:
            options:
                port: 9000
                livereload: 35729
                # change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            livereload:
                options:
                    open: true
                    base: [
                        '.tmp'
                        '<%= yeoman.app %>'
                    ]
            test:
                options:
                    base: [
                        '.tmp'
                        'test'
                        '<%= yeoman.app %>'
                    ]
            dist:
                options:
                    open: true
                    base: '<%= yeoman.dist %>'

        clean:
            dist:
                files: [
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                ]
            server: '.tmp'


    ## CONCURRENT
    #

    concurrent:
        server: [
            'stylus:server'
        ]
        dist: [
            'stylus:dist'
            'htmlmin'
        ]

    #### TASKS ####

    ## Server
    #

    @registerTask 'server', (target) =>
        @task.run 'clean:server'
        @task.run 'concurrent:server'
        @task.run 'connect:livereload'
        @task.run 'watch'

    ## Test
    #

    @registerTask 'test', (target = 'all') =>
        @task.run 'clean:server'
        @task.run 'connect:test'
        @task.run 'mocha'

    ## Build
    #

    @registerTask 'build', (target = 'all') =>
        @task.run 'clean:server'
        @task.run 'clean:dist'
        @task.run 'compass:dist'
        @task.run 'concat:dist'
        @task.run 'cssmin:dist'
        @task.run 'copy:dist'
        @task.run 'htmlrefs:dist'
        @task.run 'copy:server'

    ## Default
    #

    @registerTask 'default', ['test']

