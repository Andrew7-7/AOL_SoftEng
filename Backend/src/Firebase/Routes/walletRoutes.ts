import { Router } from "express";
import { WalletController } from "../Controllers/walletControllers";
import { extraAuthorization } from "../../middleware/extraAuth";
const walletRoutes = Router ();

walletRoutes.get("/getFinalTransaction/:email", WalletController.getFinalTransaction);
walletRoutes.get("/getAmount/:email", WalletController.countValues);
walletRoutes.get("/getPendingPayment/:email", WalletController.getPendingPayment);
walletRoutes.get("/getCourseName/:id", WalletController.getCourseName);
walletRoutes.get("/getPayments/:email", WalletController.getPaymentReceived);
walletRoutes.post("/validate", extraAuthorization, WalletController.validateUser);
walletRoutes.post("/addWallet", extraAuthorization, WalletController.addWallet);

export {walletRoutes};