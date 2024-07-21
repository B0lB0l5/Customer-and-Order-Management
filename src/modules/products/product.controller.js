import dbconnection from "../../../db/connection.js";

const connection = dbconnection();

const add = (req, res) => {
    const { product_name, category, unit_price } = req.body;

    if (!product_name || !category || !unit_price) 
        return res.status(400).json({ message: 'All fields are required' });
    
    const productData = { product_name, category, unit_price }

    connection.query('insert into products set ?', productData, (err, result) => {
        if (err)  
            return res.status(500).json({ message: 'Database error', error: err });
        else
        res.status(201).json({ message: 'Product added successfully', result });
    });
}

const revenue_category = (req, res) => {
    const sql = `
        SELECT category, SUM(order_items.quantity * order_items.unit_price) AS total_revenue
        FROM products
        JOIN order_items ON products.id = order_items.product_id
        GROUP BY category
    `;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const items_sold = (req, res) => {
    const sql = `
    SELECT product_name, SUM(order_items.quantity) AS total_sold
    FROM products
    JOIN order_items ON products.id = order_items.product_id
    GROUP BY product_name`;
connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
});
}

export {add, revenue_category, items_sold}
