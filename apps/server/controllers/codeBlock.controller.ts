import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";
import CodeBlockService from "../service/codeblock.service";
import { redis } from "..";

class CodeBlockController {
  static async create(req: Request, res: Response) {
    try {
      const { name, language } = req.body;
      const project_id = req.cookies.project_id;
      if (!project_id) return ErrorResponse(res, "Project does not exist", 404);

      const codeBlock = await CodeBlockService.create(
        project_id,
        name,
        language
      );
      if (!codeBlock)
        return ErrorResponse(res, "CodeBlock could not be created", 400);
      SuccessResponse(res, "CodeBlock created successfully", null, codeBlock);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async getCodeBlock(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "CodeBlock does not exist", 404);
      const codeBlock = await CodeBlockService.getById(id);
      if (!codeBlock)
        return ErrorResponse(res, "CodeBlock could not be fetched", 404);
      SuccessResponse(res, "CodeBlock fetched successfully", null, codeBlock);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async runAllSteps(req: Request, res: Response) {
    const { id } = req.body;
    try {
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async updateCodeBlock(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { ...data } = req.body;
      if (!id || !data) return ErrorResponse(res, "Provide all fields", 400);
      const codeBlock = await CodeBlockService.update(id, data);
      if (!codeBlock)
        return ErrorResponse(res, "CodeBlock could not be updated", 400);
      SuccessResponse(res, "CodeBlock updated successfully", null, codeBlock);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async deleteCodeblock(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "CodeBlock does not exist", 404);
      const codeBlock = await CodeBlockService.delete(id);
      if (!codeBlock)
        return ErrorResponse(res, "CodeBlock could not be deleted", 404);
      SuccessResponse(res, "CodeBlock deleted successfully", null, codeBlock);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }
  static async contextCodeBlock(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "CodeBlock does not exist", 404);
      const codeBlock: any = await CodeBlockService.getById(id);
      if (!codeBlock)
        return ErrorResponse(res, "CodeBlock could not be fetched", 404);

      const context: Record<string, any> = {};
      if (codeBlock.stepBlocks?.length) {
        for (const stepBlock of codeBlock.stepBlocks) {
          context[stepBlock.name] = stepBlock.output;
          // console.log("context", stepBlock.output);
        }
      }
      // Context CodeBlock is stored in redis
      redis.set(`contextCB:${id}`, JSON.stringify(context));

      SuccessResponse(res, "CodeBlock fetched successfully", null, context);
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

export default CodeBlockController;
