(function() {
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    loginController.$inject = ['Contributor', '$state'];

    function loginController(Contributor, $state) {
        var vm = this;

        vm.login = login;

        function login() {
            Contributor.login(vm.contributor)
                .$promise
                .then(function(response) {
                    $state.go('home');
                });
        }
    }
})();