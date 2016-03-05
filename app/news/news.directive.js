angular.module('app').directive('newslist', [newsListDirective]).run(['$templateCache', function($templateCache) {
    'use strict';

    $templateCache.put('news-list.html',
        '<div>' +
            '<div ng-repeat="news in newsList">' +
                '<h2 ng-bind="news.title"></h2>' +
                '<span ng-bind="news.description"></span>' +
            '</div>' +
        '</div>'
    );
}]);

function newsListDirective() {
    return {
        restrict: 'EA',
        scope: {
            config: "="
        },
        controller: [
            "$scope",
            'NewsService',
            newsListController
        ],
        templateUrl: 'news-list.html'
    };
}

function newsListController($scope, NewsService) {
    //Prepare configuration element
    ($scope.config.limit != null ? '' : $scope.config.limit = '10');
    ($scope.config.paginate != null ? '' : $scope.config.paginate = false);
    ($scope.config.fieldShow != null ? '' : $scope.config.fieldShow = 'all')
    ($scope.config.page != null ? '' : $scope.config.page = 1);
    ($scope.config.clickCallback != null ? '' : $scope.config.clickCallback = false);


    function reloadNewsList() {
        newsList = NewsService.get($scope.config.limit, $scope.config.page);

        //clean field if not all
        if($scope.config.fieldShow != "all" && $scope.config.fieldShow.isArray) {
            for(i=0; i < newsList.length; i++) {

            }
        }

        $scope.newsList = newsList;
    }

    $scope.haveNextPage = function() {
        return true;
    }

    $scope.havePreviousPage = function() {
        return $scope.config.page > 1;
    }

    $scope.nextPage = function() {
        $scope.config.page++;
        reloadNewsList();
    }

    $scope.previousPage = function() {
        $scope.config.page--;
        reloadNewsList();
    }

    $scope.changePage = function(page) {
        $scope.page = page;
        reloadNewsList();
    }
}