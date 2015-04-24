"use strict";

module.exports = {
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/okkyangular',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.min.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
				'public/lib/angular-material/angular-material.min.css',
				'public/lib/nvd3/nv.d3.min.css',
				'public/lib/reveal.js/css/reveal.css',
			],
			js: [
				'public/lib/angular/angular.min.js',
				'public/lib/angular-messages/angular-messages.min.js',
				'public/lib/angular-resource/angular-resource.min.js',
				'public/lib/angular-cookies/angular-cookies.min.js',
				'public/lib/angular-animate/angular-animate.min.js',
				'public/lib/angular-touch/angular-touch.min.js',
				'public/lib/angular-sanitize/angular-sanitize.min.js',
				'public/lib/angular-ui-router/release/angular-ui-router.min.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',

				'public/lib/jquery/dist/jquery.min.js',

				'public/lib/angular-aria/angular-aria.min.js',

				'public/lib/angular-material/angular-material.min.js',
				'public/lib/gsap/src/minified/TimelineMax.min.js',
				'public/lib/gsap/src/minified/TweenMax.min.js',

				//'public/lib/gsap/src/minified/utils/Draggable.min.js',
				//'public/lib/gsap/src/minified/plugins/TextPlugin.min.js',
				'public/lib/gsap/src/minified/plugins/ScrollToPlugin.min.js',
				'public/lib/gsap/src/minified/plugins/ColorPropsPlugin.min.js',
				'public/lib/gsap/src/minified/plugins/CSSPlugin.min.js',
				'public/lib/gsap/src/minified/utils/Draggable.min.js',
				//'public/lib/3rd/SplitText.min.js',

				'public/lib/ng-context-menu/dist/ng-context-menu.min.js',
				//'public/lib/threejs/build/three.min.js',

				/*
				 'public/lib/tremulajs/libs/hammer.js',
				 'public/lib/tremulajs/libs/jsBezier-0.6.js',
				 'public/lib/tremulajs/dist/Tremula.js',
				 */

				'public/lib/Snap.svg/dist/snap.svg-min.js',
				'public/lib/lodash/dist/lodash.min.js',
				//'public/lib/angular-google-maps/dist/angular-google-maps.min.js',

				'public/lib/d3/d3.min.js',
				//'public/lib/d3-timeline/src/d3-timeline.js',

				'public/lib/topojson/topojson.js',
				'public/lib/angular-smart-table/dist/smart-table.min.js',


				'public/lib/tinymce/tinymce.min.js',
				'public/lib/tinymce/plugins/image/plugin.min.js',
				'public/lib/tinymce/plugins/link/plugin.min.js',
				'public/lib/tinymce/plugins/fullscreen/plugin.min.js',
				'public/lib/tinymce/plugins/code/plugin.min.js',
				'public/lib/tinymce/plugins/table/plugin.min.js',
				'public/lib/tinymce/plugins/contextmenu/plugin.min.js',
				'public/lib/tinymce/plugins/media/plugin.min.js',

				'public/lib/string/lib/string.min.js',
				'public/lib/moment/min/moment-with-locales.min.js',

                'public/lib/nvd3/nv.d3.min.js',
                'public/lib/angular-nvd3/dist/angular-nvd3.min.js',

                'public/lib/braintree-angular/dist/braintree-angular.js',
				'public/lib/reveal.js/js/reveal.js'
			]
		},
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '574563539488-n0vrevgjp3606l20hfk4rqfk1dc8j3qb.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || 'B0PEX0jbIkDCumhmpH-D9Sq0',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
