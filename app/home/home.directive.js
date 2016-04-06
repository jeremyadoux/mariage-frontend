(function() {
    'use strict';

    angular
        .module('app')
        .directive('blockContent', blockContent);

    function blockContent() {
        var directive = {
            restrict: 'EA',
            templateUrl: function(elem,attrs) {
                return attrs.templateUrl || 'block-content.directive.html'
            },
            scope: {
                name: '=',
                config: '='
            },
            controller : blockContentController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    blockContentController.$inject = ['Block', 'FileUploader', 'LoopBackAuth'];

    function blockContentController(Block, FileUploader, LoopBackAuth) {
        var vm = this;
        vm.canEdit = LoopBackAuth.accessTokenId != null;
        vm.showEdited = false;
        vm.urlApi = urlApi;
        //Function definition
        vm.editBlock = editBlock;
        vm.uploader = new FileUploader({
            url: vm.urlApi + '/api/files/upload',
            autoUpload: true
        });
        //Initialization
        init();

        function init() {
            //Prepare default configuration
            if(!angular.isDefined(vm.config)) {
                vm.config = {};
            }

            if(!angular.isDefined(vm.config.image)) {
                vm.config.image = false; //Default value
            }

            if(!angular.isDefined(vm.config.class)) {
                vm.config.class = "greyzone"; //Default value
            }

            if (angular.isDefined(vm.name)) {
                Block.find({filter: {where: {name: vm.name}, include: 'image'}})
                    .$promise
                    .then(function (response) {
                        if (response.length < 1) {
                            //set default value to show
                            vm.content = {
                                'title': 'You need to set a content',
                                'name': vm.name,
                                'text': '',
                                'styleImage': ''
                            };
                        } else {
                            vm.content = response[0];
                            vm.content.styleImage = {
                                "background-image" : "url('"+vm.urlApi+"/api/files/download/"+vm.content.imageId+"')"
                            }
                        }
                    });
            } else {
                console.log('You must defined a name to your directive block-content.')
            }

            vm.optionsCkeditor = {
                language: 'fr',
                allowedContent: true,
                entities: false
            };
        }

        function editBlock() {
            if(angular.isDefined(vm.content.id)) {
                Block.upsert(vm.content)
                    .$promise
                    .then(function(response) {
                        vm.showEdited = false;
                    });
            } else {
                Block.create(vm.content)
                    .$promise
                    .then(function(response) {
                        vm.content = response;
                        vm.showEdited = false;
                    });
            }
        }

        // FILTERS
        vm.uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS
        vm.uploader.onSuccessItem = function(fileItem, response, status, headers) {
            vm.content.image = response;
            vm.content.imageId = response.id;
            vm.content.styleImage = {
                "background-image" : "url('"+vm.urlApi+"/api/files/download/"+vm.content.imageId+"')"
            }
        };
    }
})();
