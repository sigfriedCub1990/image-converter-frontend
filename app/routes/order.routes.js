import express from "express";

import controller from "../controllers/order.controller";
import makeExpressCallback from "./make-callback";

const router = express.Router();

router.route("/order").post(makeExpressCallback(controller.postOrder));
router
  .route("/order/:orderId")
  .get(makeExpressCallback(controller.getOrderById));

export default router;
