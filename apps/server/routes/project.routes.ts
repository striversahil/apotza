import { Router } from "express";
import ProjectController from "../controllers/project.controller";

const router: Router = Router();

router.route("/").get(ProjectController.getProject);

router.route("/all").get(ProjectController.getAllProjects);

router.route("/new").get(ProjectController.createProject);

router.route("/delete").get(ProjectController.deleteProject);

router.route("/name").post(ProjectController.updateName);

export default router;
