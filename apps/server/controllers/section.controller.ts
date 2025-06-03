import { Request, Response } from "express";
import SectionService from "../service/section.service";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";
import { redis } from "..";
import ProjectService from "../service/project.service";
import GlobalContextManager from "../utils/addGlobalContext";
import _ from "lodash";

class SectionController {
  static async getSection(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "Section does not exist", 404);

      const redis_section = await redis.get(`section:${id}`);
      if (redis_section) {
        const section = JSON.parse(redis_section);
        SuccessResponse(res, "Section fetched successfully", null, section);
        return;
      }
      const section = await SectionService.getById(id);
      if (!section)
        return ErrorResponse(res, "Section could not be fetched", 404);

      await redis.set(`section:${id}`, JSON.stringify(section));
      SuccessResponse(res, "Section fetched successfully", null, section);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async createSection(req: Request, res: Response) {
    try {
      const projectId = req.cookies.project_id;
      if (!projectId) return ErrorResponse(res, "Project does not exist", 404);
      const { page_id, component_id } = req.body;

      if (!page_id && !component_id)
        return ErrorResponse(res, "Provide Required fields", 400);
      const section = await SectionService.create(
        projectId,
        page_id,
        component_id
      );
      if (!section)
        return ErrorResponse(res, "Section could not be created", 400);

      await redis.del(`page:${section.page}`);
      SuccessResponse(res, "Section created successfully", null, section);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async updateSection(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project_id = req.cookies.project_id;
      if (!id) return ErrorResponse(res, "Section does not exist", 404);
      const { ...data } = req.body;
      const section = await SectionService.update(id, data);
      if (!section)
        return ErrorResponse(res, "Section could not be updated", 400);


      await updateContext(project_id, id, JSON.stringify(data.configuration));

      await redis.del(`page:${section.page}`);
      SuccessResponse(res, "Section updated successfully", null, section);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async deleteSection(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "Section does not exist", 404);
      const section = await SectionService.delete(id);
      if (!section)
        return ErrorResponse(res, "Section could not be deleted", 404);

      await redis.del(`page:${section.page}`);
      SuccessResponse(res, "Section deleted successfully", null, section);
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
    const section: any = await SectionService.getById(id);
    const prevMatches: any = section?.referencedContext || {};
    if (!section) return;

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

    const sectionUpdated = await SectionService.update(id, {
      referencedContext: extractedMatches,
    });

    const updatedProject = await ProjectService.update(project_id, {
      globalContext: cleanedUpReference,
    });

    console.log("Updated Section:", sectionUpdated?.referencedContext);

    console.log("Updated Project:", updatedProject?.globalContext);

    return true;
  } catch (error) {
    console.error("Error in updateContext:", error);
    return false;
  }
}

export default SectionController;
