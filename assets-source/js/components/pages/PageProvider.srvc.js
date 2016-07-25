angular.module('myApp')
    .factory('PageProvider', ['orm','$stateParams', function(orm, $stateParams) {
        return {
            getPage: function(){
                var pages = orm.fetch('page');

                var currentPage = {
                    title: '',
                    content: '',
                    keywords: '',
                    description: ''
                };
                var slug = $stateParams.slug;
                if(pages && pages.constructor === Array && pages.length > 0) {
                    currentPage = pages.filter(function (obj) {
                        if(typeof slug != 'string'){
                            return false
                        }
                        return obj.slug.toString().toLowerCase() == slug.toString().toLowerCase();
                    });
                    currentPage = currentPage[0];
                }
                return currentPage;
            }
        };
    }]);