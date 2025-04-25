import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";
import CodeBlockService from "../service/codeblock.service";

class CodeBlockController {
  static async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const project_id = req.cookies.project_id;
      if (!project_id) return ErrorResponse(res, "Project does not exist");
      const codeBlock = await CodeBlockService.create(project_id, name);
      if (!codeBlock)
        return ErrorResponse(res, "CodeBlock could not be created");
      SuccessResponse(res, "CodeBlock created successfully", codeBlock);
    } catch (error) {
      ErrorResponse(res, "", true);
    }
  }

  static async getCodeBlock(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "CodeBlock does not exist");
      const codeBlock = await CodeBlockService.getById(id);
      if (!codeBlock)
        return ErrorResponse(res, "CodeBlock could not be fetched");
      SuccessResponse(res, "CodeBlock fetched successfully", codeBlock);
    } catch (error) {
      ErrorResponse(res, "", true);
    }
  }

  static async runAllSteps(req: Request, res: Response) {
    const { id } = req.body;
    try {
    } catch (error) {
      ErrorResponse(res, "", true);
    }
  }

  static async deleteCodeblock(req: Request, res: Response) {
    try {
      const { id } = req.body;
      if (!id) return ErrorResponse(res, "CodeBlock does not exist");
      const codeBlock = await CodeBlockService.delete(id);
      if (!codeBlock)
        return ErrorResponse(res, "CodeBlock could not be deleted");
      SuccessResponse(res, "CodeBlock deleted successfully", codeBlock);
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

export default CodeBlockController;
