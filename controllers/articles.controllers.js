const { getArticlesData } = require("../models/articles.models")

exports.getArticles = (req, res, next) => {
    const article_id = req.params.article_id
    getArticlesData(article_id).then((article) => {
        res.status(200).send({ article })
    }).catch(next)
}