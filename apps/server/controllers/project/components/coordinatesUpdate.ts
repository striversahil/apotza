import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import ComponentService from "../../../service/component.service";

export const updateCoordinates = asyncHandler(
  async (req: Request, res: Response) => {
    const { metadata, payload } = req.body;
    if (!metadata || !payload) {
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
    const component = await ComponentService.coordinatesUpdate(
      metadata._id,
      payload.coordinates
    );
    if (!component) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            {},
            "Component could not be updated \n Server Error"
          )
        );
    }
    return res
      .status(200)
      .json(new ApiResponse(200, component, "Component Updated"));
  }
);
