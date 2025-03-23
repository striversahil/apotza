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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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

export default StepBlockController;
