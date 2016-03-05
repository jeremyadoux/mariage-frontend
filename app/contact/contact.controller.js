module.controller('ContactController', ["$scope", "Contact", function($scope, Contact) {
    $scope.sendContact = sendContact;
    $scope.configBanner = {
        "image": true
    };
    function sendContact() {
        console.log('bouh');
        Contact.create($scope.contact)
            .$promise
            .then(function(response) {
                console.log("have been send");
            });
    }
}]);
