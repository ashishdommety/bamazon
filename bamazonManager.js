const inquirer = require("inquirer");
const mysql = require("mysql");
const Table = require("cli-table");

const connection = require("./credentials.js");

connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId );
});

inquirer.prompt([{
  type: "list",
  message: "What would you like to do?",
  choices: ["View Products for Sale", "View Low Inventory", "Add To Inventory", "Add New Product"],
  name: "feature"
}]).then(function(answer) {
  if (answer.feature === "View Products for Sale") {
    displaySale();
  } else if (answer.feature === "View Low Inventory") {
    displayLow();
  } else if (answer.feature === "Add To Inventory") {
    addInventory();
  } else {
    addNewProduct();
  }
});

function displaySale() {
  console.log("\n All the products available for sale: \n");
  var table = new Table({
    head:["ID", "Name", "Department", "Price", "Stock"],
    colWidths:[5,15,20,10,10]
  });
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id,res[i].product_name,res[i].department_name,res[i].price,res[i].stock_quantity]);
      // console.log(`${res[i].item_id}--Name:${res[i].product_name} --Department:${res[i].department_name}--Price:$${res[i].price}--Stock:${res[i].stock_quantity}`);
    }
    console.log(table.toString());
  })
}

function displayLow() {
  connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(err, res) {
    if (res.length) {
      console.log("\n All the products low on inventory: \n");
      var table = new Table({
        head:["ID", "Name", "Department", "Price", "Stock"],
        colWidths:[5,15,20,10,10]
      });
      for (var i = 0; i < res.length; i++) {
        table.push([res[i].item_id,res[i].product_name,res[i].department_name,res[i].price,res[i].stock_quantity]);
        // console.log(`${res[i].item_id}  ${res[i].product_name}  ${res[i].department_name}  $${res[i].price}  ${res[i].stock_quantity}`);
      }
    } else {
      console.log("\n There are no products that are less than 5 in quantity \n");
    }
  });
}

function addInventory() {
  inquirer.prompt([{
      type: "input",
      message: "Enter id of product would you like to add Inventory to:",
      name: "addItem"
    },
    {
      type: "input",
      message: "How many items of this product would you like to add?",
      name: "addItemQuantity"
    }
  ]).then(function(answer) {
    connection.query("SELECT * FROM products WHERE item_id=?", [answer.addItem], function(err, res) {
      connection.query("UPDATE products SET ? WHERE ?", [{
            stock_quantity: res[0].stock_quantity + parseInt(answer.addItemQuantity)
          },
          {
            item_id: parseInt(answer.addItem)
          }
        ],
        function(err) {
          console.log(`You have added to the item '${res[0].product_name}' with ${answer.addItemQuantity} products`);
        });
    });
  });
}

function addNewProduct() {
  inquirer.prompt([{
      type: "input",
      message: "Enter the name of the product you want to add to the inventory",
      name: "productName"
    },
    {
      type: "input",
      message: "What category does this product fall under?",
      name: "productCategory"
    },
    {
      type: "input",
      message: "How much does each product cost?",
      name: "productPrice"
    }, {
      type: "input",
      message: "Enter the intial stock of the product",
      name: "productStock"
    }
  ]).then(function(answer) {
    var query = connection.query("INSERT INTO products SET ?",
    {
      product_name: answer.productName,
      department_name: answer.productCategory,
      price: answer.productPrice,
      stock_quantity: answer.productStock
    },
     function(err, result) {
      if (err) throw err;
      console.log(`You've successfully added ${answer.productName}`);
    })
  })
}
