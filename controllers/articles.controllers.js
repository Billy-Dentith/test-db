const { getArticleDataById, getAllArticlesData, updateArticle } = require("../models/articles.models")

exports.getArticleById = (req, res, next) => {
    const article_id = req.params.article_id
    getArticleDataById(article_id).then((article) => {
        res.status(200).send({ article })
    }).catch(next)
}

exports.getAllArticles = (req, res, next) => {
    getAllArticlesData().then((articles) => {
        res.status(200).send({ articles })
    })
}

exports.patchArticleById = (req, res, next) => {
    const article_id = req.params.article_id;
    const updArticle = req.body;
    updateArticle(article_id, updArticle).then((article) => {
        res.status(202).send({ article })
    }).catch(next)
}