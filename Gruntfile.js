module.exports = function (grunt) {
	grunt.initConfig({

		watch: {
		  scripts: {
		    files: '**/*.jade',
		    tasks: ['jade','uglify','cssmin'],
		    options: {
		      debounceDelay: 250,
		    },
		  },
		},
		browserSync: {
		    dev: {
		        bsFiles: {
		            src : ['**/*.css',
                        '*.html','**/*.js']
		        },
		        options: {
		        	watchTask: true,
		            proxy: "localhost:8080/NewPraiseTeam"
		        }
		    }
		},
		  jade: {
	      compile: {
	        options: {
	          pretty: true,
	        },
	        files: {
	          'index.html': 'jade_files/index.jade'
	        }
	      }
	    },
	    uglify: {
	    my_target: {
	      files: {
	        'assets/js/main.min.js': ['assets/js/main.js']
	      }
	    }
	  },
	  cssmin: {
		  options: {
		    shorthandCompacting: false,
		    roundingPrecision: -1
		  },
		  target: {
		    files: {
		      'assets/css/main.min.css': ['assets/css/main.css']
		    }
		  }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.registerTask('default', ['browserSync','watch'])
};