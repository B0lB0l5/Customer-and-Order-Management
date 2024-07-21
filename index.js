import express from "express";
import customerRouter from "./src/modules/customers/customer.router.js";
import productRouter from "./src/modules/products/product.router.js";
import orderRouter from "./src/modules/orders/order.router.js";
import errorHandler from "./src/middleware/errorHandler.js";
import authMiddleware from "./src/middleware/authMiddleware.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/customers", customerRouter)
app.use("/products", productRouter)
app.use("/orders", orderRouter)

app.use(errorHandler);
app.use(authMiddleware);

app.listen(port, () => console.log(`app listening on port ${port}...`));
