import { accToken } from "../../middleware/accToken";
import { extraAuthorization } from "../../middleware/extraAuth";
import { UserControllers } from "../Controllers/userControllers";
import { Router } from "express";
import multer from "multer";
const userRoutes = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

userRoutes.get("/getUsers", accToken, UserControllers.getUser);

userRoutes.post("/register", extraAuthorization, UserControllers.registerUser);

userRoutes.post("/login", extraAuthorization, UserControllers.loginUser);

userRoutes.post(
	"/verifyAccToken",
	extraAuthorization,
	UserControllers.verifyAccToken
);

userRoutes.post(
	"/verifyRefreshToken",
	extraAuthorization,
	UserControllers.verifyRefreshToken
);

userRoutes.post(
	"/uploadProfilePicture",
	upload.single("image"),
	extraAuthorization,
	UserControllers.uploadProfileImage
);

userRoutes.post(
	"/updateStudent",
	extraAuthorization,
	UserControllers.updateStudent
);

//TODO :middleware
userRoutes.get("/getUserById/:userId", UserControllers.getUserById);

export { userRoutes };
