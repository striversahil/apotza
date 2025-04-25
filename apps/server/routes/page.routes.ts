import { Router } from "express";
import { PageController } from "../controllers/page.controller";

const router: Router = Router();

// router.route("/").get();

router.route("/").post(PageController.createPage);

router.route("/:id").get(PageController.getPage);

router.route("/update").post(PageController.updatePage);

router.route("/delete").post(PageController.deletePage);

export default router;
