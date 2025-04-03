import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";
import { PageService } from "../service/page.service";

export class PageController {
  static async getPage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "Page does not exist , provide id");
      const page = await PageService.getOne(id);
      if (!page) return ErrorResponse(res, "Page could not be fetched");
      SuccessResponse(res, "Page fetched successfully", page);
    } catch (error) {
      console.log(error);
    }
  }

  static async createPage(req: Request, res: Response) {
    try {
      const project_id = req.cookies.project_id;
      if (!project_id) return ErrorResponse(res, "Project does not exist");
      if (!req.body) return ErrorResponse(res, "Provide all fields");
      const page = await PageService.create(project_id, { ...req.body });
      if (!page) return ErrorResponse(res, "Page could not be created");
      SuccessResponse(res, "Page created successfully", page);
    } catch (error) {
      console.log(error);
    }
  }

  static async updatePage(req: Request, res: Response) {
    try {
      const { id, ...data } = req.body;
      if (!id || !data) return ErrorResponse(res, "Provide all fields");
      const page = await PageService.update(id, data);
      if (!page) return ErrorResponse(res, "Page could not be updated");
      SuccessResponse(res, "Page updated successfully", page);
    } catch (error) {
      console.log(error);
    }
  }

  static async deletePage(req: Request, res: Response) {
    try {
      const { id } = req.body;
      if (!id) return ErrorResponse(res, "Page does not exist , provide id");
      const page = await PageService.delete(id);
      if (!page) return ErrorResponse(res, "Page could not be deleted");
      SuccessResponse(res, "Page deleted successfully", page);
    } catch (error) {
      console.log(error);
    }
  }
}
