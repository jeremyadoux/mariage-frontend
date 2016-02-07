module.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/accueil',
            templateUrl: 'home.html',
            controller: 'HomeController'
        })
        .state('showcase', {
            url: '/famille',
            templateUrl: 'showcase.html',
            controller: 'ShowcaseController'
        })
        .state('timeline', {
            url: '/programme',
            templateUrl: 'timeline.html',
            controller: 'TimelineController'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'contact.html',
            controller: 'ContactController'
        })
        .state('map', {
            url: '/logistique',
            templateUrl: 'map.html',
            controller: 'MapController'
        });
    $urlRouterProvider.otherwise('accueil');
}]);