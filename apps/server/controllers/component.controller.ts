import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";
import ComponentService from "../service/component.service";
import ProjectService from "../service/project.service";
import { redis } from "..";

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
      const component = await ComponentService.create(req.body);
      if (!component)
        return ErrorResponse(res, "Section could not be created", 400);

      await redis.del(`page:${component.page}`);
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
      const component = await ComponentService.updateComponent(id, {
        coordinates: {
          x: coordinates.x + x,
          y: coordinates.y + y,
        },
      });
      if (!component)
        return ErrorResponse(res, "Component could not be updated", 400);

      await redis.del(`page:${component.page}`);
      SuccessResponse(res, "Component updated successfully", null, component);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async updateComponent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { ...data } = req.body;
      if (!id || !data) return ErrorResponse(res, "Provide all fields", 400);
      const component = await ComponentService.updateComponent(id, data);
      if (!component)
        return ErrorResponse(res, "Component could not be updated", 400);

      await redis.del(`page:${component.page}`);
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

      await redis.del(`page:${component.page}`);
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

export default ComponentController;
