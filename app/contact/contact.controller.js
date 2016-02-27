module.controller('ContactController', ["$scope", "Contact", function($scope, Contact) {
    $scope.sendContact = sendContact;

    function sendContact() {
        console.log('bouh');
        Contact.create($scope.contact)
            .$promise
            .then(function(response) {
                console.log("have been send");
            });
    }
}]);
