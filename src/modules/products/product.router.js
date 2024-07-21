import { Router } from "express";
import { add, items_sold, revenue_category } from "./product.controller.js";

const productRouter = Router();

productRouter.post("/add", add);
productRouter.get("/revenue_category", revenue_category)
productRouter.get("/items_sold", items_sold)

export default productRouter;
