import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";
import ComponentService from "../service/component.service";
import ProjectService from "../service/project.service";

class ComponentController {
  static async create(req: Request, res: Response) {
    try {
      if (!req.body) return ErrorResponse(res, "Provide all fields", 400);
      const component = await ComponentService.create({ ...req.body });
      if (!component)
        return ErrorResponse(res, "Section could not be created", 400);
      SuccessResponse(res, "Component created successfully", null, component);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async getComponent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "Component does not exist", 404);
      const component = await ComponentService.getById(id);
      if (!component)
        return ErrorResponse(res, "Component could not be fetched", 404);
      SuccessResponse(res, "Component fetched successfully", null, component);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async getComponents(req: Request, res: Response) {
    try {
      const projectId = req.cookies.project_id;
      if (!projectId) return ErrorResponse(res, "Project does not exist", 404);
      const components = await ComponentService.getAllComponentsId(projectId);
      console.log(components);
      if (!components)
        return ErrorResponse(res, "Components could not be fetched", 404);
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
      SuccessResponse(res, "Component updated successfully", null, component);
    } catch (error) {
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
      SuccessResponse(res, "Component deleted successfully", null, component);
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

export default ComponentController;
