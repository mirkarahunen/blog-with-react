const db = require('../config/database')

exports.getRepliesByID = async (req, res) => {
    
    db.query("SELECT * from replies", (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.status(200).send(result)
        }
    })
}

exports.postNewReply = async (req, res) => {
    const id = req.body.comment_id
    const posted_by = req.body.posted_by
    const reply = req.body.reply

    db.query("INSERT INTO replies (reply, posted_by, comment_id) VALUES (?, ?, ?)", [reply, posted_by, id], (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.status(200).send(result)
        }
    })
}