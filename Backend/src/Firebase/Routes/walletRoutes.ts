import { Router } from "express";
import { WalletController } from "../Controllers/walletControllers";

const walletRoutes = Router ();

walletRoutes.get("/getFinalTransaction/:email", WalletController.getFinalTransaction);
walletRoutes.get("/getAmount/:email", WalletController.countValues);
walletRoutes.get("/getPendingPayment/:email", WalletController.getPendingPayment);
walletRoutes.get("/getCourseName/:id", WalletController.getCourseName);
walletRoutes.get("/getPayments/:email", WalletController.getPaymentReceived);

export {walletRoutes};