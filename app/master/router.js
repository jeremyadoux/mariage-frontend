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
            controller: 'TimelineController',
            controllerAs: 'vm'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'contact.html',
            controller: 'ContactController'
        })
        .state('map', {
            url: '/logistique',
            templateUrl: 'map.html',
            controller: 'MapController',
            controllerAs: 'vm'
        })
        .state('biography', {
            url: '/biography',
            templateUrl: 'biography.html',
            controller: 'BiographyController',
            controllerAs: 'vm'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'loginController',
            controllerAs: 'vm'
        })
        .state('logout', {
            url: '/logout',
            templateUrl: 'logout.html',
            controller: 'logoutController',
            controllerAs: 'vm'
        });
    $urlRouterProvider.otherwise('accueil');
}]);