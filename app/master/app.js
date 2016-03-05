var module = angular.module('app', ['ui.router', 'ngSanitize', 'lbServices', 'ckeditor', 'angularFileUpload', 'uiGmapgoogle-maps', 'timer']).config(function(LoopBackResourceProvider) {
    // Change the URL where to access the LoopBack REST API server
    LoopBackResourceProvider.setUrlBase('http://api.zarazetti.fr/api');
});


