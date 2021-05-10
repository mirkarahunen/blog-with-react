const db = require('../config/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.getUser = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    //const hashed = await bcrypt.hash(password, 12)
    //console.log(hashed);
    let validPassword
    let hashedPassword
    let user
    let token

    db.query("SELECT * FROM user WHERE email = ?", [email], (err, result) => {
        if(err) console.log(err); 
        if(result.length === 0) res.status(404).send('User not found')

        user = result[0]
        hashedPassword = result[0].password
        
        validPassword = bcrypt.compare(password, hashedPassword)

        token = jwt.sign({id: result[0].id}, 'secret', {expiresIn: '2h'})

        if(validPassword) {
            res.status(200).send({user: user, token: token})
        }
    })
}
