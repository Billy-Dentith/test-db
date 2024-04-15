const { getCommentsByArticleIdData } = require("../models/comments.models")

exports.getCommentsByArticleId = (req, res, next) => {
    const article_id = req.params.article_id
    getCommentsByArticleIdData(article_id).then((comments) => {
        res.status(200).send({ comments })
    }).catch(next)
}