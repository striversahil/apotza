import { Router } from "express";
import ProjectController from "../controllers/project.controller";

const router: Router = Router();

router.route("/").get(ProjectController.getProject);

router.route("/new").get(ProjectController.createProject);

router.route("/").delete(ProjectController.deleteProject);

router.route("/name").post(ProjectController.updateName);

router.route("/context").get(ProjectController.globalContext);

export default router;
