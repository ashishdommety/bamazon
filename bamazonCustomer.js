const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = require("./credentials.js");

connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId );
});

const query = connection.query("SELECT * FROM products", function(err, res) {
  var choices = [];
  console.log("-----------Available Products-----------");
  for (var i = 0; i < res.length; i++) {
    choices.push(`${res[i].item_id} - ${res[i].product_name} - $${res[i].price}`);
    console.log(`${res[i].item_id} - ${res[i].product_name} - $${res[i].price}`);
  }
  buy();
});

function buy() {
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
          connection.query("UPDATE products SET ? WHERE ?", [{
              stock_quantity: res[0].stock_quantity - parseInt(answer.itemQuantity)
            },
            {
              item_id: answer.itemId
            }
          ], function(error) {
            if (error) throw err;
            console.log(`You just bought ${answer.itemQuantity} ${res[0].product_name}s worth $${res[0].price * answer.itemQuantity}`);
            inquirer.prompt([{
              type:"confirm",
              message:"Would you like to keep shopping?",
              name:"keepShopping"
            }]).then(function(reply){
              if(reply.keepShopping){
                buy();
              } else{
                console.log("Thanks for shopping with us! Have a nice day!");
              }
            })
          });
        } else {
          console.log("\nInsufficient Quantity!\n");
          buy();
        }
      });
    });
}
