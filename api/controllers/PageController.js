/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    bySlug: function(req, res, next){
        var slug = req.param('slug');
        if(typeof slug == 'undefined'){
            slug = '';
        }
        Page.findOne({ where: { slug: slug } }, function foundPage(err, currentPage) {
            if (!currentPage && slug == '') {
                return res.view('page/blank', {
                    currentPage: {
                        title: '',
                        keywords: '',
                        description: ''
                    }
                });
            }
            if (err)return next(err);
            if (!currentPage){
                return res.notFound();
            }
            return res.view('page/bySlug', {
                currentPage: currentPage
            });
        });
    }
};