import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import ComponentService from "../../../service/component.service";

// It will return all the components of the project in Array format so to render in Frontend when User fetches this

export const getComponents = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            {},
            "Missing Information ! Please Provide Complete Information"
          )
        );
    }

    const components = await ComponentService.getAll(id as string);

    if (!components) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            {},
            "Component could not be created \n Server Error"
          )
        );
    }
    return res
      .status(200)
      .json(new ApiResponse(200, components, "All Components Fetched"));
  }
);
