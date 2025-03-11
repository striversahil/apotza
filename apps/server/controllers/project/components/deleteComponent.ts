import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import { Component } from "../../../models/project/component.model";
import { Project } from "../../../models/project/project.model";
import ComponentService from "../../../service/component.service";

export const deleteComponent = asyncHandler(
  async (req: Request, res: Response) => {
    const { metadata } = req.body;
    if (!metadata) {
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

    const component = await ComponentService.delete(
      metadata.componentId as string,
      metadata.section_id as string
    );

    if (!component) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            {},
            "Component could not be deleted \n Server Error"
          )
        );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, component, "Component Deleted"));
  }
);
