angular.module('myApp')
    .controller('PageCtrl', ['$scope', 'PageProvider', '$stateParams', 'orm', function($scope, PageProvider, $stateParams) {
        $scope.slug = $stateParams.slug;
        $scope.currentPage = PageProvider.getPage($stateParams.slug);
        $scope.PageProvider = PageProvider;
    }]);