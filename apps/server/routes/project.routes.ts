import { Router } from "express";
import ProjectController from "../controllers/project.controller";

const router: Router = Router();

router.route("/").get(ProjectController.getProject);

router.route("/context").get(ProjectController.globalContext);

router.route("/new").post(ProjectController.createProject);

router.route("/").delete(ProjectController.deleteProject);

router.route("/name").post(ProjectController.updateName);

export default router;
