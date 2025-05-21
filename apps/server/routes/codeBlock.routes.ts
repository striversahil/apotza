import { Router } from "express";
import CodeBlockController from "../controllers/codeBlock.controller";

const router: Router = Router();

router.route("/:id").get(CodeBlockController.getCodeBlock);

router.route("/:id/context").get(CodeBlockController.contextCodeBlock);

router.route("/").post(CodeBlockController.create);

router.route("/run").post(CodeBlockController.runAllSteps);

router.route("/:id").patch(CodeBlockController.updateCodeBlock);

router.route("/:id").delete(CodeBlockController.deleteCodeblock);

export default router;
