const db = require('../config/database')

/* -------------------------------------------------------- */
exports.getImage = async (req, res) => {
    db.query("SELECT * FROM images", (err, result) => {
        if(err) console.log(err);
        res.send(result)
    })
}
/* -------------------------------------------------------- */
// Single IMAGE
exports.postImage = async (req, res) => {
    const imageKey = req.body.image_key
    const image = req.files.image
    const image_name = req.files.image.name
    const filepath = 'uploads/images/' + image_name
    

    try {
        db.query("INSERT INTO images (image, filepath, image_key) VALUES (?, ?, ?)",[image_name, filepath, imageKey], (err, result) => {
            if(err) console.log(err);
                image.mv(filepath, (err) => {
                    if(err) {
                        console.log(err);
                    } else {
                    console.log('File moved!');
                    }
                })  
                res.status(200).send(result)     
        })
    } catch (error) {
        console.log(error);
    }    
}
/* -------------------------------------------------------- */
// Multiple IMAGES

exports.postImages = async (req, res) => {
    

    try {
        req.files.image.forEach(async element => {
            const imageKey = req.body.image_key
            const image = element
            const image_name = element.name
            const filepath = 'uploads/images/' + image_name 

            db.query("INSERT INTO images (image, filepath, image_key) VALUES (?, ?, ?)", [image_name, filepath, imageKey], (err, result) => {
                if(err) {
                    console.log(err);
                } else {
                    image.mv(filepath, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.status(200).send('File successfully uploaded')
                        }
                        
                    })
                }
            })
        });
    } catch (error) {
        console.log(error);
    }
}