import dbconnection from "../../../db/connection.js";
import bcrypt from "bcrypt";

const connection = dbconnection();

const signup = (req, res) => {
  try {
    connection.execute(
      "select email from customers where email = ?",
      [req.body.email],
      (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Database error", error: err });

        if (results.length != 0)
          return res
            .status(409)
            .json({ message: "email already exist", results });

        const customerData = { ...req.body, password: bcrypt.hashSync(req.body.password, 10) };

        connection.query(
          "insert into customers set ?",
          customerData,
          (err, results) => {
            if (err)
              return res
                .status(500)
                .json({ message: "Database error", error: err });

            res.status(201).json({ message: "Customer registered", results });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const login = (req, res) => {
  connection.query(
    `select email, password from customers where email = '${req.body.email}'`,(err, results) => {
      if (err)
        return res.status(500).json({ message: "Database error", error: err });

      if (results.length == 0) 
        return res.status(401).json({ message: "Invalid Password or Email" });
      
      const isMatch = bcrypt.compareSync(req.body.password, results[0].password )

      if(!isMatch)
        return res.status(401).json({ message: "Invalid Password or Email" })

      const sqlGetProducts = 'SELECT product_name, category, unit_price FROM `products`';
      connection.query(sqlGetProducts, (err, products) => {
        if (err) 
          return res.status(500).json({ message: "Database error", error: err });

        res.status(200).json({message: "Login successful", products: products});
    });
});
}
export { signup, login };
