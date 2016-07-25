describe('ORM service', function() {
    var $rootScope,
        $scope,
        orm;

    beforeEach(function(){
        module('myApp');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            orm = $injector.get('orm');
            $scope = $rootScope.$new();
        });
    });
    it('Should add', function(){
        orm.create('page', {
            title: 'title',
            slug: 'slug',
            content: 'content'
        });
        setTimeout(2000, function() {//give save request time to run
            expect(orm.fetch('page').length).toEqual(1);//pages fetched should now be 1
        });
    });
    it('Should edit', function(){
        var exampleTitle = 'edited title',
            editedTitle = 'example title',
            exampleSlug = 'edited-slug',
            editedSlug = 'example-slug',
            exampleContent = 'example content',
            editedContent = 'edited content'
            ;
        orm.limit(0).getData('page');
        expect(orm.fetch('page').length).toEqual(0);//pages fetched should be 0

        orm.update('page', {
            title: exampleTitle,
            slug: exampleSlug,
            content: exampleContent
        });

        setTimeout(2000, function() {//give save request time to run
            expect(orm.fetch('page').length).toEqual(1);//pages fetched should now be 1
            orm.update('page', {
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
    it('Should get data', function(){
        // create some data to fetch
        orm.create('page',{
            title: 'example title',
            slug: 'example-slug',
            content: 'example content'
        });

        setTimeout(2000, function() {//give save request time to run
            orm.limit(0).getData('page');//get data
            expect(orm.fetch('page').length).toEqual(1);//pages fetched should now be 1
        });
    });
    it('Should limited amount of data', function(){

        for(var count = 0; count < 20; count ++) {
            orm.create('page', {
                title: 'example title ' + count,
                slug: 'example-slug' + count,
                content: 'example content' + count
            });
        }

        orm.limit(10).getData('page');
        setTimeout(2000, function() {//give save request time to run
            expect(orm.fetch('page').length).toEqual(10);//pages fetched should now be 1
        });
    });
});