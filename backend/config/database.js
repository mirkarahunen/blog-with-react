const mysql = require('mysql')

// Set mysql connection
const connection = mysql.createConnection({
    user: 'here comes your username',
    password: 'here comes your password',
    port: 8889,
    host: 'localhost',
    database: 'here comes your database name'
})

// Connect to database
connection.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log('MySQL database connected');
    }

})

module.exports = connection