(function() {
    'use strict';

    angular
        .module('app')
        .controller('MapController', MapController);


    MapController.$inject = ['Comment'];

    function MapController(Comment) {
        var vm = this;

        vm.loadComment = loadComment;
        vm.saveComment = saveComment;

        vm.configBanner = {
            "image": true
        };

        vm.markers = [
            {
                "id": "0",
                "coords": {
                    "latitude": "45.5200",
                    "longitude": "-122.6819"
                },
                "window": {
                    "title": "Portland, OR"
                }
            },
            {
                "id": "1",
                "coords": {
                    "latitude": "40.7903",
                    "longitude": "-73.9597"
                },
                "window" : {
                    "title": "Manhattan New York, NY"
                }
            }
        ];

        vm.map = {
            center: { latitude: 39.8282, longitude: -98.5795 },
            zoom: 4
        };


        function loadComment() {
            Comment.find()
                .$promise
                .then(function (response) {
                    vm.comments = response;
                });
        }

        function saveComment() {
            Comment.create(vm.comment)
                .$promise
                .then(function(response) {
                    vm.comment = {};

                });
        }
    }

})();