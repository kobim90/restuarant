const mysql = require("mysql2");
const {AppError} = require('../utilities/customeErrors')
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "ucWiv9aSqlP",
  database: "restaurant_db",
});

const promisePool = pool.promise();

function getToday() {
    const date = new Date()
    return today = {
        day: date.getDate(),
        month: date.getMonth()+1,
        year: date.getFullYear()
    }
}

async function getLastDayOrders(){
    try{
        const today = getToday()
        const sql_query = `select * from orders where year(orderDate) = ${today.year} and day(orderDate) = ${today.day} and month(orderDate) = ${today.month};`
        const [result] = await promisePool.execute(sql_query)
        return result
    }
    catch(error){
        throw new AppError('DB error', 500)
    }
}

async function postOrder({data}){
    try{
        const sql_query1 = `insert into orders (customerId, orderDate, orderCity, orderAddress)
                            values ("${data.customerId}", "${data.orderDate.trim()}", "${data.orderCity.trim()}", "${data.orderAddress.trim()}");`
        const [result1] = await promisePool.execute(sql_query1)

        let sql_query2 = `insert into order_details values `
        data.products.forEach( (product, index) => {
            if (index < data.products.length - 1) {
                sql_query2 += `("${result1.insertId}", "${product.productId}", "${product.quantity}"),`
            }else sql_query2 += `("${result1.insertId}", "${product.productId}", "${product.quantity}");`
        });

        const [result2] = await promisePool.execute(sql_query2)
        return result2
    }
    catch(error){
        throw new AppError('DB error', 500)
    }
}

module.exports = {
    getLastDayOrders,
    postOrder
}