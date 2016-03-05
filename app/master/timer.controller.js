(function() {
    'use strict';

    angular
        .module('app')
        .controller('timerController', timerController);


    function timerController() {
        var vm = this;

        var now = moment();
        var dateWedding = moment("2016-08-13T10:00:00");

        vm.timerSeconds = Math.round(dateWedding.diff(now) / 1000);
    }

})();