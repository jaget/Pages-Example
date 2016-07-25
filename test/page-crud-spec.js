describe('Page Controller', function() {
    var $rootScope,
        $scope,
        PagesCtrl,
        orm;

    beforeEach(function(){
        module('myApp');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            orm = $injector.get('orm');
            orm.limit(0).getData('page');
            $scope = $rootScope.$new();
            PagesCtrl = $injector.get('$controller')('PagesCtrl', {$scope: $scope});
        });
    });
    it('Should add a page', function(){
        expect(orm.fetch('page').length).toEqual(0);//pages fetched should be 0

        $scope.savePage({
            title: 'example title',
            slug: 'example-slug',
            content: 'example content'
        });

        setTimeout(2000, function() {//give save request time to run
            expect(orm.fetch('page').length).toEqual(1);//pages fetched should now be 1
        });
    });
    it('Should edit a page', function(){
        var exampleTitle = 'edited title',
            editedTitle = 'example title',
            exampleSlug = 'edited-slug',
            editedSlug = 'example-slug',
            exampleContent = 'example content',
            editedContent = 'edited content'
            ;
        expect(orm.fetch('page').length).toEqual(0);//pages fetched should be 0

        $scope.savePage({
            title: exampleTitle,
            slug: exampleSlug,
            content: exampleContent
        });

        setTimeout(2000, function() {//give save request time to run
            expect(orm.fetch('page').length).toEqual(1);//pages fetched should now be 1
            $scope.editPage(orm.fetch('page')[0]);//set editing mode on first page in array
            $scope.savePage({
                title: editedTitle,
                slug: editedSlug,
                content: editedContent
            });
            setTimeout(2000, function() {//give save request time to run
                expect(orm.fetch('page')[0].title).toNotEqual(exampleTitle);
                expect(orm.fetch('page')[0].slug).toNotEqual(exampleSlug);
                expect(orm.fetch('page')[0].content).toNotEqual(exampleContent);
            });
        });
    });
});