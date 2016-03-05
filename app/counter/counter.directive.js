angular.module('app').directive('counter', [counterDirective]).run(['$templateCache', function($templateCache) {
    'use strict';

    $templateCache.put('directive-counter.html',
        'test'
    );
}]);

function counterDirective() {
    return {
        restrict: 'A',
        scope: {
            date: '=counter'
        },
        controller: [
            "$scope",
            counterController
        ],
        templateUrl: 'directive-counter.html'
    };
}

function counterController($scope) {
    console.log($scope.date);
}