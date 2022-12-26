import { postOrder } from "../use-cases/orders";

export default Object.freeze({
  postOrder: (httpRequest) => postOrder(httpRequest, null), // null = postPaymentLink in original article
});
