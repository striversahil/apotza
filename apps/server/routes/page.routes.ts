import { Router } from "express";
import { PageController } from "../controllers/page.controller";

const router: Router = Router();

// router.route("/").get();

router.route("/").post(PageController.createPage);

router.route("/:page_name").get(PageController.getPage);

router.route("/:id").patch(PageController.updatePage);

router.route("/:id").delete(PageController.deletePage);

export default router;
