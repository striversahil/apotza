import { Router } from "express";
import StepBlockController from "../controllers/stepBlock.controller";

const router: Router = Router();

router.route("/:id").get(StepBlockController.getStep);

router.route("/").post(StepBlockController.createStep);

// router.route("/name").post(updateCodeBlockName);

// router.route("/duplicate").post(duplicate);
router.route("/code").post(StepBlockController.codeUpdate);

router.route("/delete").post(StepBlockController.deleteStep);

export default router;
