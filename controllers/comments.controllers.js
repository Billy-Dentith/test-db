const { checkArticleExists } = require("../models/articles.models")
const { getCommentsByArticleIdData, insertComment, removeCommentById } = require("../models/comments.models")
const { checkUserExists } = require("../models/users.models")

exports.getCommentsByArticleId = (req, res, next) => {
    const article_id = req.params.article_id

    Promise.all([getCommentsByArticleIdData(article_id), checkArticleExists(article_id)])
    .then(([ comments ]) => {
        res.status(200).send({ comments })
    }).catch(next)
}

exports.postComment = (req, res, next) => {
    const { body, username } = req.body 
    const article_id = req.params.article_id

    checkUserExists(username).then(() => {
        insertComment(body, username, article_id)
        .then((comment) => {
            res.status(201).send({ comment })
        }).catch(next)
    }).catch(next)
}

exports.deleteCommentById = (req, res, next) => {
    const comment_id = req.params.comment_id; 
    removeCommentById(comment_id).then(() => {
        res.status(204).send()
    }).catch(next)
}