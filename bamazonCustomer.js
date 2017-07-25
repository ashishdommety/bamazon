var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Ashish.123",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId );
});

var query = connection.query("SELECT * FROM products", function(err, res) {
      var choices = [];
      console.log("-----------Available Products-----------");
      for (var i = 0; i < res.length; i++) {
        choices.push(`${res[i].item_id} - ${res[i].product_name} - $${res[i].price}`);
        console.log(`${res[i].item_id} - ${res[i].product_name} - $${res[i].price}`);
      }

      inquirer.prompt([{
          type: "input",
          message: "What is the ID of the item you want to buy?",
          name: "itemId"
        },
        {
          type: "input",
          message: "How many do you want to buy?",
          name: "itemQuantity"
        }
      ]).then(function(answer) {
          connection.query("SELECT * FROM products WHERE item_id=?", [answer.itemId], function(err, res) {
              if (res[0].stock_quantity >= answer.itemQuantity) {
                connection.query("UPDATE products SET ? WHERE ?",
                  [{
                      stock_quantity: res[0].stock_quantity - parseInt(answer.itemQuantity)
                    },
                    {
                      item_id: answer.itemId
                    }
                  ], function(error){
                    if(error) throw err;
                    console.log(`You just bought ${answer.itemQuantity} ${res[0].product_name}s worth $${res[0].price * answer.itemQuantity}`);
                  });
                }
              });
          });
      });
