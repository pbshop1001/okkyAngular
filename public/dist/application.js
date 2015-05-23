"use strict";

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'mean';
	var applicationModuleVendorDependencies =
        [
            'ngResource',
            'ngCookies',  'ngAnimate',  'ngTouch',
	          'ngMessages',
	          'ngSanitize',  'ui.router',
            'ui.bootstrap', //'ui.utils',
            'ngMaterial', /*'ng-context-menu', 'uiGmapgoogle-maps',*/
            'smart-table',
            //'oc.lazyLoad',
            'nvd3',
            'braintree-angular',
	          'hljs'
        ];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider','$compileProvider',
	function($locationProvider,$compileProvider) {
		$locationProvider.hashPrefix('!');
        //$compileProvider.debugInfoEnabled(false);
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('admin-page');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('d2l-ads');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('d2l-class-utils');

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('d2l-classes');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('d2l-examples');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('d2l-grades');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('d2l-hws-submits');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('d2l-hws');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('d2l-lessons');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('d2l');

/**
 * Created by Kevin on 2014-11-26.
 */

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('disqus');

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('etc-products');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('etc');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('g-drive');

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('googledocs');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('gsap-editor');

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('mean-events');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('mean-tutorials');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('openboard');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('payment');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('present');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('size-util');

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('the-clean-cruds');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('the-clean');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('tinymce');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('user-interface');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('util');

'use strict';

//Setting up route
angular.module('admin-page').config(['$stateProvider',
	function($stateProvider) {
		// Admin page state routing
		$stateProvider.
		state('admin-page', {
			url: '/admin-page',
			templateUrl: 'modules/admin-page/views/admin-page.client.view.html',
				onEnter: function(){
					console.log('onEnter');
				},
				onExit: function(){
					console.log('onExit');

				}
		});
	}
]);
'use strict';

angular.module('admin-page').controller('AdminPageController', adminPageCtrl);


function adminPageCtrl($scope, $location, $mdDialog, Authentication) {

	$scope.authentication = Authentication;
	$scope.user = Authentication.user;

	function DialogController($scope, $mdDialog){
		$scope.hide = function() {
			$mdDialog.hide();
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		$scope.answer = function(answer) {
			$mdDialog.hide(answer);
		};
	}


	$scope.showSignInTutorial = function() {
		$mdDialog.show({
			controller: DialogController,
			templateUrl: 'modules/openboard/template/authentication/signin-dialog.tpl.html',
			//targetEvent: ev,
			clickOutsideToClose: true
		}).then(function(answer){
				//var target = $("#"+elementId).offset().top;
				//TweenMax.to($window, 1.2, {scrollTo:{y:target}, ease:Power4.easeOut});
			},function(){
				//console.log('cancel');
			}
		);
		TweenMax.to($("md-backdrop"),0.5,{position:'fixed'});
	};

	console.log($scope.authentication.user);
	// If user is signed in then redirect back home
	if ($scope.authentication.user ==="") {
		$scope.showSignInTutorial();
	}

	var vm = this;
	vm.defaultMenu = 'Class';
	vm.availMenus = ['Class', 'Example', 'gDocs'];

	vm.class = true;
	vm.example = false;
	vm.gDocs = false;

	$scope.$watch('vm.defaultMenu', function(newVar) {
		if(newVar ==="Class"){
			vm.class = true;
			vm.example = false;
			vm.gDocs = false;
		}else if(newVar ==="Example"){
			vm.class = false;
			vm.example = true;
			vm.gDocs = false;
		}else if(newVar ==="gDocs"){
			vm.class = false;
			vm.example = false;
			vm.gDocs = true;
		}
	});

	vm.title="Admin Page";
	vm.description="Description";

	vm.menus = [
		{title: "Dashboard"},
		{title: "News"},
		{title: "Pages"},
		{title: "Media", subMenu:[{title:"Video Gallery"},{title:"Photo Gallery"}]},
		{title: "Graph & Charts"},
		{title: "Events"},
		{title: "Other Contents"},
		{title: "Admin Tools"},
	];
}



'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		//Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
		//Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
	}
]);

'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listArticles', {
			url: '/articles',
			templateUrl: 'modules/articles/views/list-articles.client.view.html'
		}).
		state('createArticle', {
			url: '/articles/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html'
		}).
		state('viewArticle', {
			url: '/articles/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html'
		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);
'use strict';

angular.module('articles').controller('ArticlesController',
	['$scope', '$stateParams', '$location', '$http', '$sce','Authentication', 'Articles',
	function($scope, $stateParams, $location, $http, $sce, Authentication, Articles) {
		$scope.authentication = Authentication;
        $scope.docTypes = [{name: 'Project'}, {name: 'Article'}, {name: 'Information'}];
        $scope.docType = 2;

        $scope.radioData = [
            { label: 'Information', value: 1 },
            { label: 'Article', value: 2 },
            { label: 'Project', value: 3}
        ];

		$scope.create = function() {
			var article = new Articles({
				title: $scope.title,
                docType: $scope.docType,
				content: $scope.content
			});

			article.$save(function(response) {
				$location.path('articles/' + response._id);
				$scope.title = '';
                $scope.type='';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			}, function(data){console.log(data);data.content = $sce.trustAsHtml(data.content)})
		};
	}
]);

'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider', '$compileProvider','hljsServiceProvider',
	function($stateProvider, $urlRouterProvider, $compileProvider, hljsServiceProvider) {

		// disable dubug data Information
		$compileProvider.debugInfoEnabled(true);

		hljsServiceProvider.setOptions({
			// replace tab with 4 spaces
			tabReplace: '    '
		});
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');
		// Home state routing
		$stateProvider.
		state('link-list', {
			url: '/link-list',
			templateUrl: 'modules/core/views/link-list.client.view.html'
		}).
		state('home', {
			url: '/dev',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]).constant("devConfig", {
		"directive": "red"
	})
    .constant('clientTokenPath', 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiIyYmFjOWMxNjE4ZjA3Mzg2YjFmNjRkYTk1Mjc1MTliOWQ3NzMyMjIxOTIxOWUzZDgzOGI4MDVlZWExYzBkY2JhfGNyZWF0ZWRfYXQ9MjAxNS0wMy0wNlQxOTo1NToxOC45MTE2MTMxMjcrMDAwMFx1MDAyNm1lcmNoYW50X2lkPWRjcHNweTJicndkanIzcW5cdTAwMjZwdWJsaWNfa2V5PTl3d3J6cWszdnIzdDRuYzgiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGNwc3B5MmJyd2RqcjNxbi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL2RjcHNweTJicndkanIzcW4vY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIn0sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsInRocmVlRFNlY3VyZSI6eyJsb29rdXBVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGNwc3B5MmJyd2RqcjNxbi90aHJlZV9kX3NlY3VyZS9sb29rdXAifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwibWVyY2hhbnRBY2NvdW50SWQiOiJzdGNoMm5mZGZ3c3p5dHc1IiwiY3VycmVuY3lJc29Db2RlIjoiVVNEIn0sImNvaW5iYXNlRW5hYmxlZCI6dHJ1ZSwiY29pbmJhc2UiOnsiY2xpZW50SWQiOiIxMWQyNzIyOWJhNThiNTZkN2UzYzAxYTA1MjdmNGQ1YjQ0NmQ0ZjY4NDgxN2NiNjIzZDI1NWI1NzNhZGRjNTliIiwibWVyY2hhbnRBY2NvdW50IjoiY29pbmJhc2UtZGV2ZWxvcG1lbnQtbWVyY2hhbnRAZ2V0YnJhaW50cmVlLmNvbSIsInNjb3BlcyI6ImF1dGhvcml6YXRpb25zOmJyYWludHJlZSB1c2VyIiwicmVkaXJlY3RVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbS9jb2luYmFzZS9vYXV0aC9yZWRpcmVjdC1sYW5kaW5nLmh0bWwifSwibWVyY2hhbnRJZCI6ImRjcHNweTJicndkanIzcW4iLCJ2ZW5tbyI6Im9mZmxpbmUiLCJhcHBsZVBheSI6eyJzdGF0dXMiOiJtb2NrIiwiY291bnRyeUNvZGUiOiJVUyIsImN1cnJlbmN5Q29kZSI6IlVTRCIsIm1lcmNoYW50SWRlbnRpZmllciI6Im1lcmNoYW50LmNvbS5icmFpbnRyZWVwYXltZW50cy5kZXYtZGNvcGVsYW5kIiwic3VwcG9ydGVkTmV0d29ya3MiOlsidmlzYSIsIm1hc3RlcmNhcmQiLCJhbWV4Il19fQ==');


/**
 * Binds a TinyMCE widget to <textarea> elements.
 */
angular.module('ui.tinymce', [])
	.value('uiTinymceConfig', {
		plugins: "image, link, fullscreen, code, table, contextmenu, media",
		contextmenu: "link media image inserttable | cell row column deletetable",
		image_advtab: true,
		image_class_list: [
			{title: 'Responsive Size', value: 'img-responsive'}

		],
		fullscreen_new_window : true,
		fullscreen_settings : {
			theme_advanced_path_location : "top"
		}
	})
	.directive('uiTinymce', ['uiTinymceConfig', function(uiTinymceConfig) {
		uiTinymceConfig = uiTinymceConfig || {};
		var generatedIds = 0;
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ngModel) {
				var expression, options, tinyInstance;
				// generate an ID if not present
				if (!attrs.id) {
					attrs.$set('id', 'uiTinymce' + generatedIds++);
				}
				options = {
					// Update model when calling setContent (such as from the source editor popup)
					setup: function(ed) {
						ed.on('init', function(args) {
							ngModel.$render();
						});
						// Update model on button click
						ed.on('ExecCommand', function(e) {
							ed.save();
							ngModel.$setViewValue(elm.val());
							if (!scope.$$phase) {
								scope.$apply();
							}
						});
						// Update model on keypress
						ed.on('KeyUp', function(e) {
							console.log(ed.isDirty());
							ed.save();
							ngModel.$setViewValue(elm.val());
							if (!scope.$$phase) {
								scope.$apply();
							}
						});
					},
					mode: 'exact',
					elements: attrs.id
				};
				if (attrs.uiTinymce) {
					expression = scope.$eval(attrs.uiTinymce);
				} else {
					expression = {};
				}
				angular.extend(options, uiTinymceConfig, expression);
				setTimeout(function() {
					tinymce.init(options);
				});


				ngModel.$render = function() {
					if (!tinyInstance) {
						tinyInstance = tinymce.get(attrs.id);
					}
					if (tinyInstance) {
						tinyInstance.setContent(ngModel.$viewValue || '');
					}
				};
			}
		};
	}]);

'use strict';

angular.module('core')
  .run(function ($rootScope) {

  })
  .controller('CoreHeadController',
  ['$scope','$rootScope','$window','$log','$mdSidenav','$location','$state', '$timeout', 'Authentication','D2lClassesOwnership',
    function($scope, $rootScope,$window,$log,$mdSidenav, $location, $state, $timeout, Authentication, D2lClassesOwnership) {
      $scope.authentication = Authentication;
      $scope.title = "Open Board";
      $scope.subTitle = "";
      $scope.link = "";
      $scope.classroom = false;
      $scope.goTo = function(name){
        $state.go(name);
        $scope.toggleLeft();

      };
      $scope.currentState = function(){};
      $scope.onchangeRoute = function(){};

      $scope.toggleLeft = function() {
        $mdSidenav('left').toggle()
          .then(function(){
            $log.debug("toggle left is done");
          });
      };
      $scope.toggleRight = function() {
        //TweenMax.from($('#menuBtn'),2.5, {x:50, ease:Bounce.easeOut});
        $mdSidenav('right').toggle()
          .then(function(){
            $log.debug("toggle RIGHT is done");
            //TweenMax.set($("md-backdrop"),{position:'fixed'});
          });
      };

      $scope.change = function(){
        console.log("changed");
        if(user._id !== undefined){
          $location.path('/d2l-classes/'+user._id);
        }
      };

      $scope.loadUsers = function() {
        return $timeout(function() {
          $scope.users = D2lClassesOwnership.query();
        }, 650);
      }

      $scope.tiles = buildGridModel({
        icon : "avatar:svg-",
        title: "Svg-",
        background: ""
      });

      function buildGridModel(tileTmpl){
        var it, results = [ ];
        for (var j=0; j<6; j++) {
          it = angular.extend({},tileTmpl);
          it.icon  = it.icon + (j+1);
          //it.title = it.title + (j+1);
          it.span  = { row : "1", col : "1" };
          switch(j+1) {
            case 1:
              it.ifCondition = "Authentication.user";
              it.id="profile";
              it.background = "red";
              it.title = "Profile";
              it.span.row = it.span.col = 2;
              break;
            case 2:
              it.ifCondition = "!Authentication.user";
              it.id="signIn";
              it.title = "Sign In";
              it.background = "green";
              it.span.row = it.span.col = 1;
              break;
            case 3:
              it.ifCondition = "Authentication.user";
              it.id="signOut";
              it.title = "Sign Out";
              it.background = "darkBlue";
              break;
            case 4:
              it.ifCondition = true;
              it.id="tutorial";
              it.title = "Tutorial";
              it.background = "blue";
              it.span.col = 2;
              break;
            case 5:
              it.ifCondition = "Authentication.user";
              it.id="urClass";
              it.background = "yellow";
              it.span.col = 2;
              it.title = "Your Classes";
              break;
            case 6:
              it.ifCondition = "Authentication.user";
              it.id="allClass";
              it.background = "red";
              it.span.col = 2;
              it.title = "All Classes";
              break;


          }
          results.push(it);
        }
        return results;
      }

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            console.log('closed');
            if(toState.name === "openboard"){
                $scope.title = "Getting Started";
                $scope.subTitle = "Tutorial";
            }
            else if(toState.name === "mean-home")
            {
                $scope.title = "Open Board";
                $scope.subTitle = " ";
            }
            else if(toState.name ==="d2l-home"){
              $scope.title = "Classroom";
              $scope.subTitle = " ";
            }
            else if(toState.name ==="listD2lClasses"){
              $scope.title = "Class List";
              $scope.subTitle = "Select a Class";
            }
            else if(toState.name ==='profile'){
              $scope.title = "Profile";
              $scope.subTitle = "Edit Profile";
            }

        });

      $scope.sliderNavEvent = function(name, target){
        var targetEl = $('#'+target+' figure md-grid-tile-footer h3');
        TweenLite.from(targetEl, 0.8, {scale:1.7});
        $mdSidenav('left').close()
          .then(function(){
            $log.debug("close LEFT is done");
            //console.log(target);
            //TweenMax.to($window, 1.2, {scrollTo:{y:target}, ease:Power4.easeOut});
          });
        console.log(name);
        if(name === 'Your Classes'){
          $state.go('listD2lClasses');
        }
        else if(name ==='Profile'){
          $state.go('profile');
        }
        else if(name ==='Tutorial'){
          $state.go('openboard');
        }
        else if(name ==='All Classes'){
          $state.go('listD2lClassesAll');
        }
        else if(name ==='Sign In'){
          console.log('sign in ');
          $location.path('/signin');
        }
        else if(name ==='Sign Out'){
          $window.location.href = 'auth/signout';
        }
      }
    }
]);

'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

        $(document).on( 'scroll', function(){
            console.log('11111');
            if($(document).scrollTop() > 150)
                TweenMax.to($('header'), 1, {y:-51});
            else
                TweenMax.set($('header'), {y:0});
        });
	}
]);

'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication, YT_event) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.firstJumbo = 'first-jumbo-content';
		$scope.secondJumbo = 'second-jumbo-content';
		$scope.thirdJumbo = 'third-jumbo-content';
		var texts = angular.element(document.querySelector('.core-text-anni'));
		var tl = new TimelineMax({repeat:6, repeatDelay:1, yoyo:true});
		tl.staggerTo(texts, 0.2, {className:'+=superShadow', top:'-=10px', ease:Power1.easeIn}, '0.3', 'start');
	}
]);

'use strict';

angular.module('core').controller('LinklistController', ['$scope',
	function($scope) {
		// Link list controller logic
		// ...
		$scope.modules = [
			{
				name:'Animation',
				links:[
					{linkName: 'svg1', linkHref:'/#!/svg1'},
					{linkName: 'ryuhm12', linkHref:'/#!/ryuhm12'},
					{linkName: 'j1', linkHref:'/#!/j1'},
					{linkName: 'three', linkHref:'/#!/three'}
				]
			},
			{
				name:'Banners',
				links:[
					{linkName: 'List', linkHref:'/#!/banners'},
					{linkName: 'Create', linkHref:'/#!/banners/create'},
					{linkName: 'Banner', linkHref:'/#!/banners/:bannerId'},
					{linkName: 'Edit', linkHref:'/#!/banners/:bannerId/edit'}
				]
			},
			{
				name:'Core',
				links:[
					{linkName: 'Dev', linkHref:'/#!/dev'}
				]
			},
			{
				name:'SDSUMAP',
				links:[
					{linkName: 'SDSU Map', linkHref:'/#!/sdsumap-main'}
				]
			},
			{
				name:'Spec-view',
				links:[
					{linkName: 'Jarvis', linkHref:'/#!/jarvis'},
					{linkName: 'Spec Home', linkHref:'/#!/spec-home'}
				]
			},
			{
				name:'Tj-main',
				links:[
					{linkName: 'tj-main', linkHref:'/#!/tj-main'}
				]
			},
			{
				name:'User-interface',
				links:[
					{linkName: 'MCMU', linkHref:'/#!/mcmu'},
					{linkName: 'Front -1 ', linkHref:'/#!/front-1'},
					{linkName: 'Experimental Interface', linkHref:'/#!/experimental-interface'},
					{linkName: 'Product List', linkHref:'/#!/'},
					{linkName: 'detail-product', linkHref:'/#!/detail-product/:productId'}
				]
			},
			{
				name:'Utility',
				links:[
					{linkName: 'test-page-generator', linkHref:'/#!/test-page-generator'}
				]
			}
		]
	}
]);

/**
 * Created by KevinSo on 9/3/2014.
 */

'use strict';


angular.module('core').controller('PlanController', ['$scope', '$element', 'Authentication', 'Getplans',
    function($scope, $element, Authentication, Getplans) {
        //$scope.plans = Getplans;

        $scope.find = function() {
            $scope.plans = Getplans.query();
            //$scope.plans.contents = $sce.trustAsHtml($scope.plans.contents);
        };
        $scope.find();
        //$scope.plans = [{title: 'test1', body:'content', date:""}];
    }

]);


'use strict';

angular.module('core').factory('Getplans', ['$resource',
	function($resource) {
		// Getplans service logic
		// ...

		// Public API
        return $resource('/articles', {
            userID: '@_id'
        }, {
            update: {
                method: 'GET'
            }
        });
	}
]);

'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);

'use strict';

//Setting up route
angular.module('d2l-ads').config(['$stateProvider',
	function($stateProvider) {
		// D2l ads state routing
		$stateProvider.
		state('ads2', {
			url: '/ads2',
			templateUrl: 'modules/d2l-ads/views/ads2.client.view.html'
		}).
		state('ads1', {
			url: '/ads1',
			templateUrl: 'modules/d2l-ads/views/ads1.client.view.html'
		});
	}
]);
'use strict';

angular.module('d2l-ads').controller('Ads1Controller', ['$scope',
	function($scope) {
        $scope.date = {
            month: moment().format("MMM").toUpperCase(),
            date: moment().date(),
            year: moment().year()
        }
        $scope.animationC1=function(){
            var c = $('.ad1-calendarHolder');
            TweenMax.to(c, 0.6, {x:0, y:0, scale:0.4, transformOrigin: "50% 50%"});
        }

        $scope.animationC2=function(){
            var c = $('.ad1-calendarHolder');
            TweenMax.to(c, 0.6, {x:0, y:0, scale:1, transformOrigin: "50% 50%"});
        }

        $scope.init = function(){
	          //var tl = new TimelineMax();
	          //
	          //var Tween1 = TweenMax.to($('#testDate'), 3.6, {x:0, y:0, scale:0.2, transformOrigin: "0% 0%"});
	          //var Tween2 = TweenMax.to($('#testTool'), 0.6, {height:100, y:30});
	          //tl.add(Tween1).add(Tween2);
        }


        $scope.menus = [{title: "Animation1", desc:""}, {title: "Animation2", desc:""}, {title: "Animation3", desc:""}]
		var iconData = [
			{name: 'icon-home'        , color: "#777" },
			{name: 'icon-user-plus'   , color: "rgb(89, 226, 168)" },
			{name: 'icon-google-plus2', color: "#A00" },
			{name: 'icon-youtube4'    , color:"#00A" },
			// Use theming to color the font-icon
			{name: 'icon-settings'    , color:"#A00", theme:"md-warn md-hue-5"}
		];
		// Create a set of sizes...
		$scope.sizes = [
			{size:12,padding:0},
			{size:21,padding:2},
			{size:36,padding:6},
			{size:48,padding:10}
		];
		$scope.fonts = [].concat(iconData);
		$scope.it = $scope.sizes[3];
		var gdoc = $('.s48');
	//	TweenMax.to(gdoc, 2, {scale:2});
		$scope.animate = function() {
			TweenMax.to(gdoc, 2, {scaleY:2});
		}

		$scope.animate2 = function() {
			TweenMax.to(gdoc, 2, {scale:2});
		}

		$scope.animate3 = function() {
			TweenMax.to(gdoc, 2, {scaleX:1, scaleY:1});
		}

		function sizeUp(size){
			var gdoc = $('.s48');
			TweenMax.to(gdoc, 2, {scale:size});
		}
	}
]);

'use strict';

angular.module('d2l-ads').controller('Ads2Controller', ['$scope',
	function($scope) {
		// Ads2 controller logic
		// ...
	}
]);
'use strict';

angular.module('d2l-ads').directive('calDate', [
	function() {
		return {
			template: '<div class="ad1-calendarHolder" >'
								+'<div class="ad1-calendar">'
								+'<div class="ad1-month">{{date.month}}</div>'
								+'<div class="ad1-day">{{date.date}}</div>'
								+'<div class="ad1-year">{{date.year}}</div>'
								+'</div>'
								+'<div class="ad1-timer"  ng-mouseover="ad1TimerHover()">'
								+'<div class="ad1-sec">1</div>'
								+'</div>'
								+'</div>',
			restrict: 'E',
			link:{
				pre: function preLink(scope, iElement, iAttrs, controller) {
					//console.log('pre: '+ iElement);
				},
				post: function postLink(scope, iElement, iAttrs, controller) {
					$(".ad1-calendarHolder").hover(
						function() {
							TweenLite.to($(this).find('.ad1-timer'), 1.2, {rotationY:360, ease:Back.easeOut});
						},
						function() {
							TweenLite.to($(this).find('.ad1-timer'), 1.2, {rotationY:0, ease:Back.easeOut});
						}
					);
					//console.log('post: '+ iElement);
				}
			}
		};
	}
]);

'use strict';

angular.module('d2l-ads').directive('lineTrasit', ['$timeout',
	function($timeout) {
		return {
			template: '<div class="svg-container" id="lineTransit"></div>',
			restrict: 'E',
			link: {
				pre:function preLink(scope, element, attrs){
					var n = 40,
						random = d3.random.normal(0, .2),
						data = d3.range(n).map(random);

					var margin = {top: 20, right: 20, bottom: 20, left: 40},
						width = 400 - margin.left - margin.right,
						height = 300 - margin.top - margin.bottom;

					var x = d3.scale.linear()
						.domain([0, n - 1])
						.range([0, width]);

					var y = d3.scale.linear()
						.domain([-1, 1])
						.range([height, 0]);

					var line = d3.svg.line()
						.x(function(d, i) { return x(i); })
						.y(function(d, i) { return y(d); });

					var svg = d3.select("#lineTransit").append("svg")
						.attr("id","svg-line-transit")
						.attr("viewBox","0 0 400 300")
						.attr("perserveAspectRatio","xMinYMid")
						.attr("width", width)
						.attr("height", height)
						.append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

					svg.append("defs").append("clipPath")
						.attr("id", "clip")
						.append("rect")
						.attr("width", width)
						.attr("height", height);

					svg.append("g")
						.attr("class", "x axis")
						.attr("transform", "translate(0," + y(0) + ")")
						.call(d3.svg.axis().scale(x).orient("bottom"));

					svg.append("g")
						.attr("class", "y axis")
						.call(d3.svg.axis().scale(y).orient("left"));

					var path = svg.append("g")
						.attr("clip-path", "url(#clip)")
						.append("path")
						.datum(data)
						.attr("class", "line")
						.attr("d", line);

					tick();

					function tick() {

						// push a new data point onto the back
						data.push(random());

						// redraw the line, and slide it to the left
						path
							.attr("d", line)
							.attr("transform", null)
							.transition()
							.duration(500)
							.ease("linear")
							.attr("transform", "translate(" + x(-1) + ",0)")
							.each("end", tick);

						// pop the old data point off the front
						data.shift();
					}
				},
				post:function postLink(scope, element, attrs) {
					var c = $('#svg-line-transit');
					var aspect = c.width()/c.height();
					var container = c.parent().parent().parent();
					$(window).on("resize", $timeout(
						function(){
							$timeout()
							var container = c.parent().parent().parent();
							var targetWidth = container.width();
							if($('figure').width() !==0){
								c.attr("width", targetWidth);
								c.attr("height", Math.round(targetWidth/aspect));
							}
						},0.5)).trigger("resize");
				}
			}
		};
	}
]);

'use strict';

angular.module('d2l-ads').directive('openboardAds1', [
	function() {
		return {
			templateUrl: '/modules/d2l-ads/directives/template/openboard-ads1.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
                scope.insertDriveIconURL = 'modules/d2l-ads/svg/gdoc.svg';
                var papers =[];
                papers.push($('#paper1'));
                papers.push($('#paper2'));
                papers.push($('#paper3'));
                papers.push($('#paper4'));
                papers.push($('#paper5'));
                TweenMax.to(papers[0], 2, {x:400, y:200, rotation: 12});
                TweenMax.to(papers[1], 2, {x:-400, y:-400, rotation: -12});
                TweenMax.to(papers[2], 2, {x:200, y:-400, rotation: 22});
                TweenMax.to(papers[3], 2, {x:600, y:-400, rotation: 62});
                TweenMax.to(papers[4], 2, {x:-200, y:600, rotation: 2});


                var tl = new TimelineLite();
                tl.set("#content", {visibility:"visible"})
                    .from(".titleH1Ads1", 0.5, {left:100, autoAlpha:0}) // autoAlpha handles both css properties visibility and opacity.
                    .from(".titleH2Ads1", 0.5, {left:-100, autoAlpha:0}, "-=0.25") //add tween 0.25 seconds before previous tween ends
                    .from("#feature", 0.5, {scale:0.5, autoAlpha:0}, "feature") // add feature label at start position of this tween
                    .from("#description", 0.5, {left:100, autoAlpha:0}, "feature+=0.25") // add tween 0.25 seconds after the feature label
                    .staggerFrom(".ad1-nav img", 0.5, {scale:0, rotation:-180, autoAlpha:0}, 0.2, "stagger");
			}
		};
	}
]);

'use strict';


function classBoard(){

	function classBoardCtrl(MeanEvents){
		this.title="알림";
		this.info = MeanEvents.query();
		//info.$promise.then(function(result) {
		//	this.info = result;
		//});

	}

	function link($scope, $element, $attrs){

	}

	return {
		restrict: 'E',
		scope:{},
		template:[
			'<md-whiteframe flex class="md-whiteframe-z2 meanT-home-card ob-underbar-dark" layout="column" layout-align="start start">',
				'<h3 class="md-title"> {{vm.title}} </h3>',
					'<div layout="column" layout-fill>',
						'<md-whiteframe class="class-board md-whiteframe-z2" layout layout-align="start center" ng-repeat="content in vm.info">',
							'<span class="class-board-desc md-body-1">{{content.name}}-{{content.created | date}}</span>',
						'</md-whiteframe>',
					'</div>',
			'</md-whiteframe>'
		].join(''),
		controllerAs: 'vm',
		controller: classBoardCtrl,
		link: link
	};
}

angular.module('d2l-class-utils').directive('classBoard', classBoard);
'use strict';

// Configuring the Articles module
angular.module('d2l-classes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'D2l classes', 'd2l-classes', 'dropdown', '/d2l-classes(/create)?');
		Menus.addSubMenuItem('topbar', 'd2l-classes', 'List D2l classes', 'd2l-classes');
		Menus.addSubMenuItem('topbar', 'd2l-classes', 'New D2l class', 'd2l-classes/create');
	}
]);
'use strict';

