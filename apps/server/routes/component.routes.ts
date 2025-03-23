import { Router } from "express";
import ComponentController from "../controllers/component.controller";

const router: Router = Router();

// router.route("/getAll/:id").get(getComponents);

router.route("/").post(ComponentController.create);

router.route("/:id").get(ComponentController.getComponent);

router.route("/delete").post(ComponentController.deleteComponent);

// router.route("/update/").post(ComponentController.coordinateUpdate);

router.route("/coordinates").post(ComponentController.coordinateUpdate);

export default router;
