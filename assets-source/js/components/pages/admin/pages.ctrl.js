angular.module('myApp')
    .controller('PagesCtrl', ['$http', '$scope', 'PageProvider', '$stateParams', 'orm', function($http, $scope, PageProvider, $stateParams, orm) {
        orm.limit(0).getData('page');
        $scope.orm = orm;
        $scope.slug = $stateParams.slug;
        $scope.editingPage = {};
        $scope.editingMode = false;
        $scope.savePage = function(){
            if($scope.editingMode) {
                orm.update('page', $scope.editingPage);
            }else{
                orm.create('page', $scope.editingPage);
            }
            $scope.editingMode = false;
            $scope.editingPage = {};
        };
        $scope.editPage = function(page){
            $scope.editingMode = true;
            $scope.editingPage = angular.copy(page);
        };
        $scope.deletePage = function(page){
            orm.delete('page', page.id);
        };
    }]);