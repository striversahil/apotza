import { Request, Response } from "express";
import SectionService from "../service/section.service";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";

class SectionController {
  static async createSection(req: Request, res: Response) {
    try {
      const { page_id, component_id } = req.body;
      const section = await SectionService.create(page_id, component_id);
      if (!section) return ErrorResponse(res, "Section could not be created");
      SuccessResponse(res, "Section created successfully", section);
    } catch (error) {
      ErrorResponse(res, "", true);
    }
  }

  static async getSection(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "Section does not exist");
      const section = await SectionService.getById(id);
      if (!section) return ErrorResponse(res, "Section could not be fetched");
      SuccessResponse(res, "Section fetched successfully", section);
    } catch (error) {
      ErrorResponse(res, "", true);
    }
  }



  static async deleteSection(req: Request, res: Response) {
    try {
      console.log(req.params);
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "Section does not exist");
      const section = await SectionService.delete(id);
      if (!section) return ErrorResponse(res, "Section could not be deleted");
      SuccessResponse(res, "Section deleted successfully", section);
    } catch (error) {
      ErrorResponse(res, "", true);
    }
  }

  static async temp(req: Request, res: Response) {
    try {
    } catch (error) {
      ErrorResponse(res, "", true);
    }
  }
}

export default SectionController;
