/**
 * Created by jadoux on 28/01/2016.
 */
module.controller('ShowcaseController', ["$scope", "Contributor", function($scope, Contributor) {
    $scope.login = function() {
        Contributor.login({email: 'jeremy.adoux@gmail.com', password: '123456'})
            .$promise
            .then(function(response) {


            });
    };

    $scope.login();

    $scope.configFamily = {
        "image" : true
    };
}]);
