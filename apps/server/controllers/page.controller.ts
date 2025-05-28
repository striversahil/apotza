import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";
import { PageService } from "../service/page.service";
import { redis } from "..";
import { projectCookie } from "../utils/CookieConfig";

export class PageController {
  static async getPage(req: Request, res: Response) {
    try {
      const { page_name } = req.params;
      const project_id = req.cookies.project_id;
      const current_page = req.cookies.current_page;

      if (!page_name || !current_page)
        return ErrorResponse(res, "Page does not exist , provide id", 404);
      if (!project_id) return ErrorResponse(res, "Project does not exist", 404);

      const redis_page = await redis.get(`page:${current_page}`);

      if (redis_page) {
        const page = JSON.parse(redis_page);

        if (page.name == page_name) {
          SuccessResponse(res, "Page fetched successfully", null, page);
        }
        // res.cookie("current_page", page.id, projectCookie);

        return;
      }

      const page = await PageService.getOne(page_name, project_id);
      if (!page) return ErrorResponse(res, "Page could not be fetched", 404);

      await redis.set(`page:${current_page}`, JSON.stringify(page));
      res.cookie("current_page", page.id, projectCookie);

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

      await redis.del(`project:${page.project}`);
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

      await redis.del(`project:${page.project}`);
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

      await redis.del(`project:${page.project}`);
      SuccessResponse(res, "Page deleted successfully", null, page);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  // static async refechPage(project_id: string, id: string) {
  //   try {
  //     const page: any = await PageService.getOne(id, project_id);
  //     if (!page) return false;

  //     await redis.del(`page:${id}`);
  //     await redis.set(`page:${id}`, JSON.stringify(page));
  //     return true;
  //   } catch (error) {
  //     throw new Error(error as string);
  //   }
  // }

  static async temp(req: Request, res: Response) {
    try {
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }
}
