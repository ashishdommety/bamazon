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
    connection.query("SELECT * FROM products WHERE item_id=?",[answer.itemId], function(err,res){
      if(res[0].stock_quantity >= answer.itemQuantity){
        
        console.log("purchase successful!");
      }
      else{
        console.log("Insufficient quantity");
      }
      // console.log(res[0].stock_quantity);
    })
    // NOTE: compare the id to find the item, and then check it's quantity
  });

  // console.log(choices);

  // console.log(res);
});

// NOTE: prompt id of product, and then prompt the quantity.
// NOTE: once the input is given, check the quantity and check if there's enough.
// NOTE: if there is, deplete stock, or else show "insufficient quantity"
