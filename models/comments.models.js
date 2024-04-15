const db = require('../db/connection')

exports.getCommentsByArticleIdData = (article_id) => {
    return db.query(`
    SELECT* 
    FROM comments
    WHERE article_id=$1
    ORDER BY created_at DESC`, 
    [article_id])
    .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, message: 'Article Does Not Exist'})
        }
        return rows;
    })
}