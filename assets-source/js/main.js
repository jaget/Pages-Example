var myApp = angular.module('myApp', ['ui.router', 'ngSails']);
myApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
        .state('pages', {
            url: "/pages",
            templateUrl: "templates/partials/admin/pages.html",
            controller: 'PagesCtrl'
        })
        .state('home', {
            url: "",
            templateUrl: "templates/partials/page.html",
            controller: "PageCtrl"

        })
        .state('page', {
            url: "/:slug",
            templateUrl: "templates/partials/page.html",
            controller: "PageCtrl"
        })
    ;
    $locationProvider.html5Mode(true);
}])
    .run(['$http', '$sails', '$rootScope', 'orm', function($http, $sails, $rootScope, orm) {
        orm.limit(0).getData('page');
    }])
;