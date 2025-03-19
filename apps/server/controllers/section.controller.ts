import { Request, Response } from "express";
import SectionService from "../service/section.service";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";

class SectionController {
  static async createSection(req: Request, res: Response) {
    try {
      const project_id = req.cookies.project_id;
      if (!project_id) return ErrorResponse(res, "Project does not exist");
      const section = await SectionService.create(project_id);
      if (!section) return ErrorResponse(res, "Section could not be created");
      SuccessResponse(res, "Section created successfully", section);
    } catch (error) {
      console.log(error);
    }
  }

  static async getSection(req: Request, res: Response) {
    try {
      const { id } = req.body;
      if (!id) return ErrorResponse(res, "Section does not exist");
      const section = await SectionService.getById(id);
      if (!section) return ErrorResponse(res, "Section could not be fetched");
      SuccessResponse(res, "Section fetched successfully", section);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteSection(req: Request, res: Response) {
    try {
      const { id } = req.body;
      if (!id) return ErrorResponse(res, "Section does not exist");
      const section = await SectionService.delete(id);
      if (!section) return ErrorResponse(res, "Section could not be deleted");
      SuccessResponse(res, "Section deleted successfully", section);
    } catch (error) {
      console.log(error);
    }
  }

  static async temp(req: Request, res: Response) {
    try {
    } catch (error) {
      console.log(error);
    }
  }
}

export default SectionController;
