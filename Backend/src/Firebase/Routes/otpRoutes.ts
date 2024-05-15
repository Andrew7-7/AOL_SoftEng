import { accToken } from "../../middleware/accToken";
import { extraAuthorization } from "../../middleware/extraAuth";
import { OTPControllers } from "../Controllers/otpControllers";
import { Router } from "express";
const otpRoutes = Router();

otpRoutes.post("/sendOTP", extraAuthorization, OTPControllers.sendOTP);
otpRoutes.post("/checkOTP", extraAuthorization, OTPControllers.checkOTP);

export { otpRoutes };
