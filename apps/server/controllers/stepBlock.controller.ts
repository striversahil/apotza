import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";
import StepBlockService from "../service/stepblock.service";
import { redis } from "..";
import CodeBlockService from "../service/codeblock.service";
import CodeBlockController from "./codeBlock.controller";

class StepBlockController {
  static async getStep(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "StepBlock does not exist", 404);

      const redis_stepBlock = await redis.get(`stepBlock:${id}`);
      if (redis_stepBlock) {
        // console.log("From Redis StepBlock", id);
        const stepBlock = JSON.parse(redis_stepBlock);
        SuccessResponse(res, "StepBlock fetched successfully", null, stepBlock);
        return;
      }
      const stepBlock = await StepBlockService.getById(id);
      if (!stepBlock)
        return ErrorResponse(res, "StepBlock could not be fetched", 404);

      await redis.set(`stepBlock:${id}`, JSON.stringify(stepBlock));
      SuccessResponse(res, "StepBlock fetched successfully", null, stepBlock);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async createStep(req: Request, res: Response) {
    try {
      const { id, language } = req.body;
      if (!id || !language)
        return ErrorResponse(res, "StepBlock does not exist", 400);
      const stepBlock = await StepBlockService.create(id, language);
      if (!stepBlock)
        return ErrorResponse(res, "StepBlock could not be created", 400);
      await redis.del(`codeBlock:${stepBlock.codeblock}`);
      SuccessResponse(res, "StepBlock created successfully", null, stepBlock);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async runBlock(req: Request, res: Response) {
    try {
      const { id } = req.body;
      if (!id) return ErrorResponse(res, "Provide all fields", 400);
      const stepBlock = await StepBlockService.runBlock(id);
      if (!stepBlock)
        return ErrorResponse(res, "StepBlock could not be run", 400);

      await redis.del(`codeBlock:${stepBlock.codeblock}`); // needed to done for initial capture of codeblock by client
      await redis.del(`stepBlock:${id}`);

      SuccessResponse(res, "StepBlock Run successfully", null, stepBlock);
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

      await redis.del(`codeBlock:${stepBlock.codeblock}`);
      SuccessResponse(res, "StepBlock deleted successfully", null, stepBlock);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async Update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const codeblock_id = ""; // Get codeblock Id
      const { ...slug } = req.body;
      if (!id || !slug)
        return ErrorResponse(res, "Id and Updated object is required", 400);

      updateContext(codeblock_id, JSON.stringify(slug.configuration));

      const stepBlock = await StepBlockService.update(id, slug);
      if (!stepBlock)
        return ErrorResponse(res, "StepBlock could not be updated", 400);

      // await redis.del(`codeBlock:${stepBlock.codeblock}`);
      await redis.del(`codeBlock:${stepBlock.codeblock}`); // needed to done for initial capture of codeblock by client
      await redis.del(`stepBlock:${id}`);

      SuccessResponse(res, "StepBlock updated successfully", null, stepBlock);
    } catch (error) {
      console.error("Error in StepBlockController Update:", error);
      ErrorResponse(res, "", null);
    }
  }

  // static async refechStepBlock(id: string) {
  //   try {
  //     const stepBlock: any = await StepBlockService.getById(id);
  //     if (!stepBlock) return false;

  //     await redis.del(`stepBlock:${id}`);
  //     await redis.set(`stepBlock:${id}`, JSON.stringify(stepBlock));
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

async function updateContext(id: string, configuration: string) {
  try {
    const regex = /\{\{(.*?)\}\}/g;

    const matches = configuration.match(regex);

    const matchesWithoutBraces = matches?.map((match: string) =>
      match.slice(2, -2)
    );
    if (!matchesWithoutBraces || matchesWithoutBraces.length === 0) return;
    const uniqueMatches = Array.from(new Set(matchesWithoutBraces));

    CodeBlockController.contextCodeBlock;
  } catch (error) {
    return false;
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