//Setting up route
angular.module('d2l-classes').config(['$stateProvider',
	function($stateProvider) {
		// D2l classes state routing
		$stateProvider.
		state('view-class-detail', {
			url: '/view-class-detail',
			templateUrl: 'modules/d2l-classes/views/view-class-detail.client.view.html'
		}).


			// Test Animation View
			state('d2lClassInfo', {
				abstract: true,
				url: '/class',
				templateUrl: 'modules/d2l-classes/views/d2l-class-info.client.view.html'
			}).
				state('d2lClassInfo.contact', {
					url: '/class-contact',
					controller:'contactController',
					templateUrl: 'modules/d2l-classes/views/class-contact.client.view.html'
				}).
				state('d2lClassInfo.about', {
					url: '/about',
					controller:'aboutController',
					templateUrl: 'modules/d2l-classes/views/class-about.client.view.html'
				}).
				state('d2lClassInfo.home', {
					url: '/home',
					controller:'mainController',
					templateUrl: 'modules/d2l-classes/views/class-home.client.view.html'
				}).

			state('listD2lClasses', {
				url: '/d2l-classes',
				templateUrl: 'modules/d2l-classes/views/list-d2l-classes.client.view.html'
			}).
			state('listD2lClassesAll', {
				url: '/d2l-classesAll',
				templateUrl: 'modules/d2l-classes/views/list-d2l-classesAll.client.view.html'
			}).
			state('createD2lClass', {
				url: '/d2l-classes/create',
				templateUrl: 'modules/d2l-classes/views/create-d2l-class.client.view.html'
			}).
			state('viewD2lClass', {
				url: '/d2l-classes/:d2lClassId',
				templateUrl: 'modules/d2l-classes/views/view-d2l-class.client.view.html'
			}).
			state('editD2lClass', {
				url: '/d2l-classes/:d2lClassId/edit',
				templateUrl: 'modules/d2l-classes/views/edit-d2l-class.client.view.html'
			});
	}
]);
'use strict';
// D2l classes controller
angular.module('d2l-classes').controller('D2lClassesController',D2lClassesController);

	function D2lClassesController($scope, $sce, $stateParams, $state, $window, $location, $mdDialog, Authentication, D2lHws,D2lGradesByClass, D2lClasses, D2lHwsByClass, D2lHwsSubmitsTrue, D2lGrades, D2lHwsSubmitsTrueByClass, D2lHwsByOriginDocId, D2lClassesOwnership, D2lLessonsOwnership) {
		$scope.classOwner = false;

		$scope.id = $stateParams.d2lClassId;
		$scope.authentication = Authentication;
		var authentication = Authentication;
		$scope.user = Authentication.user;
		$scope.calendarAvail = true;

		if($scope.user.additionalProvidersData !== undefined)
			$scope.gUser = $scope.user.additionalProvidersData.google.email.split('@')[0];
		else if($scope.user.provider==="google"){
			$scope.gUser = $scope.user.providerData.email.split('@')[0];
		}
		else{
			$scope.calendarAvail = false;
		}

		$scope.toGo = function(lessonId){
			$state.go('viewD2lLesson', {d2lLessonId:lessonId})
		}
		$scope.calendar = function() {
			var src;
			if($scope.calendarAvail){
				src = "https://www.google.com/calendar/embed?showTitle=0&showNav=0&showDate=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0&mode=AGENDA&height=300&wkst=1&bgcolor=%23FFFFFF&src="+$scope.gUser+"%40gmail.com&color=%23691426&ctz=America%2FChicago";
			}
			return $sce.trustAsResourceUrl(src);
		}
		$scope.numClasses = 0;

		$scope.classContents = [{topic:"Introduction"},{topic:"C++"},{topic:"Input/Flow Control"},{topic:"Functions"},{topic:"Arrays"},{topic:"File IO"},];
		$scope.copyHWTemplate = function(gdocId){
			var AppScriptAPI = 'https://script.google.com/macros/s/AKfycbzoXxZDgzjLOJdqGUGYCWSpIT7n2sHyvnIo2W7E5jmXI_2sryj3/exec?';
			var param = 'docId='+gdocId+'&userIdRef='+Authentication.user._id+'&task=copy';
			$window.open(AppScriptAPI+param);
		};

		// Create new D2l class
		$scope.create = function() {
			// Create new D2l class object
			var d2lClass = new D2lClasses ({
				name: this.name,
				prefix:this.prefix,
				image:this.image
			});

			// Redirect after save
			d2lClass.$save(function(response) {
				//console.log('ddd');
				$mdDialog.hide();
				//$location.path('d2l-classes/' + response._id);

				// Clear form fields
				$scope.name = '';
                $scope.prefix = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing D2l class
		$scope.remove = function(d2lClass) {
			if ( d2lClass ) { 
				d2lClass.$remove();

				for (var i in $scope.d2lClasses) {
					if ($scope.d2lClasses [i] === d2lClass) {
						$scope.d2lClasses.splice(i, 1);
					}
				}
			} else {
				$scope.d2lClass.$remove(function() {
					$location.path('d2l-classes');
				});
			}
		};

		// Update existing D2l class
		$scope.update = function() {
			var d2lClass = $scope.d2lClass;

			d2lClass.$update(function() {
				$location.path('d2l-classes/' + d2lClass._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of D2l classes
		$scope.find = function() {
			$scope.d2lClasses = D2lClassesOwnership.query();
		};


		$scope.lessons = D2lLessonsOwnership.query({d2lClassId: $stateParams.d2lClassId});


		$scope.linkHW = function(hw){
			console.log('dd');
			var AppScriptAPI = 'https://script.google.com/macros/s/AKfycbzMWif8iQmlLZbno9fSUSWWwA9mL4_OEae1nKxcnbxSt980kOpy/exec?'
			//var AppScriptAPI = 'https://script.google.com/macros/s/AKfycbzoXxZDgzjLOJdqGUGYCWSpIT7n2sHyvnIo2W7E5jmXI_2sryj3/exec?';
			var param = 'docId='+hw.gdocId+
				'&userId='+authentication.user.username+
				'&title='+hw.title+
				'&dDate='+hw.dDate+
				'&userIdRef='+Authentication.user._id+
				'&instructorRef='+hw.class.user+
				'&classId='+hw.class._id;
			console.log(hw.dDate);
			$window.open(AppScriptAPI+param);
		};

		$scope.openDoc = function(docId){
			var url = 'https://docs.google.com/document/d/'+docId+'/edit';
			$window.open(url);
		};

		// Find a list of D2l classes
		$scope.findAll = function() {
			$scope.d2lClasses = D2lClasses.query();

		};

		// Find existing D2l class
		$scope.findOne = function() {
			$scope.d2lClass = D2lClasses.get({
				d2lClassId: $stateParams.d2lClassId
			});

			$scope.d2lClass.$promise.then(function(result){
				if(Authentication.user._id === result.user._id) {
					$scope.classOwner =true;
				}
				$scope.numClasses = result.length;

				$scope.hws = D2lHwsByClass.get({classId: result._id},function(result){
					$scope.hwsCopy = [].concat(result);
				});

				$scope.submittedHW = D2lHwsSubmitsTrueByClass.get({classId: result._id},function(result){
					$scope.submittedHWCopy = [].concat(result);

					result.forEach(function(value, index){
						$scope.submittedHWCopy[index].hwInfo = D2lHwsByOriginDocId.get({gdocId: result[index].originId}, function(result){
							//$scope.submittedHWCopy.hwInfo = result[0];
						});
					})
				});

				$scope.gradeCollection = D2lGradesByClass.get({classId:$stateParams.d2lClassId});
				$scope.gradeCollection.$promise.then(function (result) {
					$scope.gradeCollection = result;
					$scope.gradeCollectionCopy = [].concat(result);
					result.forEach(function(value, index){
						$scope.gradeCollectionCopy[index].name = result[index].name.split(":")[0];
					})
					//D2lHws
				});
			});
		};

		$scope.showNewAssign = function(ev){
			$mdDialog.show({
				controller: D2lHwDialogCtrl,
				templateUrl: 'modules/openboard/template/tutorial/newAssign-dialog.tpl.html',
				targetEvent: ev,
				clickOutsideToClose: false,
				preserveScope: false,
				locals: {project:{gdocId: ''}},
				bindToController: true,
				//onComplete: reset

			}).then(
				function(){
					//$log.debug('cancel');
				},
				function(){
					//$log.debug('created Assignment');
					$scope.hws = D2lHwsByClass.get({classId: $scope.d2lClass._id},function(result){
						$scope.hwsCopy = [].concat(result);
					});
				}
			);

			function D2lHwDialogCtrl(scope, $timeout, $mdDialog, D2lHws, D2lClassesOwnership, GDriveSelectResult){

				scope.$on('handleEmit', function(event, args) {
					//console.log('broadcast is invoked');
					scope.project.gdocId=args.message;
					scope.$digest();
				});
				scope.cancel = function(){
					$mdDialog.cancel();
					scope.docs = "";
					scope.project = '';
					scope.projectForm = '';
					args.message = '';
					scope.$digest();
					//console.log('B');;
				};
				scope.docs = GDriveSelectResult;
				scope.project = {gdocId : scope.docs.id};

				var dDate = new Date();
				dDate.setHours(23,59,59,999);

				scope.project = {
					dDate: dDate
					//gdocId : scope.docs.id
					//desc: 'Nuclear Missile Defense System',
				};

				scope.loadClasses = function() {
					//console.log('Load Class is invoked');
					return $timeout(function() {
						scope.classes = D2lClassesOwnership.query();
					}, 650);
				};

				scope.createNewRecord = function() {
					//console.log('Create');
					// Create new D2l hw object
					scope.project.dDate.setHours(23,59,59,999);
					var d2lHw = new D2lHws (scope.project);
					d2lHw.class = d2lHw.class._id;

					// Redirect after save
					d2lHw.$save(function(response) {
						//$location.path('d2l-hws/' + response._id);
						// Clear form fields
						scope.name = '';
						scope.project.gdocId = '';
						scope.projectForm = null;
						$mdDialog.cancel();
						scope.project = null;

					}, function(errorResponse) {
						scope.error = errorResponse.data.message;
					});
				};
			}
		};

		$scope.openAdminMenu = function(){
			$state.go('admin-page');
		};
	}

angular.module('d2l-classes')
	.controller('mainController', function($scope, $state) {
		$scope.pageClass = 'page-home';
		$scope.goTo = function(name){
			$state.go(name);
		}
	})
	.controller('aboutController', function($scope, $state) {
		$scope.pageClass = 'page-about';
		$scope.goTo = function(name){
			$state.go(name);
		}
	})
	.controller('contactController', function($scope, $state) {
		$scope.pageClass = 'page-contact';
		$scope.goTo = function(name){
			$state.go(name);
		}
	});


'use strict';

angular.module('d2l-classes').controller('ViewClassDetailController', ['$scope',
	function($scope) {
		// View class detail controller logic
		// ...
	}
]);
'use strict';

//D2l classes service used to communicate D2l classes REST endpoints
angular.module('d2l-classes').factory('D2lClasses', ['$resource',
	function($resource) {
		return $resource('d2l-classes/:d2lClassId', { d2lClassId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]).factory('D2lClassesOwnership', ['$resource',
	function($resource) {
		return $resource('d2l-classes/i', { d2lClassId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

'use strict';

//Setting up route
angular.module('d2l-examples').config(['$stateProvider',
	function($stateProvider) {
		// D2l examples state routing
		$stateProvider.
		state('listD2lExamples', {
			url: '/d2l-examples',
			templateUrl: 'modules/d2l-examples/views/list-d2l-examples.client.view.html'
		}).
		state('createD2lExample', {
			url: '/d2l-examples/create',
			templateUrl: 'modules/d2l-examples/views/create-d2l-example.client.view.html'
		}).
		state('viewD2lExample', {
			url: '/d2l-examples/:d2lExampleId',
			templateUrl: 'modules/d2l-examples/views/view-d2l-example.client.view.html'
		}).
		state('editD2lExample', {
			url: '/d2l-examples/:d2lExampleId/edit',
			templateUrl: 'modules/d2l-examples/views/edit-d2l-example.client.view.html'
		});
	}
]);
'use strict';

// D2l examples controller
angular.module('d2l-examples').controller('D2lExamplesController', ['$scope', '$stateParams', '$location', 'Authentication', 'D2lExamples','D2lClassesOwnership',
	function($scope, $stateParams, $location, Authentication, D2lExamples, D2lClassesOwnership) {
		$scope.authentication = Authentication;

		$scope.classes = D2lClassesOwnership.query();

		// Create new D2l example
		$scope.create = function() {
			// Create new D2l example object
			var d2lExample = new D2lExamples ({
				name: this.name,
				class: this.class._id,
				link: this.link
			});

			// Redirect after save
			d2lExample.$save(function(response) {
				$location.path('d2l-examples/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing D2l example
		$scope.remove = function(d2lExample) {
			if ( d2lExample ) { 
				d2lExample.$remove();

				for (var i in $scope.d2lExamples) {
					if ($scope.d2lExamples [i] === d2lExample) {
						$scope.d2lExamples.splice(i, 1);
					}
				}
			} else {
				$scope.d2lExample.$remove(function() {
					$location.path('d2l-examples');
				});
			}
		};

		// Update existing D2l example
		$scope.update = function() {
			$scope.d2lExample.class = $scope.d2lExample.class._id;
			var d2lExample = $scope.d2lExample;

			d2lExample.$update(function() {
				$location.path('d2l-examples/' + d2lExample._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of D2l examples
		$scope.find = function() {
			$scope.d2lExamples = D2lExamples.query();
		};

		// Find existing D2l example
		$scope.findOne = function() {
			$scope.d2lExample = D2lExamples.get({ 
				d2lExampleId: $stateParams.d2lExampleId
			});
		};


	}
]);
'use strict';

angular.module('d2l-examples').directive('classExCreate', classExCreate);
angular.module('d2l-examples').directive('classExList', classExteList);
function classExCreate() {
	return {
		templateUrl: 'modules/d2l-examples/views/create-d2l-example.client.view.html',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {
		}
	};
};
function classExteList() {
	return {
		templateUrl: 'modules/d2l-examples/views/list-d2l-examples.client.view.html',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {

		}
	};
};

'use strict';

//D2l examples service used to communicate D2l examples REST endpoints
angular.module('d2l-examples').factory('D2lExamples', ['$resource',
	function($resource) {
		return $resource('d2l-examples/:d2lExampleId', { d2lExampleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('d2l-grades').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'D2l grades', 'd2l-grades', 'dropdown', '/d2l-grades(/create)?');
		Menus.addSubMenuItem('topbar', 'd2l-grades', 'List D2l grades', 'd2l-grades');
		Menus.addSubMenuItem('topbar', 'd2l-grades', 'New D2l grade', 'd2l-grades/create');
	}
]);
'use strict';

//Setting up route
angular.module('d2l-grades').config(['$stateProvider',
	function($stateProvider) {
		// D2l grades state routing
		$stateProvider.
		state('listD2lGrades', {
			url: '/d2l-grades',
			templateUrl: 'modules/d2l-grades/views/list-d2l-grades.client.view.html'
		}).
		state('createD2lGrade', {
			url: '/d2l-grades/create',
			templateUrl: 'modules/d2l-grades/views/create-d2l-grade.client.view.html'
		}).
		state('viewD2lGrade', {
			url: '/d2l-grades/:d2lGradeId',
			templateUrl: 'modules/d2l-grades/views/view-d2l-grade.client.view.html'
		}).
		state('editD2lGrade', {
			url: '/d2l-grades/:d2lGradeId/edit',
			templateUrl: 'modules/d2l-grades/views/edit-d2l-grade.client.view.html'
		});
	}
]);
'use strict';

// D2l grades controller
angular.module('d2l-grades').controller('D2lGradesController', ['$scope', '$stateParams', '$location', 'Authentication', 'D2lGrades',
	function($scope, $stateParams, $location, Authentication, D2lGrades) {
		$scope.authentication = Authentication;

		// Create new D2l grade
		$scope.create = function() {
			// Create new D2l grade object
			var d2lGrade = new D2lGrades ({
				name: this.name
			});

			// Redirect after save
			d2lGrade.$save(function(response) {
				$location.path('d2l-grades/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing D2l grade
		$scope.remove = function(d2lGrade) {
			if ( d2lGrade ) { 
				d2lGrade.$remove();

				for (var i in $scope.d2lGrades) {
					if ($scope.d2lGrades [i] === d2lGrade) {
						$scope.d2lGrades.splice(i, 1);
					}
				}
			} else {
				$scope.d2lGrade.$remove(function() {
					$location.path('d2l-grades');
				});
			}
		};

		// Update existing D2l grade
		$scope.update = function() {
			var d2lGrade = $scope.d2lGrade;

			d2lGrade.$update(function() {
				$location.path('d2l-grades/' + d2lGrade._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of D2l grades
		$scope.find = function() {
			$scope.d2lGrades = D2lGrades.query();
		};

		// Find existing D2l grade
		$scope.findOne = function() {
			$scope.d2lGrade = D2lGrades.get({ 
				d2lGradeId: $stateParams.d2lGradeId
			});
		};
	}
]);
'use strict';

//D2l grades service used to communicate D2l grades REST endpoints
angular.module('d2l-grades').factory('D2lGrades', ['$resource',
	function($resource) {
		return $resource('d2l-grades/:d2lGradeId', { d2lGradeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]).factory('D2lGradesByClass', ['$resource',
	function($resource) {
		return $resource('d2l-grades/byClass/:classId', { classId: '@_id'
		}, {
			get: {
				method: 'GET', isArray:true
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('d2l-hws-submits').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'D2l hws submits', 'd2l-hws-submits', 'dropdown', '/d2l-hws-submits(/create)?');
		Menus.addSubMenuItem('topbar', 'd2l-hws-submits', 'List D2l hws submits', 'd2l-hws-submits');
		Menus.addSubMenuItem('topbar', 'd2l-hws-submits', 'New D2l hws submit', 'd2l-hws-submits/create');
	}
]);
'use strict';

//Setting up route
angular.module('d2l-hws-submits').config(['$stateProvider',
	function($stateProvider) {
		// D2l hws submits state routing
		$stateProvider.
		state('listD2lHwsSubmits', {
			url: '/d2l-hws-submits',
			templateUrl: 'modules/d2l-hws-submits/views/list-d2l-hws-submits.client.view.html'
		}).
		state('createD2lHwsSubmit', {
			url: '/d2l-hws-submits/create',
			templateUrl: 'modules/d2l-hws-submits/views/create-d2l-hws-submit.client.view.html'
		}).
		state('viewD2lHwsSubmit', {
			url: '/d2l-hws-submits/:d2lHwsSubmitId',
			templateUrl: 'modules/d2l-hws-submits/views/view-d2l-hws-submit.client.view.html'
		}).
		state('editD2lHwsSubmit', {
			url: '/d2l-hws-submits/:d2lHwsSubmitId/edit',
			templateUrl: 'modules/d2l-hws-submits/views/edit-d2l-hws-submit.client.view.html'
		});
	}
]);
'use strict';

// D2l hws submits controller
angular.module('d2l-hws-submits').controller('D2lHwsSubmitsController', ['$scope', '$stateParams', '$location', 'Authentication', 'D2lHwsSubmits',
	function($scope, $stateParams, $location, Authentication, D2lHwsSubmits) {
		$scope.authentication = Authentication;

		// Create new D2l hws submit
		$scope.create = function() {
			// Create new D2l hws submit object
			var d2lHwsSubmit = new D2lHwsSubmits ({
				name: this.name
			});

			// Redirect after save
			d2lHwsSubmit.$save(function(response) {
				$location.path('d2l-hws-submits/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing D2l hws submit
		$scope.remove = function(d2lHwsSubmit) {
			if ( d2lHwsSubmit ) { 
				d2lHwsSubmit.$remove();

				for (var i in $scope.d2lHwsSubmits) {
					if ($scope.d2lHwsSubmits [i] === d2lHwsSubmit) {
						$scope.d2lHwsSubmits.splice(i, 1);
					}
				}
			} else {
				$scope.d2lHwsSubmit.$remove(function() {
					$location.path('d2l-hws-submits');
				});
			}
		};

		// Update existing D2l hws submit
		$scope.update = function() {
			var d2lHwsSubmit = $scope.d2lHwsSubmit;

			d2lHwsSubmit.$update(function() {
				$location.path('d2l-hws-submits/' + d2lHwsSubmit._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of D2l hws submits
		$scope.find = function() {
			$scope.d2lHwsSubmits = D2lHwsSubmits.query();
		};

		// Find existing D2l hws submit
		$scope.findOne = function() {
			$scope.d2lHwsSubmit = D2lHwsSubmits.get({ 
				d2lHwsSubmitId: $stateParams.d2lHwsSubmitId
			});
		};
	}
]);
'use strict';

//D2l hws submits service used to communicate D2l hws submits REST endpoints
angular.module('d2l-hws-submits').factory('D2lHwsSubmits', ['$resource',
	function($resource) {
		return $resource('d2l-hws-submits/:d2lHwsSubmitId', { d2lHwsSubmitId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
])
	.factory('D2lHwsSubmitsTrue', ['$resource',
		function($resource) {
			return $resource('d2l-hws-submits/submitted', { d2lHwsSubmitId: '@_id'
			}, {
				update: {
					method: 'PUT'
				}
			});
		}
	])
	.factory('D2lHwsSubmitsTrueByClass', ['$resource',
		function($resource) {
			return $resource('d2l-hws-submits/submitted/byClass/:classId', { classId: '@_id'
			}, {
				get: {
					method: 'GET', isArray: true
				}
			});
		}
	]);



//'/d2l-hws-submits/submitted/byClass/:classId'
'use strict';

//Setting up route
angular.module('d2l-hws').config(['$stateProvider',
	function($stateProvider) {
		// D2l hws state routing
		$stateProvider.
		state('listD2lHws', {
			url: '/d2l-hws',
			templateUrl: 'modules/d2l-hws/views/list-d2l-hws.client.view.html'
		}).
		state('createD2lHw', {
			url: '/d2l-hws/create',
			templateUrl: 'modules/d2l-hws/views/create-d2l-hw.client.view.html'
		}).
		state('viewD2lHw', {
			url: '/d2l-hws/:d2lHwId',
			templateUrl: 'modules/d2l-hws/views/view-d2l-hw.client.view.html'
		}).
		state('editD2lHw', {
			url: '/d2l-hws/:d2lHwId/edit',
			templateUrl: 'modules/d2l-hws/views/edit-d2l-hw.client.view.html'
		});
	}
]);
'use strict';

// D2l hws controller
angular.module('d2l-hws').controller('D2lHwsController', ['$scope', '$stateParams', '$location', 'Authentication', 'D2lHws',
	function($scope, $stateParams, $location, Authentication, D2lHws) {
		$scope.authentication = Authentication;

		// Create new D2l hw
		//$scope.create = function() {
		//	// Create new D2l hw object
		//	var d2lHw = new D2lHws ({
		//		name: this.name,
         //       class: this.
		//		dDate: new Date(this.dDate)
		//	});
        //
		//	// Redirect after save
		//	d2lHw.$save(function(response) {
		//		$location.path('d2l-hws/' + response._id);
        //
		//		// Clear form fields
		//		$scope.name = '';
		//	}, function(errorResponse) {
		//		$scope.error = errorResponse.data.message;
		//	});
		//};

		// Remove existing D2l hw
		$scope.remove = function(d2lHw) {
			if ( d2lHw ) { 
				d2lHw.$remove();

				for (var i in $scope.d2lHws) {
					if ($scope.d2lHws [i] === d2lHw) {
						$scope.d2lHws.splice(i, 1);
					}
				}
			} else {
				$scope.d2lHw.$remove(function() {
					$location.path('d2l-hws');
				});
			}
		};

		// Update existing D2l hw
		$scope.update = function() {
			var d2lHw = $scope.d2lHw;
			d2lHw.class = d2lHw.class._id;
			//console.log('here');
			d2lHw.dDate = new Date(d2lHw.dDate);

			d2lHw.$update(function() {
				$location.path('d2l-hws/' + d2lHw._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of D2l hws
		$scope.find = function() {
			$scope.d2lHws = D2lHws.query();
		};

		// Find existing D2l hw
		$scope.findOne = function() {
			$scope.d2lHw = D2lHws.get({ 
				d2lHwId: $stateParams.d2lHwId
			}, function(result){
				result.dDate = new Date(result.dDate);
			});
		};
	}
]);

'use strict';

angular.module('d2l-hws').directive('classNoteCreate', classNoteCreate);
angular.module('d2l-hws').directive('classNoteList', classNoteList);
	function classNoteCreate() {
		return {
			templateUrl: 'modules/d2l-hws/views/create-d2l-hw.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
			}
		};
	};
function classNoteList() {
	return {
		templateUrl: 'modules/d2l-hws/views/list-d2l-hws.client.view.html',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {

		}
	};
};

'use strict';

//D2l hws service used to communicate D2l hws REST endpoints
angular.module('d2l-hws')
	.factory('D2lHws', ['$resource',
		function($resource) {
			return $resource('d2l-hws/:d2lHwId', { d2lHwId: '@_id'
			}, {
				update: {
					method: 'PUT'
				}
			});
		}
	])
	.factory('D2lHwsByClass', ['$resource',
		function($resource) {
			return $resource('/d2l-hws/byClass/:classId', { classId: '@_id'
			}, {
				get: {
					method: 'GET', isArray: true
				}
			});
		}
	])
	.factory('D2lHwsByOriginDocId', ['$resource',
		function($resource) {
			return $resource('/d2l-hws/getGDoc/:gdocId', { gdocId: '@_id'
			}, {
				get: {
					method: 'GET', isArray: true
				}
			});
		}
	]);

//''/d2l-hws/getGDoc/:gdocId'

'use strict';

//Setting up route
angular.module('d2l-lessons').config(['$stateProvider',
	function($stateProvider) {
		// D2l lessons state routing
		$stateProvider.
		state('listD2lLessons', {
			url: '/d2l-lessons',
			templateUrl: 'modules/d2l-lessons/views/list-d2l-lessons.client.view.html'
		}).
		state('createD2lLesson', {
			url: '/d2l-lessons/create',
			templateUrl: 'modules/d2l-lessons/views/create-d2l-lesson.client.view.html'
		}).
		state('viewD2lLesson', {
			url: '/d2l-lessons/:d2lLessonId',
			templateUrl: 'modules/d2l-lessons/views/view-d2l-lesson.client.view.html'
		}).
		state('editD2lLesson', {
			url: '/d2l-lessons/:d2lLessonId/edit',
			templateUrl: 'modules/d2l-lessons/views/edit-d2l-lesson.client.view.html'
		});
	}
]);
'use strict';

// D2l lessons controller
angular.module('d2l-lessons').controller('D2lLessonsController', D2lLessonsController);
	function D2lLessonsController($scope, $timeout, $state, $stateParams,
	                              $mdDialog, $location, $window, Authentication,
	                              D2lLessons, D2lClassesOwnership, D2lExamples,
	                              GoogledocsByLesson) {
		$scope.authentication = Authentication;

		console.log('lesson ctrl')
		//var wistiaEmbed = Wistia.embed("ocowx278d5");
		//var contentType = true;
		// Create new D2l lesson
		$scope.create = function() {
			console.log(this.class);
			// Create new D2l lesson object
			var d2lLesson = new D2lLessons ({
				name: this.name,
				class: this.project.class._id,
				contentType: this.contentType,
				example: this.example,
				body: this.body
			});

			// Redirect after save
			d2lLesson.$save(function(response) {
				$location.path('d2l-lessons/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing D2l lesson
		$scope.remove = function(d2lLesson) {
			if ( d2lLesson ) { 
				d2lLesson.$remove();

				for (var i in $scope.d2lLessons) {
					if ($scope.d2lLessons [i] === d2lLesson) {
						$scope.d2lLessons.splice(i, 1);
					}
				}
			} else {
				$scope.d2lLesson.$remove(function() {
					$location.path('d2l-lessons');
				});
			}
		};

		// Update existing D2l lesson
		$scope.update = function() {
			$scope.d2lLesson.class = $scope.d2lLesson.class._id;
			console.log('update');
			var d2lLesson = $scope.d2lLesson;

			d2lLesson.$update(function() {
				$location.path('d2l-lessons/' + d2lLesson._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of D2l lessons
		$scope.find = function() {
			$scope.d2lLessons = D2lLessons.query();
		};

		// Find existing D2l lesson
		$scope.findOne = function() {
			$scope.d2lLesson = D2lLessons.get({ 
				d2lLessonId: $stateParams.d2lLessonId
			});
			if($state.current.name === 'editD2lLesson')
				$scope.d2lLesson.$promise.then(function(data){
					$scope.d2lLesson.example = _.pluck(_.dropWhile(data.example, 'name link'),'_id');
				});
		};

		// Load Class
		$scope.loadClasses = function() {
			//console.log('Load Class is invoked');
			return $timeout(function() {
				$scope.classes = D2lClassesOwnership.query();
			}, 650);
		};

		// check Box
		$scope.loadExamples = function(){
			return $timeout(function() {
				$scope.examples = D2lExamples.query();
			}, 650);
		};

		$scope.toggle = function (item, list) {
			var idx = list.indexOf(item._id);
			if (idx > -1) list.splice(idx, 1);
			else list.push(item._id);
		};

		$scope.exists = function (item, list) {
			return list.indexOf(item._id) > -1;
		};

		$scope.loadGDocs = function(){
			$scope.gdocs = GoogledocsByLesson.query({lessonId: $stateParams.d2lLessonId});
		};

		$scope.showNewAssign = function(ev){
			$mdDialog.show({
				controller: D2lHwDialogCtrl,
				templateUrl: 'modules/openboard/template/tutorial/newAssign-dialog.tpl.html',
				targetEvent: ev,
				clickOutsideToClose: false,
				preserveScope: false,
				locals: {project:{gdocId: ''}},
				bindToController: true,
				//onComplete: reset

			}).then(
				function(){
					//$log.debug('cancel');
				},
				function(){
					//$log.debug('created Assignment');
					$scope.hws = D2lHwsByClass.get({classId: $scope.d2lClass._id},function(result){
						$scope.hwsCopy = [].concat(result);
					});
				}
			);

			function D2lHwDialogCtrl(scope, $timeout, $mdDialog, D2lHws, D2lClassesOwnership, GDriveSelectResult){

				scope.$on('handleEmit', function(event, args) {
					//console.log('broadcast is invoked');
					scope.project.gdocId=args.message;
					scope.$digest();
				});
				scope.cancel = function(){
					$mdDialog.cancel();
					scope.docs = "";
					scope.project = '';
					scope.projectForm = '';
					args.message = '';
					scope.$digest();
					//console.log('B');;
				};
				scope.docs = GDriveSelectResult;
				scope.project = {gdocId : scope.docs.id};

				var dDate = new Date();
				dDate.setHours(23,59,59,999);

				scope.project = {
					dDate: dDate
					//gdocId : scope.docs.id
					//desc: 'Nuclear Missile Defense System',
				};

				scope.loadClasses = function() {
					//console.log('Load Class is invoked');
					return $timeout(function() {
						scope.classes = D2lClassesOwnership.query();
					}, 650);
				};

				scope.createNewRecord = function() {
					//console.log('Create');
					// Create new D2l hw object
					scope.project.dDate.setHours(23,59,59,999);
					var d2lHw = new D2lHws (scope.project);
					d2lHw.class = d2lHw.class._id;

					// Redirect after save
					d2lHw.$save(function(response) {
						//$location.path('d2l-hws/' + response._id);
						// Clear form fields
						scope.name = '';
						scope.project.gdocId = '';
						scope.projectForm = null;
						$mdDialog.cancel();
						scope.project = null;

					}, function(errorResponse) {
						scope.error = errorResponse.data.message;
					});
				};
			}
		};

		$scope.linkGDoc = function(doc){
			console.log('dd');
			var AppScriptAPI = 'https://script.google.com/macros/s/AKfycbzMWif8iQmlLZbno9fSUSWWwA9mL4_OEae1nKxcnbxSt980kOpy/exec?'
			//var AppScriptAPI = 'https://script.google.com/macros/s/AKfycbzoXxZDgzjLOJdqGUGYCWSpIT7n2sHyvnIo2W7E5jmXI_2sryj3/exec?';
			var param = 'docId='+doc.gdocId+
				//'&userId='+authentication.user.username+
				'&title='+doc.name+
				//'&dDate='+hw.dDate+
				//'&userIdRef='+Authentication.user._id+
				//'&instructorRef='+hw.class.user+
				'&classId='+doc.class._id;
			//console.log(hw.dDate);
			$window.open(AppScriptAPI+param);
		};
	}

'use strict';

//D2l lessons service used to communicate D2l lessons REST endpoints
angular.module('d2l-lessons').factory('D2lLessons', ['$resource',
	function($resource) {
		return $resource('d2l-lessons/:d2lLessonId', { d2lLessonId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]).factory('D2lLessonsOwnership', ['$resource',
	function($resource) {
		return $resource('/d2l-lessonsByClassId/:d2lClassId', { d2lClassId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]).factory('D2lLessonsByClass', ['$resource',
	function($resource) {
		return $resource('/d2l-lessonsByClassId/:d2lClassId', { d2lClassId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
])
;
'use strict';

//Setting up route
angular.module('d2l').config(['$stateProvider','$mdIconProvider',
	function($stateProvider,$mdIconProvider) {
		// D2l state routing
		$stateProvider.
		state('lms-start', {
			url: '/lms-start',
			templateUrl: 'modules/d2l/views/lms-start.client.view.html'
		}).
		state('d2l-main', {
			url: '/d2l-main',
			templateUrl: 'modules/d2l/views/d2l-main.client.view.html'
		}).
		state('d2l-stu', {
			url: '/d2l-stu',
			templateUrl: 'modules/d2l/views/d2l-stu.client.view.html'
		}).
		state('d2l-ins', {
			abstract: true,
			url: '/d2l-ins',
			templateUrl: 'modules/d2l/views/d2l-ins.client.view.html'
		}).
			state('d2l-ins.menu',{
				url: '/menu',
				templateUrl: 'modules/d2l/template/ins-menu.html'
			}).
			state('d2l-ins.class', {
				url: '/class',
				templateUrl: 'modules/d2l/template/ins-class.html'
			}).
		state('d2l-ad', {
			url: '/d2l-ad',
			templateUrl: 'modules/d2l/views/d2l-ad.client.view.html'
		}).
		state('d2l-home', {
			url: '/d2l-home',
			templateUrl: 'modules/d2l/views/d2l-home.client.view.html'
		})
		.state('d2l-hw', {
				url: '/d2l/hw',
				templateUrl: 'modules/d2l/views/d2l-hw.client.view.html'
			});

		$mdIconProvider.iconSet("avatar", '/modules/d2l/svg/avatar-icons.svg', 128);
	}
]);

'use strict';

angular.module('d2l').controller('D2lAdController', ['$scope',
	function($scope) {
		// D2l ad controller logic
		// ...
	}
]);
'use strict';

angular.module('d2l')
	.controller('D2lHomeController', D2lHomeController)     //main D2l-Home page
	.controller('gridListDemoCtrl', gridListDemoCtrl)       //grid Menu
	.controller('DemoCtrl', DemoCtrl);                      //<!-- Search Box: Should be removed later-->

function D2lHomeController(
	$scope, $window, $http, Authentication, D2LOauth, D2lHwsSubmits, D2lClasses, D2lHws) {

	//Init
	$scope.classes = D2lClasses.query();
	$scope.hws = D2lHws.query();
	$scope.hwsCopy = [].concat($scope.hws);
	$scope.totalHwPoints = 0;
	$scope.totalPercentages = 0;
	$scope.allGrade = [];
	$http.get('/d2l-grades').success(
		function(result){
			$scope.allGrade = result;
			//console.log(result);
		}
	);
	var authentication = Authentication;

	//Should be connected with DB
	$scope.gradeCollection = [
		{numAssignment: 'A1', grade:200, total: 250, docLink:""},
		{numAssignment: 'A2', grade:160, total: 250, docLink:""},
		{numAssignment: 'A3', grade:220, total: 250, docLink:""},
		{numAssignment: 'A4', grade:75, total: 100, docLink:""},
		{numAssignment: 'A5', grade:85, total: 150, docLink:""}
	];

	// To get average and total
	$scope.hws.$promise.then(function(){
		angular.forEach($scope.hws, function(value, key){
				$scope.totalHwPoints += value.totalGrade;
				$scope.totalPercentages += value.percent;
		});
	});

	$scope.linkHW = function(docId){
		var AppScriptAPI = 'https://script.google.com/macros/s/AKfycbzoXxZDgzjLOJdqGUGYCWSpIT7n2sHyvnIo2W7E5jmXI_2sryj3/exec?docId='+docId+'&userId='+authentication.user.username;
		$window.open(AppScriptAPI);
	};



}

// Open Grid Menu Controller
function gridListDemoCtrl($scope, $state){
	function goToHWList(){
		//$state.go('listD2lHws');
	}
	$scope.test=function(event, targetInfo){
		console.log('dddd');
		var target = event.target;
		console.log(target);
		TweenLite.to(target, 0.3, {opacity: 0.8, scale:0.85});
		TweenLite.to(target, 0.3, {opacity: 1, scale:1, rotation: 360, delay:0.2, onComplete:goToHWList});
		//TweenLite.to(target, 0.3, {backgroundColor: 'blue', delay:0.5});
	}
	this.tiles = buildGridModel({
		icon : "avatar:svg-",
		title: "Svg-",
		background: ""
	});
	function buildGridModel(tileTmpl){
		var it, results = [ ];
		for (var j=0; j<12; j++) {
			it = angular.extend({},tileTmpl);
			it.icon  = it.icon + (j+1);
			it.title = it.title + (j+1);
			it.span  = { row : "1", col : "1" };
			switch(j+1) {
				case 1: it.background = "red"; it.title = "Notifications"; /* it.span.row = it.span.col = 2; */ break;
				case 2: it.background = "green"; it.title = "Classes"; break;
				case 3: it.background = "darkBlue"; it.title = "List HWs"; it.state="classes"; break;
				case 4: it.background = "blue"; it.title = "Grades"; /*it.span.col = 2;*/ break;
				case 5: it.background = "yellow"; it.title = "Articles"; /* it.span.row = it.span.col = 2; */ break;
				case 6: it.background = "pink"; it.title = "Tutorials"; break;
				case 7: it.background = "darkBlue"; it.title = "Projects"; break;
				case 8: it.background = "purple"; it.title = "Portfolio"; break;
				case 9: it.background = "deepBlue"; it.title = "Career"; break;
				case 10: it.background = "lightPurple"; it.title = "MEANJS Stack"; break;
				case 11: it.background = "yellow"; break;
				case 12: it.background = "deepBlue"; break;
			}
			results.push(it);
		}
		return results;
	}
}

// Search Box Controller Angular Material
function DemoCtrl($timeout, $q){
		var self = this;
		// list of `state` value/display objects
		self.states        = loadAll();
		self.selectedItem  = null;
		self.searchText    = null;
		self.querySearch   = querySearch;
		self.simulateQuery = false;
		// ******************************
		// Internal methods
		// ******************************
		/**
		 * Search for states... use $timeout to simulate
		 * remote dataservice call.
		 */
		function querySearch (query) {
			var results = query ? self.states.filter( createFilterFor(query) ) : [],
				deferred;
			if (self.simulateQuery) {
				deferred = $q.defer();
				$timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
				return deferred.promise;
			} else {
				return results;
			}
		}
		/**
		 * Build `states` list of key/value pairs
		 */
		function loadAll() {
			var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
			return allStates.split(/, +/g).map( function (state) {
				return {
					value: state.toLowerCase(),
					display: state
				};
			});
		}
		/**
		 * Create filter function for a query string
		 */
		function createFilterFor(query) {
			var lowercaseQuery = angular.lowercase(query);
			return function filterFn(state) {
				return (state.value.indexOf(lowercaseQuery) === 0);
			};
		}
	}

'use strict';

angular.module('d2l').controller('D2lHwController', ['$scope', '$stateParams',
	'$location', '$timeout', 'Authentication', 'D2lHws','D2lClassesOwnership','D2lClasses', 'GDriveSelectResult',
	function($scope, $stateParams, $location, $timeout, Authentication, D2lHws, D2lClassesOwnership, D2lClasses, GDriveSelectResult) {
		$scope.$on('handleEmit', function(event, args) {
			console.log('broadcast is invoked');
			$scope.project.gdocId=args.message;
			$scope.$digest();
		});

		$scope.docs = GDriveSelectResult;
		$scope.project = {gdocId : $scope.docs.id};
		$scope.project = {
			dDate: new Date('4/1/2015'),
			gdocId : GDriveSelectResult.id
			//desc: 'Nuclear Missile Defense System',
		};

		$scope.loadClasses = function() {
			return $timeout(function() {
				$scope.classes = D2lClassesOwnership.query();
			}, 650);
		};

		$scope.authentication = Authentication;
		console.log($scope.authentication);

		// Create new D2l hw
		$scope.createNewRecord = function() {
			console.log('Create');
			// Create new D2l hw object

			var d2lHw = new D2lHws ($scope.project);
			d2lHw.class = d2lHw.class._id;

			// Redirect after save
			d2lHw.$save(function(response) {
				$location.path('d2l-hws/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing D2l hw
		$scope.remove = function(d2lHw) {
			if ( d2lHw ) {
				d2lHw.$remove();

				for (var i in $scope.d2lHws) {
					if ($scope.d2lHws [i] === d2lHw) {
						$scope.d2lHws.splice(i, 1);
					}
				}
			} else {
				$scope.d2lHw.$remove(function() {
					$location.path('d2l-hws');
				});
			}
		};

		// Update existing D2l hw
		$scope.update = function() {
			alert('dd');
			var d2lHw = $scope.d2lHw;
			d2lHw.class = d2lHw.class._id;

			d2lHw.$update(function() {
				$location.path('d2l-hws/' + d2lHw._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of D2l hws
		$scope.find = function() {
			$scope.d2lHws = D2lHws.query();
		};

		// Find existing D2l hw
		$scope.findOne = function() {
			$scope.d2lHw = D2lHws.get({
				d2lHwId: $stateParams.d2lHwId
			});
		};
	}
]);

'use strict';

angular.module('d2l').controller('D2lInsController', ['$scope',
	function($scope) {
		$scope.menus = [{title:"Classes", desc:""},{title:"Events", desc:""},{title:"Profile", desc:"linkedin, Google+, facebook, link"},{title:"ToDo", desc:""},{title:"Previous Classes", desc:""}];
	}
]);

'use strict';

angular.module('d2l').controller('D2lStuController', ['$scope',
	function($scope) {
		$scope.menus = [{title:"Previous Classes", desc:""},{title:"Classes", desc:""},{title:"Events", desc:""},{title:"Portfolio", desc:"linkedin, Google+, facebook, link"},{title:"ToDo", desc:""}];
	}
]);

/*
* This controller is for authorization for google file picker
* */

'use strict';

angular.module('d2l')
	.factory('GDriveSelectResult', GDriveSelectResult)
	.controller('GDriveFilePickerController', GDriveFilePicker);

// Communicating between controller and Picker
function GDriveSelectResult(){
	var selectedDocs={id:''};
	return selectedDocs;
}


function GDriveFilePicker($scope, Googledrive, configGdrive, GDriveSelectResult) {
	$scope.isAuth = true;
	$scope.docs = [];

	$scope.setupPicker = function() {

		function pickerCallback(data) {
			if(data.action == google.picker.Action.PICKED){
				//do something
				//console.log(data);
				$scope.files = data.docs;
				$scope.arrive = true;
				GDriveSelectResult.id = data.docs[0].id;
				$scope.$emit('handleEmit', {message: GDriveSelectResult.id});
			}else if(data.action ==google.picker.Action.CANCEL){
			}
		}
		Googledrive.setupPicker(accessToken, pickerCallback);
	}



	$scope.authName = 'Authorization';
	$scope.googleDrive={info:'gDriveCtrl'};
	$scope.openMenu = true;

	$scope.hideResult = function(){
		var target = $('.listFolder');
		TweenLite.to(target, 0.5, {autoAlpha: 0, display:'none'})
	};
	$scope.showResult = function(){
		var target = $('.listFolder')
		TweenLite.to(target, 0.5, {autoAlpha: 1, display:'block'})
	};

	$scope.plusTest = function(){
		var promise = Googledrive.plusTest();
		promise.then(
			function(result){
				//    console.log('service is done')
				$scope.gPlus = result;
				$scope.$digest();
			}
		)
	}

	$scope.listingFolderInfo = function(){
		$scope.gDocs = 'dd';
		console.log('gDriveDashCtrl');
		var promise = Googledrive.listFolder();
		promise.then(
			function(result){
				console.log('service is done');
				$scope.gDocs = result.items;
				$scope.$digest();
			}
		)
		//console.log($scope.gDocs);
		//$scope.$digest();

		//var request = gapi.client.drive.files.get({
		//    'fileId': "1Q_CJwJftcL-zabVm0USc1px5HDfbpxu6Klav-XYOzNg"
		//});
		//request.execute(function(resp) {
		//    if (!resp.error) {
		//        console.log('Title: ' + resp.title);
		//        console.log('Description: ' + resp.description);
		//        console.log('MIME type: ' + resp.mimeType);
		//        console.log(resp);
		//        $scope.gDocs = resp;
		//        $scope.$digest();
		//    } else if (resp.error.code == 401) {
		//        // Access token might have expired.
		//        checkAuth();
		//    } else {
		//        console.log('An error occured: ' + resp.error.message);
		//    }
		//});
	}

	// List File
	$scope.listFile = function(){

	}

	var accessToken;
	$scope.arrive = false;
	$scope.authName = 'Authorize';

	$scope.init = function init(){
		window.gapi.load('auth', $scope.authenticateWithGoogle);
		window.gapi.load('picker');
		//gapi.client.load('urlshortener', 'v1');
	}
	$scope.authenticateWithGoogle =function authenticateWithGoogle(){
		window.gapi.auth.authorize({
			'client_id': configGdrive.clientId,

			'scope':configGdrive.scopes,
			'immediate': false
		}, handleAuthentication);
	}

	function handleAuthentication(result){
		if(result && !result.error){
			$scope.isAuth = true;
			$scope.authName = 'Deauthorize';
			accessToken = result.access_token;


			$scope.setupPicker();
			/*
			 callGooglePlus();
			 setFilePicker();
			 listFolder();
			 getGoogleDriveInfo();
			 createFolder();
			 */
			//createNewAccountFolder();
			//setFilePicker(); // singleFile
			//findTargetUriFolder();
		}else{
			console.log(result);
			console.log(result.error);
			console.log('fail to authentication')
		}
		//$scope.$digest();
	}

	function listFolder() {
		Googledrive.listFolder()
	}

	$scope.findFolder = function() {
		console.log('findFolder');
		//var query = "title contains 'URI-' and mimeType = 'application/vnd.google-apps.folder'";
		var query = "mimeType = 'application/vnd.google-apps.folder'";
		Googledrive.findFolder(query, function(result){
			//var numFolder = result.result.items.length;
			console.log(result);
		});
	}

	$scope.listFolderInformation = function(){
		Googledrive.listFolder();
	}


	function createNewAccountFolder(){
		//Pre. Get User Information
		//check if there exists an
		// API /users/me (only allow to have)

		var callback = function(resp){
			console.log(resp.result.items.length);
			if(resp.result.items.length == 0){
				$http.get('users/me')
					.success(function(response) {
						console.log(response);
						var folderName = 'D2l-'+response._id;
						//1. Create A New Folder
						Googledrive.createFolder(folderName, accessToken);
						//2. Update User Information
						//$http.get()
					});
			}
			else{
				console.log('there is already exist')
				$scope.rootGdriveFolderID = resp.result.items[0].id
				$scope.$digest();
			}
		}
		Googledrive.findFolder(callback);
	}
}

'use strict';

angular.module('d2l').controller('InsClassController', ['$scope','$http','CreateFile',
	function($scope,$http,CreateFile) {

		var objFile = CreateFile.create();
		console.log(objFile.getInfo());

		TweenMax.set($('#fileCreator'), {alpha:0, yPercent:-150});
		$scope.assignments = [];


		$scope.createHWbtn = function(){
			$scope.isOpen = !$scope.isOpen;
			if($scope.isOpen){
				console.log("open");
				TweenMax.to($('#fileCreator'), 1, {alpha:1, yPercent:0, display:"block",   ease: Power2.easeOut, paused:false});
			}

			else{
				console.log("close");
				TweenMax.to($('#fileCreator'), 1, {alpha:0, yPercent:-150, display:"none", ease: Power2.easeOut, paused:false});
			}
			$scope.assignment = '';
		}

		$scope.createFolder = function(){

		}

		$scope.publishFile = function(){

		}

		$scope.listGPlus = function(){
			$http.get('/gs').success(function(data, status, headers, config){
				$scope.userInfo = data;
				console.log('data', data);
				console.log('status', status);
				console.log('headers', headers);
				console.log('config', config);
			});
		}
	}
]);

'use strict';

angular.module('d2l').controller('LmsStartController', ['$scope',
	function($scope) {
		// Lms start controller logic
		// ...
	}
]);
'use strict';

/**
 *  @ngdoc module
 *  @name pbshop.components.select
 */

/*
 [Process Step]

 Check Requirements
 Process payment
 */

/**************************************************************

 ### TODO ###
 **DOCUMENTATION AND DEMOS**

 -[ ] ng-modle with child mdOptions (basic)
 -[ ] ng-modle="foo" ng-model-options="{targetBy: ''}"

 **************************************************************/

angular.module('d2l')

	.directive('d2lHwGenerator', HwGenerator)
	.directive('d2lHwPublisher', HwPublisher)
	.factory('D2lHwPermission', ['$resource',
		function($resource) {
			return $resource('/HWD2l/getPermission/:id', {
				id: '@_id'
			},{getDoc: {method:'GET'}});
		}
	])
	.factory('D2lHwCopy', ['$resource',
		function($resource) {
			return $resource('/HWD2l/copyFile/:id/:userNameDoc', {
				id: '@_id',userNameDoc:'@_userNameDoc'
			},{copyDoc: {method:'GET'}});
		}
	])
	.controller('ToastCtrl', function($scope, $mdToast) {
		$scope.closeToast = function() {
			$mdToast.hide();
		};
	});

function HwGenerator($mdToast, $location, devConfig, D2lHws) {
	return {
		templateUrl: 'modules/d2l/directives/template/d2l-hw-generator-tpl.html',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {
			scope.isOpen=true;
			//scope.devColor = devConfig.directive;
			scope.docTypes = ['Docs', 'Sheets', 'Slides', 'PDF'];

			scope.create = function() {
				console.log('Create');
				// Create new D2l hw object
				var d2lHw = new D2lHws (scope.project);
				// Redirect after save

				d2lHw.$save(function(response) {
					$location.path('d2l-hws/' + response._id);
					// Clear form fields
					scope.name = '';
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			};



			scope.publishHW = function() {
				alert('Click');
			}

			scope.toastPosition = {
				bottom: true,
				top: false,
				left: false,
				right: true
			};
			scope.getToastPosition = function() {
				return Object.keys(scope.toastPosition)
					.filter(function(pos) { return scope.toastPosition[pos]; })
					.join(' ');
			};
			scope.showCustomToast = function() {
				$mdToast.show({
					controller: 'ToastCtrl',
					templateUrl: 'modules/d2l/directives/toast-template.html',
					hideDelay: 16000,
					position: scope.getToastPosition()
				});
			};

		}
	};
}

function HwPublisher($timeout, $http, D2lHwPermission, D2lHwCopy, D2lHws){
	return {
		templateUrl: 'modules/d2l/directives/template/d2l-hw-publisher-tpl.html',
		restrict: 'E',
		link:function postLink(scope, element, attrs) {
			scope.listP = function(id){
					scope.result = D2lHwPermission.getDoc({
						id: id
					}).$promise.then(
						//success
						function( value ){
							scope.items = value.items;
							//based On the result
						},
						//error
						function( error ){console.log(error);}
					)
			};

			//Make a Copy
			scope.copyFileTemplate = function(id){

				var users = [{email:"pbshop1001@gmail.com"},{email:"kruny1001@gmail.com"}];

				users.forEach(function(user){
					D2lHwCopy.copyDoc({id:id, userNameDoc: user.email})
						.$promise.then(function(value){console.log(value); alert('copy process is done');},function(error){console.log(error)});
				})



				//D2lHwCopy.copyDoc({id:id})
				//	.$promise.then(function(value){console.log(value); alert('copy process is done');},function(error){console.log(error)});

			}

			scope.gsCopyFile = function(){

				var url = 'http://localhost:8080/api/AKfycbwqcvW0ogVTk4o5-J89Fih5wO2XoNcsiTX_FCfbPXZdhGpIYNHW/cats';
				$http.get(url).success(function(data){console.log(data)}).error(function(data){data});
			}

			//Insert Permissions


			//Create File
			scope.publish = function(id){
				scope.result = D2lHwPermission.getDoc({
					id: id
				}).$promise.then(
					//success
					function( value ){
						scope.items = value.items;
						//based On the result
					},
					//error
					function( error ){console.log(error);}
				)
			};

			scope.loadUsers = function() {
				// Use timeout to simulate a 650ms request.
				scope.users = [];
				scope.d2lhws = D2lHws.query();

				return $timeout(function() {
					scope.users = [
						{ id: 1, name: 'Copy of restFulAPI Test2', docId:'1HP0LZO1chIZSp-wxK0Gx2B5EVDrw9dVnl8y6OkQB5_k' },
						//{ id: 2, name: 'Shaggy Rodgers' },
						//{ id: 3, name: 'Fred Jones' },
						//{ id: 4, name: 'Daphne Blake' },
						//{ id: 5, name: 'Velma Dinkley' },
					];
				}, 650);
			};

		}
	}
}

'use strict';

angular.module('d2l').factory('CreateFile',CreateFile);

function CreateFile($resource) {
    return {
        create: create,
        read: read
    };

    function create(){
        console.log('Create Function from CreateFile');
        var o = $resource('/userInfo',
            {userId: 123, cardId:'@id'},
            {
                charge:{method:'POST', params:{charge:true}},
                getInfo:{method:'GET'}
            });
        return o;
    }

    function read(){
        console.log('read Function from CreateFile');
        var o =$resource('/createFile', {},
            {
                readFile:{method:'GET', params:{id:'@id'}}
            });
        return o;
    }
}

'use strict';

angular.module('d2l').factory('D2LOauth', ['configGdrive',
	function(configGdrive) {
        var testStr = 'asdfasdfsdfsf';
        var accessToken;
        var permalLink = 'http://drive.google.com/uc?export=view&id=';
        var arrive = false;
        var authName = 'Authorize';
        var isAuth = false;

		return {
            getAccessToken: getAccessToken,
            authenticateWithGoogle: authenticateWithGoogle,
            //setupPicker: setupPicker,
            createNewAccountFolder: createNewAccountFolder
		};

        function getAccessToken() {
            return true;
        }

        function authenticateWithGoogle(){
            window.gapi.auth.authorize({
                'client_id': configGdrive.clientId,
                'scope':configGdrive.scopes,
                'immediate': false
            }, handleAuthentication);
        }

        function handleAuthentication(result){
            console.log(testStr);
            if(result && !result.error){
                isAuth = true;
                authName = 'Deauthorize';
                accessToken = 'ya29.FgGTDUyLSY6oSvDzClGVcrwws2xf2PJ6JHC5uXkRoutVf6k8BLamn4t9dsvKBG0sHtZR34tYjP6CHg';
                //accessToken = result.access_token;
                console.log(accessToken);
                /*callGooglePlus();setFilePicker();listFolder();getGoogleDriveInfo();createFolder();*/

                //createNewAccountFolder();
                //setFilePicker(); // singleFile
                //findTargetUriFolder();
            }else{
                console.log(result);
                console.log('ERROR: '+result.error);
                console.log('fail to authentication')
            }
            //$scope.$digest();
        }

        // Google PlatForm Service
        //function setupPicker() {
        //    function pickerCallback(data) {
        //        if(data.action == google.picker.Action.PICKED){
        //            //do something
        //            $scope.files = data.docs;
        //            $scope.arrive = true;
        //
        //            // make shorten URL
        //            var request = gapi.client.urlshortener.url.get({
        //                'shortUrl': 'http://goo.gl/fbsS'
        //            });
        //            request.then(function(response) {
        //                appendResults(response.result.longUrl);
        //            }, function(reason) {
        //                console.log('Error: ' + reason.result.error.message);
        //            });
        //
        //            //alert('URL: ' + data.docs[0].url);
        //            $scope.$digest()
        //        }else if(data.action ==google.picker.Action.CANCEL){
        //            //alert('goodbye');
        //        }
        //    }
        //    Googledrive.setupPicker(accessToken, pickerCallback);
        //}

        // Create New Account Folder
        function createNewAccountFolder(){
            //Pre. Get User Information
            //check if there exists an
            // API /users/me (only allow to have)

            var callback = function(resp){
                console.log(resp.result.items.length);
                if(resp.result.items.length == 0){
                    $http.get('users/me')
                        .success(function(response) {
                            console.log(response);
                            var folderName = 'D2l-'+response._id;
                            //1. Create A New Folder
                            Googledrive.createFolder(folderName, accessToken);
                            //2. Update User Information
                            //$http.get()
                        });
                }
                else{
                    console.log('there is already exist')
                    //$scope.rootGdriveFolderID = resp.result.items[0].id
                    //$scope.$digest();
                }
            }
            Googledrive.findFolder(callback);
        }
	}
]);

/**
 * Created by Kevin on 2014-11-26.
 */


angular.module('disqus').config(['$stateProvider','$disqusProvider',
    function($stateProvider,$disqusProvider) {
        // Seller interface state routing
        $disqusProvider.setShortname('openboardk');
    }
]);


(function (angular, window) {
    'use strict';

    var disqusModule = angular.module('disqus', [ ]);

    /**
     * $disqus provider.
     */
    disqusModule.provider('$disqus', function() {
        var TYPE_EMBED = 'embed.js'; // general disqus embed script
        var TYPE_COUNT = 'count.js'; // used for count

        // Placeholder for the disqus shortname
        var shortname;

        /**
         * @return {Element} dom element for script adding
         */
        function getScriptContainer() {
            return (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]);
        }

        /**
         * @return {String} disqus shortname
         */
        function getShortname() {
            return shortname || window.disqus_shortname;
        }

        /**
         * @param {String} shortname disqus shortname
         * @param {String} file file name to add.
         * @return {String} disqus embed src with embedded shortname
         */
        function getScriptSrc(shortname, file) {
            return '//' + shortname + '.disqus.com/' + file;
        }

        /**
         * Builds the script tag
         *
         * @param {String} src script source
         * @return {Element} script element
         */
        function buildScriptTag(src) {
            var script = document.createElement('script');

            // Configure the script tag
            script.type  = 'text/javascript';
            script.async = true;
            script.src   = src;

            return script;
        }

        /**
         * Searches the given element for defined script tag
         * if its already there then return true. Otherwise return false
         *
         * @param {Element} element element to search within
         * @param {String} scriptSrc script src
         * @return {Boolean} true if its there, false if its not
         */
        function hasScriptTagInPlace(container, scriptSrc) {
            var scripts   = container.getElementsByTagName('script'),
                script, i;

            for (i = 0; i < scripts.length; i += 1) {
                script = scripts[i];

                // Check if the name contains the given values
                // We need to check with indexOf because browsers replace // with their protocol
                if (~script.src.indexOf(scriptSrc)) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Writes disqus globals to window object.
         * Needed for the first load. Otherwise the disqus wouldn't know what thread comments to load.
         *
         * @param {String} id disqus identifier
         * @param {String} url disqus url
         * @param {String} shortname disqus shortname
         */
        function setGlobals(id, url, shortname) {
            window.disqus_identifier = id;
            window.disqus_url        = url;
            window.disqus_shortname  = shortname;
        }

        /**
         * Refreshes the count from DISQUSWIDGETS.
         */
        function getCount() {
            var widgets = window.DISQUSWIDGETS;
            if (widgets && angular.isFunction(widgets.getCount)) {
                widgets.getCount();
            }
        }

        /**
         * Trigger the reset comment call
         * @param  {String} $location location service
         * @param  {String} id Thread id
         */
        function resetCommit($location, id) {
            window.DISQUS.reset({
                reload: true,
                config : function() {
                    this.page.identifier = id;
                    this.page.url        = $location.absUrl();
                }
            });
        }

        /**
         * Adds disqus script tag to header by its type.
         * If the script tag already exists in header then wont continue.
         *
         * Adds script tags by their type.
         * Currently we are using two types:
         *  1. count.js
         *  2. embed.js
         *
         * @param {String} shortname disqus shortname
         * @param {String} type disqus script tag type
         */
        function addScriptTag(shortname, type) {
            var container = getScriptContainer(),
                scriptSrc = getScriptSrc(shortname, type);

            // If it already has a script tag in place then lets not do anything
            // This might happen if the user changes the page faster than then disqus can load
            if (hasScriptTagInPlace(container, scriptSrc)) {
                return;
            }

            // Build the script tag and append it to container
            container.appendChild(buildScriptTag(scriptSrc));
        }


        /**
         * @param {String} sname shortname
         */
        this.setShortname = function(sname) {
            shortname = sname;
        };

        // Provider constructor
        this.$get = [ '$location', function($location) {

            /**
             * Resets the comment for thread.
             * If disqus was not defined then it will add disqus to script tags.
             * If disqus was initialized earlier then it will just use disqus api to reset it
             *
             * @param  {String} id required thread id
             */
            function commit(id) {
                var shortname = getShortname();

                if (!angular.isDefined(shortname)) {
                    throw new Error('No disqus shortname defined');
                } else if (!angular.isDefined(id)) {
                    throw new Error('No disqus thread id defined');
                } else if (angular.isDefined(window.DISQUS)) {
                    resetCommit($location, id);
                } else {
                    setGlobals(id, $location.absUrl(), shortname);
                    addScriptTag(shortname, TYPE_EMBED);
                }
            }

            /**
             * Loads the comment script tag and initiates the comments.
             * Sets the globals according to the current page.
             *
             * If the embed disqus is not added to page then adds that.
             *
             * @param {String} id thread id
             */
            function loadCount(id) {
                setGlobals(id, $location.absUrl(), shortname);
                addScriptTag(getShortname(), TYPE_EMBED);
                addScriptTag(getShortname(), TYPE_COUNT);
                getCount();
            }

            // Expose public api
            return {
                commit       : commit,
                getShortname : getShortname,
                loadCount    : loadCount
            };
        }];
    });

    /**
     * Disqus thread comment directive.
     * Used to display the comments block for a thread.
     */
    disqusModule.directive('disqus', [ '$disqus', function($disqus) {

        return {
            restrict : 'AC',
            replace  : true,
            scope    : {
                id : '=disqus',
            },
            template : '<div id="disqus_thread"></div>',
            link: function link(scope) {
                scope.$watch('id', function(id) {
                    if (angular.isDefined(id)) {
                        $disqus.commit(id);
                    }
                });
            }
        };
    }]);

    /**
     * Disqus comment count directive.
     * Just wraps `disqus-identifier` to load the disqus comments count script tag on page
     */
    disqusModule.directive('disqusIdentifier', [ '$disqus', function($disqus) {
        return {
            restrict : 'A',
            link     : function(scope, elem, attr) {
                $disqus.loadCount(attr.disqusIdentifier);
            }
        };
    }]);

})(angular, this);


'use strict';

//Setting up route
angular.module('etc-products').config(['$stateProvider',
	function($stateProvider) {
		// Etc products state routing
		$stateProvider.
		state('listEtcProducts', {
			url: '/etc-products',
			templateUrl: 'modules/etc-products/views/list-etc-products.client.view.html'
		}).
		state('createEtcProduct', {
			url: '/etc-products/create',
			templateUrl: 'modules/etc-products/views/create-etc-product.client.view.html'
		}).
		state('viewEtcProduct', {
			url: '/etc-products/:etcProductId',
			templateUrl: 'modules/etc-products/views/view-etc-product.client.view.html'
		}).
		state('editEtcProduct', {
			url: '/etc-products/:etcProductId/edit',
			templateUrl: 'modules/etc-products/views/edit-etc-product.client.view.html'
		});
	}
]);
'use strict';

// Etc products controller
angular.module('etc-products').controller('EtcProductsController',
	['$scope', '$stateParams', '$location', 'Authentication', 'EtcProducts','$timeout', '$q',
	function($scope, $stateParams, $location, Authentication, EtcProducts, $timeout, $q) {
		$scope.authentication = Authentication;

		// Create new Etc product
		$scope.create = function() {
			// Create new Etc product object
			var etcProduct = new EtcProducts ({
				name: this.name
			});

			// Redirect after save
			etcProduct.$save(function(response) {
				$location.path('etc-products/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Etc product
		$scope.remove = function(etcProduct) {
			if ( etcProduct ) { 
				etcProduct.$remove();

				for (var i in $scope.etcProducts) {
					if ($scope.etcProducts [i] === etcProduct) {
						$scope.etcProducts.splice(i, 1);
					}
				}
			} else {
				$scope.etcProduct.$remove(function() {
					$location.path('etc-products');
				});
			}
		};

		// Update existing Etc product
		$scope.update = function() {
			var etcProduct = $scope.etcProduct;

			etcProduct.$update(function() {
				$location.path('etc-products/' + etcProduct._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Etc products
		$scope.find = function() {
			$scope.etcProducts = EtcProducts.query();
		};

		// Find existing Etc product
		$scope.findOne = function() {
			$scope.etcProduct = EtcProducts.get({ 
				etcProductId: $stateParams.etcProductId
			});
		}




		//////
		//var self = this;
		$scope.readonly = false;
		// Lists of fruit names and Vegetable objects
		$scope.fruitNames = ['Apple', 'Banana', 'Orange'];
		$scope.roFruitNames = angular.copy(self.fruitNames);
		$scope.newFruitNames = ['Red', 'Yellow', 'Green'];
		$scope.vegObjs = [
			{
				'name' : 'ModelModel1',
				'type' : 'Red'
			},
			{
				'name' : 'ModelModel2',
				'type' : 'Yellow'
			},
			{
				'name' : 'ModelModel3',
				'type' : 'Green'
			}
		];
		$scope.newVeg = function(chip) {
			return {
				name: chip,
				type: 'unknown'
			};
		};
		/////

	}
]);


'use strict';

//Etc products service used to communicate Etc products REST endpoints
angular.module('etc-products').factory('EtcProducts', ['$resource',
	function($resource) {
		return $resource('etc-products/:etcProductId', { etcProductId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

//Setting up route
angular.module('etc').config(['$stateProvider',
	function($stateProvider) {
		// Etc state routing
		$stateProvider.
		state('watch-game', {
			url: '/watch-game',
			templateUrl: 'modules/etc/views/watch-game.client.view.html'
		}).
		state('wigs', {
			url: '/wigs',
			templateUrl: 'modules/etc/views/wigs.client.view.html'
		}).
		state('etc', {
			url: '/etc',
			templateUrl: 'modules/etc/views/etc.client.view.html'
		});
	}
]);
'use strict';

angular.module('etc').controller('EtcController', ['$scope',
	function($scope) {
		// Etc controller logic
		// ...

		$scope.todos = [
			{
				face : '/modules/etc-products/img/icon1.png',
				what: 'Brunch this weekend?',
				who: 'Min Li Chan',
				when: '3:08PM',
				notes: " I'll be in your neighborhood doing errands"
			},
			{

				face : '/modules/etc-products/img/icon1.png',
				what: 'Brunch this weekend?',
				who: 'Min Li Chan',
				when: '3:08PM',
				notes: " I'll be in your neighborhood doing errands"
			},
			{
				face : '/modules/etc-products/img/icon1.png',
				what: 'Brunch this weekend?',
				who: 'Min Li Chan',
				when: '3:08PM',
				notes: " I'll be in your neighborhood doing errands"
			},
			{
				face : '/modules/etc-products/img/icon1.png',
				what: 'Brunch this weekend?',
				who: 'Min Li Chan',
				when: '3:08PM',
				notes: " I'll be in your neighborhood doing errands"
			},
			{
				face : '/modules/etc-products/img/icon1.png',
				what: 'Brunch this weekend?',
				who: 'Min Li Chan',
				when: '3:08PM',
				notes: " I'll be in your neighborhood doing errands"
			},
		];
	}
]);
'use strict';

angular.module('etc').controller('WatchGameController', ['$scope',
	function($scope) {
		var clock = document.querySelector('#utility-clock')
		utilityClock(clock)
		autoResize(clock, 295 + 32)

		choose(clock, [
			['hour', ['text', 'text-quarters', 'pill']],
			['hour-text', ['large', 'small']],
			['hour-display', ['all', 'quarters', 'none']],
			['minute', ['line', 'dot']],
			['minute-display', ['fine', 'fine-2', 'coarse', 'major', 'none']],
			['minute-text', ['inside', 'outside', 'none']],
			['hand', ['normal', 'hollow']]
		]);

		function utilityClock(container) {

			var dynamic = container.querySelector('.dynamic')
			var hourElement = container.querySelector('.hour')
			var minuteElement = container.querySelector('.minute')
			var secondElement = container.querySelector('.second')

			var div = function(className, innerHTML) {
				var element = document.createElement('div')
				element.className = className
				element.innerHTML = innerHTML || ''
				return element
			}

			var append = function(element) {
				return {
					to: function(parent) {
						parent.appendChild(element)
						return append(parent)
					}
				}
			}

			var anchor = function(element, rotation) {
				var anchor = div('anchor')
				rotate(anchor, rotation)
				append(element).to(anchor).to(dynamic)
			}

			var minute = function(n) {
				var klass = n % 5 == 0 ? 'major' : n % 1 == 0 ? 'whole' : 'part'
				var line = div('element minute-line ' + klass)
				anchor(line, n)
				if (n % 5 == 0) {
					var text = div('anchor minute-text ' + klass)
					var content = div('expand content', (n < 10 ? '0' : '') + n)
					append(content).to(text)
					rotate(text, -n)
					anchor(text, n)
				}
			}

			var hour = function(n) {
				var klass = 'hour-item hour-' + n
				var line = div('element hour-pill ' + klass)
				anchor(line, n * 5)
				var text = div('anchor hour-text ' + klass)
				var content = div('expand content', n)
				append(content).to(text)
				rotate(text, -n * 5)
				anchor(text, n * 5)
				return
			}

			var position = function(element, phase, r) {
				var theta = phase * 2 * Math.PI
				element.style.top = (-r * Math.cos(theta)).toFixed(1) + 'px'
				element.style.left = (r * Math.sin(theta)).toFixed(1) + 'px'
			}

			var rotate = function(element, second) {
				element.style.transform =
					element.style.webkitTransform = 'rotate(' + (second * 6) + 'deg)'
			}

			$scope.animate = function() {
				var now = new Date()
				var time = now.getHours() * 3600 +
					now.getMinutes() * 60 +
					now.getSeconds() * 1 +
					now.getMilliseconds() / 1000
					//rotate(secondElement, time)
					//rotate(minuteElement, time / 60)
					//rotate(hourElement, time / 60 / 12)
					requestAnimationFrame($scope.animate)
			}

			for (var i = 1 / 4; i <= 60; i += 1 / 4) minute(i)
			for (var i = 1; i <= 12; i ++) hour(i)

			$scope.animate();

		}

		function autoResize(element, nativeSize) {
			var update = function() {
				var parent = element.offsetParent
				var scale = Math.min(parent.offsetWidth, parent.offsetHeight) / nativeSize
				element.style.transform = element.style.webkitTransform = 'scale(' + scale.toFixed(3) + ')'
			}
			update()
			window.addEventListener('resize', update)
		}

		function choose(clock, items) {
			var chooser = document.querySelector('#chooser')
			items.forEach(function(item) {
				var name = item[0]
				var styles = item[1]
				var element = document.createElement('div')
				element.addEventListener('click', click, false)
				update()
				chooser.appendChild(element)
				function update() {
					element.innerHTML = name + '-style-<b>' + getValue() + '</b>'
				}
				function klass(c) {
					return name + '-style-' + c
				}
				function getValue() {
					for (var i = 0; i < styles.length; i ++) {
						if (clock.classList.contains(klass(styles[i]))) return styles[i]
					}
				}
				function click(e) {
					for (var i = 0; i < styles.length; i ++) {
						if (clock.classList.contains(klass(styles[i]))) {
							clock.classList.remove(klass(styles[i]))
							clock.classList.add(klass(styles[(i + 1) % styles.length]))
							break
						}
					}
					update()
					e.preventDefault()
				}
			})
		}

		Draggable.create("#secC", {type: "rotation", throwProps: true});
		Draggable.create("#minC", {type: "rotation", throwProps: true});
		Draggable.create("#hourC", {type: "rotation", throwProps: true});
	}
]);
'use strict';

angular.module('etc').controller('WigsController', ['$scope',
	function($scope) {
        $scope.degree = 0;
        $scope.flipCard = function(targetId){
            var target = $('#'+targetId);
            $scope.degree += 180;
            TweenMax.to(target, 0.4 , {rotationY: $scope.degree});
            console.log($scope.degree);
        }
		// Wigs controller logic
		// ...
	}
]);
'use strict';

angular.module('etc').directive('colorPicker', [
	function() {
		return {
			templateUrl: 'modules/etc/directives/template/color-picker.html',
			restrict: 'E',
			controller: ColorPickerCtrl,
			controllerAs: 'vm',
			link: function postLink(scope, element, attrs) {

			}
		};

		function ColorPickerCtrl($scope) {
			this.items=[
				{imgSrc:"modules/etc/img/1.jpg", title:"Color 1"},
				{imgSrc:"modules/etc/img/2.jpg", title:"Color 2"},
				{imgSrc:"modules/etc/img/3.jpg", title:"Color 3"},
				{imgSrc:"modules/etc/img/4.jpg", title:"Color 4"},
				{imgSrc:"modules/etc/img/5.jpg", title:"Color 5"},
				{imgSrc:"modules/etc/img/6.jpg", title:"Color 6"},
				{imgSrc:"modules/etc/img/7.jpg", title:"Color 7"},
				{imgSrc:"modules/etc/img/8.jpg", title:"Color 8"},
				{imgSrc:"modules/etc/img/9.jpg", title:"Color 9"},
				{imgSrc:"modules/etc/img/10.jpg", title:"Color 10"},
				{imgSrc:"modules/etc/img/11.jpg", title:"Color 11"},
				{imgSrc:"modules/etc/img/12.jpg", title:"Color 12"},
				{imgSrc:"modules/etc/img/13.jpg", title:"Color 13"},
				{imgSrc:"modules/etc/img/14.jpg", title:"Color 14"},
				{imgSrc:"modules/etc/img/15.jpg", title:"Color 15"},
				{imgSrc:"modules/etc/img/16.jpg", title:"Color 16"},
			];

			this.coverSelected = function(event) {
				console.log("selected");
				//console.log(event);
				console.log(event.path[2].outerHTML)
				TweenLite.to(event.path[2].outerHTML, 1, {display:"block"});
			}

			this.tiles = buildGridModel({
				icon : "avatar:svg-",
				title: "Svg-",
				background: ""
			});
			function buildGridModel(tileTmpl){
				var it, results = [ ];
				for (var j=0; j<18; j++) {
					it = angular.extend({},tileTmpl);
					it.icon  = it.icon + (j+1);
					it.title = it.title + (j+1);
					it.span  = { row : "1", col : "1" };
					switch(j+1) {
						case 1:
							it.background = "red"; it.img="modules/etc/img/1.jpg"
							it.span.row = it.span.col = 2;
							break;
						case 2: it.background = "green"; it.img="modules/etc/img/2.jpg"; break;
						case 3: it.background = "darkBlue"; it.img="modules/etc/img/3.jpg"; break;
						case 4:
							it.background = "blue";
							it.span.row = it.span.col = 2;
							it.img="modules/etc/img/4.jpg";
							break;
						case 5:
							it.background = "yellow";
							it.span.row = it.span.col = 2;
							it.img="modules/etc/img/5.jpg";
							break;
						case 6:
							//it.span.row = it.span.col = 4;
							it.background = "pink";it.img="modules/etc/img/6.jpg"; break;
						case 7: it.background = "darkBlue";it.img="modules/etc/img/7.jpg"; break;
						case 8:
							//it.span.row = it.span.col = 6;
							it.background = "purple";it.img="modules/etc/img/8.jpg"; break;
						case 9: it.background = "deepBlue";it.img="modules/etc/img/9.jpg"; break;
						case 10: it.span.row = it.span.col = 2; it.background = "lightPurple";it.img="modules/etc/img/10.jpg"; break;
						case 11: it.background = "yellow";it.img="modules/etc/img/11.jpg"; break;
						case 12: it.background = "deepBlue";it.img="modules/etc/img/9.jpg"; break;
						case 13: it.background = "lightPurple";it.img="modules/etc/img/10.jpg"; break;
						case 14: it.background = "yellow";it.img="modules/etc/img/11.jpg"; break;
						case 15: it.background = "deepBlue";it.img="modules/etc/img/9.jpg"; break;
						case 16: it.background = "lightPurple";it.img="modules/etc/img/10.jpg"; break;
						case 17: it.background = "yellow";it.img="modules/etc/img/11.jpg"; break;
						case 18: it.background = "yellow";it.img="modules/etc/img/12.jpg"; break;
					}
					results.push(it);
				}
				return results;
			}
		}
	}
]);
'use strict';

angular.module('etc').directive('gallery', [
	function() {
		return {
			templateUrl: 'modules/etc/directives/template/gallery.html',
			restrict: 'E',
            controller: galleryCtrl,
            controllerAs: 'vm',
			link: function postLink(scope, element, attrs) {
			}
		};

        function galleryCtrl($scope) {
            $scope.title = "DD";
            var COLORS = ['#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c', '#ff8a80', '#ff5252', '#ff1744', '#d50000', '#f8bbd0', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60', '#c2185b', '#ad1457', '#880e4f', '#ff80ab', '#ff4081', '#f50057', '#c51162', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2', '#4a148c', '#ea80fc', '#e040fb', '#d500f9', '#aa00ff', '#ede7f6', '#d1c4e9', '#b39ddb', '#9575cd', '#7e57c2', '#673ab7', '#5e35b1', '#4527a0', '#311b92', '#b388ff', '#7c4dff', '#651fff', '#6200ea', '#c5cae9', '#9fa8da', '#7986cb', '#5c6bc0', '#3f51b5', '#3949ab', '#303f9f', '#283593', '#1a237e', '#8c9eff', '#536dfe', '#3d5afe', '#304ffe', '#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#82b1ff', '#448aff', '#2979ff', '#2962ff', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b', '#80d8ff', '#40c4ff', '#00b0ff', '#0091ea', '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064', '#84ffff', '#18ffff', '#00e5ff', '#00b8d4', '#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a', '#009688', '#00897b', '#00796b', '#00695c', '#a7ffeb', '#64ffda', '#1de9b6', '#00bfa5', '#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20', '#b9f6ca', '#69f0ae', '#00e676', '#00c853', '#f1f8e9', '#dcedc8', '#c5e1a5', '#aed581', '#9ccc65', '#8bc34a', '#7cb342', '#689f38', '#558b2f', '#33691e', '#ccff90', '#b2ff59', '#76ff03', '#64dd17', '#f9fbe7', '#f0f4c3', '#e6ee9c', '#dce775', '#d4e157', '#cddc39', '#c0ca33', '#afb42b', '#9e9d24', '#827717', '#f4ff81', '#eeff41', '#c6ff00', '#aeea00', '#fffde7', '#fff9c4', '#fff59d', '#fff176', '#ffee58', '#ffeb3b', '#fdd835', '#fbc02d', '#f9a825', '#f57f17', '#ffff8d', '#ffff00', '#ffea00', '#ffd600', '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00', '#ffe57f', '#ffd740', '#ffc400', '#ffab00', '#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726', '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100', '#ffd180', '#ffab40', '#ff9100', '#ff6d00', '#fbe9e7', '#ffccbc', '#ffab91', '#ff8a65', '#ff7043', '#ff5722', '#f4511e', '#e64a19', '#d84315', '#bf360c', '#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00', '#d7ccc8', '#bcaaa4', '#795548', '#d7ccc8', '#bcaaa4', '#8d6e63', '#eceff1', '#cfd8dc', '#b0bec5', '#90a4ae', '#78909c', '#607d8b', '#546e7a', '#cfd8dc', '#b0bec5', '#78909c'];
            $scope.colorTiles = (function() {
                var tiles = [];
                for (var i = 0; i < 46; i++) {
                    tiles.push({
                        color: randomColor(),
                        colspan: randomSpan(),
                        rowspan: randomSpan()
                    });
                }
                return tiles;
            })();

            function randomColor() {
                return COLORS[Math.floor(Math.random() * COLORS.length)];
            }
            function randomSpan() {
                var r = Math.random();
                if (r < 0.8) {
                    return 1;
                } else if (r < 0.9) {
                    return 2;
                } else {
                    return 3;
                }
            }
        };
	}
]);
'use strict';

angular.module('etc').directive('productDetail', [
	function() {
		return {
			templateUrl: 'modules/etc/directives/template/product-detail.html',
			restrict: 'E',
			controller: ProductDetailCtrl,
			controllerAs: 'vm',
			link: function postLink(scope, element, attrs) {

			}
		};

		function ProductDetailCtrl($scope) {

		};
	}
]);
'use strict';

var CONFIG = {
	//clientId: '574563539488-n0vrevgjp3606l20hfk4rqfk1dc8j3qb.apps.googleusercontent.com',
    clientId: '574563539488-pctm7fr21vcetcfpdf9hhaje9q5vepee.apps.googleusercontent.com',
	developerKey: 'AIzaSyBEGA9BOSoo0DF69RNRh9MsMKDxaVlnT_U',
	scopes: [
		'https://www.googleapis.com/auth/drive',
		'https://www.googleapis.com/auth/drive.appdata',
		'https://www.googleapis.com/auth/plus.me',
		'https://www.googleapis.com/auth/paymentssandbox.make_payments'
	]
};
angular.module('g-drive').value('configGdrive', CONFIG);

//Setting up route
angular.module('g-drive').config(['$stateProvider',
	function($stateProvider) {
	}
]);

'use strict';
function GDocs(selector) {
    var SCOPE_ = 'https://www.googleapis.com/drive/v2/';
    this.lastResponse = null;
    this.__defineGetter__('SCOPE', function() {
        return SCOPE_;
    });
    this.__defineGetter__('DOCLIST_FEED', function() {
        return SCOPE_ + 'files/';
    });
    this.__defineGetter__('CREATE_SESSION_URI', function() {
        return 'https://www.googleapis.com/upload/drive/v2/files?uploadType=resumable';
    });
    this.__defineGetter__('DEFAULT_CHUNK_SIZE', function() {
        return 1024 * 1024 * 5; // 5MB;
    });
};
GDocs.prototype.auth = function(interactive, opt_callback) {
    try {
        chrome.identity.getAuthToken({interactive: interactive}, function(token) {
            if (token) {
                this.accessToken = token;
                opt_callback && opt_callback();
            }
        }.bind(this));
    } catch(e) {
        console.log(e);
    }
};
GDocs.prototype.removeCachedAuthToken = function(opt_callback) {
    if (this.accessToken) {
        var accessToken = this.accessToken;
        this.accessToken = null;
        // Remove token from the token cache.
        chrome.identity.removeCachedAuthToken({
            token: accessToken
        }, function() {
            opt_callback && opt_callback();
        });
    } else {
        opt_callback && opt_callback();
    }
};
GDocs.prototype.revokeAuthToken = function(opt_callback) {
    if (this.accessToken) {
        // Make a request to revoke token
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' +
        this.accessToken);
        xhr.send();
        this.removeCachedAuthToken(opt_callback);
    }
}
GDocs.prototype.makeRequest = function(method, url, callback, opt_data, opt_headers) {
    var data = opt_data || null;
    var headers = opt_headers || {};
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    // Include common headers (auth and version) and add rest.
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.accessToken);
    for (var key in headers) {
        xhr.setRequestHeader(key, headers[key]);
    }
    xhr.onload = function(e) {
        this.lastResponse = this.response;
        callback(this.lastResponse, this);
    }.bind(this);
    xhr.onerror = function(e) {
        console.log(this, this.status, this.response,
            this.getAllResponseHeaders());
    };
    xhr.send(data);
};
GDocs.prototype.upload = function(blob, callback, retry) {
    var onComplete = function(response) {
        document.getElementById('main').classList.remove('uploading');
        var entry = JSON.parse(response).entry;
        callback.apply(this, [entry]);
    }.bind(this);
    var onError = function(response) {
        if (retry) {
            this.removeCachedAuthToken(
                this.auth.bind(this, true,
                    this.upload.bind(this, blob, callback, false)));
        } else {
            document.getElementById('main').classList.remove('uploading');
            throw new Error('Error: '+response);
        }
    }.bind(this);
    var uploader = new MediaUploader({
        token: this.accessToken,
        file: blob,
        onComplete: onComplete,
        onError: onError
    });
    document.getElementById('main').classList.add('uploading');
    uploader.upload();
};

///*
// * Created by Kevin on 2014-10-29.
//* */

'use strict';

angular.module('g-drive').factory('Googledrive', [
    '$q','configGdrive',
	function($q, configGdrive) {
		return {
			createFolder: createFolder,
			findFolder: findFolder,
			getGoogleDriveInfo: getGoogleDriveInfo,
			setupPicker: setupPicker,
			listFolder: listFolder,
			createFile: createFile,
            /////////
            plusTest: plusTest
		};

		function createFolder(FolderName, accessToken){
			var request = gapi.client.request({
				'path': '/drive/v2/files/',
				'method': 'POST',
				'headers': {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + accessToken
				},
				'body':{
					"title" : FolderName,
					"mimeType" : "application/vnd.google-apps.folder"
				}
			});
			request.execute(function(resp) {
				console.log(resp);
			});
		}

		// Search Folder
		function findFolder(callback){
			//console.log('Service: '+query);
			gapi.client.load('drive', 'v2').then(function(){
				var request = gapi.client.drive.files.list({
					q: "title contains 'Open'",
					//q:  query,
					maxResults:10,
					fields: 'items(id\,title)'
				});
				request.then(function(resp){
					callback(resp);
				});
			});
		}

        // create File
        function createFile(callback){
            gapi.client.load('drive', 'v2').then(function(){
                var request = gapi.client.drive.files.list({
                    q: "title contains 'URI-'",
                    fields: 'items(id\,title)'
                });
                request.then(function(resp){
                    //callback(resp);
                });
            });
        }

		function getGoogleDriveInfo(){
			gapi.client.load('drive', 'v2').then(function() {
				var request = gapi.client.drive.about.get();
				request.execute(function (resp) {
					console.log('Current user name: ' + resp.name);
					console.log('Root folder ID: ' + resp.rootFolderId);
					console.log('Total quota (bytes): ' + resp.quotaBytesTotal);
					console.log('Used quota (bytes): ' + resp.quotaBytesUsed);
				});
			});
		}

		//Google File Picker Platform
		function setupPicker(accessToken, callback){
			console.log('from gdrive service');
			var callbackAfterFindFolder = function(resp){
				var folderID = resp.result.items[0].id;
				var picker = new google.picker.PickerBuilder()
					.setOAuthToken(accessToken)

					//.setOAuthToken("ya29.NQGgHdO9RRpPL_NSzdY7BHnDa7irQ9sVyYj-0NJKeOK-fWZdZ_7msD8oquqWdKBsAl_Om4Zd1WO84Q")
					.setDeveloperKey(configGdrive.developerKey)
					//.addView(new google.picker.DocsUploadView().setParent(folderID))
					//.addView(new google.picker.DocsView().setParent(folderID))
					.addView(new google.picker.DocsView())
					.enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
					.setLocale('us')
					//.enableFeature(google.picker.Feature.NAV_HIDDEN)
					.setCallback(callback)
					.build();
				picker.setVisible(true);
			}
			findFolder(callbackAfterFindFolder);
		}

		function listFolder(){
            var deffered = $q.defer();
			console.log('listForlder');
			gapi.client.load('drive', 'v2').then(function() {
				var request = gapi.client.drive.files.list({
					maxResults:10,
					fields: 'etag,items(thumbnailLink,id,webViewLink,webContentLink,title)'
				});
				request.then(function(resp){
					console.log('result File list');
					//console.log(resp)
					deffered.resolve(resp.result);
				});
			});
            return deffered.promise;
		}

        function plusTest(){
            var deffered = $q.defer();
            gapi.client.load('plus', 'v1').then(function(){
                var request = gapi.client.plus.activities.list({
                    'userId' : 'me',
                    'collection' : 'public'
                });

                request.execute(function(resp) {
                    var numItems = resp.items.length;
                    for (var i = 0; i < numItems; i++) {
                        //console.log('ID: ' + resp.items[i].id + ' Content: ' + resp.items[i].object.content);
                        deffered.resolve(resp.items);
                    }
                });
            });
            return deffered.promise;
        }
	}
]);

'use strict';

//Setting up route
angular.module('googledocs').config(['$stateProvider',
	function($stateProvider) {
		// Googledocs state routing
		$stateProvider.
		state('listGoogledocs', {
			url: '/googledocs',
			templateUrl: 'modules/googledocs/views/list-googledocs.client.view.html'
		}).
		state('createGoogledoc', {
			url: '/googledocs/create',
			templateUrl: 'modules/googledocs/views/create-googledoc.client.view.html'
		}).
		state('viewGoogledoc', {
			url: '/googledocs/:googledocId',
			templateUrl: 'modules/googledocs/views/view-googledoc.client.view.html'
		}).
		state('editGoogledoc', {
			url: '/googledocs/:googledocId/edit',
			templateUrl: 'modules/googledocs/views/edit-googledoc.client.view.html'
		});
	}
]);
'use strict';

// Googledocs controller
angular.module('googledocs').controller('GoogledocsController', GoogledocsController);

	function GoogledocsController($scope, $stateParams, $location, $timeout, Authentication, Googledocs, D2lClassesOwnership, D2lLessonsByClass) {
		$scope.authentication = Authentication;

		// Create new Googledoc
		$scope.create = function() {
			// Create new Googledoc object
			var googledoc = new Googledocs ({
				name: this.name,
				link: this.link,
				contentType: this.contentType,
				class: this.class._id,
				lesson: this.lesson._id,
				gdocId: this.gdocId
			});

			// Redirect after save
			googledoc.$save(function(response) {
				$location.path('googledocs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Googledoc
		$scope.remove = function(googledoc) {
			if ( googledoc ) { 
				googledoc.$remove();

				for (var i in $scope.googledocs) {
					if ($scope.googledocs [i] === googledoc) {
						$scope.googledocs.splice(i, 1);
					}
				}
			} else {
				$scope.googledoc.$remove(function() {
					$location.path('googledocs');
				});
			}
		};

		// Update existing Googledoc
		$scope.update = function() {
			var googledoc = $scope.googledoc;

			googledoc.$update(function() {
				$location.path('googledocs/' + googledoc._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Googledocs
		$scope.find = function() {
			$scope.googledocs = Googledocs.query();
		};

		// Find existing Googledoc
		$scope.findOne = function() {
			$scope.googledoc = Googledocs.get({ 
				googledocId: $stateParams.googledocId
			});
		};

		// Load Class
		$scope.loadClasses = function() {
			//console.log('Load Class is invoked');
			return $timeout(function() {
				$scope.classes = D2lClassesOwnership.query();
			}, 650);
		};

		$scope.loadLessons = function(classId) {
			return $timeout(function() {
				$scope.lessons = D2lLessonsByClass.query({d2lClassId: classId});
			}, 650);
		}

		$scope.$on('handleEmit', function(event, args) {
			console.log('broadcast is invoked');
			$scope.gdocId=args.message;
			$scope.$digest();
		});
	}

'use strict';

angular.module('googledocs').directive('gdocsCreate', gdocsCreate);
angular.module('googledocs').directive('gdocsEdit', gdocsEdit);
angular.module('googledocs').directive('gdocsList', gdocsList);
angular.module('googledocs').directive('gdocsView', gdocsView);

function gdocsCreate() {
	return {
		templateUrl: 'modules/googledocs/views/create-googledoc.client.view.html',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {
		}
	};
}

function gdocsEdit() {
	return {
		templateUrl: 'modules/googledocs/views/edit-googledoc.client.view.html',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {
		}
	};
}

function gdocsList() {
	return {
		templateUrl: 'modules/googledocs/views/list-googledocs.client.view.html',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {
		}
	};
}

function gdocsView() {
	return {
		templateUrl: 'modules/googledocs/views/view-googledoc.client.view.html',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {
		}
	};
}

'use strict';

//Googledocs service used to communicate Googledocs REST endpoints
angular.module('googledocs').factory('Googledocs', ['$resource',
	function($resource) {
		return $resource('googledocs/:googledocId', { googledocId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]).factory('GoogledocsByLesson', ['$resource',
	function($resource) {
		return $resource('googledocsByLesson/:lessonId', { lessonId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

//Setting up route
angular.module('gsap-editor').config(['$stateProvider',
	function($stateProvider) {
		// Gsap editor state routing
		$stateProvider.
		state('gsap-editor', {
			url: '/gsap-editor',
			templateUrl: 'modules/gsap-editor/views/gsap-editor.client.view.html'
		});
	}
]);
'use strict';

angular.module('gsap-editor').controller('GsapEditorController',GsapEditorCtrl);

function GsapEditorCtrl($scope, $http, $cacheFactory) {
    $scope.data = ['dd','dd','dd'];
    $scope.title1 = 'Button';
    $scope.title4 = 'Warn';
    $scope.isDisabled = true;
    $scope.googleUrl = 'http://google.com';



    $http.defaults.cache = $cacheFactory('myCache', {capacity: 2});

    $scope.loadPerson = function(num){
        $http
            .get('//swapi.co/api/people/'+ num + '/')
            .then(function (result){
                console.log(result.data.name);
            });
    }
    //var myCache = $cacheFactory('myCache');
    //myCache.put('key', 'val');
    //console.log(myCache.get('key'));
    //console.log(myCache.info());

}

'use strict';

// Configuring the Articles module
angular.module('mean-events').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//Menus.addMenuItem('topbar', 'Mean events', 'mean-events', 'dropdown', '/mean-events(/create)?');
		//Menus.addSubMenuItem('topbar', 'mean-events', 'List Mean events', 'mean-events');
		//Menus.addSubMenuItem('topbar', 'mean-events', 'New Mean event', 'mean-events/create');
	}
]);

'use strict';

//Setting up route
angular.module('mean-events').config(['$stateProvider',
	function($stateProvider) {
		// Mean events state routing
		$stateProvider.
		state('listMeanEvents', {
			url: '/mean-events',
			templateUrl: 'modules/mean-events/views/list-mean-events.client.view.html'
		}).
		state('createMeanEvent', {
			url: '/mean-events/create',
			templateUrl: 'modules/mean-events/views/create-mean-event.client.view.html'
		}).
		state('viewMeanEvent', {
			url: '/mean-events/:meanEventId',
			templateUrl: 'modules/mean-events/views/view-mean-event.client.view.html'
		}).
		state('editMeanEvent', {
			url: '/mean-events/:meanEventId/edit',
			templateUrl: 'modules/mean-events/views/edit-mean-event.client.view.html'
		});
	}
]);

'use strict';

// Mean events controller
angular.module('mean-events').controller('MeanEventsController', ['$scope', '$stateParams', '$location', 'Authentication', 'MeanEvents',
	function($scope, $stateParams, $location, Authentication, MeanEvents) {
		$scope.authentication = Authentication;
		console.log($scope.authentication);
		// Create new Mean event
		$scope.create = function() {
			// Create new Mean event object
			var meanEvent = new MeanEvents ({
				name: this.name
			});

			// Redirect after save
			meanEvent.$save(function(response) {
				$location.path('mean-events/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Mean event
		$scope.remove = function(meanEvent) {
			if ( meanEvent ) { 
				meanEvent.$remove();

				for (var i in $scope.meanEvents) {
					if ($scope.meanEvents [i] === meanEvent) {
						$scope.meanEvents.splice(i, 1);
					}
				}
			} else {
				$scope.meanEvent.$remove(function() {
					$location.path('mean-events');
				});
			}
		};

		// Update existing Mean event
		$scope.update = function() {
			var meanEvent = $scope.meanEvent;

			meanEvent.$update(function() {
				$location.path('mean-events/' + meanEvent._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Mean events
		$scope.find = function() {
			$scope.meanEvents = MeanEvents.query();
		};

		// Find existing Mean event
		$scope.findOne = function() {
			$scope.meanEvent = MeanEvents.get({ 
				meanEventId: $stateParams.meanEventId
			});
		};
	}
]);

'use strict';

//Mean events service used to communicate Mean events REST endpoints
angular.module('mean-events').factory('MeanEvents', ['$resource',
	function($resource) {
		return $resource('mean-events/:meanEventId', { meanEventId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

//Setting up route
angular.module('mean-tutorials').config(['$stateProvider',
    function($stateProvider) {
        // Mean tutorials state routing
        $stateProvider.
            state('projectview', {
                abstract: true,
                url: '/projects',
                templateUrl: 'modules/mean-tutorials/views/projectView.client.view.html'
            }).
                state('projectview.dashboard', {
                    url: '/dashboard',
                    templateUrl: 'modules/mean-tutorials/template/projectView.dashboard.tmp.html'
                }).
                state('projectview.projects', {
                    url: '/projectlist',
                    templateUrl: 'modules/mean-tutorials/template/projectView.projects.tmp.html'
                }).
                state('projectview.articles', {
                    url: '/articleslist',
                    templateUrl: 'modules/mean-tutorials/template/projectView.articles.tmp.html'
                }).

            state('versioning', {
                url: '/versioning',
                templateUrl: 'modules/mean-tutorials/views/versioning.client.view.html'
            }).
            state('project2', {
                url: '/project2',
                templateUrl: 'modules/mean-tutorials/views/project2.client.view.html'
            }).
            state('project1', {
                url: '/project1',
                templateUrl: 'modules/mean-tutorials/views/project1.client.view.html'
            }).
            state('mean-home', {
			        url: '/',
			        templateUrl: 'modules/mean-tutorials/views/mean-home.client.view.html'
			        //views:{
				       // "":{templateUrl: 'modules/mean-tutorials/views/mean-home.client.view.html'},
				       // "tt":{template:"<h1>Hello World</h1>"}
			        //}
            });
    }
]);

'use strict';

angular.module('mean-tutorials')
    .controller('GapiCtrlController', ['$scope','$http',
	function($scope, $http) {
		// Gapi ctrl controller logic
		// ...
        $scope.googleAccess = function(){
            $http.get('/gapi').success(function(data, status, headers, config) {
                $scope.url = data;
                    $http.get($scope.url).success(function(data){
                        console.log(data);
                    })

            }).
                error(function(data, status, headers, config) {
                    $scope.url = 'Error';
                });
        }
	}
]);

'use strict';

angular.module('mean-tutorials').controller('HomeDialogtmpController', ['$scope','$mdDialog',
	function($scope, $mdDialog) {
		// Home dialogtmp controller logic
		// ...
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
	}
]);

'use strict';

angular.module('mean-tutorials')
	.controller('MeanLoginCtrl', MeanLoginCtrl)
	.controller('MeanHomeController',MeanHomeController);

function MeanLoginCtrl($scope, Authentication, $mdDialog){
	$scope.authentication = Authentication;
}

function MeanHomeController($scope, $state, $http, $mdDialog, Authentication, D2lClasses) {

	//Initialization
	$scope.authentication = Authentication;

	//Course list
	$scope.courses = D2lClasses.query();

	//  Openboard Introduction Contents
	$scope.homeContents = {
		mainTitle : "ng-SKorea",
		subTitleText: "에 오신 것을 환영 합니다."
	};

	$scope.notice = "Alpha";

	$scope.date = {
		month: moment().format("MMM").toUpperCase(),
		date: moment().date(),
		year: moment().year()
	}

	$scope.goTo = function(stateName){
		$state.go(stateName);
	}

	// Extract Contents
	$http.get('modules/mean-tutorials/data/home.json').success(function(data) {
		$scope.dataFromJson = data;
		$scope.projects = $scope.dataFromJson.projects;
		$scope.announcements = $scope.dataFromJson.announcements;
		$scope.techs = $scope.dataFromJson.techs;
	});

	$scope.goToClass = function(id){
		console.log(id);
		$state.go('viewD2lClass', {d2lClassId:id});
	}

	$scope.gotoState = function(state) {
		$state.go(state);
	}

	// This function should be combined later
	$scope.showSignUpTutorial = function(ev) {
		console.log('mean home');
		$mdDialog.show({
			controller: DialogController,
			templateUrl: 'modules/mean-tutorials/template/authentication/signup-dialog.tpl.html',
			targetEvent: ev
		})
	};
}

'use strict';

angular.module('mean-tutorials')
    .controller('Project1Controller', ['$scope','$document','$timeout','$log','$mdSidenav',
        function($scope, $document, $timeout, $log, $mdSidenav) {
            $scope.snippet = 'angular.module(\'mean-tutorials\')'+
                '.controller(\'Project1Controller\', [\'$scope\',\'$document\',\'$timeout\',\'$log\',\'$mdSidenav\','+
                    'function($scope, $document, $timeout, $log, $mdSidenav) {';
            $scope.toggleLeft = function() {
                $mdSidenav('left').toggle()
                    .then(function(){
                        $log.debug("toggle left is done");
                    });
            };
            $scope.toggleRight = function() {
                $mdSidenav('right').toggle()
                    .then(function(){
                        $log.debug("toggle RIGHT is done");
                    });
            };

            $scope.id='meanT-project1';
            var width = 960,
                height = 500,
                centered;

            var projection = d3.geo.albersUsa()
                .scale(1070)
                .translate([width / 2, height / 2]);

            var path = d3.geo.path()
                .projection(projection);

            var aspect = 500 / 950;

            var svg = d3.select("#geo").append("svg")
                .attr("viewBox", "0 0 960 500")
                .attr("preserveAspectRatio", "xMidMid")

            svg.append("rect")
                .attr("class", "background")
                .attr("width", width)
                .attr("height", height)
                .on("click", clicked);

            var g = svg.append("g");

            d3.json("/modules/mean-tutorials/img/us.json"
                , function(error, us){
                    g.append("g")
                        .attr("id", "states")
                        .selectAll("path")
                        .data(topojson.feature(us, us.objects.states).features)
                        .enter().append("path")
                        .attr("d", path)
                        .on("click", clicked);

                    g.append("path")
                        .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
                        .attr("id", "state-borders")
                        .attr("d", path);
                }
            );

            function clicked(d) {
                var x, y, k;

                if (d && centered !== d) {
                    var centroid = path.centroid(d);
                    x = centroid[0];
                    y = centroid[1];
                    k = 4;
                    centered = d;
                } else {
                    x = width / 2;
                    y = height / 2;
                    k = 1;
                    centered = null;
                }

                g.selectAll("path")
                    .classed("active", centered && function (d) {
                        return d === centered;
                    });

                g.transition()
                    .duration(750)
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
                    .style("stroke-width", 1.5 / k + "px");
            }

        }
]).controller('LeftCtrl12', function($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function() {
            $mdSidenav('left').close()
                .then(function(){
                    $log.debug("close LEFT is done");
                });
        };
    })
    .controller('RightCtrl11', function($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function() {
            $mdSidenav('right').close()
                .then(function(){
                    $log.debug("close RIGHT is done");
                });
        };
    });;

'use strict';

angular.module('mean-tutorials').controller('Project2Controller', ['$scope',
	function($scope,$rootScope) {
        // Disqus ID
		$scope.id='meanT-project2';

        // Listen event
        $scope.$on('handleEmit', function(event, args) {
            $scope.$broadcast('handleBroadcast', args);
        });

        $scope.password = '';
        $scope.grade = function(){
            var size = $scope.password.length;
            if (size > 8) {
                $scope.strength = 'strong';
            } else if (size > 3) {
                $scope.strength = 'medium';
            } else {
                $scope.strength = 'weak';
            }
        }
	}
]);

'use strict';

angular.module('mean-tutorials').controller('ProjectViewController', ['$scope', '$stateParams', '$state', '$timeout', 'Articles',
	function($scope, $stateParams, $state, $timeout, Articles) {
		$scope.title= 'Project3';
        $scope.body= '';
        $scope.menus = [
            {icon:'', name:'Dashboard', state:'projectview.dashboard'},
            {icon:'', name:'Project', state:'projectview.projects'},
            {icon:'', name:'Article', state:'projectview.articles'},
            {icon:'', name:'Comments', state:'projectview.dashboard'},
            {icon:'', name:'Survey', state:'projectview.dashboard'},
        ];

        $scope.goChildView = function(stateName){
            $state.go(stateName);
        }

        $scope.find = function() {
            $scope.articles = Articles.query();
        };

        $scope.findOne = function() {
            $scope.article = Articles.get({
                articleId: $stateParams.articleId
            });
        };

        $scope.shrinkleftPane = function(){
            TweenLite.to('.leftPane', 1, {x:'-75px'});
            TweenLite.to('.rightPane', 1, {x:'-75px'});
            TweenLite.to('.svgBtnLeftPane', 1, {x:'75px'});

        }
	}
]);

'use strict';

angular.module('mean-tutorials').controller('ProjectviewProjectsController', ['$scope', '$resource', 'Articles',
	function($scope, $resource, Articles) {
        var Projects = $resource('/articles/projects/:docType',
            {docType: '@docType'},
            {
                getProjects: {
                    method: 'GET', isArray: true
                }
            });

        $scope.findProjects = function(type) {
            $scope.resultProjects = Projects.getProjects({docType:type});
            //console.log($scope.result);
        }
        $scope.selectProject = function(index) {
            TweenLite.set('.rightPane', {'margin-left':'72px', position: 'inherit'});
            $scope.selectedProject = $scope.resultProjects[index];
        }
	}
]);

'use strict';

angular.module('mean-tutorials').controller('ProjectviewdashboardController', ['$scope',
    '$window', '$state', '$http', '$q', '$mdDialog', '$mdSidenav', 'configGdrive',
    'Googledrive', 'GooglePlus', 'Products', 'Authentication', 'ProductByUserId','UtCalendar',
    '$timeout', '$mdBottomSheet', //Material Design
    'MeanEvents',
    function ($scope,
              $window, $state, $http, $q, $mdDialog, $mdSidenav, configGdrive,
              Googledrive, GooglePlus, Products, Authentication, ProductByUserId,UtCalendar,
              $timeout, $mdBottomSheet, //material Design
              MeanEvents // mean-events
             ) {
        $scope.authentication = Authentication;

        $scope.foo = 'tbody';

        // Find a list of Mean events
        $scope.findEvents = function() {
            $scope.meanEvents = MeanEvents.query();
        };

        $scope.testCreateFolder = function(){
            //console.log(accessToken);
            Googledrive.createFolder('chulwoo Fuck1', accessToken);
        };

        $scope.testGetGoogleDriveInfo = function() {
            Googledrive.getGoogleDriveInfo();
        }

        //
        var accessToken;
        $scope.permalLink = 'http://drive.google.com/uc?export=view&id=';
        $scope.arrive = false;
        $scope.authName = 'Authorize';
        $scope.isAuth = false;
        $scope.init = function init(){
            window.gapi.load('auth', $scope.authenticateWithGoogle);
            window.gapi.load('picker');
            gapi.client.load('urlshortener', 'v1');
        }
        $scope.authenticateWithGoogle =function authenticateWithGoogle(){
            window.gapi.auth.authorize({
                'client_id': configGdrive.clientId,
                'scope':configGdrive.scopes,
                'immediate': false
            }, handleAuthentication);
        }

        function handleAuthentication(result){
            if(result && !result.error){
                $scope.isAuth = true;
                $scope.authName = 'Deauthorize';
                accessToken = result.access_token;
                //console.log(accessToken);

                /*
                 callGooglePlus();
                 setFilePicker();
                 listFolder();
                 getGoogleDriveInfo();
                 createFolder();
                 */
                createNewAccountFolder();
                setFilePicker(); // singleFile
                //findTargetUriFolder();
            }else{
                console.log(result);
                console.log(result.error);
                console.log('fail to authentication')
            }
            $scope.$digest();
        }

        function listFolder() {
            Googledrive.listFolder()
        }
        /*
         function createFolder(){
         var folderName;
         Googledrive.createFolder(folderName, accessToken);
         }
         */
        function getGoogleDriveInfo(){
            Googledrive.getGoogleDriveInfo();
        }

        /// Custom file Picker Start ----------------------------------------------------------
        /*
         function setFilePicker() {
         var filePicker = document.getElementById('filePicker');

         filePicker.style.display = 'none';

         // Access token has been successfully retrieved, requests can be sent to the API.
         filePicker.style.display = 'block';
         filePicker.onchange = uploadFile;
         }

         function uploadFile(evt) {
         var callback = function(file) {
         console.log('!!File!!');
         console.log(file);
         }
         gapi.client.load('drive', 'v2', function() {
         var file = evt.target.files[0];
         insertFile(file, callback);
         });
         }

         function insertFile(fileData, callback) {
         var boundary = '-------314159265358979323846';
         var delimiter = "\r\n--" + boundary + "\r\n";
         var close_delim = "\r\n--" + boundary + "--";

         var reader = new FileReader();
         reader.readAsBinaryString(fileData);
         reader.onload = function(e) {
         var contentType = fileData.type || 'application/octet-stream';
         var metadata = {
         'title': fileData.name,
         'mimeType': contentType,
         'writersCanShare':true,
         'parents': [{
         'kind': "drive#fileLink",
         'id': "0B8FisuvAYPTfN1o1Q0d4T2JLTk0"
         }]

         };

         var base64Data = btoa(reader.result);
         var multipartRequestBody =
         delimiter +
         'Content-Type: application/json\r\n\r\n' +
         JSON.stringify(metadata) +
         delimiter +
         'Content-Type: ' + contentType + '\r\n' +
         'Content-Transfer-Encoding: base64\r\n' +
         '\r\n' +
         base64Data +
         close_delim;
         console.log(multipartRequestBody);

         var request = gapi.client.request({
         'path': '/upload/drive/v2/files',
         'method': 'POST',
         'params': {'uploadType': 'multipart'},
         'headers': {
         'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
         },
         'body': multipartRequestBody});
         if (!callback) {
         callback = function(file) {
         console.log(file)
         };
         }
         request.execute(callback);
         }
         }
         */
        /// Custom file Picker End ----------------------------------------------------------

        function callGooglePlus(){
            function callback(resp) {
                console.log(resp);
                var heading = document.createElement('h4');
                var image = document.createElement('img');
                image.src = resp.result.image.url;
                heading.appendChild(image);
                heading.appendChild(document.createTextNode(resp.result.displayName));

                document.getElementById('content').appendChild(heading);
            }
            GooglePlus.callGooglePlus(callback);
        }

        // Google PlatForm Service
        $scope.setupPicker = function() {
            function pickerCallback(data) {
                if(data.action == google.picker.Action.PICKED){
                    //do something
                    $scope.files = data.docs;
                    $scope.arrive = true;

                    // make shorten URL
                    var request = gapi.client.urlshortener.url.get({
                        'shortUrl': 'http://goo.gl/fbsS'
                    });
                    request.then(function(response) {
                        appendResults(response.result.longUrl);
                    }, function(reason) {
                        console.log('Error: ' + reason.result.error.message);
                    });

                    //alert('URL: ' + data.docs[0].url);
                    $scope.$digest()
                }else if(data.action ==google.picker.Action.CANCEL){
                    //alert('goodbye');
                }
            }
            Googledrive.setupPicker(accessToken, pickerCallback);
        }

	    $scope.listFolderInformation = function(){
		    Googledrive.listFolder();
	    }

        function createNewAccountFolder(){
            //Pre. Get User Information
            //check if there exists an
            // API /users/me (only allow to have)

            var callback = function(resp){
                console.log(resp.result.items.length);
                if(resp.result.items.length == 0){
                    $http.get('users/me')
                        .success(function(response) {
                            console.log(response);
                            var folderName = 'D2l-'+response._id;
                            //1. Create A New Folder
                            Googledrive.createFolder(folderName, accessToken);
                            //2. Update User Information
                            //$http.get()
                        });
                }
                else{
                    console.log('there is already exist')
                    $scope.rootGdriveFolderID = resp.result.items[0].id
                    $scope.$digest();
                }
            }
            Googledrive.findFolder(callback);
        }

        ////////marterial Design //////////
        $scope.alert = '';
        $scope.showListBottomSheet = function($event) {
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'modules/mean-tutorials/template/bottom-sheet-list-template.html',
                controller: 'BottomSheetListCtrl',
                targetEvent: $event
            }).then(function(clickedItem) {
                $scope.alert = clickedItem.name + ' clicked!';
            });
        };
        $scope.showGridBottomSheet = function($event) {
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'modules/mean-tutorials/template/bottom-sheet-grid-template.html',
                controller: 'BottomSheetGridCtrl',
                targetEvent: $event
            }).then(function(clickedItem) {
                $scope.alert = clickedItem.name + ' clicked!';
            });
        };
        ////////End Material Design



        //////////DATEPicker/////////////
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        ///////////END//////////////////

    }
])

	.controller('gDriveDashCtrl', function($scope, Googledrive){
		$scope.googleDrive={info:'gDriveCtrl'};

		$scope.listingFolderInfo = function(){
			$scope.gDocs = 'dd';
			console.log('gDriveDashCtrl');
			$scope.gDocs = Googledrive.listFolder();
			var request = gapi.client.drive.files.get({
				'fileId': "1Q_CJwJftcL-zabVm0USc1px5HDfbpxu6Klav-XYOzNg"
			});
			request.execute(function(resp) {
				if (!resp.error) {
					console.log('Title: ' + resp.title);
					console.log('Description: ' + resp.description);
					console.log('MIME type: ' + resp.mimeType);
					console.log(resp);
					$scope.gDocs = resp;

				} else if (resp.error.code == 401) {
					// Access token might have expired.
					checkAuth();
				} else {
					console.log('An error occured: ' + resp.error.message);
				}
			});
		}
	})

    .controller('BottomSheetListCtrl', function($scope, $mdBottomSheet) {
        $scope.items = [
            { name: 'Upload New Image (Google Drive)', icon: 'share' },
            { name: 'Select Existing Image (Google Drive)', icon: 'upload' },
            { name: 'Product History (Google Sheets)', icon: 'copy' },
            { name: 'Print this page (PDF Printer)', icon: 'print' },
        ];

        $scope.listItemClick = function($index) {
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
        }
    })
    .controller('BottomSheetGridCtrl', function($scope, $mdBottomSheet) {
        $scope.items = [
            { name: 'Hangout', icon: 'hangout' },
            { name: 'Mail', icon: 'mail' },
            { name: 'Message', icon: 'message' },
            { name: 'Copy', icon: 'copy' },
        ];
        $scope.listItemClick = function($index) {
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
        };
    });

var CalendarException = function CalendarException(message) {
    this.message = message;
    this.toString = function() {
        return this.constructor.name + ": " + this.message
    };
}

var Calendar = function Calendar(firstWeekDay) {
    //properties
    this.firstWeekDay = firstWeekDay || 0; // 0 = Sunday
};

Calendar.prototype = {
    constructor : Calendar,
    weekStartDate : function weekStartDate(date) {
        var startDate = new Date(date.getTime());
        while (startDate.getDay() !== this.firstWeekDay) {
            startDate.setDate(startDate.getDate() - 1);
        }
        return startDate;
    },
    monthDates : function monthDates(year, month, dayFormatter, weekFormatter) {
        if ((typeof year !== "number") || (year < 1970)) {
            throw new CalendarException('year must be a number >= 1970');
        };
        if ((typeof month !== "number") || (month < 0) || (month > 11)) {
            throw new CalendarException('month must be a number (Jan is 0)');
        };
        var weeks = [],
            week = [],
            i = 0,
            date = this.weekStartDate(new Date(year, month, 1));
        do {
            for (i=0; i<7; i++) {
                week.push(dayFormatter ? dayFormatter(date) : date);
                date = new Date(date.getTime());
                date.setDate(date.getDate() + 1);
            }
            weeks.push(weekFormatter ? weekFormatter(week) : week);
            week = [];
        } while ((date.getMonth()<=month) && (date.getFullYear()===year));
        return weeks;
    },
    monthDays : function monthDays(year, month) {
        var getDayOrZero = function getDayOrZero(date) {
            return date.getMonth() === month ? date.getDate() : 0;
        };
        return this.monthDates(year, month, getDayOrZero);
    },
    monthText : function monthText(year, month) {
        if (typeof year === "undefined") {
            var now = new Date();
            year = now.getFullYear();
            month = now.getMonth();
        };
        var getDayOrBlank = function getDayOrBlank(date) {
            var s = date.getMonth() === month ? date.getDate().toString() : "  ";
            while (s.length < 2) s = " "+s;
            return s;
        };
        var weeks = this.monthDates(year, month, getDayOrBlank,
            function (week) { return week.join(" ") });
        return weeks.join("\n");
    }
};
var months = "JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC".split(" ");
for (var i=0; i<months.length; i++)
    Calendar[months[i]] = i;

window.Calendar = Calendar;
window.consts = {
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    dayNames: [
        '일',
        '월',
        '화',
        '수',
        '목',
        '금',
        'S'
    ]
};

'use strict';

angular.module('mean-tutorials').directive('macWindow', [
	function() {
		return {
			scope: {
				projectInfos: '=info'
			},
            //template: macWindowTpl,
			templateUrl: 'modules/mean-tutorials/directives/templates/mac-window.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				scope.description = 'hello';
				scope.minimizeMacWindow = function(event){
					console.log('Click minimize');
					var pageElement = event.target.parentElement.parentElement.getElementsByClassName('page');
					TweenMax.to(pageElement, 1.2, {display:'none', height:'0%'});
				}
				scope.maximizeMacWindow = function(event){
					console.log('Click maximize');
					var pageElement = event.target.parentElement.parentElement.getElementsByClassName('page');
					TweenMax.to(pageElement, 1.2, {display:'block',height:'100%'});
				}
			}
		};
	}
]);

'use strict';

angular.module('mean-tutorials').directive('mjHomeAni', [
	function() {
		return {
			templateUrl: 'modules/mean-tutorials/directives/templates/mjHomeAni.tpl.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Animation //
				var title = $('.ani-title');
				var youtubePlayBtn = $('#youtubePlayButton');
				var techIcons = $('.ani-techs');
				var meanTotem = $('#meanTotem');
				var meanTotemDesc = $('#meanTotem-desc');

				scope.clickPlayBtn = function() {
					TweenMax.fromTo(youtubePlayBtn, 1.5, {scale:2}, {scale:0.8, opacity:0});
					TweenMax.to(title, 2.5, {x:-1200});
					TweenMax.to('.ani-techs', 0.1, {opacity:1});
					TweenMax.to([meanTotem,meanTotemDesc], 1.3, {display:'block', height: '100%', opacity:1});
				}

				scope.resetPlayBtn = function() {
					TweenMax.to(youtubePlayBtn, 0.5, {scale:1, opacity:1});
					TweenMax.to(title, 0.5, {x:0});
					TweenMax.to([meanTotem, meanTotemDesc], 1.3, {display:'none', height: '0%', opacity:0});
				}

                scope.aniTrigger = function(){
                    var tl = new TimelineMax();
                    var t1 = TweenMax.to($('#meanTotem'), 1, {yPercent:-45, force3D:true});
                    var t2 = TweenMax.to($('#meanTotem'), 1, {yPercent:0, force3D:true});
                    tl.add(t1).add(t2);
                }
				// End Animation //
			}
		};
	}
]);

'use strict';

angular.module('mean-tutorials').directive('utCalendar', ['UtCalendar',
	function(UtCalendar) {
		return {
			template: '<div class="container" style="margin-top:20px">'+
                        '<table id="calendar" class="meanT-calendar"></table>'+
                      '</div>',
            scope:{

            },
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
                UtCalendar.calendar();

                element.bind('click', function(val){

                    if($('#calSvg').length === 0){
                        var position = $(val.target.parentElement.parentElement).position({of:$(window)})

                        //TweenLite.to(val.target, 1, {x: position.top, y: position.left, transformOrigin:"50% 50%", transformPerspective:500, backgroundColor:'red', scale:2});
                        var width = $(val.target.parentElement.parentElement).width()
                        var height = $(val.target.parentElement.parentElement).height()
                        //var center = $(val.target.parentElement.parentElement).height()

                        var margin = {top: -5, right: -5, bottom: -5, left: -5},
                            width = width - margin.left - margin.right,
                            height = height - margin.top - margin.bottom;

                        var zoom = d3.behavior.zoom()
                            .center([width / 2, height / 2])
                            .scaleExtent([1, 10])
                            .on("zoom", zoomed);

                        scope.svg = d3.select("#calendar").append("svg")
                            .attr("id", 'calSvg')
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom)
                            .style("position","absolute")
                            .style("top", position.top)
                            .append("g")
                            .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
                            .call(zoom);

                        var container = scope.svg.append("g");

                        container.append("g")
                            .attr("class", "axis")
                            .selectAll("circle")
                            .data(d3.range(10, width, 10))
                            .enter().append("circle")
                            .attr("cx", width / 2)
                            .attr("cy", height / 2)
                            .attr("r", function(d) { return d; });

                        var center = scope.svg.append("circle")
                            .style("fill", "red")
                            .attr("cx", width / 2)
                            .attr("cy", height / 2)
                            .attr("r", 10);

                        var zoomed = function zoomed() {
                            container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                        }
                    }
                })
			}
		};
	}
]);

'use strict';

angular.module('mean-tutorials').factory('UtCalendar', [
	function() {
		// Ut calendar service logic
		// ...

		// Public API
		return {
			calendar: calendar
		};

        function calendar() {
            //Start Calendar
            var cal = new Calendar();

            var month = 0;
            var year = 2015;
            var weeks = cal.monthDays(year, month);

            var table = d3.select('#calendar');
            var header = table.append('thead');
            var body = table.append('tbody');

            header
                .append('tr')
                .append('td')
                .attr('colspan', 7)
                .style('text-align', 'center')
                .style('font-size', '16px')
                .text(consts.monthNames[month]);

            header
                .append('tr')
                .selectAll('td')
                .data(consts.dayNames)
                .enter()
                .append('td')
                .style('text-align', 'center')
                .text(function (d) {
                    return d;
                });

            weeks.forEach(function (week) {
                body
                    .append('tr')
                    .selectAll('td')
                    .data(week)
                    .enter()
                    .append('td')
                    .attr('class', function (d) {
                        return d > 0 ? 'date' : 'empty';
                    })
                    .text(function (d) {
                        return d > 0 ? d : '';
                    });
            });
        }
	}
]);

'use strict';

//Setting up route
angular.module('openboard').config(['$stateProvider',
	function($stateProvider) {
		// Openboard state routing
		$stateProvider.
		state('class-content', {
			url: '/class-content',
			templateUrl: 'modules/openboard/views/class-content.client.view.html'
		}).
		state('angular-tutorial', {
			url: '/angular-tutorial',
			templateUrl: 'modules/openboard/views/angular-tutorial.client.view.html'
		}).
		state('openboard', {
			url: '/openboard',
			templateUrl: 'modules/openboard/views/openboard.client.view.html',
		});
	}
]);
'use strict';

angular.module('openboard').controller('AngularCtrl', AngularCtrl);

function AngularCtrl($scope, $state, $http, $mdDialog, $mdSidenav, $log, Authentication){
    $scope.classContents = [{topic:"Introduction"},{topic:"C++"},{topic:"Input/Flow Control"},{topic:"Functions"},{topic:"Arrays"},{topic:"File IO"},];
    $scope.homeContents = {
        mainTitle : "AngularJS",
        subTitleText: "가장 쉽게 접근 할 수 있는 최신 AngularJS 강좌 입니다.",
        classTitle:"시작하면서",
        classSubTitle: "최근 가장 HOT한 MVW framework에 대한 강좌 입니다. 초보자도 쉽게 접근 할 수 있도록 강의가 준비 될 것입니다."
    };
    $scope.authentication = Authentication;
    $scope.notice = "Prototype";
    $scope.date = {
        month: moment().format("MMM").toUpperCase(),
        date: moment().date(),
        year: moment().year()
    };
    $scope.goTo = function(stateName){
        $state.go(stateName);
    };
    $scope.colorBorder = {
        header: "blue"
    };
}

'use strict';

angular.module('openboard').controller('ClassContentController', ['$scope',
	function($scope) {

	}
]);
'use strict';


angular.module('openboard')
//	.config(function($mdThemingProvider) {})
	.controller('OpenboardController', OpenboardController);
function OpenboardController($scope, $log, $mdDialog, $mdSidenav, $window, $http, Authentication, Users, D2lHws, D2lGrades, D2lClassesOwnership, D2lHwsSubmitsTrue, UsersRole) {

	//Init
	$scope.authentication = Authentication;
	var authentication = Authentication;
	$scope.user = Authentication.user;
	$scope.roles = [{name: 'Student',value:'student'},{name: 'Instructor', value:'instructor'}];

	$scope.hws = D2lHws.query();
	$scope.hws.$promise.then(function(result){
		$scope.hwsCopy = [].concat(result);
	});
	$scope.classes = D2lClassesOwnership.query();
	$scope.classes.$promise.then(function(result){
		$scope.classesCopy = [].concat(result);
	});
	$scope.submittedHW = D2lHwsSubmitsTrue.query();
	$scope.submittedHW.$promise.then(function(result){
		$scope.submittedHWCopy = [].concat(result);
	});
	$scope.gradeCollection = D2lGrades.query();
	$scope.gradeCollection.$promise.then(function (result) {
		$scope.gradeCollectionCopy = [].concat(result);
	});

	$scope.options = {
		chart: {
			type: 'multiBarChart',
			height: 450,
			margin : {
				top: 20,
				right: 20,
				bottom: 60,
				left: 45
			},
			clipEdge: true,
			staggerLabels: true,
			transitionDuration: 500,
			stacked: false,
			showControls:false,
			xAxis: {
				axisLabel: 'Assignment Name',
				showMaxMin: false,
				tickFormat: function(d){
					return d;
					//return d3.requote(d);

				}
			},
			yAxis: {
				axisLabel: 'Percentage(%)',
				axisLabelDistance: 40,
				tickFormat: function(d){
					return d3.format('d')(d);
				}
			},
			//yDomain:[0,100]
		}
	};

	$scope.data1 =
		[
			{
		"values" : [{
			"y" : 75,
			"x" : "Kevin"
		}, {
			"y" : 90,
			"x" : "Eric"
		}, {
			"y" : 95,
			"x" : "Jason"
		}],
		"key" : "Assignment1"
	}, {
		"values" : [{
			"y" : 46,
			"x" : "Kevin"
		}, {
			"y" : 100,
			"x" : "Eric"
		}, {
			"y" : 100,
			"x" : "Jason"
		}],
		"key" : "Assignment2"
	},{
		"values" : [{
			"y" : 65,
			"x" : "Kevin"
		}, {
			"y" : 70,
			"x" : "Eric"
		}, {
			"y" : 35,
			"x" : "Jason"
		}],
		"key" : "Assignment3"
	},
		{
			"values" : [{
				"y" : 45,
				"x" : "Kevin"
			}, {
				"y" : 90,
				"x" : "Eric"
			}, {
				"y" : 85,
				"x" : "Jason"
			}],
			"key" : "Assignment4"
		}];

	$scope.openDoc = function(docId){
		var url = 'https://docs.google.com/document/d/'+docId+'/edit';
		$window.open(url);
	};

	$scope.scrollTo = function(elementId){
		var target = $("#"+elementId).offset().top;

		$mdSidenav('left').close()
			.then(function(){
				$log.debug("close LEFT is done");
				console.log(target);
				TweenMax.to($window, 1.2, {scrollTo:{y:target}, ease:Power4.easeOut});
			});
	};

	$scope.linkHW = function(hw){
		var AppScriptAPI = 'https://script.google.com/macros/s/AKfycbzoXxZDgzjLOJdqGUGYCWSpIT7n2sHyvnIo2W7E5jmXI_2sryj3/exec?';
		var param = 'docId='+hw.gdocId+
			'&userId='+authentication.user.username+
			'&title='+hw.title+
			'&dDate='+new Date(hw.dDate)+
			'&userIdRef='+Authentication.user._id+
			'&instructorRef='+hw.class.user+
			'&classId='+hw.class._id;
		$window.open(AppScriptAPI+param);
	};

    $scope.copyHWTemplate = function(gdocId){
        var AppScriptAPI = 'https://script.google.com/macros/s/AKfycbzoXxZDgzjLOJdqGUGYCWSpIT7n2sHyvnIo2W7E5jmXI_2sryj3/exec?';
        var param = 'docId='+gdocId+'&userIdRef='+Authentication.user._id+'&task=copy';
        $window.open(AppScriptAPI+param);
    };

	$scope.toggleLeftOpen = function() {
		$mdSidenav('left').toggle()
			.then(function(){
                TweenMax.to($("md-backdrop "),0.1,{position:'fixed'});
				//$log.debug("toggle left is done");

			});
	};

	function DialogController($scope, $mdDialog){
		$scope.hide = function() {
			$mdDialog.hide();
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		$scope.answer = function(answer) {
			$mdDialog.hide(answer);
		};
	}

	// This function should be combined later
	$scope.showSignUpTutorial = function(ev) {
		$mdDialog.show({
			controller: DialogController,
			templateUrl: 'modules/openboard/template/authentication/signup-dialog.tpl.html',
			targetEvent: ev
		})
		TweenMax.to($("md-backdrop"),0.5,{position:'fixed'});
	};

	$scope.showSignInTutorial = function(ev, elementId) {
		$mdDialog.show({
			controller: DialogController,
			templateUrl: 'modules/openboard/template/authentication/signin-dialog.tpl.html',
			targetEvent: ev,
            clickOutsideToClose: true
		}).then(function(answer){
                //var target = $("#"+elementId).offset().top;
                //TweenMax.to($window, 1.2, {scrollTo:{y:target}, ease:Power4.easeOut});
            },function(){
                //console.log('cancel');
            }
        );
		TweenMax.to($("md-backdrop"),0.5,{position:'fixed'});
	};

	$scope.showNewClass = function(ev){
		$mdDialog.show({
			controller: D2lClassDialogCtrl,
			templateUrl: 'modules/openboard/template/tutorial/newClass-dialog.tpl.html',
			targetEvent: ev,
			clickOutsideToClose: true
		}).then(
			function(){
				//var target = $("#step4").offset().top;
        //TweenMax.to($window, 1.2, {scrollTo:{y:target}, ease:Power4.easeOut});
        $log.debug('created Class');
				$scope.classes = D2lClassesOwnership.query();
				$scope.classesCopy = [].concat($scope.classes);

            },
			function(){
                $log.debug('cancel');
            }
		);
		function D2lClassDialogCtrl($scope, $mdDialog, D2lClasses){
			$scope.cancel = function() {
				$mdDialog.cancel();
			};
			$scope.create = function() {
				// Create new D2l class object
				var d2lClass = new D2lClasses ({
					name: this.name,
					prefix:this.prefix
				});
				// Redirect after save
				d2lClass.$save(function(response) {
					$mdDialog.hide();
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			};
		}
	};

	$scope.showNewAssign = function(ev){
		$mdDialog.show({
			controller: D2lHwDialogCtrl,
			templateUrl: 'modules/openboard/template/tutorial/newAssign-dialog.tpl.html',
			targetEvent: ev,
			clickOutsideToClose: false,
			preserveScope: false,
			locals: {project:{gdocId: ''}},
			bindToController: true,
			//onComplete: reset

		}).then(
            function(){
                $log.debug('cancel');
            },
            function(){
                //$log.debug('created Assignment');
                $scope.hws = D2lHws.query();
                $scope.hwsCopy = [].concat($scope.hws);
            }
        );

		function D2lHwDialogCtrl(scope, $timeout, $mdDialog, D2lHws, D2lClassesOwnership, GDriveSelectResult){

			scope.$on('handleEmit', function(event, args) {
				console.log('broadcast is invoked');
				scope.project.gdocId=args.message;
				scope.$digest();
			});
			scope.cancel = function(){
				$mdDialog.cancel();
				scope.docs = "";
				scope.project = '';
				scope.projectForm = '';
				args.message = '';
				scope.$digest();
				console.log('B');;
			};
			scope.docs = GDriveSelectResult;
			scope.project = {gdocId : scope.docs.id};

			var dDate = new Date();
			//dDate.setHours(23,59,59,999);

			scope.project = {
				dDate: dDate
				//gdocId : scope.docs.id
				//desc: 'Nuclear Missile Defense System',
			};

			scope.loadClasses = function() {
				console.log('Load Class is invoked');
				return $timeout(function() {
					scope.classes = D2lClassesOwnership.query();
				}, 650);
			};

			scope.createNewRecord = function() {
				console.log('Create');
				// Create new D2l hw object
				scope.project.dDate;//.setHours(23,59,59,999);
				var d2lHw = new D2lHws (scope.project);
				d2lHw.class = d2lHw.class._id;

				// Redirect after save
				d2lHw.$save(function(response) {
					//$location.path('d2l-hws/' + response._id);
					// Clear form fields
					scope.name = '';
					scope.project.gdocId = '';
					scope.projectForm = null;
					$mdDialog.cancel();
					scope.project = null;

				}, function(errorResponse) {
					scope.error = errorResponse.data.message;
				});
			};
		}
	};

	$scope.setRoleAsStudent = function(){
		$scope.user.roles ="student";
		var user = new Users($scope.user);
		user.$update(function(response) {
			$scope.success = true;
			Authentication.user = response;
			$scope.user = response;
			$mdDialog.hide();
		}, function(response) {
			$scope.error = response.data.message;
		});
	};

	$scope.ownHwUpdate = function(){

	}

	$scope.allHwUpdate = function(){

	}

	$scope.openSubmission = function(docId){

	}
}

'use strict';

angular.module('openboard').directive('opProfile', ['$interval','Authentication',
	function($interval,Authentication) {
		return {
			templateUrl: 'modules/openboard/directives/template/op-profile.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
                var profileOpen = true;
                var user = Authentication.user;
                scope.openProfile = function(){
                    console.log(element.find('md-card-content'));
                    if(profileOpen)
                    {
                        TweenMax.to(element.find('md-card-content'), 1, {autoAlpha:0, display:'none'});
                        TweenMax.to(element, 1, {scale: 0.7});
                    }

                    else{
                        TweenMax.to(element.find('md-card-content'), 1, {autoAlpha:1, display:'block'});
                        TweenMax.to(element, 1, {scale: 1});
                    }

                    profileOpen = !profileOpen;
                }
                scope.closeProfile = function(){
                    console.log(element.find('md-card-content'));
                }
			}
		};
	}
]);

'use strict';

angular.module('openboard').directive('openboardAni1', [
	function() {
		return {

			templateUrl: "/modules/openboard/directives/template/openboard-ani1.html",
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Openboard ani1 directive logic
				// ...

				$('#play').click(play);

				var body1 = $('#body1');
				var body2 = $('#body2');
				var body3 = $('#body3');

				var face1 = $('#face1');
				var face2 = $('#face2');
				var flag = $('#flag');
				var a1 = $('.assign');

				var tl = new TimelineMax({repeat: 2, repeatDelay: 1});

				var t1 = TweenMax.to([body1, face1], 0.7, {display: 'none'});

				var t2 = TweenMax.to([body2, face2], 0.2, {display: 'block'});

				var f1 = TweenMax.from(flag, 1, {display: 'none', xPercent: 200, yPercent: -200, scale: 0.2})

				var ta1 = TweenMax.to(a1, 4, {x:1500});

				tl.add(ta1).add(f1).add(t1).add(t2).play();

				function play() {
					tl.restart();
				}
			}
		}
	}
]);
'use strict';

//Setting up route
angular.module('payment').config(['$stateProvider',
	function($stateProvider) {
		// Payment state routing
		$stateProvider.
		state('bt-payment-test', {
			url: '/bt-payment-test',
			templateUrl: 'modules/payment/views/bt-payment-test.client.view.html'
		});
	}
]);
'use strict';

angular.module('payment').controller('BtPaymentTestController', ['$scope',
	function($scope) {
		// Bt payment test controller logic
		// ...
	}
]);
'use strict';

angular.module('payment')
    .constant('clientTokenPath', '/client-token')
    .controller('BtPaymentController', BtPaymentController);

// directive controller
function BtPaymentController($scope, $http, $braintree) {
    $scope.title = "등록하기";
    var client;
    $scope.creditCard = {
        number: '',
        expirationDate: ''
    };

    var startup = function() {
        $braintree.getClientToken().success(function(token) {
            client = new $braintree.api.Client({
                clientToken: token
            });
        });
    }

    $scope.creditCard.number = "4111111111111111";
    $scope.creditCard.expirationDate ="10/18";

    $scope.payButtonClicked = function() {
        console.log("clicked");
        // - Validate $scope.creditCard
        // - Make sure client is ready to use
        client.tokenizeCard({
            number: $scope.creditCard.number,
            expirationDate: $scope.creditCard.expirationDate
        }, function (err, nonce) {
            console.log("err: " + err);
            console.log("nonce: "+nonce);

            $http.post('/buy-something', {nonce:nonce}).success(function(){
                alert('1');
            })
            .error(function(){
                alert('2');
                })


            // - Send nonce to your server (e.g. to make a transaction)
        });
    };
    startup();

}
'use strict';

angular.module('payment').directive('btPayment', [
	function() {
		return {
			templateUrl: 'modules/payment/directives/template/bt-payment.html',
			restrict: 'E',
            controller: 'BtPaymentController',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);
'use strict';

//Setting up route
angular.module('present').config(['$stateProvider',
	function($stateProvider) {
		// Present state routing
		$stateProvider.
		state('okky1', {
			url: '/okky1',
			templateUrl: 'modules/present/views/okky1.client.view.html'
		}).
		state('open-board-present', {
			url: '/open-board-present',
			templateUrl: 'modules/present/views/open-board-present.client.view.html'
		});
	}
]);
'use strict';

angular.module('present').controller('OpenBoardPresentController', ['$scope',
	function($scope) {


		var mdToolBar = $('#open-board-conents #open-board-toolbar');
		var mdContent = $('#open-board-conents #open-board-content');
		//TweenMax.set(mdToolBar,{display:"none"});

		var mainBody = $('#revealSlide');
		var reveal = '<div class="slides">' +
			'<section> <h2>Open Board</h2> <p>More time to Teach Less time to Grade</p></section> ' +
			'<section> <h2>Are You Happy with D2L?</h2> <p>Horrible User Interface</p><p>Lots of Mysterious Functionalities you never use </p></section> ' +
			'<section> <h2>Every where we have Cloud Tech</h2> </section>'+
			'<section> <h2>Do We Really Need a Brand New App?</h2> </section>'+
			'<section data-markdown>## Markdown Support</section></div>';
		//mainBody.append(reveal);

		Reveal.initialize({

			// Display controls in the bottom right corner
			controls: true,

			// Display a presentation progress bar
			progress: true,

			// Display the page number of the current slide
			slideNumber: true,

			// Push each slide change to the browser history
			history: false,

			// Enable keyboard shortcuts for navigation
			keyboard: true,

			// Enable the slide overview mode
			overview: true,

			// Vertical centering of slides
			center: true,

			// Enables touch navigation on devices with touch input
			touch: true,

			// Loop the presentation
			loop: false,

			// Change the presentation direction to be RTL
			rtl: false,

			// Turns fragments on and off globally
			fragments: true,

			// Flags if the presentation is running in an embedded mode,
			// i.e. contained within a limited portion of the screen
			embedded: false,

			// Flags if we should show a help overlay when the questionmark
			// key is pressed
			help: true,

			// Number of milliseconds between automatically proceeding to the
			// next slide, disabled when set to 0, this value can be overwritten
			// by using a data-autoslide attribute on your slides
			autoSlide: 0,

			// Stop auto-sliding after user input
			autoSlideStoppable: true,

			// Enable slide navigation via mouse wheel
			mouseWheel: false,

			// Hides the address bar on mobile devices
			hideAddressBar: true,

			// Opens links in an iframe preview overlay
			previewLinks: false,

			// Transition style
			transition: 'zoom', // none/fade/slide/convex/concave/zoom

			// Transition speed
			transitionSpeed: 'slow', // default/fast/slow

			// Transition style for full page slide backgrounds
			backgroundTransition: 'default', // none/fade/slide/convex/concave/zoom

			// Number of slides away from the current that are visible
			viewDistance: 3,

			// Parallax background image
			parallaxBackgroundImage: '', // e.g. "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"

			// Parallax background size
			parallaxBackgroundSize: '' // CSS syntax, e.g. "2100px 900px"
		});

		// Open board present controller logic
		// ...
	}
]);
'use strict';

angular.module('size-util').controller('SizeUtil.sizeOfWidthController', ['$scope',
	function($scope) {
        $scope.width = window.innerWidth;

        $('.bottom-sheet-dashboard').width(window.innerWidth - 74);
        $(window).on("resize.doResize", function (){
            $scope.width = window.innerWidth;
            if($scope.width < 600)
                $scope.screen = 'sm size';
            else if($scope.width <  960)
                $scope.screen = 'md size';
            else
                $scope.screen = 'bg size';
            $('.bottom-sheet-dashboard').width(window.innerWidth - 74);
            $scope.$apply(function(){

                //do something to update current scope based on the new innerWidth and let angular update the view.
            });
        });

        $scope.$on("$destroy",function (){
            $(window).off("resize.doResize"); //remove the handler added earlier
        });
	}
]);

'use strict';

angular.module('size-util').directive('colorBorder', [
	function() {
		return {
            scope:{
                color : '@colorBorder'
            },
			link: function postLink(scope, element, attrs) {
                //element.css('border-color', scope.color);
                //element.css('border-style', 'solid');
                //element.css('border-width', '1px');
								//console.log('from colorBorder Directive: '+scope.color);
								TweenLite.set(element.children(), {
                    borderColor: scope.color,
                    borderStyle: 'solid',
                    borderWidth: '1px'
                });
			}
		};
	}
]);

'use strict';

angular.module('size-util').directive('coverResize', ['$window',
    function($window) {
        return {
            restrict: 'A',
            scope:{
                targetElem: "=bindingFoo"
            },
            link: function postLink(scope, element, attrs) {
                //function targetElement() {
                //    console.log(scope.targetElem);
                //    return scope.targetElem;
                //}
                //var targetElem = scope.targetElem;


                var w = angular.element($window);
                w.on('reszie', function(){
                    console.log('resize');
                })
                //console.log(w);
                //scope.$watch(function () {
                //    return {
                //        'h': w.height(),
                //        'w': w.width()
                //    };
                //}, function (newValue, oldValue) {
                //    scope.windowHeight = newValue.h;
                //    scope.windowWidth = newValue.w;
                //
                //    scope.resizeWithOffset = function (offsetH) {
                //
                //        scope.$eval(attr.notifier);
                //
                //        return {
                //            'height': (newValue.h - offsetH) + 'px'
                //            //,'width': (newValue.w - 100) + 'px'
                //        };
                //    };
                //
                //}, true);
                console.log(element);
                element.on("resize", function () {
                    console.log("resized.- element On");
                });
                element.bind('resize', function () {
                    console.log('resize');
                    scope.$apply();
                });
                element.bind('click', function () {
                    console.log('resize');
                    scope.$apply();
                });
            }
        };
    }
])
    .directive('ngSize', ['$window', function($window) {
        return {
            scope: {
                size: '=ngSize'
            },
            link: function(scope, element, attrs) {
                var telem = angular.element(element);
                element.bind("resize",function(e){

                    console.log(" Window resized! ");
                    // Your relevant code here...

                })

                $('#calendar').bind('resize', function(){
                    console.log('resized');
                });

                //
                //$root.ngSizeDimensions  = (angular.isArray($root.ngSizeDimensions)) ? $root.ngSizeDimensions : [];
                //$root.ngSizeWatch       = (angular.isArray($root.ngSizeWatch)) ? $root.ngSizeWatch : [];
                //
                //var handler = function() {
                //    angular.forEach($root.ngSizeWatch, function(el, i) {
                //        console.log(el, i);
                //        // Dimensions Not Equal?
                //        if ($root.ngSizeDimensions[i][0] != el.offsetWidth || $root.ngSizeDimensions[i][1] != el.offsetHeight) {
                //            // Update Them
                //            $root.ngSizeDimensions[i] = [el.offsetWidth, el.offsetHeight];
                //            // Update Scope?
                //            $root.$broadcast('size::changed', i);
                //        }
                //    });
                //};
                //
                //// Add Element to Chain?
                //var exists = false;
                //angular.forEach($root.ngSizeWatch, function(el, i) { if (el === element[0]) exists = i });
                //
                //// Ok.
                //if (exists === false) {
                //    $root.ngSizeWatch.push(element[0]);
                //    $root.ngSizeDimensions.push([element[0].offsetWidth, element[0].offsetHeight]);
                //    exists = $root.ngSizeWatch.length-1;
                //}
                //
                //// Update Scope?
                //$scope.$on('size::changed', function(event, i) {
                //    // Relevant to the element attached to *this* directive
                //    if (i === exists) {
                //        $scope.size = {
                //            width: $root.ngSizeDimensions[i][0],
                //            height: $root.ngSizeDimensions[i][1]
                //        };
                //    }
                //});
                //
                //// Refresh: 100ms
                //if (!window.ngSizeHandler) window.ngSizeHandler = setInterval(handler, 100);
                //
                //// Window Resize?
                //// angular.element(window).on('resize', handler);

            }
        };
    }])
    .directive('testSize', yourDirectiveName);

    function yourDirectiveName($window) {

        var directive = {
            link: link,
            restrict: 'AE',
            scope: {
                data: '=',
                renderer: '='
            }
        };
        return directive;

        function link(scope, element, attributes) {

            var w = angular.element($window);

            // Created a function that can watch the
            // width of the window so we know when
            // boostrap divs will trigger resizing
            scope.getWindowWidth = function () {
                return w.width();
            }

            // Watch for the size of the window changing
            // then switch according to the bootstrap
            // boundaries listed below.
            scope.$watch(scope.getWindowWidth, function (newWidth, oldWidth) {
                if (newWidth != oldWidth) {

                    switch (true) {
                        // xs/ss boundary (My custom boundary)
                        case (newWidth < 600): // Resize every time
                        case (newWidth >= 600 && oldWidth < 600):
                        // ss/sm boundary
                        case (oldWidth >= 768 && newWidth < 768):
                        case (newWidth >= 768 && oldWidth < 768):
                        // sm/md boundary
                        case (oldWidth >= 992 && newWidth < 992):
                        case (newWidth >= 992 && oldWidth < 992):
                        // md/lg boundary
                        case (oldWidth >= 1200 && newWidth < 1200):
                        case (newWidth >= 1200 && oldWidth < 1200):
                            scope.renderChart(element[0], attributes.color);
                            break;
                        default:
                            break;
                    }
                }
            });

            // Capture the window event so we can capture
            // the bootstrap media query boundaries
            w.bind('resize', function () {
                scope.$apply();
            });

            // Watch for the data or chart type changing
            scope.$watchCollection('[data, renderer]', function (newValue, oldValue) {
                if (!newValue[0]) {
                    return;
                }

                scope.renderChart(element[0], attributes.color);
            });

            // Render the D3 chart through Rickshaw
            scope.renderChart = function (element, color) {
                element.innerHTML = '';

                var graph = new Rickshaw.Graph({
                    element: element,
                    series: [{data: scope.data, color: color}],
                    renderer: scope.renderer
                });

                graph.render();
            };
        }
    }

'use strict';

//Setting up route
angular.module('the-clean-cruds').config(['$stateProvider',
	function($stateProvider) {
		// The clean cruds state routing
		$stateProvider.
		state('listTheCleanCruds', {
			url: '/the-clean-cruds',
			templateUrl: 'modules/the-clean-cruds/views/list-the-clean-cruds.client.view.html'
		}).
		state('createTheCleanCrud', {
			url: '/the-clean-cruds/create',
			templateUrl: 'modules/the-clean-cruds/views/create-the-clean-crud.client.view.html'
		}).
		state('viewTheCleanCrud', {
			url: '/the-clean-cruds/:theCleanCrudId',
			templateUrl: 'modules/the-clean-cruds/views/view-the-clean-crud.client.view.html'
		}).
		state('editTheCleanCrud', {
			url: '/the-clean-cruds/:theCleanCrudId/edit',
			templateUrl: 'modules/the-clean-cruds/views/edit-the-clean-crud.client.view.html'
		});
	}
]);
'use strict';

// The clean cruds controller
angular.module('the-clean-cruds').controller('TheCleanCrudsController', ['$scope', '$stateParams', '$location', 'Authentication', 'TheCleanCruds',
	function($scope, $stateParams, $location, Authentication, TheCleanCruds) {
		$scope.authentication = Authentication;


		// Create new The clean crud
		$scope.create = function() {
			// Create new The clean crud object
			var theCleanCrud = new TheCleanCruds ({
				//name: this.name,
				orderDate:this.orderDate,
				deliberyDate: this.deliberyDate,
				Address: this.address,
				numOrder: this.numOrder,
				detailInfo: this.detailInfo
			});

			// Redirect after save
			theCleanCrud.$save(function(response) {
				$location.path('the-clean-cruds/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing The clean crud
		$scope.remove = function(theCleanCrud) {
			if ( theCleanCrud ) { 
				theCleanCrud.$remove();

				for (var i in $scope.theCleanCruds) {
					if ($scope.theCleanCruds [i] === theCleanCrud) {
						$scope.theCleanCruds.splice(i, 1);
					}
				}
			} else {
				$scope.theCleanCrud.$remove(function() {
					$location.path('the-clean-cruds');
				});
			}
		};

		// Update existing The clean crud
		$scope.update = function() {
			var theCleanCrud = $scope.theCleanCrud;

			theCleanCrud.$update(function() {
				$location.path('the-clean-cruds/' + theCleanCrud._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of The clean cruds
		$scope.find = function() {
			$scope.theCleanCruds = TheCleanCruds.query();
		};

		// Find existing The clean crud
		$scope.findOne = function() {
			$scope.theCleanCrud = TheCleanCruds.get({ 
				theCleanCrudId: $stateParams.theCleanCrudId
			});
		};
	}
]);

'use strict';

//The clean cruds service used to communicate The clean cruds REST endpoints
angular.module('the-clean-cruds').factory('TheCleanCruds', ['$resource',
	function($resource) {
		return $resource('the-clean-cruds/:theCleanCrudId', { theCleanCrudId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

//Setting up route
angular.module('the-clean').config(['$stateProvider','$mdIconProvider',
	function($stateProvider,$mdIconProvider) {
		// The clean state routing
		$stateProvider.
		state('tc-order', {
			url: '/tc-order',
			templateUrl: 'modules/the-clean/views/tc-order.client.view.html'
		}).
		state('the-clean', {
			url: '/the-clean',
			templateUrl: 'modules/the-clean/views/the-clean.client.view.html'
		});

		$mdIconProvider.icon('basket', 'modules/the-clean/svg/basket.svg');
		$mdIconProvider.icon('drum', 'modules/the-clean/svg/drum.svg');
	}
]);

'use strict';

angular.module('the-clean').controller('TcOrderController', ['$scope',
	function($scope) {
		// Tc order controller logic
		// ...
	}
]);
'use strict';

angular.module('the-clean').controller('TheCleanController', ['$scope','Authentication',
	function($scope, Authentication) {
		// The clean controller logic
		// ...
        $scope.authentication = Authentication;
        $scope.toppings = [
            { category: 'meat', name: 'Pepperoni' },
            { category: 'meat', name: 'Sausage' },
            { category: 'meat', name: 'Ground Beef' },
            { category: 'meat', name: 'Bacon' },
            { category: 'veg', name: 'Mushrooms' },
            { category: 'veg', name: 'Onion' },
            { category: 'veg', name: 'Green Pepper' },
            { category: 'veg', name: 'Green Olives' },
        ];

        $scope.tcOrder = true;
        $scope.tcStartPage = false;
        $scope.tcPrice = false;
        $scope.tcUserInfo = true;
        $scope.tcProgress = false;

        $scope.toggle = function(targetDirective) {
            return targetDirective = !targetDirective;
        }

        $scope.options = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 55
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.4f')(d);
                },
                transitionDuration: 500,
                xAxis: {axisLabel: 'Module(s)'},
                yAxis: {axisLabel: 'Complete(%)', axisLabelDistance: 30}
            }
        };

        $scope.data = [
            {
                key: "Cumulative Return",
                values: [
                    {"label" : "User Interface" , "value" : 22},
	                  {"label" : "Backend" , "value" : 5},
                    {"label" : "Start Page" , "value" : 5},
                    {"label" : "Icon Design" , "value" : 5},
                    {"label" : "Complete" , "value" : 100}
                ]
            }
        ]

//        //All code created by Blake Bowen
////Forked from: http://codepen.io/osublake/pen/RNLdpz/
//
//// GRID OPTIONS
//        var rowSize   = 100;
//        var colSize   = 100;
//        var gutter    = 7;     // Spacing between tiles
//        var numTiles  = 25;    // Number of tiles to initially populate the grid with
//        var fixedSize = false; // When true, each tile's colspan will be fixed to 1
//        var oneColumn = false; // When true, grid will only have 1 column and tiles have fixed colspan of 1
//        var threshold = "50%"; // This is amount of overlap between tiles needed to detect a collision
//
//        var $add  = $("#add");
//        var $list = $("#list");
//        var $mode = $("input[name='layout']");
//
//// Live node list of tiles
//        var tiles  = $list[0].getElementsByClassName("tile");
//        var label  = 1;
//        var zIndex = 1000;
//
//        var startWidth  = "100%";
//        var startSize   = colSize;
//        var singleWidth = colSize * 3;
//
//        var colCount   = null;
//        var rowCount   = null;
//        var gutterStep = null;
//
//        var shadow1 = "0 1px 3px  0 rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(0, 0, 0, 0.6)";
//        var shadow2 = "0 6px 10px 0 rgba(0, 0, 0, 0.3), 0 2px 2px 0 rgba(0, 0, 0, 0.2)";
//
//        $(window).resize(resize);
//        $add.click(createTile);
//        $mode.change(init);
//
//        init();
//
//// ========================================================================
////  INIT
//// ========================================================================
//        function init() {
//            var width = startWidth;
//
//            // This value is defined when this function
//            // is fired by a radio button change event
//            switch (this.value) {
//                case "mixed":
//                    fixedSize = false;
//                    oneColumn = false;
//                    colSize   = startSize;
//                    break;
//                case "fixed":
//                    fixedSize = true;
//                    oneColumn = false;
//                    colSize   = startSize;
//                    break;
//                case "column":
//                    fixedSize = false;
//                    oneColumn = true;
//                    width     = singleWidth;
//                    colSize   = singleWidth;
//                    break;
//            }
//
//            $(".tile").remove();
//
//            TweenLite.to($list, 0.2, { width: width });
//            TweenLite.delayedCall(0.25, populateBoard);
//
//            function populateBoard() {
//                label = 1;
//                resize();
//                for (var i = 0; i < numTiles; i++) {
//                    createTile();
//                }
//            }
//        }
//
//
//// ========================================================================
////  RESIZE
//// ========================================================================
//        function resize() {
//
//            colCount   = oneColumn ? 1 : Math.floor($list.outerWidth() / (colSize + gutter));
//            gutterStep = colCount == 1 ? gutter : (gutter * (colCount - 1) / colCount);
//            rowCount   = 0;
//
//            layoutInvalidated();
//        }
//
//
//// ========================================================================
////  CHANGE POSITION
//// ========================================================================
//        function changePosition(from, to, rowToUpdate) {
//
//            var $tiles = $(".tile");
//            var insert = from > to ? "insertBefore" : "insertAfter";
//
//            // Change DOM positions
//            $tiles.eq(from)[insert]($tiles.eq(to));
//
//            layoutInvalidated(rowToUpdate);
//        }
//
//// ========================================================================
////  CREATE TILE
//// ========================================================================
//        function createTile() {
//            var colspan = fixedSize || oneColumn ? 1 : Math.floor(Math.random() * 2) + 1;
//            var element = $("<div></div>").addClass("tile").html(label++);
//            var lastX   = 0;
//
//            Draggable.create(element, {
//                onDrag      : onDrag,
//                onClick     : onClick,
//                onPress     : onPress,
//                onRelease   : onRelease,
//                zIndexBoost : false
//            });
//
//            // NOTE: Leave rowspan set to 1 because this demo
//            // doesn't calculate different row heights
//            var tile = {
//                col        : null,
//                colspan    : colspan,
//                element    : element,
//                height     : 0,
//                inBounds   : true,
//                index      : null,
//                isDragging : false,
//                lastIndex  : null,
//                newTile    : true,
//                positioned : false,
//                row        : null,
//                rowspan    : 1,
//                width      : 0,
//                x          : 0,
//                y          : 0
//            };
//
//            // Add tile properties to our element for quick lookup
//            element[0].tile = tile;
//
//            $list.append(element);
//            layoutInvalidated();
//
//            function onClick(){
//                console.log(this.target);
//                //TweenMax.to(this.target, 0.5, {scale:4});
//                console.log('clicked');
//            }
//
//            function onPress() {
//
//                lastX = this.x;
//                tile.isDragging = true;
//                tile.lastIndex  = tile.index;
//
//                TweenLite.to(element, 0.2, {
//                    autoAlpha : 0.75,
//                    boxShadow : shadow2,
//                    scale     : 0.95,
//                    zIndex    : "+=1000"
//                });
//            }
//
//            function onDrag() {
//
//                // Move to end of list if not in bounds
//                if (!this.hitTest($list, 0)) {
//                    tile.inBounds = false;
//                    changePosition(tile.index, tiles.length - 1);
//                    return;
//                }
//
//                tile.inBounds = true;
//
//                for (var i = 0; i < tiles.length; i++) {
//
//                    // Row to update is used for a partial layout update
//                    // Shift left/right checks if the tile is being dragged
//                    // towards the the tile it is testing
//                    var testTile    = tiles[i].tile;
//                    var onSameRow   = (tile.row === testTile.row);
//                    var rowToUpdate = onSameRow ? tile.row : -1;
//                    var shiftLeft   = onSameRow ? (this.x < lastX && tile.index > i) : true;
//                    var shiftRight  = onSameRow ? (this.x > lastX && tile.index < i) : true;
//                    var validMove   = (testTile.positioned && (shiftLeft || shiftRight));
//
//                    if (this.hitTest(tiles[i], threshold) && validMove) {
//                        changePosition(tile.index, i, rowToUpdate);
//                        break;
//                    }
//                }
//
//                lastX = this.x;
//            }
//
//            function onRelease() {
//
//                // Move tile back to last position if released out of bounds
//                this.hitTest($list, 0)
//                    ? layoutInvalidated()
//                    : changePosition(tile.index, tile.lastIndex);
//
//                TweenLite.to(element, 0.2, {
//                    autoAlpha : 1,
//                    boxShadow: shadow1,
//                    scale     : 1,
//                    x         : tile.x,
//                    y         : tile.y,
//                    zIndex    : ++zIndex
//                });
//
//                tile.isDragging = false;
//            }
//        }
//
//// ========================================================================
////  LAYOUT INVALIDATED
//// ========================================================================
//        function layoutInvalidated(rowToUpdate) {
//
//            var timeline = new TimelineMax();
//            var partialLayout = (rowToUpdate > -1);
//
//            var height = 0;
//            var col    = 0;
//            var row    = 0;
//            var time   = 0.35;
//
//            $(".tile").each(function(index, element) {
//
//                var tile    = this.tile;
//                var oldRow  = tile.row;
//                var oldCol  = tile.col;
//                var newTile = tile.newTile;
//
//                // PARTIAL LAYOUT: This condition can only occur while a tile is being
//                // dragged. The purpose of this is to only swap positions within a row,
//                // which will prevent a tile from jumping to another row if a space
//                // is available. Without this, a large tile in column 0 may appear
//                // to be stuck if hit by a smaller tile, and if there is space in the
//                // row above for the smaller tile. When the user stops dragging the
//                // tile, a full layout update will happen, allowing tiles to move to
//                // available spaces in rows above them.
//                if (partialLayout) {
//                    row = tile.row;
//                    if (tile.row !== rowToUpdate) return;
//                }
//
//                // Update trackers when colCount is exceeded
//                if (col + tile.colspan > colCount) {
//                    col = 0; row++;
//                }
//
//                $.extend(tile, {
//                    col    : col,
//                    row    : row,
//                    index  : index,
//                    x      : col * gutterStep + (col * colSize),
//                    y      : row * gutterStep + (row * rowSize),
//                    width  : tile.colspan * colSize + ((tile.colspan - 1) * gutterStep),
//                    height : tile.rowspan * rowSize
//                });
//
//                col += tile.colspan;
//
//                // If the tile being dragged is in bounds, set a new
//                // last index in case it goes out of bounds
//                if (tile.isDragging && tile.inBounds) {
//                    tile.lastIndex = index;
//                }
//
//                if (newTile) {
//
//                    // Clear the new tile flag
//                    tile.newTile = false;
//
//                    var from = {
//                        autoAlpha : 0,
//                        boxShadow : shadow1,
//                        height    : tile.height,
//                        scale     : 0,
//                        width     : tile.width
//                    };
//
//                    var to = {
//                        autoAlpha : 1,
//                        scale     : 1,
//                        zIndex    : zIndex
//                    }
//
//                    timeline.fromTo(element, time, from, to, "reflow");
//                }
//
//                // Don't animate the tile that is being dragged and
//                // only animate the tiles that have changes
//                if (!tile.isDragging && (oldRow !== tile.row || oldCol !== tile.col)) {
//
//                    var duration = newTile ? 0 : time;
//
//                    // Boost the z-index for tiles that will travel over
//                    // another tile due to a row change
//                    if (oldRow !== tile.row) {
//                        timeline.set(element, { zIndex: ++zIndex }, "reflow");
//                    }
//
//                    timeline.to(element, duration, {
//                        x : tile.x,
//                        y : tile.y,
//                        onComplete : function() { tile.positioned = true; },
//                        onStart    : function() { tile.positioned = false; }
//                    }, "reflow");
//                }
//            });
//
//            // If the row count has changed, change the height of the container
//            if (row !== rowCount) {
//                rowCount = row;
//                height   = rowCount * gutterStep + (++row * rowSize);
//                timeline.to($list, 0.2, { height: height }, "reflow");
//            }
//        }

    }
]);

'use strict';

/**
 *  @ngdoc module
 *  @name pbshop.components.select
 */

/*
 [Process Step]

 Check Requirements
 Process payment
 */

/**************************************************************

 ### TODO ###
 **DOCUMENTATION AND DEMOS**

 -[ ] ng-modle with child mdOptions (basic)
 -[ ] ng-modle="foo" ng-model-options="{targetBy: ''}"

 **************************************************************/

angular.module('the-clean')

	.directive('tcOrder',OrderDirective)
	.directive('tcOrderHeader', OrderHeader)
	.directive('tcGetRequires', GetRequires)
	.provider('$tcOrder', SelectProvider);


function OrderDirective($tcOrder, $interpolate, $compile, $parse, $mdToast) {
	return {
		restrict: 'E',
        scope: {
            userInfo: '=userInfo'
        },
		templateUrl: 'modules/the-clean/directives/template/tc-order-ui-tpl.html',
		require: ['tcOrder'],
		compile: compile,
		controller: 'TheCleanCrudsController' //function(){}
	};

	function compile(element, attr){
		console.log(element);
		var labelEl=element.find('tc-order-label').remove();

		return function postLink(scope, element, attr, ctrls){

			scope.orderDate = moment()._d;
			scope.deliberyDate = moment()._d;
			scope.address = 'Not Yet';
			scope.numOrder = 1;
			scope.detailInfo = "빠른베송 부탁 드립니다.";
			scope.price = scope.numOrder * 900;

			scope.getTotal = function(){
				scope.price = scope.numOrder * 900;
			}

			var toastPosition = {
				bottom: true,
				top: false,
				left: false,
				right: true
			};
			var getToastPosition = function() {
				return Object.keys(toastPosition)
					.filter(function(pos) { return toastPosition[pos]; })
					.join(' ');
			};

			scope.createToast = function(){
				$mdToast.show({
					controller: function($scope, $mdToast) {
						$scope.closeToast = function() {
							$mdToast.hide();
						};
					},
					template: '<md-toast> <span flex>Submitted</span> <md-button ng-click="closeToast()">Close </md-button> </md-toast>',
					hideDelay: 6000,
					position: getToastPosition()
				});
			}
		}
	}

    function OrderDirectiveController($scope){
        console.log($scope.authentication);
    }
}

//SlideShow
function OrderHeader($mdTheming){
	return {
		restrict: 'E',
		link: function($scope, $element, $attr) {
			var progressBar = '<div id="progressBar"></div>';
			$element.append(progressBar);
			var images = $element.find('img');
			var tl = new TimelineMax({
				onReverseComplete:reverseRepeat,
				onReverseCompleteParams:['{self}'],
				onComplete:complete,
				onCompleteParams:['{self}']
			});
			function reverseRepeat(tl){
				tl.reverse(0);
			}
			function complete(tl){
				tl.restart();
				console.log('Complete');
			}

			function prepNext(timeline, slide){
				TweenMax.set(slide, {display:'none'});
			}
			var time = 3.2;
			var init = TweenMax.set(images, {display:"none"});
			var a1 = TweenMax.to(images[0], time,{autoAlpha:0, display:'block'});
			var a2 = TweenMax.to(images[1], time,{autoAlpha:0, display:'block'});
			var a3 = TweenMax.to(images[2], time,{autoAlpha:0, display:'block'});

			var slideTl1 = new TimelineMax({
				onComplete: prepNext,
				onCompleteParams: ["{self}", images[0]]
			});
			slideTl1
				.add(a1)
				.from($('#progressBar'), slideTl1.duration(), {scaleX:0, transformOrigin:"0px 0px", ease:Linear.easeNone}, 0);

			var slideTl2 = new TimelineMax({
				onComplete: prepNext,
				onCompleteParams: ["{self}", images[1]]
			});
			slideTl2
				.add(a2)
				.from($('#progressBar'), slideTl2.duration(), {scaleX:0, transformOrigin:"0px 0px", ease:Linear.easeNone}, 0);

			var slideTl3 = new TimelineMax({
				onComplete: prepNext,
				onCompleteParams: ["{self}", images[2]]
			});
			slideTl3
				.add(a3)
				.from($('#progressBar'), slideTl3.duration(), {scaleX:0, transformOrigin:"0px 0px", ease:Linear.easeNone}, 0);

			tl.set(images, {display:"none"}).add(slideTl1).add(slideTl2).add(slideTl3).play();
			$mdTheming($element);
		}
	};
}

function GetRequires($parse){
	return{
		restrict: 'E',
		require:['tcGetRequires', '?ngModel'],
		controller: GetRequiresController,
		link:{ pre: preLink }
	};

	function SelectMenuController($scope, $attrs, $element) {
		var self = this;
		self.isMultiple = angular.isDefined($attrs.multiple);
		// selected is an object with keys matching all of the selected options' hashed values
		self.selected = {};
		// options is an object with keys matching every option's hash value,
		// and values matching every option's controller.
		self.options = {};
	}

	function preLink(scope, element, attr, ctrls){
		var selectCtrl = ctrls[0];
		var ngModel = ctrls[1];

		element.on('click');
		element.on('keypress', keyListener);
		if (ngModel) selectCtrl.init(ngModel);
		configureAria();

		function configureAria() {
			element.attr({
				'id': 'select_menu_' + $mdUtil.nextUid(),
				'role': 'listbox',
				'aria-multiselectable': (selectCtrl.isMultiple ? 'true' : 'false')
			});
		}

		function keyListener(e) {
			if (e.keyCode == 13 || e.keyCode == 32) {
				clickListener(e);
			}
		}

		function clickListener(ev) {
			var option = $mdUtil.getClosest(ev.target, 'md-option');
			var optionCtrl = option && angular.element(option).data('$mdOptionController');
			if (!option || !optionCtrl) return;

			var optionHashKey = selectCtrl.hashGetter(optionCtrl.value);
			var isSelected = angular.isDefined(selectCtrl.selected[optionHashKey]);

			scope.$apply(function() {
				if (selectCtrl.isMultiple) {
					if (isSelected) {
						selectCtrl.deselect(optionHashKey);
					} else {
						selectCtrl.select(optionHashKey, optionCtrl.value);
					}
				} else {
					if (!isSelected) {
						selectCtrl.deselect( Object.keys(selectCtrl.selected)[0] );
						selectCtrl.select( optionHashKey, optionCtrl.value );
					}
				}
				selectCtrl.refreshViewValue();
			});
		}
	}
}

function SelectProvider($$interimElementProvider) {
	return $$interimElementProvider('$tcOrder')
		.setDefaults({
			methods: ['target'],
			options: selectDefaultOptions
		});

	/* @ngInject */
	function selectDefaultOptions($tcOrder, $mdConstant, $$rAF, $mdUtil, $mdTheming, $timeout) {
		return {
			parent: 'body',
			onShow: onShow,
			onRemove: onRemove,
			hasBackdrop: true,
			disableParentScroll: $mdUtil.floatingScrollbars(),
			themable: true
		};

		function onShow(scope, element, opts) {
			if (!opts.target) {
				throw new Error('$tcOrder.show() expected a target element in options.target but got ' +
				'"' + opts.target + '"!');
			}

			angular.extend(opts, {
				isRemoved: false,
				target: angular.element(opts.target), //make sure it's not a naked dom node
				parent: angular.element(opts.parent),
				selectEl: element.find('md-select-menu'),
				contentEl: element.find('md-content'),
				backdrop: opts.hasBackdrop && angular.element('<md-backdrop class="md-select-backdrop">')
			});

			configureAria();

			element.removeClass('md-leave');

			var optionNodes = opts.selectEl[0].getElementsByTagName('md-option');

			if (opts.loadingAsync && opts.loadingAsync.then) {
				opts.loadingAsync.then(function() {
					scope.$$loadingAsyncDone = true;
					// Give ourselves two frames for the progress loader to clear out.
					$$rAF(function() {
						$$rAF(function() {
							// Don't go forward if the select has been removed in this time...
							if (opts.isRemoved) return;
							animateSelect(scope, element, opts);
						});
					});
				});
			}

			if (opts.disableParentScroll) {
				opts.disableTarget = opts.parent.find('md-content');
				if (!opts.disableTarget.length) opts.disableTarget = opts.parent;
				opts.lastOverflow = opts.disableTarget.css('overflow');
				opts.disableTarget.css('overflow', 'hidden');
			}
			// Only activate click listeners after a short time to stop accidental double taps/clicks
			// from clicking the wrong item
			$timeout(activateInteraction, 75, false);

			if (opts.backdrop) {
				$mdTheming.inherit(opts.backdrop, opts.parent);
				opts.parent.append(opts.backdrop);
			}
			opts.parent.append(element);

			// Give the select a frame to 'initialize' in the DOM,
			// so we can read its height/width/position
			$$rAF(function() {
				$$rAF(function() {
					if (opts.isRemoved) return;
					animateSelect(scope, element, opts);
				});
			});

			return $mdUtil.transitionEndPromise(opts.selectEl, {timeout: 350});

			function configureAria() {
				opts.selectEl.attr('aria-labelledby', opts.target.attr('id'));
				opts.target.attr('aria-owns', opts.selectEl.attr('id'));
				opts.target.attr('aria-expanded', 'true');
			}

			function activateInteraction() {
				if (opts.isRemoved) return;
				var selectCtrl = opts.selectEl.controller('mdSelectMenu') || {};
				element.addClass('md-clickable');

				opts.backdrop && opts.backdrop.on('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					opts.restoreFocus = false;
					scope.$apply($tcOrder.cancel);
				});

				// Escape to close
				opts.selectEl.on('keydown', function(ev) {
					switch (ev.keyCode) {
						case $mdConstant.KEY_CODE.SPACE:
						case $mdConstant.KEY_CODE.ENTER:
							var option = $mdUtil.getClosest(ev.target, 'md-option');
							if (option) {
								opts.selectEl.triggerHandler({
									type: 'click',
									target: option
								});
								ev.preventDefault();
							}
							break;
						case $mdConstant.KEY_CODE.TAB:
						case $mdConstant.KEY_CODE.ESCAPE:
							ev.preventDefault();
							opts.restoreFocus = true;
							scope.$apply($tcOrder.cancel);
					}
				});

				// Cycling of options, and closing on enter
				opts.selectEl.on('keydown', function(ev) {
					switch (ev.keyCode) {
						case $mdConstant.KEY_CODE.UP_ARROW: return focusPrevOption();
						case $mdConstant.KEY_CODE.DOWN_ARROW: return focusNextOption();
					}
				});

				function focusOption(direction) {
					var optionsArray = nodesToArray(optionNodes);
					var index = optionsArray.indexOf(opts.focusedNode);
					if (index === -1) {
						// We lost the previously focused element, reset to first option
						index = 0;
					} else if (direction === 'next' && index < optionsArray.length - 1) {
						index++;
					} else if (direction === 'prev' && index > 0) {
						index--;
					}
					var newOption = opts.focusedNode = optionsArray[index];
					newOption && newOption.focus();
				}
				function focusNextOption() {
					focusOption('next');
				}
				function focusPrevOption() {
					focusOption('prev');
				}

				if (!selectCtrl.isMultiple) {
					opts.selectEl.on('click', closeMenu);
					opts.selectEl.on('keydown', function(e) {
						if (e.keyCode == 32 || e.keyCode == 13) {
							closeMenu();
						}
					});
				}
				function closeMenu() {
					opts.restoreFocus = true;
					scope.$evalAsync(function() {
						$tcOrder.hide(selectCtrl.ngModel.$viewValue);
					});
				}
			}
		}

		function onRemove(scope, element, opts) {
			opts.isRemoved = true;
			element.addClass('md-leave')
				.removeClass('md-clickable');
			opts.target.attr('aria-expanded', 'false');

			if (opts.disableParentScroll && $mdUtil.floatingScrollbars()) {
				opts.disableTarget.css('overflow', opts.lastOverflow);
				delete opts.lastOverflow;
				delete opts.disableTarget;
			}

			var mdSelect = opts.selectEl.controller('mdSelect');
			if (mdSelect) {
				mdSelect.setLabelText(opts.selectEl.controller('mdSelectMenu').selectedLabels());
			}

			return $mdUtil.transitionEndPromise(element, { timeout: 350 }).then(function() {
				element.removeClass('md-active');
				opts.parent[0].removeChild(element[0]); // use browser to avoid $destroy event
				opts.backdrop && opts.backdrop.remove();
				if (opts.restoreFocus) opts.target.focus();
			});
		}

		function animateSelect(scope, element, opts) {
			var containerNode = element[0],
				targetNode = opts.target[0],
				parentNode = opts.parent[0],
				selectNode = opts.selectEl[0],
				contentNode = opts.contentEl[0],
				parentRect = parentNode.getBoundingClientRect(),
				targetRect = $mdUtil.clientRect(targetNode, parentNode),
				shouldOpenAroundTarget = false,
				bounds = {
					left: parentNode.scrollLeft + SELECT_EDGE_MARGIN,
					top: parentNode.scrollTop + SELECT_EDGE_MARGIN,
					bottom: parentRect.height + parentNode.scrollTop - SELECT_EDGE_MARGIN,
					right: parentRect.width - SELECT_EDGE_MARGIN
				},
				spaceAvailable = {
					top: targetRect.top - bounds.top,
					left: targetRect.left - bounds.left,
					right: bounds.right - (targetRect.left + targetRect.width),
					bottom: bounds.bottom - (targetRect.top + targetRect.height)
				},
				maxWidth = parentRect.width - SELECT_EDGE_MARGIN * 2,
				isScrollable = contentNode.scrollHeight > contentNode.offsetHeight,
				selectedNode = selectNode.querySelector('md-option[selected]'),
				optionNodes = selectNode.getElementsByTagName('md-option'),
				optgroupNodes = selectNode.getElementsByTagName('md-optgroup');


			var centeredNode;
			// If a selected node, center around that
			if (selectedNode) {
				centeredNode = selectedNode;
				// If there are option groups, center around the first option group
			} else if (optgroupNodes.length) {
				centeredNode = optgroupNodes[0];
				// Otherwise, center around the first optionNode
			} else if (optionNodes.length){
				centeredNode = optionNodes[0];
				// In case there are no options, center on whatever's in there... (eg progress indicator)
			} else {
				centeredNode = contentNode.firstElementChild || contentNode;
			}

			if (contentNode.offsetWidth > maxWidth) {
				contentNode.style['max-width'] = maxWidth + 'px';
			}
			if (shouldOpenAroundTarget) {
				contentNode.style['min-width'] = targetRect.width + 'px';
			}

			// Remove padding before we compute the position of the menu
			if (isScrollable) {
				selectNode.classList.add('md-overflow');
			}

			// Get the selectMenuRect *after* max-width is possibly set above
			var selectMenuRect = selectNode.getBoundingClientRect();
			var centeredRect = getOffsetRect(centeredNode);

			if (centeredNode) {
				var centeredStyle = window.getComputedStyle(centeredNode);
				centeredRect.paddingLeft = parseInt(centeredStyle.paddingLeft, 10) || 0;
				centeredRect.paddingRight = parseInt(centeredStyle.paddingRight, 10) || 0;
			}

			var focusedNode = centeredNode;
			if ((focusedNode.tagName || '').toUpperCase() === 'MD-OPTGROUP') {
				focusedNode = optionNodes[0] || contentNode.firstElementChild || contentNode;
			}
			if (focusedNode) {
				opts.focusedNode = focusedNode;
				focusedNode.focus();
			}

			if (isScrollable) {
				var scrollBuffer = contentNode.offsetHeight / 2;
				contentNode.scrollTop = centeredRect.top + centeredRect.height / 2 - scrollBuffer;

				if (spaceAvailable.top < scrollBuffer) {
					contentNode.scrollTop = Math.min(
						centeredRect.top,
						contentNode.scrollTop + scrollBuffer - spaceAvailable.top
					);
				} else if (spaceAvailable.bottom < scrollBuffer) {
					contentNode.scrollTop = Math.max(
						centeredRect.top + centeredRect.height - selectMenuRect.height,
						contentNode.scrollTop - scrollBuffer + spaceAvailable.bottom
					);
				}
			}

			var left, top, transformOrigin;
			if (shouldOpenAroundTarget) {
				left = targetRect.left;
				top = targetRect.top + targetRect.height;
				transformOrigin = '50% 0';
				if (top + selectMenuRect.height > bounds.bottom) {
					top = targetRect.top - selectMenuRect.height;
					transformOrigin = '50% 100%';
				}
			} else {
				left = targetRect.left + centeredRect.left - centeredRect.paddingLeft;
				top = targetRect.top + targetRect.height / 2 - centeredRect.height / 2 -
				centeredRect.top + contentNode.scrollTop;

				transformOrigin = (centeredRect.left + targetRect.width / 2) + 'px ' +
				(centeredRect.top + centeredRect.height / 2 - contentNode.scrollTop) + 'px 0px';

				containerNode.style.minWidth = targetRect.width + centeredRect.paddingLeft +
				centeredRect.paddingRight + 'px';
			}

			// Keep left and top within the window
			var containerRect = containerNode.getBoundingClientRect();
			containerNode.style.left = clamp(bounds.left, left, bounds.right - containerRect.width) + 'px';
			containerNode.style.top = clamp(bounds.top, top, bounds.bottom - containerRect.height) + 'px';
			selectNode.style[$mdConstant.CSS.TRANSFORM_ORIGIN] = transformOrigin;

			selectNode.style[$mdConstant.CSS.TRANSFORM] = 'scale(' +
			Math.min(targetRect.width / selectMenuRect.width, 1.0) + ',' +
			Math.min(targetRect.height / selectMenuRect.height, 1.0) +
			')';

			$$rAF(function() {
				element.addClass('md-active');
				selectNode.style[$mdConstant.CSS.TRANSFORM] = '';
			});
		}

	}

	function clamp(min, n, max) {
		return Math.min(max, Math.max(n, min));
	}

	function getOffsetRect(node) {
		return node ? {
			left: node.offsetLeft,
			top: node.offsetTop,
			width: node.offsetWidth,
			height: node.offsetHeight
		} : { left: 0, top: 0, width: 0, height: 0 };
	}
}

'use strict';

// Tinymce module config
angular.module('tinymce').run(['Menus',
	function(Menus) {
		// Config logic
		// ...
	}
]).value('uiTinymceConfig', {
        plugins: "image, link, fullscreen, code, table, contextmenu, media",
        contextmenu: "link media image inserttable | cell row column deletetable",
        image_advtab: true,
        image_class_list: [
            {title: 'Responsive Size', value: 'img-responsive'}

        ],
        fullscreen_new_window : true,
        fullscreen_settings : {
            theme_advanced_path_location : "top"
        }
    });

'use strict';

angular.module('tinymce').directive('uiTinymce', ['uiTinymceConfig', function(uiTinymceConfig) {
    uiTinymceConfig = uiTinymceConfig || {};
    var generatedIds = 0;
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ngModel) {
            var expression, options, tinyInstance;
            // generate an ID if not present
            if (!attrs.id) {
                attrs.$set('id', 'uiTinymce' + generatedIds++);
            }
            options = {
                // Update model when calling setContent (such as from the source editor popup)
                setup: function(ed) {
                    ed.on('init', function(args) {
                        ngModel.$render();
                    });
                    // Update model on button click
                    ed.on('ExecCommand', function(e) {
                        ed.save();
                        ngModel.$setViewValue(elm.val());
                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                    });
                    // Update model on keypress
                    ed.on('KeyUp', function(e) {
                        console.log(ed.isDirty());
                        ed.save();
                        ngModel.$setViewValue(elm.val());
                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                    });
                },
                mode: 'exact',
                elements: attrs.id
            };
            if (attrs.uiTinymce) {
                expression = scope.$eval(attrs.uiTinymce);
            } else {
                expression = {};
            }
            angular.extend(options, uiTinymceConfig, expression);
            setTimeout(function() {
                tinymce.init(options);
            });


            ngModel.$render = function() {
                if (!tinyInstance) {
                    tinyInstance = tinymce.get(attrs.id);
                }
                if (tinyInstance) {
                    tinyInstance.setContent(ngModel.$viewValue || '');
                }
            };
        }
    };
}]);

'use strict';

//Setting up route
angular.module('user-interface').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.
		state('mcmu', {
			url: '/mcmu',
			templateUrl: 'modules/user-interface/views/mcmu.client.view.html'
		}).
		state('front-1', {
			url: '/front-1',
			templateUrl: 'modules/user-interface/views/front-1.client.view.html'
		}).
		state('experimental-interface', {
			url: '/experimental-interface',
			templateUrl: 'modules/user-interface/views/experimental-interface.client.view.html'
		}).
		state('listing-product', {
			url: '/urimium',
			templateUrl: 'modules/user-interface/views/listing-product.client.view.html'
		})
		.state('detail-product', {
			url: '/detail-product/:productId',
			templateUrl: 'modules/user-interface/views/detail-product.client.view.html'
		});
	}
]);

'use strict';

angular.module('user-interface').controller('DetailProductController', ['$scope','$stateParams','$sce','Products', 'GetPurchaseJWT','Payments','configGdrive',
	function($scope, $stateParams, $sce, Products, GetPurchaseJWT, Payments, configGdrive) {
		var productId=$stateParams.productId;
		$scope.quantity = 1;

		var tabs = [
			{ title: '반품/배송/교환 문의', content: 'No Contents'},
			{ title: '상세 상품설명', content: ''},
			{ title: '상품분석평/상품문의', content: "No Contents"},
		];

		// Find a Product
		$scope.findOne = function() {
			Products.get({
				productId: productId
			}).$promise.then(
				function(value){
					$scope.product = value;
					tabs[1].content =  $sce.trustAsHtml(value.detailDesc);
				}
			);
		};

		// Tabs Start -----------------------------------------------


		$scope.tabs = tabs;
		$scope.selectedIndex = 1;

		$scope.announceSelected = announceSelected;
		$scope.announceDeselected = announceDeselected;

		$scope.addTab = function (title, view) {
			view = view || title + " Content View";
			tabs.push({ title: title, content: view, disabled: false, style:style});
		};

		$scope.removeTab = function (tab) {
			for (var j = 0; j < tabs.length; j++) {
				if (tab.title == tabs[j].title) {
					$scope.tabs.splice(j, 1);
					break;
				}
			}
		};

		function announceDeselected(tab) {
			$scope.farewell = 'Goodbye ' + tab.title + '!';
		}

		function announceSelected(tab) {
			$scope.greeting = 'Hello ' + tab.title + '!';
		}
		// Tabs End -----------------------------------------------

		$scope.from_one = {
			from_one :'bold data in controller in from_one.js'
		}

		var accessToken;

		$scope.authenticateWithGoogle =function authenticateWithGoogle(){

			window.gapi.auth.authorize({
				'client_id': configGdrive.clientId,
				'scope':configGdrive.scopes,
				'immediate': false
			}, handleAuthentication);
		}

		function buttonReady(params) {
			if (params.status == "SUCCESS") {
				if (document.readyState === "interactive" || document.readyState == "complete" || document.readyState == "loaded") {
					document.getElementById("wallet-button-holder")
						.appendChild(params.walletButtonElement);
				} else {
					document.addEventListener("DOMContentLoaded", function() {
						document.getElementById("wallet-button-holder")
							.appendChild(params.walletButtonElement);
					});
				}
			}
		}

		var createWalletButtonSuccessCallback = function(param) {
			wallet.transactionId = param.response.response.googleTransactionId;

			console.log('Masked Wallet Response:' + JSON.stringify(param.response));
			/*
			$.mobile.changePage('#confirmation-page', {
				transition: 'slide'
			}
			*/
		}

		var createWalletButtonFailureCallback = function(error) {

			// log error message
			console.log('There was an error getting the Masked Wallet: ' +
			JSON.stringify(error));
		}

		function handleAuthentication(result){
			var test2 = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJHb29nbGUiLCJyZXF1ZXN0Ijp7ImN1cnJlbmN5Q29kZSI6IlVTRCIsInByaWNlIjoxMiwibmFtZSI6IkxhbTEyIiwic2VsbGVyRGF0YSI6IjU0MmNmM2NkMDZkZDA3NTAxNjRhZDZmOSIsImRlc2NyaXB0aW9uIjoi7KO866y47IiY65-JOiAx6rCcIn0sInJlc3BvbnNlIjp7Im9yZGVySWQiOiJHV0RHX1MuNjJlY2ExNWItMjUwMS00MzEyLTg4NTgtMzE3YWNkNDk0ZjVjIn0sInR5cCI6Imdvb2dsZS9wYXltZW50cy9pbmFwcC9pdGVtL3YxL3Bvc3RiYWNrL2J1eSIsImF1ZCI6IjA4MjQzMzYyMDA3MTc0NzAwNDY2IiwiaWF0IjoxNDE1ODU1NTQ2LCJleHAiOjE0MTU4NTU1NjZ9.C9vt9cNEAvtrpfw5hqQaqJYa1Mqva8jvINWqQMy0NwM'
			console.log(configGdrive.clientId);
			google.wallet.online.authorize({
				"clientId" : configGdrive.clientId,
				"callback" : function(result){
					console.log(result);
					google.wallet.online.createWalletButton({
						"jwt" : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIwODI0MzM2MjAwNzE3NDcwMDQ2NiIsImF1ZCI6Ikdvb2dsZSIsInR5cCI6Imdvb2dsZS93YWxsZXQvb25saW5lL21hc2tlZC92Mi9yZXF1ZXN0IiwiaWF0IjoxNDE1ODU5MTYzLCJleHAiOjE2NzI0NjY0MDAwMDAsInJlcXVlc3QiOnsiY2xpZW50SWQiOiI1NzQ1NjM1Mzk0ODgtbjB2cmV2Z2pwMzYwNmwyMGhmazRycWZrMWRjOGozcWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJtZXJjaGFudE5hbWUiOiJwYlNob3AiLCJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAvIiwicGhvbmVOdW1iZXJSZXF1aXJlZCI6dHJ1ZSwicGF5Ijp7ImVzdGltYXRlZFRvdGFsUHJpY2UiOiIxNS4wMSIsImN1cnJlbmN5Q29kZSI6IlVTRCJ9LCJzaGlwIjp7fX19.ayFuAfhYnlzBWNlJxbuwHT2o-4k01tZ2x41c9_fzeJk',
						"success" : createWalletButtonSuccessCallback,
						"failure" : createWalletButtonFailureCallback,
						"ready" : buttonReady,
						"height": "44",
						"width": "230"
					});
				}
			});
			/*
			if(result && !result.error){
				$scope.isAuth = true;
				$scope.authName = 'Deauthorize';
				accessToken = result.access_token;

			}else{
				console.log(result);
				console.log(result.error);
				console.log('fail to authentication')
			}
			$scope.$digest();
			*/
		}

		$scope.testPurchaseProduct = function(){
			google.wallet.online.setAccessToken(
				"[accessToken]");
		};

		$scope.purchaseProduct = function(productID, quantity){
			console.log(productID);
			console.log(quantity);
			var optdesc= '주문수량: '+ quantity+'개';
			GetPurchaseJWT.query({productID: productID, qty: quantity, optdesc: optdesc}).$promise
				.then(function (response){
					google.payments.inapp.buy({
						parameters: {},
						jwt: response[0],
						success: function(result) {
							//window.alert('success: '+ result);
							//console.log(result.request);
							//console.log(result.response);
							console.log(result.jwt);
							// Insert Payment History
							createPaymentHistory(result);
						},
						failure: function() {
							window.alert('Your Payment transaction is failed')
						}
					})
				});
		};

		var createPaymentHistory = function (result) {
			// Create new Payment object
			var payment = new Payments({
				name: result.request.name,
				price: Number(result.request.price),
				sellerData: result.request.sellerData,
				description: result.request.description,
				currencyCode: result.request.currencyCode,
				orderID: result.response.orderId
			});
			// Redirect after save
			payment.$save(function (response) {
				//$location.path('payments/' + response._id);
				// Clear form fields
				//$scope.name = '';
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);

'use strict';

angular.module('user-interface').controller('ExperimentalinterfaceController', ['$scope',
	function($scope) {

	}
]);

'use strict';
angular.module('user-interface').controller('Front1Controller', ['$scope','$log',
	function($scope, $log) {
		$scope.id = 'frint-1';
		$scope.tests = [];

		for(var index=0; index < 4; index++){
			$scope.tests.push(index);
		}

		$scope.title = '의리미엄으로 가보자';
		$scope.clickProduct = function(index){
			console.log(index);
		};

		var boxGraphic = Snap('.boxSvg');
		var headBox = boxGraphic.select('#box-lead');
		var upperBox = boxGraphic.select('#box-lead-target');
		var open = 0;
		var closedBox;

		var headBoxOpenPath = headBox.attr("d");
		var headBoxClosedPath = boxGraphic.select('#box-lead-target').attr("d");
		headBox.click(openCloseBox);

		var openCloseBox = function(){
			var path,
				ease;
			if (closedBox) {
				path = headBoxOpenPath;
				ease = mina.easein;
				closedBox = 0;
				console.log('open Box');
			} else {
				path = headBoxClosedPath;
				ease = mina.bounce;
				closedBox = 1;
				console.log('close box');
			}
			headBox.stop().animate({d: path}, 1000, ease);
		};
		openCloseBox();

		upperBox.click(function () {
			console.log('upperBox')
		});

		var menuSvg = Snap('#menu1');
		menuSvg.attr({opacity:0.2, fill:'#FFFFFF'})
		var menuSvg2 = Snap('#menu2');
		var menuSvg3 = Snap('#menu3');

		var circle1 = menuSvg.circle(60,60,60);
		var circle2 = menuSvg2.circle(60,60,60);
		var circle3 = menuSvg3.circle(60,60,60);
		var text1 = menuSvg.text(55, 60, "D");
		text1.attr({fill:'#FFFFFF'});

		var circleNText = menuSvg.group(circle1, text1);
		circleNText.drag();







		/////////////////////////////////////////////////
		//http://codepen.io/sdras/pen/RNWaMX
		TweenMax.ticker.fps(60);
		var box = $('.boxSvg');
		$(document).ready(master)
		function master() {
			var takeOne = new TimelineLite();
			takeOne.to(box, 2, {scale:0.5, ease:Expo.easeOut})
				.to(box, 3, {scale:0.8, y:-120, ease:Expo.easeOut})
				.to(box, 3, {rotation:180, transformOrigin:"50% 50%", ease:Expo.easeOut, onComplete:openCloseBox})
		}

		var data = Snap.path.toCubic($('.boxSvg2 path').attr('d')),
			dataLength = data.length,
			points = [], //holds our series of x/y values for anchors and control points,
			pointsString = data.toString();

// convert cubic data to GSAP bezier
		for (var i = 0; i < dataLength; i++) {
			var seg = data[i];
			if (seg[0] === "M") { // move (starts the path)
				var point = {};
				point.x = seg[1];
				point.y = seg[2];
				points.push(point);
			} else { // seg[0] === "C" (Snap.path.toCubic should return only curves after first point)
				for (var j = 1; j < 6; j+=2) {
					var point = {};
					point.x = seg[j];
					point.y = seg[j+1];
					points.push(point);
				}
			}
		}

//make the tween
		var tween = TweenMax.to("#circleTarget", 3, {bezier:{type:"cubic", values:points}, force3D:true, ease:Power0.easeNone});



		/*
		var $text = $("p.lg"), $text2 = $("p.lg2"), $text3 = $("p.lg3"), $text4 = $("p.lg4"), $text5 = $("p.lg5"),
			$head = $(".head"),
			$neck = $(".neck"),
			$torso = $(".torso"),
			$person = $(".person"),
			$landscape = $(".landscape"),
			$inside = $(".inside"),
			$reg = $(".reg"),
			$circle = $(".inside circle"),
			$tiny = $(".tiny"),
			$starfield = $(".starfield"),
			$stars = $(".stars"),
			$starpoly = $(".star-poly"),
			$cons = $(".cons"),
			$cons2 = $(".cons2"),
			$flare = $(".flare");

		TweenMax.set("p, .cons, .cons2", {perspective:400});
		TweenMax.set("p, .landscape, .starfield,  .contour2, .inside, .turn, .around, .cons, .cons2", {visibility:"visible"});

// when you're feeling low
		function sceneOne() {
			var tl = new TimelineLite();

			tl
				.to($person, 3, {rotation:-5, transformOrigin:"80% 50%", y:-10,  ease:Circ.easeOut})
				.to($head, 3, {rotation:-10, transformOrigin:"0% 100%", y:10, ease:Back.easeOut}, "-=3")
				.to($neck, 3, {rotation:-10, transformOrigin:"0% 100%", y:10, ease:Back.easeOut}, "-=3");

			return tl;
		}

// you might be focused on the wrong thing
		function sceneTwo() {
			var tl = new TimelineLite();



			tl
				.add("scaleIn")
				.to($person, 2, {scale:3, x:-60, ease:Circ.easeOut}, "scaleIn")
				.to($landscape, 2, {scale:2.5, y:-100, x:-170, ease:Circ.easeOut}, "scaleIn");

			return tl;
		}

// you might be too zoomed in
		function sceneThree() {
			var tl = new TimelineLite();



			tl
				.add("insular-=4");
			tl.to($landscape, 2, {scale:20, transformOrigin:"50% 50%", force3D:true, ease:Power2.easeIn}, "insular+=1")
				.to($person, 3, {scale:5, x:-100, y:200, force3D:true, ease:Power2.easeIn}, "insular-=0.5")
				.fromTo($inside, 3, {scale:0, force3D:true, ease:Power2.easeIn}, {scale:3, x:400, force3D:true, transformOrigin:"50% 50%", ease:Power2.easeIn}, "insular")
				.staggerFrom($reg, 4.25, {autoAlpha:0, rotation:90, force3D:true, transformOrigin:"50% 50%", ease:Bounce.easeOut}, 0.1, "-=2.25")
				.from($tiny, 3.5, {opacity:0, scale:0, transformOrigin:"50% 50%", ease:Elastic.easeOut}, "-=3.5")
				.add("inner")
				.to($tiny, 3, {opacity:0, scale:0, rotation:180, transformOrigin:"50% 50%", ease:Elastic.easeOut}, "inner")
				.staggerTo($reg, 4, {autoAlpha:0, rotation:200, transformOrigin:"50% 50%", ease:Power4.easeOut}, 0.1, "inner")
				.to($inside, 2, {scale:0, opacity:0, ease:Power2.easeIn}, "inner+=2")
				.to($landscape, 3, {scale:1.5, y:0, transformOrigin:"50% 50%", force3D:true, ease:Expo.easeOut}, "inner+=3")
				.to($person, 3, {scale:1.5, y:0, transformOrigin:"50% 50%", force3D:true, ease:Expo.easeOut}, "inner+=4");


			return tl;
		}

// you're looking through the wrong end of the telescope
		function sceneFour() {
			var tl = new TimelineLite();


			tl
				.add("person-=1")
				.to($head, 3, {rotation:5, transformOrigin:"0% 100%", y:-10, ease:Power2.easeOut}, "person")
				.to($neck, 3, {rotation:5, transformOrigin:"0% 100%", y:-10, ease:Power2.easeOut}, "person")
				.to($torso, 3, {rotation:5, transformOrigin:"0% 100%", y:-10, ease:Power2.easeOut}, "person")
				.to($person, 2, {rotation:60, transformOrigin:"50% 50%", y:-10, ease:Power2.easeOut})
				.add("atmosphere-=1")
				.to($landscape, 3, {scale:0.4, opacity:0, transformOrigin:"50% 50%", y:35, force3D:true, ease:Power4.easeOut}, "atmosphere-=1")
				.to($person, 2, {scale:3, transformOrigin:"50% 50%", x:-800, y:600, force3D:true, ease:Power4.easeOut}, "atmosphere")
				.from(".around", 1, {opacity:0, scale:0, transformOrigin:"50% 50%", ease:Power4.easeOut}, "atmosphere");

			return tl;
		}

// the turn it around scene
		function sceneFive() {
			var tl = new TimelineLite();


			tl.from(".turn", 0.5, {autoAlpha:0, ease:Elastic.easeOut})
				.from($starfield, 1, {rotation:10, opacity:0, scale:2, ease:Back.easeOut}, 0.1)
				.from($starpoly, 1, {y:-200, x:100, scale:1.2, ease:Back.easeOut}, 0.1)
			return tl;
		}

// spacedance
		function sceneSix() {
			var tl = new TimelineLite();

			tl.add("sixbegin")
				.fromTo($cons, 2, {rotation:60, scale:0.2, opacity:0, transformOrigin:"0% 100%", x:-200, ease:Power4.easeOut}, {rotation:0, scale:1, opacity:0.7, transformOrigin:"50%", x:500, ease:Power4.easeOut})
				.to($cons, 3, {rotation:-100, scaleX:0.4, z:-300, opacity:0.5, transformOrigin:"50%", x:-20, ease:Back.easeOut}, "+=1")
				.fromTo($cons2, 2, {rotation:-60, scale:0.2, opacity:0, transformOrigin:"0% 100%", x:900, y:-200, ease:Power4.easeOut}, {rotation:0, scale:1, opacity:0.7, transformOrigin:"50%", x:200, ease:Power4.easeOut})
				.to($cons, 4, {rotation:200, y:-150, scaleY:0.2, z:100, opacity:0.3, transformOrigin:"50%", ease:Back.easeOut}, "-=2")
				.to($cons2, 4, {rotation:-80, y:-300, scaleX:0.2, z:100, opacity:0.3, transformOrigin:"50%", ease:Back.easeOut}, "-=2")
				.to($cons2, 1, {opacity:0.4, scaleX:0.25, ease:Expo.easeIn})
				.to($cons2, 5, {scale:0.25, x:600, y:-20, opacity: 0.2, ease:Back.easeOut}, "-=2")

				.staggerFromTo(".cons polygon", 0.8, {opacity:1, ease:Back.easeOut}, {opacity:0.5, repeat:10, scaleX:0.7, transformOrigin:"50%", ease:Back.easeOut}, 0.4, "sixbegin")
				.staggerFromTo(".cons2 polygon", 0.8, {opacity:1, ease:Back.easeOut}, {opacity:0.5, repeat:10, scaleX:0.7, transformOrigin:"50%", ease:Back.easeOut}, 0.4, "sixbegin")

				.staggerTo(".liney", 20, {opacity:0.5, scale:1.4, x:200, y:100, transformOrigin:"50%", ease:Back.easeOut}, 0.4, "sixbegin")

				.to($flare, 15, {scale:0.3, y:100, transformOrigin:"50%", ease:Back.easeOut}, "sixbegin")

				.staggerFromTo($stars, 1, {rotation:10, opacity:1, scale:0.5, ease:Back.easeOut}, {rotation:20, opacity:0, scale:0.85, repeat:-1, ease:Back.easeOut}, 0.1, "sixbegin");

			return tl;
		}



		var master = new TimelineLite();
		$(document).ready(master)
		master.add(sceneOne(), "scene1")
			.add(sceneTwo(), "scene2")
			.add(sceneThree(), "scene3")
			.add(sceneFour(), "scene4")
			.add(sceneFive(), "scene5")
			.add(sceneSix(), "scene6");
		*/

	}

]);

'use strict';

angular.module('user-interface').controller('ListingProductController', ['$scope', '$log',
	function($scope, $log) {

        //product has been removed

        
		$scope.find = function() {
			$scope.products = Products.query()
			$scope.products.$promise.then(function (result) {
				$scope.partitioned = partition(result, 3);
			});
		};

		$scope.testColumnSystem = function(numberOfColumn){
			$scope.partitioned = partition($scope.products, numberOfColumn);
		}

		$scope.listItemClick = function($index) {
			var clickedItem = $scope.items[$index];
			$mdBottomSheet.hide(clickedItem);
		};

		/*
		$scope.purchaseProduct = function (productID) {
			GetPurchaseJWT.query({ productID: productID }).$promise.then(function (response) {
				console.log(response[0]);
				google.payments.inapp.buy({
					parameters: {},
					jwt: response[0],
					success: function () {
						window.alert('success');
					},
					failure: function () {
						window.alert('failure');
					}
				});
			});
		};
		*/

		function partition(input, size) {
			var newArr = [];
			for (var i=0; i<input.length; i+=size) {
				newArr.push(input.slice(i, i+size));
			}
			return newArr;
		};

	}
]);

'use strict';

angular.module('user-interface').controller('McmuController', ['$scope', '$timeout',
	function($scope, $timeout) {

		var svgMVMU = Snap('#faceSvg');
		Snap.load("modules/user-interface/img/mcmu/mcmu.svg", function(data){
			svgMVMU.append(data);

			var lylics_small = $('#song_small');
			var lylics_ah = $('#song_ah');
			var lylics_hak = $('#song_hak');
			var lylics_haak = $('#song_haak');

			var master = function(){
				var mcmu = $('#faceSvg svg');
				var eyeBro = $('#eyebro path');
				var mouth1 = $('#mouth1');
				var mouth2 = $('#mouth2');
				var leftBro = eyeBro[0];
				var rightBro = eyeBro[2];
				var audio = document.getElementById("audioTag");

				//audio.stop();
				console.log(leftBro);
				console.log(rightBro);


				var closeMouth = $('#mouth1');
				var openMouth = $('#mouth2');

				var mouth_timeLine = new TimelineMax({repeat:3})
				mouth_timeLine.set(closeMouth, {opacity:0})
					.to(openMouth, 0.5,{opacity:1})
					.set(openMouth, {opacity:0})
					.set(closeMouth, {opacity:1});

				var screamSmell = new TimelineMax();
				screamSmell.from(lylics_small, 0.5, {scale:0.5, autoAlpha:0,  ease:Back.easeOut})
					.to(lylics_small, 0.1, {scale:0.5, autoAlpha:1, ease:Back.easeOut})
					.set(lylics_small,{autoAlpha:0});

				var screamAh = new TimelineMax({repeat:8});
				screamAh
					.add(mouth_timeLine)
					.from(lylics_ah, 0.5, {scale:0.5, autoAlpha:0, ease:Back.easeOut})//1
					.to(lylics_ah, 0.5, {scale:1, autoAlpha:1, ease:Back.easeOut})
					.from(lylics_ah, 0.1, {scale:0.5, autoAlpha:0, ease:Back.easeOut})//2
					.to(lylics_ah, 0.5, {scale:1, autoAlpha:1, ease:Back.easeOut})
					.from(lylics_ah, 0.5, {scale:0.5, autoAlpha:0, ease:Back.easeOut})//3
					.to(lylics_ah, 0.1, {scale:1, autoAlpha:1, ease:Back.easeOut})
					.from(lylics_ah, 0.5, {scale:0.5, autoAlpha:0, ease:Back.easeOut})//4
					.to(lylics_ah, 0.5, {scale:1, autoAlpha:1, ease:Back.easeOut})
					.from(lylics_ah, 0.5, {scale:0.5, autoAlpha:0, ease:Back.easeOut})//5
					.to(lylics_ah, 0.5, {scale:1, autoAlpha:1, ease:Back.easeOut})
					.set(lylics_ah,{scale:1, autoAlpha:0, ease:Back.easeOut});

				var screamhak = new TimelineMax();
					screamhak.from(lylics_hak, 1.5, {scale:0.5, autoAlpha:0, ease:Back.easeOut})
					.to(lylics_hak, 1.5, {scale:0.5, autoAlpha:0, ease:Back.easeOut})
					.from(lylics_haak, 1.5, {scale:0.5, autoAlpha:0, ease:Back.easeOut})
					.to(lylics_haak, 1.5, {scale:0.5, autoAlpha:0, ease:Back.easeOut})

				var timeLine = new TimelineMax({paused:true, delay:.2, onComplete:printComplete})
				timeLine
					.to(mcmu, 3.3, {scale:0.5, opacity:1})
					.to([leftBro, rightBro], 1, {rotation: 360, scale:1.2, fill:"red", opacity:1, transformOrigin:"50% 50%"})
					.add(screamSmell, 3.7)
					.add(screamAh,4.5)
					.add(mouth_timeLine, 4.5)
					.add(screamhak,8);

				timeLine.stop();

				$scope.totalTime = timeLine.totalDuration().toFixed(2);

				$timeout(function() {
					//audio.play();
					//timeLine.play();
					console.log('time out is done');
				}, 5000);

			}
			master();



		});

		var printComplete = function(){
			console.log('complete');
		};

		//transform origin
		var boxes = $(".box"),
			stage = $(".stage");


		TweenLite.set(stage, {css:{perspective:400, transformStyle:"preserve-3d"}});
		boxes.each(function (index, element){
			TweenLite.set(element, {css:{rotationY:index*20, transformOrigin:"left 50% -200"}});
			TweenMax.to(element, 20, {css:{rotationY:"+=180"}, repeat:1, ease:Linear.easeNone});
		});
	}
]);

'use strict';

angular.module('user-interface').directive('article', ['Articles',
	function(Articles) {
		return {
			templateUrl: 'modules/user-interface/directives/templates/article.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				scope.find = function() {
					scope.articles = Articles.query();
				};
				scope.find();

			}
		};
	}
]);

'use strict';
//http://css-tricks.com/draggable-elements-push-others-way/
angular.module('user-interface').directive('mainInterface', ['$compile',
	function($compile) {
		return {
			templateUrl: 'modules/user-interface/directives/templates/main-interface.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

				var draggableTargets = $('.draggable-target');
				var ids = [];
				angular.forEach(draggableTargets, function(index){ids.push(index.id)})
				console.log(ids);

				scope.clicked=false;
				scope.dragable = false;
				scope.dragin = false;
				var newY, ghost = null;

				var sortable = $("#box");
				var box = Draggable.create(sortable,
					{
						type:"x,y",
						edgeResistance:0.85,
						//throwProps:true,
						//onPress: draggablePress,
						onDragStart:function(){
							TweenMax.to("#box",0.25,{scale:0.8});
							console.log('Click');
						},
						onDrag: function(){
							TweenMax.to(".draggable-target",0,{opacity:1, backgroundColor:'lightgreen'});
							angular.forEach(ids, function(index){
								if (box[0].hitTest("#"+index, 20)) {
									TweenMax.to("#"+index, 0.25,{opacity:0.5, backgroundColor:'lightgreen'});
								}
							});
						},
						onDragEnd:function(){
							angular.forEach(ids, function(index){
								if (box[0].hitTest("#"+index, 20)) {
									var el = $compile( "<article></article>" )(scope );
									angular.element("#"+index).append(el);
									//Set bound to menu
									box[0].applyBounds("#widget_menu");
									//release bound setting
									box[0].vars.bounds="";
								}
							});

							TweenMax.to("#box",0.25,{scale:1});
						}
					});
			}
		};
	}
]);

'use strict';

angular.module('user-interface').factory('Allproducts', ['$resource',
	function($resource) {
		return $resource('products/:productID', {productID: '@_id'});
	}
]);

angular.module('user-interface').factory('AllBanners', ['$resource',
	function($resource) {
		return $resource('banners', {productID: '@_id'});
	}
]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);

'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController',
	['$scope', '$http', '$timeout','$location', '$mdDialog', '$state', 'Authentication','Users',
	function($scope, $http, $timeout, $location, $mdDialog, $state, Authentication, Users) {
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;
		// If user is signed in then redirect back home
		//if ($scope.authentication.user) $location.path('/mean-home');

		$scope.signup = function(destination) {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
				$mdDialog.hide();
				// And redirect to the index page
				if(typeof destination == undefined)
					$location.path('/');
				else
					$state.go(destination);
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function(destination) {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
				$mdDialog.hide();
				$location.path('/');
				// And redirect to the index page
				if(typeof destination == undefined)
					$location.path('/');
				else
					$state.go(destination);
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		//$scope.setRole = function(){
		//	$scope.user.roles =$scope.credentials.roles;
		//	var user = new Users($scope.user);
		//	$http.put('/users/role').success(function(result){
		//		Authentication.user = result;
		//	}).error(function(response) {
		//		$scope.error = response.message;
		//	});
		//	//user.$update(function(response) {
		//	//	$scope.success = true;
		//	//
		//	//	$scope.user = response;
		//	//	$mdDialog.hide();
		//	//}, function(response) {
		//	//	$scope.error = response.data.message;
		//	//});
		//};

	}
]);

'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);

'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;
		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {

			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);

'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);

'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users')
	.factory('Users', ['$resource',
		function($resource) {
			return $resource('users', {}, {
				update: {
					method: 'PUT'
				}
			});
		}
	])
	.factory('UsersRole', ['$resource',
	function($resource) {
		return $resource('users/role', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

'use strict';

angular.module('util').directive('keyMenu', [
	function() {
		return {
			restrict: 'A',
			link: function postLink(scope, element, attrs) {
				element.bind("keydown keypress", function (event) {
					if(event.which === 13) {
						scope.$apply(function (){
							scope.$eval(attrs.ngEnter);
						});

						event.preventDefault();
					}else{
						console.log(event.which);
					}
				});
			}
		};
	}
]);
'use strict';

angular.module('util').directive('prism', [
	function() {
		return {
            restrict: 'A',
			link: function postLink(scope, element, attrs) {
				element.ready(function(){
                   Prism.highlightElement(element[0]);
                });
			}
		};
	}
]);
