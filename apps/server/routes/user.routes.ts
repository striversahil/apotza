import { Router } from "express";

import { authenticate, authController } from "../middleware/auth.middleware";
import UserController from "../controllers/user.controller";
import { redis } from "..";

const router: Router = Router();

router.route("/").get(authenticate, UserController.getUser);

router.route("/signup").post(UserController.signUp);

router.route("/signin").post(UserController.login);

router.route("/logout").post(UserController.logout);

router.route("/access_token").post(UserController.updateAccessToken);

router.route("/").delete(authenticate, UserController.deleteUser);

router.route("/test").get(async (req, res) => {
  // redis.set("hello", JSON.stringify({ hello: "world" }));
  //   redis.expire("hello", 10);
  const data = await redis.get("hello");
  res.send(JSON.parse(data ?? "[]"));
});

// Middleware Testing
router.route("/auth").get(authenticate, authController);

export default router;
