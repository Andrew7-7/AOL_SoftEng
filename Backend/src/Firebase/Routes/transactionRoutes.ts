import { transactionControllers } from "../Controllers/transactionControllers";
import { Router } from "express";
import { accToken } from "../../middleware/accToken";
import { extraAuthorization } from "../../middleware/extraAuth";

const transactionsRoutes = Router();

// TODO: middleware
transactionsRoutes.get("/getTransactions", transactionControllers.getTransactions);
transactionsRoutes.get("/getTransaction/:transactionId", transactionControllers.getTransaction);
transactionsRoutes.post("/registerTransaction", transactionControllers.registerTransaction);

export { transactionsRoutes };
