module.controller('HomeController', ["$scope", "Contributor", function($scope, Contributor) {
    $scope.configBanner = {
      "image" : true
    };

    $scope.login = function() {
        Contributor.login({email: 'jeremy.adoux@gmail.com', password: '123456'})
            .$promise
            .then(function(response) {


            });
    };

    $scope.login();
}]);
