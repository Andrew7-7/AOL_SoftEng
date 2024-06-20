import { Router } from "express";
import { WalletController } from "../Controllers/walletControllers";

const walletRoutes = Router ();

walletRoutes.get("/getFinalTransaction/:email", WalletController.getFinalTransaction);

export {walletRoutes};