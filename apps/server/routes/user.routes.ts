import { Router } from "express";

import { authenticate, authController } from "../middleware/auth.middleware";
import UserController from "../controllers/user.controller";

const router: Router = Router();

router.route("/").get(authenticate, UserController.getUser);

router.route("/signup").post(UserController.signUp);

router.route("/signin").post(UserController.login);

router.route("/logout").post(UserController.logout);

router.route("/access_token").post(UserController.updateAccessToken);

router.route("/").delete(authenticate, UserController.deleteUser);

// Middleware Testing
router.route("/auth").get(authenticate, authController);

export default router;
