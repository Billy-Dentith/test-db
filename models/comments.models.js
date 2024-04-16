const db = require('../db/connection')
const format = require('pg-format')

exports.getCommentsByArticleIdData = (article_id) => {
    return db.query(`
    SELECT* 
    FROM comments
    WHERE article_id=$1
    ORDER BY created_at DESC`, 
    [article_id])
    .then(({ rows }) => {
        return rows;
    })
}

exports.insertComment = ({ body, username }, article_id) => {
    const queryStr = `
    INSERT INTO comments
        (body, author, article_id)
    VALUES
        ($1, $2, $3)
    RETURNING*;`

    return db.query(queryStr, [body, username, article_id]).then(({ rows }) => {
        return rows[0]; 
    })
}