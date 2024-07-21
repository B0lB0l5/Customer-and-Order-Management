import moment from "moment";
import dbconnection from "../../../db/connection.js";

const connection = dbconnection();

const create = (req, res) => {
    const { customer_id, order_items } = req.body;
    const order_date = moment().format('YYYY-MM-DD HH:mm:ss'); 
  
    const productIds = order_items.map(item => item.product_id);
  
    if (productIds.length == 0) {
      return res.status(400).json({ message: "No products in order" });
    }
  
    const sqlGetPrices = `SELECT id, unit_price FROM products WHERE id IN (${productIds.join(',')})`;
  
    connection.query(sqlGetPrices, (err, productPrices) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });
  
      const priceMap = {};
      productPrices.forEach(product => {
        priceMap[product.id] = product.unit_price;
      });
  
      const total_amount = order_items.reduce((sum, item) => {
        return sum + (item.quantity * priceMap[item.product_id]);
      }, 0);
  
      const orderData = { customer_id, order_date, total_amount };
  
      const sqlOrder = "INSERT INTO orders SET ?";
  
      connection.query(sqlOrder, orderData, (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
  
        const orderId = result.insertId;
        const sqlOrderItems = "INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES ?";
        const values = order_items.map((item) => [
          orderId,
          item.product_id,
          item.quantity,
          priceMap[item.product_id],
        ]);
  
        connection.query(sqlOrderItems, [values], (err, result) => {
          if (err)
            return res.status(500).json({ message: "Database error", error: err });
  
          res.status(201).json({ message: "Order created successfully", orderId });
        });
      });
    });
};

const average_order = (req, res) => {
  const sql = "SELECT AVG(total_amount) AS average_order_value FROM orders";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
};

const customers_no_order = (req, res) => {
  const sql = `
        SELECT * FROM customers 
        WHERE id NOT IN (SELECT customer_id FROM orders)
    `;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const top_customer_items = (req, res) => {
  const sql = `
        SELECT customer_id, SUM(order_items.quantity) AS total_items
        FROM orders
        JOIN order_items ON orders.id = order_items.order_id
        GROUP BY customer_id
        ORDER BY total_items DESC
        LIMIT 1
    `;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
};

const top_customers_spending = (req, res) => {
  const sql = `
        SELECT customer_id, SUM(total_amount) AS total_spent
        FROM orders
        GROUP BY customer_id
        ORDER BY total_spent DESC
        LIMIT 10
    `;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const customers_5_orders = (req, res) => {
  const sql = `
        SELECT customer_id, COUNT(*) AS order_count
        FROM orders
        GROUP BY customer_id
        HAVING order_count >= 5
    `;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const customers_multiple_orders = (req, res) => {
  const sql = `
        SELECT 
            (COUNT(DISTINCT CASE WHEN order_count > 1 THEN customer_id END) / COUNT(DISTINCT customer_id)) * 100 
            AS percentage_customers
        FROM (
            SELECT customer_id, COUNT(*) AS order_count
            FROM orders
            GROUP BY customer_id
        ) AS customer_orders
    `;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
};

const earliest_order_customer = (req, res) => {
  const sql = `
        SELECT customer_id, MIN(order_date) AS earliest_order_date
        FROM orders
        GROUP BY customer_id
        ORDER BY earliest_order_date
        LIMIT 1
    `;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
};

const orderControllers = {
  create,
  average_order,
  customers_no_order,
  top_customer_items,
  top_customers_spending,
  customers_5_orders,
  customers_multiple_orders,
  earliest_order_customer,
};

export default orderControllers;
