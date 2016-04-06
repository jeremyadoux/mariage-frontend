var urlApi = "http://api.zarazetti.fr";
//var urlApi = "http://192.168.100.100:443";
var module = angular.module('app', ['ui.router', 'ngSanitize', 'lbServices', 'ckeditor', 'angularFileUpload', 'uiGmapgoogle-maps', 'timer']).config(function(LoopBackResourceProvider) {
    // Change the URL where to access the LoopBack REST API server
    LoopBackResourceProvider.setUrlBase(urlApi+'/api');
});


