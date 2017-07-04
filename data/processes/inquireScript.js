    'use strict';

    const inquirer = require('inquirer');

    inquirer.prompt([{
    name: "item",
    type: "rawlist",
    message: "What item would you like to buy?",
    choices: newArr
    }, {
    name: "qty",
    type: "input",
    message: "How many would you like to buy?",
    validate: function(value) {
        connection.query('select inventory  from products where ?', [{
            id: 'qty'
        }], function(err, res) {
            if (err) throw err;
        })
        if (res[0].inventory >= value) {
            return true;
        } else {
            return 'Sorry we don\'t have that many in stock.  Try ordering fewer of these';
        }
    }
    }]).then(function(answer) {
    prod = answer.item;
    var splProd = prod.split(' ');
    var qty = answer.qty;
    var itemId = splProd[0];
    var prod = splProd[1]
    var price = splProd[2];
    var taxRate = .0875;
    var subTotal = parseInt(qty) * parseFloat(price)
    var withTax = subTotal * taxRate;
    //--------------------------------------------------------------------------
    // Check variables
    console.log('You have ordered : ' + qty + ' of our product = ' + prod + ' at $' + price + ' each.')
    console.log('TOTAL COST:');
    console.log('_____________________');
    console.log('Products : $' + parseFloat(subTotal).toFixed(2));
    console.log('Taxes    : $' + parseFloat(withTax).toFixed(2));
    console.log('---------------------');
    console.log('Total    : $' + parseFloat(subTotal + withTax).toFixed(2));

    // ------------------------------------------------------------------------- 
    connection.query("UPDATE products SET ? WHERE ? ", [{
        inventory: parseInt(res[0].inventory - qty)
    }, {
        id: itemId
    }]);
    process.exit();
    });


    });

    }
