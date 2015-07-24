// Generated on 2014-09-02 using generator-angular-require 0.2.7
'use strict';

// # Globbing
//grunt serve --gruntfile GruntfileWatershed.js
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-node-inspector');

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths for the application
    var appConfig = {
        app: grunt.option('project') || 'www1',
        dist: 'dist',
        port: (function () {

            return 9090;
        /*    if (grunt.option('project') === 'watershed') {
                return 9090;
            } else {
                return 9000;
            }*/
        })(),
        compiled: (function () {
            if (grunt.option('project') === 'watershed') {
                return '.compiled_watershed';
            } else {
                return '.compiled';
            }
        })()
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        'bower': {
            app: {/* */}
        },

        'node-inspector': {
            custom: {
                options: {
                    'web-port': 8085,
                    'web-host': 'localhost',
                    'debug-port': 5858,
                    'save-live-edit': true,
                    'no-preload': true,
                    'stack-trace-limit': 4,
                    'hidden': ['node_modules']
                }
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= yeoman.app %>/modules/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            styles: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: '<%= yeoman.port %>',
                // Change this to '127.0.0.1' to access the server from outside.
                hostname: '0.0.0.0',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            require('./' + appConfig.app + '/mock/server.js'),
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use(
                                'www1/lib',
                                connect.static('www1/lib')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9099,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/modules/{,*/}*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            tmp: '.tmp',
            compiled: '<%= yeoman.compiled %>',
            reports: 'reports/{,*/}*'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            options: {
                cwd: '<%= yeoman.app %>'
            },
            app: {
                src: ['<%= yeoman.app %>/index.html'],
                ignorePath: /\.\.\//
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= yeoman.dist %>/styles/{,*/}*.css', '!<%= yeoman.dist %>/styles/overrides/**/*.css',
                    '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= yeoman.dist %>/scripts/{,*/}*.js'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            images: ['<%= yeoman.app %>/modules/**/*.js', '<%= yeoman.app %>/modules/**/*.html', '<%= yeoman.app %>/modules/**/*.json'],
            html: ['<%= yeoman.app %>/index.html'],
            css: ['<%= yeoman.app %>/{,*/}*.css', '!<%= yeoman.app %>/styles/overrides/**/*.css'],
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },

        uglify: {
            options: {
                compress: {
                    'drop_console': true
                },
                mangle: true
            },
            i18n: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: 'angular/i18n/*.js',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/index.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css', '!<%= yeoman.dist %>/styles/overrides/*.css'],
            images: ['<%= yeoman.dist %>/scripts/nodium*.js', '<%= yeoman.dist %>/modules/**/*.html', '<%= yeoman.dist %>/modules/**/*.json'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images'],
                patterns: {
                    images: [
                        [/(\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
                    ]
                }
            }
        },
        // The following *-min tasks produce minified files in the dist folder
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/styles',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: '<%= yeoman.dist %>/styles',
                    ext: '.css'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: false,
                    collapseBooleanAttributes: true,
                    removeCDATASectionsFromCDATA: true,
                    removeComments: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: false,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    removeEmptyAttributes: true,
                    removeIgnored: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: [{
                    expand: true,
                    src: '**/*.html',
                    cwd: '<%= yeoman.dist %>',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        'json-minify': {
            dist: {
                files: '<%= yeoman.dist %>/**/*.json'
            }
        },
        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    // cwd: '<%= yeoman.app %>/scripts',
                    src: '**/**/**/*.js',
                    dest: '<%= yeoman.dist %>/**/**/*.js'
                }]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },
        shell: {                                // Task

        },
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        'index.html',
                        'modules/**/*.html',
                        'modules/**/*.json',
                        'images/**/*.{webp}',
                        'fonts/*',
                        'resources/*',
                        'styles/overrides/*.css'
                    ]
                },
                    {
                        //for font-awesome
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/components-font-awesome',
                        src: ['fonts/*.*'],
                        dest: '<%= yeoman.dist %>'
                    },
                    {
                        //for bootstrap-fonts
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap/dist',
                        src: ['fonts/*.*'],
                        dest: '<%= yeoman.dist %>'
                    }]
            },
            styles: {
                expand: true,
                cwd: '.tmp/concat/styles',
                dest: '<%= yeoman.dist %>/styles/',
                src: '{,*/}*.css'
            },
            config: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/modules/config',
                    dest: '<%= yeoman.app %>/modules/core/',
                    src: (function () {
                        if (grunt.option('target') === '9tix') {
                            return '9tix.js';
                        } else if (grunt.option('target') === 'feq-staging') {
                            return 'feq-staging.js';
                        } else if (grunt.option('target') === 'feq') {
                            return 'feq.js';
                        } else if (grunt.option('target') === 'wlt') {
                            return 'wlt.js';
                        } else if (grunt.option('target') === 'pologne') {
                            return 'pologne.js';
                        } else if (grunt.option('target') === 'czech') {
                            return 'czech.js';
                        } else if (grunt.option('target') === 'tprogo') {
                            return 'tprogo.js';
                        } else {
                            return 'dev.js';
                        }
                    })(),
                    rename: function (dest) {
                        return dest + '/config.js';
                    }
                }]
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },

        // Test settings
        karma: {
            build: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS'],
                reporters: ['junit'],
                junitReporter: {
                    outputFile: 'reports/junit-xml/test-results.xml',
                    suite: ''
                }
            },
            dev: {
                configFile: 'karma.conf.js',
                singleRun: false,
                browsers: []
            }
        },

        replace: {
            test: {
                src: '<%= yeoman.app %>/../test/test-main.js',
                overwrite: true,
                replacements: [{
                    from: /paths: {[^}]+}/,
                    to: function () {
                        return require('fs').readFileSync(grunt.template.process('<%= yeoman.app %>') + '/modules/main.js').toString().match(/paths: {[^}]+}/);
                    }
                }]
            }
        }
    });

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:tmp',
            'copy:config',
            'wiredep',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:tmp',
        'clean:reports',
        'connect:test',
        'karma:build'
    ]);

    grunt.registerTask('test-dev', [
        'clean:tmp',
        'connect:test',
        'karma:dev'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'clean:tmp',
        'clean:compiled',
        'copy:config',
        'useminPrepare',
        'concat:generated',
        'uglify:generated',
        'copy:styles',
        'imagemin',
        'svgmin',
        'copy:dist',
        'cssmin:dist',
        'filerev',
        'usemin',
        'uglify:i18n',
        'json-minify:dist',
        'htmlmin:dist'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);

};
