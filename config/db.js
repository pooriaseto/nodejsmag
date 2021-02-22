const mysql = require('mysql');

const initilizeMysqlDatabase = async () => {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'dbuser',
        password: 's3kreee7',
        database: 'my_db'
    })

    try {
        connection.connect(function (error) {
            if(error)
            {
                throw error;
            }
            console.log("Connected!");
        });

        connection.end()
    }
    catch (error) {
        console.log(error);
        throw error;
    }

}


module.exports = initilizeMysqlDatabase();