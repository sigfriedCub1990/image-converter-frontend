import { ordersDb } from "../../data-access";

import Config from "../../config";
import makePostOrder from "./post-order";

const postOrder = makePostOrder({
  ordersDb,
  Config,
});

const orderService = Object.freeze({
  postOrder,
});

export default orderService;

export { postOrder };
