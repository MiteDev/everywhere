const mysql = require("mysql");
require('dotenv').config({ path: ".env" });

const options = require('./dbOptions');

const db = mysql.createConnection(options);

handleDisconnect(db);

function handleDisconnect(client) {
  client.on('error', function (error) {
    if (!error.fatal) return;
    if (error.code !== 'PROTOCOL_CONNECTION_LOST') throw err;

    console.error('> Re-connecting lost MySQL connection: ' + error.stack);
    console.log(db);
    db = mysql.createConnection(client.config);
    db.connect();
  });
};

module.exports = db;