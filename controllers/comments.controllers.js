const { getCommentsByArticleIdData, insertComment } = require("../models/comments.models")

exports.getCommentsByArticleId = (req, res, next) => {
    const article_id = req.params.article_id
    getCommentsByArticleIdData(article_id).then((comments) => {
        res.status(200).send({ comments })
    }).catch(next)
}

exports.postComment = (req, res, next) => {
    const newComment = req.body 
    const article_id = req.params.article_id
    insertComment(newComment, article_id).then((comment) => {
        res.status(201).send({ comment })
    }).catch(next)
}