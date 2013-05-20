/*global module:false*/
module.exports = function(grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        connect: {
            server: {
                options: {
                    port: 9001,
                    keepalive: true

                }
            }
        },
        min: {
            dist: {
                src: ['src/validate.js'],
                dest: 'dist/validate.min.js'
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, flatten: true, src: ['src/validate.js'], dest: 'dist/', filter: 'isFile'}
                ]
            }
        },
        mocha: {
            test: { // Runs your application tests
                src: ['tests/index.html'],
                options: {
                    mocha: {
                        ignoreLeaks: false
                    },
                    run: false
                }
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-yui-compressor');
    grunt.loadNpmTasks('grunt-mocha');

    // Register tasks
    grunt.registerTask('default', ['connect']);
    grunt.registerTask('deploy', ['copy', 'min']);
    grunt.registerTask('test', ['mocha']);

};
