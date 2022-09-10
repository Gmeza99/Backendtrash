const mysql = require('mysql');

//Conexión a BD
const config = {
    host: '206.81.4.245',
    user: 'symba',
    password: 'XXXXXXXXXXXX',
    database: 'u565143530_Symba',
};

// Creamos una pscina para hacer multiples conexiones sin tener que abrir y cerrar manualmente
const pool = mysql.createPool(config);

//Exportamos el pool
module.exports = pool;