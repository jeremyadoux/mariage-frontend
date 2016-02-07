var module = angular.module('app', ['ui.router', 'ngSanitize', 'lbServices']).config(function(LoopBackResourceProvider) {
    // Change the URL where to access the LoopBack REST API server
    LoopBackResourceProvider.setUrlBase('http://192.168.100.100:443/api');
});


