module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			all: [
				'library/css/src', 
				'library/css/build',
				'library/css/dist',
				'library/js/build',
				'library/js/dist'
			]
		},
		jshint: {
			all: [
				'Gruntfile.js',
				'library/js/src/*.js'
			]
		},	
		uglify: {
			dist: {
				options: {
					preserveComments: true, // set to true to keep comments in the code
					compress: {
						drop_console: true // removes all console.log incase there left in the code
					},
					sourceMap: false,
					sourceMapIncludeSources: false
				},
				files:  [{
					expand: true,
					ext: '.min.js',
					cwd: 'library/js/build',
					src: ['**/*.js'],
					dest: 'library/js/dist'
				}]
			}
		},			
		sass: {
			all: {                            // Target
				options: {                       // Target options
					style: 'expanded',
					sourcemap: 'none'
				},
				files: {                         // Dictionary of files
					'library/css/src/style.css': 'library/scss/style.scss',
					'library/css/src/login.css': 'library/scss/login.scss',
					'library/css/src/ie.css': 'library/scss/ie.scss',
					'library/css/src/editor-style.css': 'library/scss/editor-style.scss',
					'library/css/src/admin.css': 'library/scss/admin.scss'
				}
			}
		},
		copy: {
			css: {
				files: [{
					expand: true, 
					cwd: 'library/css/src',
					src: ['*.css'], 
					dest: 'library/css/build', 
					filter: 'isFile'
				}]
			},
			js: {
				files: [{
					expand: true, 
					cwd: 'library/js/src',
					src: ['**/*.js'], 
					dest: 'library/js/build', 
					filter: 'isFile'
				}]				
			}
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					ext: '.min.css',
					cwd: 'library/css/build',
					src: ['*.css'],
					dest: 'library/css/dist'
				}]
			}
		},
		watch: {
			scripts: {
				files: ['library/scss/**/*.scss'],
				tasks: ['default'],
				options: {
					spawn: false,
				}
			}
		}			
	});

	grunt.registerTask('default', ['clean', 'jshint', 'sass', 'copy', 'cssmin', 'uglify']);
};