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
