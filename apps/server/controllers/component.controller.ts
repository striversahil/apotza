import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";
import ComponentService from "../service/component.service";

class ComponentController {
  static async create(res: Response, req: Request) {
    try {
      const { metadata, payload } = req.body;
      if (!metadata || !payload)
        return ErrorResponse(res, "Provide all fields");
      const component = await ComponentService.create(metadata, payload);
      if (!component) return ErrorResponse(res, "Section could not be created");
      SuccessResponse(res, "Component created successfully", component);
    } catch (error) {
      console.log(error);
    }
  }

  static async getComponent(res: Response, req: Request) {
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

  static async coordinateUpdate(res: Response, req: Request) {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteComponent(res: Response, req: Request) {
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

  static async temp(res: Response, req: Request) {
    try {
    } catch (error) {
      console.log(error);
    }
  }
}

export default ComponentController;
