const db = require('../config/database')

/* -------------------------------------------------------- */
exports.getPosts = async (req, res) => {
    await db.query("SELECT * FROM posts", (err, result) => {
        if(err) console.log(err);

        res.status(200).send(result)
        
    })
}

/* -------------------------------------------------------- */
exports.newPost = async (req, res) => {
    const header = req.body.header
    const box_1_text = req.body.box_1_text
    const box_2_text = req.body.box_2_text
    const box_3_text = req.body.box_3_text
    const box_1_image = req.files.box_1_image
    const box_2_image = req.files.box_2_image
    const image_text = req.body.image_text
    const image = req.files.image
    const image_name = req.files.image.name
    const box_1_image_name = req.files.box_1_image.name
    const box_2_image_name = req.files.box_2_image.name
    const post_key = req.body.post_key
//console.log(box_1_image);
    db.query(`INSERT INTO posts (header, box_1_text, box_2_text, box_3_text, image, image_text, box_1_image, box_2_image, post_key) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ,[header, box_1_text, box_2_text, box_3_text, image_name, image_text, box_1_image_name, box_2_image_name, post_key], (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.status(200).send({result});
        }

        image.mv('uploads/images/' + image_name, (err) => {
            if(err) {
                console.log(err);
            } else {
                console.log('Image File moved!');
            }
        })
        box_1_image.mv('uploads/images/' + image_name, (err) => {
            if(err) {
                console.log(err);
            } else {
                console.log('Box 1 File moved!');
            }
        })
        box_2_image.mv('uploads/images/' + image_name, (err) => {
            if(err) {
                console.log(err);
            } else {
                console.log(' Box 2 File moved!');
            }
        })
    })
}
/* -------------------------------------------------------- */
exports.getPostWithID = async (req, res) => {
    const id = req.body.id

    db.query("SELECT * FROM posts WHERE id = ?", [id], (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.status(200).send(result)
        }
    })
}

/* -------------------------------------------------------- */
exports.deletePost = async (req, res) => {
    const id = req.body.id

    db.query("DELETE FROM posts WHERE id = ?", [id], (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.status(200).send(result)
        }
    })
}