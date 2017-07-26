const mysql = require("mysql");

const createConnect = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Ashish.123",
  database: "bamazon"
});

module.exports = createConnect;
