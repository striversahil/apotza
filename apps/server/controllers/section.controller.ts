import { Request, Response } from "express";
import SectionService from "../service/section.service";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";
import { redis } from "..";

class SectionController {
  static async createSection(req: Request, res: Response) {
    try {
      const { page_id, component_id } = req.body;
      const section = await SectionService.create(page_id, component_id);
      if (!section)
        return ErrorResponse(res, "Section could not be created", 400);
      SuccessResponse(res, "Section created successfully", null, section);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async getSection(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "Section does not exist", 404);

      const redis_section = await redis.get(`section:${id}`);
      if (redis_section) {
        const section = JSON.parse(redis_section);
        SuccessResponse(res, "Section fetched successfully", null, section);
        return;
      }
      const section = await SectionService.getById(id);
      if (!section)
        return ErrorResponse(res, "Section could not be fetched", 404);

      await redis.set(`section:${id}`, JSON.stringify(section));
      SuccessResponse(res, "Section fetched successfully", null, section);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async deleteSection(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "Section does not exist", 404);
      const section = await SectionService.delete(id);
      if (!section)
        return ErrorResponse(res, "Section could not be deleted", 404);
      SuccessResponse(res, "Section deleted successfully", null, section);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async temp(req: Request, res: Response) {
    try {
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }
}

export default SectionController;
