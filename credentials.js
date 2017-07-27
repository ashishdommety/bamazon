const mysql = require("mysql");

const createConnect = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "********",// mySQL root password
  database: "bamazon"
});

module.exports = createConnect;
