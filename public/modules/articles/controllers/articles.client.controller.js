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
