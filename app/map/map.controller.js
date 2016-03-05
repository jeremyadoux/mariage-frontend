(function() {
    'use strict';

    angular
        .module('app')
        .controller('MapController', MapController);


    MapController.$inject = ['Comment', 'Contact'];

    function MapController(Comment, Contact) {
        var vm = this;

        vm.loadComment = loadComment;
        vm.saveComment = saveComment;
        vm.sendContact = sendContact;

        vm.messageContactCreated = false;
        vm.configBanner = {
            "image": true
        };

        vm.markers = [
            {
                "id": "0",
                "coords": {
                    "latitude": "46.174980",
                    "longitude": "4.801493"
                },
                "window": {
                    "title": "La salle des fêtes"
                }
            }
        ];

        vm.map = {
            center: { latitude: 46.174980, longitude: 4.801493 },
            zoom: 15
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

        function sendContact() {
            Contact.create(vm.contact)
                .$promise
                .then(function(response) {
                    vm.messageContactCreated = "Votre demande de contact a été envoyé, nous reviendrons vers vous rapidement par mail.";
                });
        }
    }

})();