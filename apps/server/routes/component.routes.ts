import { Router } from "express";
import {
  deleteComponent,
  getComponents,
  getComponent,
  newComponent,
  updateComponent,
  updateCoordinates,
} from "../controllers/project/components/_component.controller";

const router = Router();

router.route("/getAll/:id").get(getComponents);

router.route("/").post(newComponent);

router.route("/:id").get(getComponent);

router.route("/delete").post(deleteComponent);

router.route("/update/").post(updateComponent);

router.route("/coordinates").post(updateCoordinates);

export default router;
