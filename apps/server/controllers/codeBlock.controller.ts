import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";
import CodeBlockService from "../service/codeblock.service";
import { redis } from "..";
import StepBlockService from "../service/stepblock.service";

class CodeBlockController {
  static async getCodeBlock(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "CodeBlock does not exist", 404);
      const redis_codeBlock = await redis.get(`codeBlock:${id}`);
      if (redis_codeBlock) {
        const codeBlock = JSON.parse(redis_codeBlock);
        SuccessResponse(res, "CodeBlock fetched successfully", null, codeBlock);
        return;
      }
      const codeBlock = await CodeBlockService.getById(id);
      if (!codeBlock)
        return ErrorResponse(res, "CodeBlock could not be fetched", 404);

      await redis.set(`codeBlock:${id}`, JSON.stringify(codeBlock));
      SuccessResponse(res, "CodeBlock fetched successfully", null, codeBlock);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

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

      await redis.del(`project:${codeBlock.project}`);
      SuccessResponse(res, "CodeBlock created successfully", null, codeBlock);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async runAllSteps(req: Request, res: Response) {
    try {
      const { id } = req.body;
      if (!id) return ErrorResponse(res, "CodeBlock does not exist", 404);

      const codeBlock: any = await CodeBlockService.getById(id);
      if (!codeBlock)
        return ErrorResponse(res, "CodeBlock could not be fetched", 404);

      if (codeBlock.stepBlock?.length) {
        for (const stepBlock of codeBlock.stepBlock) {
          const StepBlock: any = await StepBlockService.runBlock(stepBlock.id);
          if (!StepBlock)
            return ErrorResponse(res, "StepBlock could not be run", 400);

          if (StepBlock.output.success === false) {
            // Updating CodeBlock with Error
            await CodeBlockService.update(id, {
              error: StepBlock.output.message,
            });
            return SuccessResponse(res, "StepBlock Got Error", null, {
              stepBlock: StepBlock.id,
            });
          }
        }

        // Updating CodeBlock with Success
        await CodeBlockService.update(id, {
          response: codeBlock.stepBlock[codeBlock.stepBlock.length - 1].output,
        });
        return SuccessResponse(res, "CodeBlock Run successfully", null, {
          stepBlock: codeBlock.stepBlock[codeBlock.stepBlock.length - 1].id, // return last stepblock Id if Codeblock run Successfully
        });
      }
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

      await redis.del(`project:${codeBlock.project}`);
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

      await redis.del(`project:${codeBlock.project}`);
      SuccessResponse(res, "CodeBlock deleted successfully", null, codeBlock);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }
  static async contextCodeBlock(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "CodeBlock does not exist", 404);

      // I am avoiding redis here as of Overhead for now

      // const redis_contextCB = await redis.get(`contextCB:${id}`);
      // if (redis_contextCB) {
      //   const context = JSON.parse(redis_contextCB);
      //   SuccessResponse(res, "CodeBlock fetched successfully", null, context);
      //   return;
      // }
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
      // redis.set(`contextCB:${id}`, JSON.stringify(context));

      SuccessResponse(res, "CodeBlock fetched successfully", null, context);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  // static async refetchCodeBlock(id: string) {
  //   try {
  //     const codeBlock: any = await CodeBlockService.getById(id);
  //     if (!codeBlock) return false;

  //     await redis.del(`codeBlock:${id}`);
  //     await redis.set(`codeBlock:${id}`, JSON.stringify(codeBlock));
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

export default CodeBlockController;
