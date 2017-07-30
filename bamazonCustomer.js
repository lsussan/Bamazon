
var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table2');
const chalk = require('chalk');

//sql connection
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
	user: 'root',
	password: 'Viviana01',
	database: 'bamazon_db', 
});


//Provides connection status
connection.connect(function(err) {
    if (err) throw err;
    console.log('connected as id' + connection.threadId + '\n\n');
    start();
});

//Performs initial query of table of products
    var start = function() {
        connection.query('SELECT * FROM Products', function(err, res) {
            console.log('---------------------------------');
            console.log('Available Bamazon Products');
            console.log('---------------------------------');

            //New Table instance to format returned sql data
            var table = new Table({
                head: ['item_id', 'product_name', 'price', 'stock_quantity'],
                colWidths: [10, 40, 10, 20]
            });
            for (var i=0; i < res.length; i++) {
                var productArray = [res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity];
                table.push(productArray);
            }
            console.log(table.toString());
            buyItem();
        });
    };
//Prompts the customer on which item to buy
    var buyItem = function() {
        inquirer.prompt([{
            name: "Item",
            type: "input",
            message: "Choose the ID of the Item you would like to buy",
            validate: function(value) {

                //Validates answer
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log(chalk.blue.bgRed.bold("\nPlease enter only the item ID of the item you'd like to buy\n"));
                    return false;
                }
            }
        },

            //Prompts the customer for the quantity
            {
            name: "Qty",
            type: "input",
            message: "How many would you like to buy?",
            validate: function(value) {
                //validates answer
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log("\nPlease enter a quantity\n");
                    return false;
                }
            }
        }]).then(function(answer) {
            var itemInv = parseInt(answer.Qty);

            //Queries the database
            connection.query("SELECT * FROM Products WHERE ?", [{item_id: answer.Item}], function(err, data) {
                if (err) throw err;

                //Checks if sufficient quantity exists
                if (data[0].stock_quantity < itemInv) {
                    console.log("Insufficient Quantity!\n");
                    console.log("Please choose another product\n");
                    start();
                } else {

                    //If quantity exists updates database
                    var updateQty = data[0].stock_quantity - itemInv;
                    var totalPrice = data[0].price * itemInv;
                    connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [updateQty, answer.Item], function(err, results) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("Purchase complete!\n");
                            console.log("Your total cost is: $ " + totalPrice);

                            //Asks the buyer if they would like to continue
                            inquirer.prompt({
                                name: "buyMore",
                                type: "confirm",
                                message: "Would you like to buy another product?",
                            }).then(function(answer) {
                                if (answer.buyMore === true) {
                                    start();
                                } else {
                                    console.log("Thank your for shopping with Bamazon!");
                                    connection.end();
                                }
                            });
                        }
                    });
                }
            });
        });
    };