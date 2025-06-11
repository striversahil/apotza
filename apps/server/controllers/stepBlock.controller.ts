import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";
import StepBlockService from "../service/stepblock.service";
import { redis } from "..";
import CodeBlockService from "../service/codeblock.service";
import CodeBlockController from "./codeBlock.controller";
import GlobalContextManager from "../utils/addGlobalContext";
import ProjectService from "../service/project.service";
import _ from "lodash";

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
      const projectId = req.cookies.project_id;

      const { id, language } = req.body;
      if (!id || !language)
        return ErrorResponse(res, "StepBlock does not exist", 400);
      const stepBlock = await StepBlockService.create(projectId, id, language);
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
      const project_id = req.cookies.project_id;
      const { ...slug } = req.body;
      if (!id || !slug)
        return ErrorResponse(res, "Id and Updated object is required", 400);

      const stepBlock = await StepBlockService.update(id, slug);
      if (!stepBlock)
        return ErrorResponse(res, "StepBlock could not be updated", 400);

      await updateContext(project_id, id, JSON.stringify(slug.configuration));

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

/**
 *
 * @param project_id Project ID that we are working with
 * @param id  StepBlock ID that we are updating
 * @param configuration Payload of base text configuration
 * @returns
 */
async function updateContext(
  project_id: string,
  id: string,
  configuration: string
) {
  try {
    const stepblock: any = await StepBlockService.getById(id);
    const prevMatches: any = stepblock?.referencedContext || {};
    if (!stepblock) return;

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
    
    
    GlobalContextManager.setConfigValue(
          project_id,
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

    const stepBlock = await StepBlockService.update(id, {
      referencedContext: extractedMatches,
    });

    const updatedProject = await ProjectService.update(project_id, {
      globalContext: cleanedUpReference,
    });

    console.log("Updated StepBlock:", stepBlock?.referencedContext);

    console.log("Updated Project:", updatedProject?.globalContext);

    return true;
  } catch (error) {
    console.error("Error in updateContext:", error);
    return false;
  }
}

// function getValidParam(param: string) {
//   const validType = ["rest", "postgres", "javascript", "python"];
//   if (!validType.includes(param)) return false;
//   return true;
//   // switch (param) {
//   //   case "rest":
//   //     return stepBlockParam.rest;
//   //   case "postgres":
//   //     return stepBlockParam.postgres;
//   //   case "javascript":
//   //     return stepBlockParam.javascript;
//   //   case "python":
//   //     return stepBlockParam.python;
//   // }
// }

export default StepBlockController;
