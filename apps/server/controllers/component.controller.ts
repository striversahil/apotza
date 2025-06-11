import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";
import ComponentService from "../service/component.service";
import ProjectService from "../service/project.service";
import { redis } from "..";
import GlobalContextManager from "../utils/addGlobalContext";
import _ from "lodash";
import { ComponentInterface } from "../schema";

class ComponentController {
  static async getComponent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "Component does not exist", 404);

      const redis_component = await redis.get(`component:${id}`);
      if (redis_component) {
        const component = JSON.parse(redis_component);
        SuccessResponse(res, "Component fetched successfully", null, component);
        return;
      }
      const component = await ComponentService.getById(id);
      if (!component)
        return ErrorResponse(res, "Component could not be fetched", 404);

      await redis.set(`component:${id}`, JSON.stringify(component));
      SuccessResponse(res, "Component fetched successfully", null, component);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async create(req: Request, res: Response) {
    try {
      if (!req.body) return ErrorResponse(res, "Provide all fields", 400);
      const project_id = req.cookies.project_id;
      if (!project_id) return ErrorResponse(res, "Project does not exist", 404);
      const component = await ComponentService.create(project_id, req.body);
      if (!component)
        return ErrorResponse(res, "Section could not be created", 400);

      // await redis.del(`page:${component.page}`);
      await redis.del(`section:${component.section}`);
      // await redis.del(`getAllComponents:${project_id}`);
      SuccessResponse(res, "Component created successfully", null, component);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async getComponents(req: Request, res: Response) {
    try {
      const projectId = req.cookies.project_id;
      if (!projectId) return ErrorResponse(res, "Project does not exist", 404);

      // const redis_components = await redis.get(`getAllComponents:${projectId}`);
      // if (redis_components) {
      //   const components = JSON.parse(redis_components);
      //   SuccessResponse(
      //     res,
      //     "Components fetched successfully",
      //     null,
      //     components
      //   );
      //   return;
      // }
      const components = await ComponentService.getAllComponentsId(projectId);
      if (!components)
        return ErrorResponse(res, "Components could not be fetched", 404);

      // await redis.set(
      //   `getAllComponents:${projectId}`,
      //   JSON.stringify(components)
      // );

      SuccessResponse(res, "Components fetched successfully", null, components);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async coordinateUpdate(req: Request, res: Response) {
    try {
      const { id, x, y } = req.body;
      if (!id) return ErrorResponse(res, "Provide all fields", 400);
      const component_ = await ComponentService.getById(id);
      if (!component_?.coordinates)
        return ErrorResponse(res, "Component does not exist", 404);
      const coordinates = component_.coordinates as { x: number; y: number };
      const component = await ComponentService.update(id, {
        coordinates: {
          x: coordinates.x + x,
          y: coordinates.y + y,
        },
      });
      if (!component)
        return ErrorResponse(res, "Component could not be updated", 400);

      // await redis.del(`page:${component.page}`);
      await redis.del(`section:${component.section}`);
      SuccessResponse(res, "Component updated successfully", null, component);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async updateComponent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project_id = req.cookies.project_id;
      const { ...data } = req.body;
      if (!id || !data) return ErrorResponse(res, "Provide all fields", 400);

      const component = await updateContext(project_id, id, data.configuration);
      if (!component)
        return ErrorResponse(res, "Component could not be updated", 400);

      // await redis.del(`page:${component.page}`);
      await redis.del(`section:${component.section}`);
      SuccessResponse(res, "Component updated successfully", null, component);
    } catch (error) {
      console.log(error);
      ErrorResponse(res, "", null);
    }
  }

  static async deleteComponent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "Component does not exist", 404);
      const component = await ComponentService.delete(id);
      if (!component)
        return ErrorResponse(res, "Component could not be deleted", 404);

      // await redis.del(`page:${component.page}`);
      await redis.del(`section:${component.section}`);
      SuccessResponse(res, "Component deleted successfully", null, component);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  // static async refechComponent(id: string) {
  //   try {
  //     const component: any = await ComponentService.getById(id);
  //     if (!component) return false;

  //     await redis.del(`component:${id}`);
  //     await redis.set(`component:${id}`, JSON.stringify(component));
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
 * @param id  Component ID that we are updating
 * @param configuration Payload of base text configuration
 * @returns
 */
async function updateContext(
  project_id: string,
  id: string,
  configuration: object
): Promise<ComponentInterface | null> {
  try {
    const component: any = await ComponentService.getById(id);
    const prevMatches: any = component?.referencedContext || {};
    if (!component) return null;

    const project: any = await ProjectService.getById(project_id);
    const prevReference: any = project?.globalContext || {};
    if (!project) return null;
    // Extract placeholders from the configuration string

    // if (!matchesWithoutBraces || matchesWithoutBraces.length === 0) {
    //   await StepBlockService.update(id, {
    //     referencedContext: [],
    //   });
    //   return;
    // }

    const { extractedMatches, arrayForm } =
      GlobalContextManager.extractRegex(configuration);

    const { updatedConfiguration } = await GlobalContextManager.setConfigValue(
      project_id,
      extractedMatches,
      configuration
    );

    if (_.isEqual(prevMatches, extractedMatches)) {
      console.log("No changes in global context, skipping Context update.");

      const compoUpdated = await ComponentService.update(id, {
        configuration: updatedConfiguration,
      });
      return compoUpdated ? compoUpdated : null;
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

    const compoUpdated = await ComponentService.update(id, {
      configuration: updatedConfiguration,
      referencedContext: extractedMatches,
    });

    const updatedProject = await ProjectService.update(project_id, {
      globalContext: cleanedUpReference,
    });

    return compoUpdated ? compoUpdated : null;
  } catch (error) {
    console.error("Error in updateContext:", error);
    return null;
  }
}

export default ComponentController;
