# bamazon
Bamazon is an amazon storefront clone that works with Node and MySQL.
There are two separate Javascript files that a user can choose from:

1. bamazonCustomer.js
2. bamazonManager.js


## The Bamazon Customer
<img align="left" src="https://github.com/ashishdommety/bamazon/blob/master/gifs/bamazonCustomer.gif">


### Step 1:
In this option, the customer is displayed all the available products, their price and IDs.

### Step 2:
 On choosing an ID the CLI will prompt the user how many products they'd like to buy. If the quantity the user chooses exceeds the stock availability, then the user will receive a notification:

```
Insufficient Quantity!
```
If not, then the users purchase will go through, showing them how many products they bought and the total cost.

### Step 3:
After a purchase, the user is prompted whether they want to buy more products or quit.

<br>
<br>
<br>
## The Bamazon Manager
<img align="right" src="https://github.com/ashishdommety/bamazon/blob/master/gifs/bamazonManager.gif">


In this option, the manager has four options:
1. View Products for Sale
2. View Low Inventory
3. Add to Inventory
4. Add New Product

### View Products For Sale:
 The manager can view all of the products that are available for sale in tabular form. This was created using the ["cli-table" npm package.](https://www.npmjs.com/package/cli-table)

### View Low Inventory:
This option shows the manager any products available that has 5 items or less in their stock.

### Add to Inventory
The manager is then able to add stock to any item choosing "Add to Inventory". All they have to do is select the products ID and then choose how many products they'd like to add.

### Add New Product
This feature allows the manager to add a whole new product, and allows them to enter the price of each product, their department, and the intial stock.




## Technologies Used:
The Technologies used in this project were:
1. Node JS
2. mySql
3. Inquirer, mysql and cli-table (npm packages)
