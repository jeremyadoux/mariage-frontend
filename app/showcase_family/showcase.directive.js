(function() {
    'use strict';

    angular
        .module('app')
        .directive('blockListContent', blockListContent);

    function blockListContent() {
        var directive = {
            restrict: 'EA',
            templateUrl: function(elem,attrs) {
                return attrs.templateUrl || 'block-list-content.directive.html'
            },
            scope: {
                name: '=',
                config: '='
            },
            controller : blockListContentController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    blockListContentController.$inject = ['Block', 'FileUploader'];

    function blockListContentController(Block, FileUploader) {
        var vm = this;
        vm.urlApi = "http://192.168.100.100:443";
        vm.addContent = {};
        vm.currentEditPosition = -1;
        //Function definition
        vm.editBlock = editBlock;
        vm.addBlock = addBlock;
        vm.modeEdit = modeEdit;
        vm.addUploader = new FileUploader({
            url: vm.urlApi + '/api/files/upload',
            autoUpload: true
        });
        vm.editUploader = new FileUploader({
            url: vm.urlApi + '/api/files/upload',
            autoUpload: true
        });
        //Initialization
        init();

        function init() {
            if (angular.isDefined(vm.name)) {
                Block.find({filter: {where: {name: vm.name}, include: 'image'}})
                    .$promise
                    .then(function (response) {
                        if (response.length < 1) {
                            //set default value to show
                            vm.contents = [];
                        } else {
                            vm.contents = response;
                            console.log(vm.contents.length);
                            for(var i = 0;  i < vm.contents.length; i++) {
                                vm.contents[i].showEdit = false;
                                vm.contents[i].imgUrl = vm.urlApi+"/api/files/download/"+vm.contents[i].imageId;
                            }
                        }
                    });
            } else {
                console.log('You must defined a name to your directive block-content.')
            }
        }

        function editBlock() {
            var content = vm.contents[vm.currentEditPosition];
            if(angular.isDefined(vm.contents[vm.currentEditPosition].id)) {
                Block.upsert(vm.contents[vm.currentEditPosition])
                    .$promise
                    .then(function(response) {
                        for(var i=0;  i < vm.contents.length; i++) {
                            if(vm.contents[i].id == response.id) {
                                vm.contents[i] = response;
                                vm.contents[i].showEdit = false;
                                vm.currentEditPosition = -1;
                                vm.contents[i].imgUrl = vm.urlApi+"/api/files/download/"+vm.contents[i].imageId;
                            }
                        }
                    });
            }
        }

        function addBlock() {
            vm.addContent.name = vm.name;
            Block.create(vm.addContent)
                .$promise
                .then(function(response) {
                    vm.addContent = {};
                    response.showEdit = false;
                    vm.currentEditPosition = -1;
                    response.imgUrl = vm.urlApi+"/api/files/download/"+response.imageId;
                    vm.contents.push(response);
                });
        }

        function modeEdit(position) {
            for(var i=0;  i < vm.contents.length; i++) {
                vm.contents[i].showEdit = false;
            }
            vm.contents[position].showEdit = true;
            vm.currentEditPosition = position;
        }

        // FILTERS
        vm.addUploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        vm.editUploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS
        vm.addUploader.onSuccessItem = function(fileItem, response, status, headers) {
            vm.addContent.image = response;
            vm.addContent.imageId = response.id;
        };

        vm.editUploader.onSuccessItem = function(fileItem, response, status, headers) {
            vm.contents[vm.currentEditPosition].image = response;
            vm.contents[vm.currentEditPosition].imageId = response.id;
        };
    }
})();