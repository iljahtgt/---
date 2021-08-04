
module.exports = function (router) {

    router.get("product/mainproduct",function (req, res) {
        res.render('pages/productpage/mainproduct');
    });

    router.get("product/otherproduct",function (req, res) {
        res.render('pages/productpage/otherproduct');
    });
}