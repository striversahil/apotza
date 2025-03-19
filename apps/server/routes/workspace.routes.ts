import { Router } from "express";
import workspaceController from "../controllers/workspace.controller";

const router: Router = Router();

// WorkSpace Routes
router.route("/").get(workspaceController.getWorkspace);

router.route("/all").get(workspaceController.getAllWorkspaces);

router.route("/new").get(workspaceController.createWorkspace);

router.route("/delete").get(workspaceController.deleteWorkspace);

export default router;
