const { getArticleDataById, getAllArticlesData, updateArticle } = require("../models/articles.models")

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params;
    getArticleDataById(article_id).then((article) => {
        res.status(200).send({ article })
    }).catch(next)
}

exports.getAllArticles = (req, res, next) => {
    const { topic } = req.query; 
    getAllArticlesData(topic).then((articles) => {
        res.status(200).send({ articles })
    }).catch(next)
}

exports.patchArticleById = (req, res, next) => {
    const { article_id } = req.params;
    const updArticle = req.body;
    updateArticle(article_id, updArticle).then((article) => {
        res.status(202).send({ article })
    }).catch(next)
}