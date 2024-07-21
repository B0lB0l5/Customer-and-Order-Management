import { Router } from "express";
import orderControllers from "./order.controller.js"; 

const orderRouter = Router();

orderRouter.post("/create", orderControllers.create);
orderRouter.get("/average-order", orderControllers.average_order);
orderRouter.get("/customers-no-orders", orderControllers.customers_no_order);
orderRouter.get("/top-customer-items", orderControllers.top_customer_items);
orderRouter.get("/top-customers-spending", orderControllers.top_customers_spending);
orderRouter.get("/customers-5-orders", orderControllers.customers_5_orders);
orderRouter.get("/customers-multiple-orders", orderControllers.customers_multiple_orders);
orderRouter.get("/earliest-order-customer", orderControllers.earliest_order_customer);

export default orderRouter;
