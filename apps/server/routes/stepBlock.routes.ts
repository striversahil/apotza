import { Router } from "express";
import StepBlockController from "../controllers/stepBlock.controller";

const router: Router = Router();

router.route("/:id").get(StepBlockController.getStep);

router.route("/").post(StepBlockController.createStep);

router.route("/run").post(StepBlockController.runBlock);

// router.route("/duplicate").post(duplicate);
router.route("/update").patch(StepBlockController.Update);

router.route("/:id").delete(StepBlockController.deleteStep);

export default router;
