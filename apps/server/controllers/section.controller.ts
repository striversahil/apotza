import { Request, Response } from "express";
import SectionService from "../service/section.service";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";
import { redis } from "..";

class SectionController {
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

  static async createSection(req: Request, res: Response) {
    try {
      const projectId = req.cookies.project_id;
      if (!projectId) return ErrorResponse(res, "Project does not exist", 404);
      const { page_id, component_id } = req.body;

      if (!page_id || !component_id)
        return ErrorResponse(
          res,
          "Provide all fields" + page_id + component_id,
          400
        );
      const section = await SectionService.create(
        projectId,
        page_id,
        component_id
      );
      if (!section)
        return ErrorResponse(res, "Section could not be created", 400);

      await redis.del(`page:${section.page}`);
      SuccessResponse(res, "Section created successfully", null, section);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async updateSection(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "Section does not exist", 404);
      const { ...data } = req.body;
      const section = await SectionService.update(id, data);
      if (!section)
        return ErrorResponse(res, "Section could not be updated", 400);

      await redis.del(`page:${section.page}`);
      SuccessResponse(res, "Section updated successfully", null, section);
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

      await redis.del(`page:${section.page}`);
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
