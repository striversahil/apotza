import { Router } from "express";
import CodeBlockController from "../controllers/codeBlock.controller";

const router: Router = Router();

router.route("/:id").get(CodeBlockController.getCodeBlock);

router.route("/").post(CodeBlockController.create);

// router.route("/name").post(CodeBlockController.updateCodeBlockName);

router.route("/delete").post(CodeBlockController.deleteCodeblock);

export default router;
