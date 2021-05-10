const db = require('../config/database')

exports.getCommentsByID = async (req, res) => {
    const id = req.body.id

    db.query("SELECT * from comments WHERE post_id = ?", [id], (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.status(200).send(result)
        }
    })
}

exports.postNewComment = async (req, res) => {
    const id = req.body.id
    const posted_by = req.body.posted_by
    const comment = req.body.comment

    db.query("INSERT INTO comments (comment, post_id, posted_by) VALUES (?, ?, ?)", [comment, id, posted_by], (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.status(200).send(result)
        }
    })
}