import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";
import StepBlockService from "../service/stepblock.service";

class StepBlockController {
  static async createStep(req: Request, res: Response) {
    try {
      const { id, language } = req.body;
      if (!id || !language)
        return ErrorResponse(res, "StepBlock does not exist", 400);
      const stepBlock = await StepBlockService.create(id, language);
      if (!stepBlock)
        return ErrorResponse(res, "StepBlock could not be created", 400);
      SuccessResponse(res, "StepBlock created successfully", null, stepBlock);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async getStep(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "StepBlock does not exist", 404);
      const stepBlock = await StepBlockService.getById(id);
      if (!stepBlock)
        return ErrorResponse(res, "StepBlock could not be fetched", 404);
      SuccessResponse(res, "StepBlock fetched successfully", null, stepBlock);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async runBlock(req: Request, res: Response) {
    const { id, type } = req.body;
    if (!id || !type) return ErrorResponse(res, "Provide all fields", 400);
    const validParams = getValidParam(type);
    if (!validParams)
      return ErrorResponse(res, "Invalid type of Operation found", 400);

    const stepBlock = await StepBlockService.runBlock(id, type);
    if (!stepBlock)
      return ErrorResponse(res, "StepBlock could not be run", 400);
    SuccessResponse(res, "StepBlock Run successfully", null, stepBlock);

    try {
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async deleteStep(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "StepBlock does not exist", 404);
      const stepBlock = await StepBlockService.delete(id);
      if (!stepBlock)
        return ErrorResponse(res, "StepBlock could not be deleted", 404);
      SuccessResponse(res, "StepBlock deleted successfully", null, stepBlock);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async Update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { ...slug } = req.body;
      if (!id || !slug)
        return ErrorResponse(res, "Id and Updated object is required", 400);
      const stepBlock = await StepBlockService.update(id, slug);
      if (!stepBlock)
        return ErrorResponse(res, "StepBlock could not be updated", 400);
      SuccessResponse(res, "StepBlock updated successfully", null, stepBlock);
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
