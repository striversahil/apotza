import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";
import { PageService } from "../service/page.service";

export class PageController {
  static async getPage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "Page does not exist");
      const page = await PageService.getOne(id);
      if (!page) return ErrorResponse(res, "Page could not be fetched");
      SuccessResponse(res, "Page fetched successfully", page);
    } catch (error) {
      console.log(error);
    }
  }
}
