'use strict';


function classBoard(){

	function classBoardCtrl(MeanEvents){
		this.title="알림";
		this.info = MeanEvents.query();
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
						'<md-whiteframe class="md-body-1 class-board md-whiteframe-z2" layout layout-align="start center" ng-repeat="content in vm.info">',
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