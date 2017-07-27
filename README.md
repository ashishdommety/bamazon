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
