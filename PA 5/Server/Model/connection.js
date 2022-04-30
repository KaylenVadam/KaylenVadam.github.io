const mysql = require('mysql2/promise');

async function query(sql, params) {
    const connection = await mysql.createConnection({
        host: "bsu-gimm260-fall-2021.cwtgn0g8zxfm.us-west-2.rds.amazonaws.com",
        user: "SamuelGragg",
        password: "DuHj2IbkoGujstSR5qADsKOdvv3lPHTPHNO",
        database: "SamuelGragg"
    });
    const [results, ] = await connection.execute(sql, params);

    return results;
}

module.exports = {
    query
}