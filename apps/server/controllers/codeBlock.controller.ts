import { Request, response, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";
import CodeBlockService from "../service/codeblock.service";
import { redis } from "..";
import StepBlockService from "../service/stepblock.service";
import ProjectService from "../service/project.service";
import GlobalContextManager from "../utils/addGlobalContext";
import _ from "lodash";

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
      const { id } = req.params;

      if (!id) return ErrorResponse(res, "CodeBlock does not exist", 404);

      // Getting CodeBlock with all the steps that we need to run
      const codeBlock: any = await CodeBlockService.getById(id);
      if (!codeBlock)
        return ErrorResponse(res, "CodeBlock could not be fetched", 404);

      const steps = codeBlock.stepBlocks ?? [];

      for (const step of steps) {
        const result: any = await StepBlockService.runBlock(step.id);
        if (!result)
          return ErrorResponse(res, "StepBlock could not be run", 400);

        // If the stepBlock is not run successfully, we need to update the codeBlock with the error
        if (result.response === null) {
          const updatedErrorCodeBlock = await CodeBlockService.update(id, {
            error: result.error,
            response: null,
          });

          if (!updatedErrorCodeBlock)
            return ErrorResponse(res, "CodeBlock could not be updated", 400);
          return ErrorResponse(res, "StepBlock Got Error", 400);
        }
      }

      const lastStep = steps[steps.length - 1];

      const updatedCodeBlock = await CodeBlockService.update(id, {
        response: lastStep?.response,
        error: null,
      });

      if (!updatedCodeBlock)
        return ErrorResponse(res, "CodeBlock could not be updated", 400);

      await redis.del(`codeBlock:${id}`);
      // Cleanup the redis stepBlock cache
      for (const step of steps) {
        await redis.del(`stepBlock:${step.id}`);
      }

      return SuccessResponse(res, "CodeBlock Run successfully 🚀", null, {
        response: updatedCodeBlock.response,
      });
    } catch (error) {
      console.error("Error running all steps:", error);
      return ErrorResponse(res, "Internal Server Error 💥", 500);
    }
  }

  static async updateCodeBlock(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project_id = req.cookies.project_id;
      const { ...data } = req.body;
      if (!id || !data) return ErrorResponse(res, "Provide all fields", 400);

      // TODO: Update the context of the codeBlock if u figure out it's configuration body
      // await updateContext(project_id, id, JSON.stringify(slug.configuration));
      
      await updateContext(project_id, id, JSON.stringify(data));
      
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
          context[stepBlock.name] = {
            id: stepBlock.id,
            name: stepBlock.name,
            type: "stepBlock",
            response: stepBlock.response,
            error: stepBlock.error,
          };
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

  static async syncContext(id: string) {
    try {
      const codeBlock: any = await CodeBlockService.getById(id);
      if (!codeBlock) return false;

      const context: Record<string, any> = {};
      if (codeBlock.stepBlocks?.length) {
        for (const stepBlock of codeBlock.stepBlocks) {
          context[stepBlock.id] = stepBlock.output;
        }
      }
    } catch (error) {
      throw new Error(error as string);
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

/**
 *
 * @param project_id Project ID that we are working with
 * @param id  CodeBlock ID that we are updating
 * @param configuration Payload of base text configuration
 * @returns
 */
async function updateContext(
  project_id: string,
  id: string,
  configuration: string
) {
  try {
    const codeblock: any = await CodeBlockService.getById(id);
    const prevMatches: any = codeblock?.referencedContext || {};
    if (!codeblock) return;

    const project: any = await ProjectService.getById(project_id);
    const prevReference: any = project?.globalContext || {};
    if (!project) return;
    // Extract placeholders from the configuration string

    // if (!matchesWithoutBraces || matchesWithoutBraces.length === 0) {
    //   await StepBlockService.update(id, {
    //     referencedContext: [],
    //   });
    //   return;
    // }

    const { extractedMatches, arrayForm } =
      GlobalContextManager.extractRegex(configuration);
  
    
    
    const { updatedConfiguration } = GlobalContextManager.setConfigValue(
      extractedMatches,
      configuration,
    )

    if (_.isEqual(prevMatches, extractedMatches)) {
      console.log("No changes in global context, skipping Context update.");
      return true;
    }

    // Trying to update so to reduce the number of calls to the database
    const { newReference } = GlobalContextManager.setContext(
      prevReference,
      arrayForm,
      id
    );

    const cleanedUpReference = GlobalContextManager.cleanedUpContext(
      prevMatches,
      arrayForm,
      id,
      newReference
    );

    // console.log("Mapped Matches Object:", mappedMatchesObject);

    const codeBlock = await CodeBlockService.update(id, {
      configuration: updatedConfiguration,
      referencedContext: extractedMatches,
    });

    const updatedProject = await ProjectService.update(project_id, {
      globalContext: cleanedUpReference,
    });

    console.log("Updated CodeBlock:", codeBlock?.referencedContext);

    console.log("Updated Project:", updatedProject?.globalContext);

    return true;
  } catch (error) {
    console.error("Error in updateContext:", error);
    return false;
  }
}
export default CodeBlockController;
