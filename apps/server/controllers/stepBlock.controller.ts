import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";
import StepBlockService from "../service/stepblock.service";

class StepBlockController {
  static async createStep(req: Request, res: Response) {
    try {
      const { id, lang } = req.body;
      if (!id || !lang) return ErrorResponse(res, "StepBlock does not exist");
      const stepBlock = await StepBlockService.create(id, lang);
      if (!stepBlock)
        return ErrorResponse(res, "StepBlock could not be created");
      SuccessResponse(res, "StepBlock created successfully", stepBlock);
    } catch (error) {
      ErrorResponse(res, "", true);
    }
  }

  static async getStep(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "StepBlock does not exist");
      const stepBlock = await StepBlockService.getById(id);
      if (!stepBlock)
        return ErrorResponse(res, "StepBlock could not be fetched");
      SuccessResponse(res, "StepBlock fetched successfully", stepBlock);
    } catch (error) {
      ErrorResponse(res, "", true);
    }
  }

  static async runBlock(req: Request, res: Response) {
    const { id, type, ...data } = req.body;
    if (!id || !type) return ErrorResponse(res, "Provide all fields");
    const validParams = getValidParam(type);
    if (!validParams) return ErrorResponse(res, "Provide all fields");

    StepBlockService.runBlock(id, type, data);

    try {
    } catch (error) {
      ErrorResponse(res, "", true);
    }
  }

  static async deleteStep(req: Request, res: Response) {
    try {
      const { id } = req.body;
      if (!id) return ErrorResponse(res, "StepBlock does not exist");
      const stepBlock = await StepBlockService.delete(id);
      if (!stepBlock)
        return ErrorResponse(res, "StepBlock could not be deleted");
      SuccessResponse(res, "StepBlock deleted successfully", stepBlock);
    } catch (error) {
      ErrorResponse(res, "", true);
    }
  }

  static async codeUpdate(req: Request, res: Response) {
    try {
      const { id, code } = req.body;
      if (!id || !code) return ErrorResponse(res, "StepBlock does not exist");
      const stepBlock = await StepBlockService.update(id, { code });
      if (!stepBlock)
        return ErrorResponse(res, "StepBlock could not be updated");
      SuccessResponse(res, "StepBlock updated successfully", stepBlock);
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

function getValidParam(param: string) {
  const validType = ["rest", "postgres", "javascript", "python"];
  if (!validType.includes(param)) return false;
  return true;
  // switch (param) {
  //   case "rest":
  //     return stepBlockParam.rest;
  //   case "postgres":
  //     return stepBlockParam.postgres;
  //   case "javascript":
  //     return stepBlockParam.javascript;
  //   case "python":
  //     return stepBlockParam.python;
  // }
}

export default StepBlockController;
