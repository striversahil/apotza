import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";
import ComponentService from "../service/component.service";
import ProjectService from "../service/project.service";

class ComponentController {
  static async create(req: Request, res: Response) {
    try {
      if (!req.body) return ErrorResponse(res, "Provide all fields");
      const component = await ComponentService.create({ ...req.body });
      if (!component) return ErrorResponse(res, "Section could not be created");
      SuccessResponse(res, "Component created successfully", component);
    } catch (error) {
      console.log(error);
    }
  }

  static async getComponent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ErrorResponse(res, "Component does not exist");
      const component = await ComponentService.getById(id);
      if (!component)
        return ErrorResponse(res, "Component could not be fetched");
      SuccessResponse(res, "Component fetched successfully", component);
    } catch (error) {
      console.log(error);
    }
  }

  static async getComponents(req: Request, res: Response) {
    try {
      const projectId = req.cookies.project_id;
      if (!projectId) return ErrorResponse(res, "Project does not exist");
      const components = await ComponentService.getAllComponentsId(projectId);
      console.log(components);
      if (!components)
        return ErrorResponse(res, "Components could not be fetched");
      SuccessResponse(res, "Components fetched successfully", components);
    } catch (error) {
      console.log(error);
    }
  }

  static async coordinateUpdate(req: Request, res: Response) {
    try {
      const { id, x, y } = req.body;
      if (!id) return ErrorResponse(res, "Provide all fields");
      const component_ = await ComponentService.getById(id);
      if (!component_?.coordinates)
        return ErrorResponse(res, "Component does not exist");
      const coordinates = component_.coordinates as { x: number; y: number };
      const component = await ComponentService.updateComponent(id, {
        coordinates: {
          x: coordinates.x + x,
          y: coordinates.y + y,
        },
      });
      if (!component)
        return ErrorResponse(res, "Component could not be updated");
      SuccessResponse(res, "Component updated successfully", component);
    } catch (error) {
      console.log(error);
    }
  }

  static async updateComponent(req: Request, res: Response) {
    try {
      const { id, ...data } = req.body;
      if (!id || !data) return ErrorResponse(res, "Provide all fields");
      const component = await ComponentService.updateComponent(id, data);
      if (!component)
        return ErrorResponse(res, "Component could not be updated");
      SuccessResponse(res, "Component updated successfully", component);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteComponent(req: Request, res: Response) {
    try {
      const { id } = req.body;
      if (!id) return ErrorResponse(res, "Component does not exist");
      const component = await ComponentService.delete(id);
      if (!component)
        return ErrorResponse(res, "Component could not be deleted");
      SuccessResponse(res, "Component deleted successfully", component);
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

export default ComponentController;
