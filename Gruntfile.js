var spawn = require('child_process').spawn,
    menubar = spawn('ruby', ['/Users/matthias/test/test.sh']);

module.exports = function(grunt) {
    grunt.initConfig({
        exec: {
            jest: {
                command: 'node node_modules/jest-cli/bin/jest js',
                callback: function(result) {
                 if (result == null) {  
                   menubar.stdin.write("green\n\r");
                 } else {
                   menubar.stdin.write("red\n\r");
                 }
                }
            }
        },
        watch: {
            scripts: {
                files: ['js/**/*.js'],
                tasks: ['exec:jest'],
                options: {
                    spawn: false
                }
            }
        },
        jest: {
          options: {
            coverage: true,
            testPathPattern: /.*-test.js/
          }
        }
    });
    grunt.event.on('watch', function(action, filepath) {
      grunt.config('exec.jest.command', 'node node_modules/jest-cli/bin/jest '
        + filepath.slice(0, filepath.lastIndexOf("/")));
      grunt.log.writeln('> ' + filepath.slice(0, filepath.lastIndexOf("/"))
        + ' has ' + action + '. Starting tests there  🔥 💥 🙉.');
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

};
