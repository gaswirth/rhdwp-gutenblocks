module.exports = function(grunt) {
	var npmDependencies = require('./package.json').devDependencies;
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	
		jshint: {
			all: ['Gruntfile.js', 'assets/js/*.js', '!assets/js/**/*.min.js', '!assets/js/vendor/**/*.js'],
			options: {
				esversion: 6,
			},
		},
	
		watch: {
			js: {
				files: ['assets/js/**/*.js'],
				tasks: ['jshint'],
			},
			stylus: {
				files: ['assets/stylus/**/*.styl'],
				tasks: ['stylus:compile'],
			},
			php: {
				files: ['**/*.php'],
			},
			css: {
				files: ['**/*.css'],
			},
			json: {
				files: ['assets/js/theme-defaults.json'],
				tasks: ['rhdwp-theme-setup']
			},
			livereload: {
				options: {
					livereload: {
						port: 9000
					},
				},
				files: ['assets/css/**/*.css','assets/js/**/*.js','**/*.php']
			}
		},
		
		stylus: {
			compile: {
				files: [
					{
						src: ['**/*.styl', '!**/_*.styl'],
						cwd: 'assets/stylus',
						dest: 'assets/css',
						ext: '.css',
						expand: true
					},
					{
						src: ['**/blocks/*.styl'],
						cwd: 'assets/stylus/blocks',
						dest: 'assets/css/blocks',
						ext: '.css',
						expand: true
					}
				],
				options: {
					compress: true,
					banner: '/**\n' +
							'* RHDWP Base Styles \n' +
							'* \n' +
							'* Generated <%= grunt.template.today("mm-dd-yyyy h:MM:ss TT") %>\n' +
							'* \n' +
							'* @package rhdwp\n' +
							'*/'
				}
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-stylus');

	grunt.registerTask('rhdwp-theme-setup', function() {
		const defaults = grunt.file.readJSON('./assets/js/theme-defaults.json');
		const timestamp = grunt.template.today("mm-dd-yyyy h:MM:ss TT");
		
		const banner =	'/*--------------------------------------------------------------\n' +
						' * GENERATED ' + timestamp + '\n' +
						'--------------------------------------------------------------*/\n';
		
		
		let colorStyles = '';
		let colorDefs = '';
		let sizeStyles = '';
		let sizeDefs = '';
		
		let i;
		
		// Color definitions
		for (i = 0; i < defaults.colors.length; i++) {
			colorDefs += '$'+defaults.colors[i].slug+' = '+defaults.colors[i].color+'\n';
			
			// Excluding some colors from the Gutenberg custom palette
			if ( defaults.colors[i].exclude === true ) { continue; }
			else {
				colorStyles += '.has-'+defaults.colors[i].slug+'-background-color\n\tbackground-color: $'+defaults.colors[i].slug+';\n\n\b.has-'+defaults.colors[i].slug+'-color\n\tcolor: $'+defaults.colors[i].slug+';';
				
				// Add a line break if we're not on the last color in the array
				if ( i < defaults.colors.length - 1) {
					colorStyles += '\n\n';
				}
			}
		}
		
		// Size definitions
		for (i = 0; i < defaults.sizes.length; i++) {
			sizeDefs += '$'+defaults.sizes[i].slug+' = '+defaults.sizes[i].size+'px\n';
			
			sizeStyles += '.has-'+defaults.sizes[i].slug+'-font-size\n\tfont-size: $'+defaults.sizes[i].slug+';';
			
			// Add a line break if we're not on the last sizein the array
			if ( i < defaults.sizes.length - 1) {
				sizeStyles += '\n\n';
			}
		}
		
		let output = banner + colorDefs + '\n' + sizeDefs + '\n\n// Colors\n' + colorStyles + '\n\n// Sizes\n' + sizeStyles;
		grunt.file.write('./assets/stylus/partials/_theme-defaults.styl', output);
	});
	
	grunt.registerTask('setup', ['rhdwp-theme-setup', 'stylus:compile']);
	grunt.registerTask('default', ['rhdwp-theme-setup','jshint', 'watch']);
};
