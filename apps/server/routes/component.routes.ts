import { Router } from "express";
import ComponentController from "../controllers/component.controller";

const router: Router = Router();

// router.route("/getAll/:id").get(getComponents);

router.route("/").post(ComponentController.create);

router.route("/").get(ComponentController.getComponents);

router.route("/:id").get(ComponentController.getComponent);

router.route("/:id").delete(ComponentController.deleteComponent);

router.route("/update").patch(ComponentController.updateComponent);

router.route("/coordinates").patch(ComponentController.coordinateUpdate);

export default router;
