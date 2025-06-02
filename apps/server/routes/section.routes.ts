import { Router } from "express";
import SectionController from "../controllers/section.controller";

const router: Router = Router();

// router.route("/").get(newSection);

router.route("/").post(SectionController.createSection);

router.route("/:id").get(SectionController.getSection);

router.route("/:id").patch(SectionController.updateSection);

router.route("/:id").delete(SectionController.deleteSection);

// router.route("/update/").post(updateComponent);

export default router;
