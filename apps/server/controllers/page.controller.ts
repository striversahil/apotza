import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";
import { PageService } from "../service/page.service";

export class PageController {
  static async getPage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project_id = req.cookies.project_id;
      if (!id)
        return ErrorResponse(res, "Page does not exist , provide id", 404);
      const page = await PageService.getOne(id, project_id);
      if (!page) return ErrorResponse(res, "Page could not be fetched", 404);
      SuccessResponse(res, "Page fetched successfully", null, page);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async createPage(req: Request, res: Response) {
    try {
      const project_id = req.cookies.project_id;
      if (!project_id) return ErrorResponse(res, "Project does not exist", 404);
      if (!req.body) return ErrorResponse(res, "Provide all fields", 400);
      const page = await PageService.create(project_id, { ...req.body });
      if (!page) return ErrorResponse(res, "Page could not be created", 400);
      SuccessResponse(res, "Page created successfully", null, page);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async updatePage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { ...data } = req.body;
      if (!id || !data) return ErrorResponse(res, "Provide all fields", 400);
      const page = await PageService.update(id, data);
      if (!page) return ErrorResponse(res, "Page could not be updated", 400);
      SuccessResponse(res, "Page updated successfully", null, page);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async deletePage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id)
        return ErrorResponse(res, "Page does not exist , provide id", 404);
      const page = await PageService.delete(id);
      if (!page) return ErrorResponse(res, "Page could not be deleted", 404);
      SuccessResponse(res, "Page deleted successfully", null, page);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }
}
