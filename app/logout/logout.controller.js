(function() {
    'use strict';

    angular
        .module('app')
        .controller('logoutController', logoutController);

    logoutController.$inject = ['Contributor', '$state'];

    function logoutController(Contributor, $state) {
        var vm = this;

        Contributor.logout()
            .$promise
            .then(function(response) {
                $state.go('home');
        });

    }
})();