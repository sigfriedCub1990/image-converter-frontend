import express from "express";

import orders from "./order.routes";

const router = express.Router();

router.use(orders);

export default router;
