import { Request, Response } from "express";
import ProjectService from "../service/project.service";
import { projectCookie } from "../utils/CookieConfig";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";
import CodeBlockService from "../service/codeblock.service";
import StepBlockService from "../service/stepblock.service";
import TemplateInit from "../common/templateProject.json";
import SectionService from "../service/section.service";
import ComponentService from "../service/component.service";

class ProjectController {
  static async getProject(req: Request, res: Response) {
    try {
      const projectId = req.cookies.project_id;
      if (!projectId) return ErrorResponse(res, "Project does not exist");
      const project = await ProjectService.getById(projectId);

      if (!project) return ErrorResponse(res, "Project could not be fetched");
      res.cookie("project_id", project.id, projectCookie);
      SuccessResponse(res, "Project fetched successfully", project);
    } catch (error) {
      ErrorResponse(res, "", true);
      return;
    }
  }

  static async createProject(req: Request, res: Response) {
    try {
      const workspace_id = req.cookies.workspace_id;
      const project = await ProjectService.create(workspace_id);
      if (!project) return ErrorResponse(res, "Project could not be created");
      res.cookie("project_id", project.id, projectCookie);
      // Create Default CodeBlocks with Template
      for (const codeblock of TemplateInit.codeBlocks) {
        const codeBlock = await CodeBlockService.create(
          project.id,
          codeblock.name
        );
        if (!codeBlock)
          return ErrorResponse(res, "CodeBlock could not be created");
        console.log(codeblock.stepBlocks);
        const stepBlocks = await StepBlockService.createMultiple(
          codeBlock.id,
          codeblock.stepBlocks
        );
        if (!stepBlocks)
          return ErrorResponse(res, "StepBlock could not be created");
      }
      for (const section of TemplateInit.sections) {
        const section_ = await SectionService.create(project.id, null);
        if (!section_)
          return ErrorResponse(res, "Section could not be created");
        // for (const component of section.components) {
        //   await ComponentService.create(
        //     component.metadata,
        //     component.payload,
        //     section_.id
        //   );
        // }
      }
      const project_ = await ProjectService.getById(project.id);
      SuccessResponse(res, "Project created successfully", project_);
      return;
    } catch (error) {
      ErrorResponse(res, "", true);
    }
  }

  static async deleteProject(req: Request, res: Response) {
    try {
      const projectId = req.cookies.project_id;
      if (!projectId) return ErrorResponse(res, "Project does not exist");
      const project = await ProjectService.delete(projectId);
      if (!project) return ErrorResponse(res, "Project could not be deleted");
      res.clearCookie("project_id");
      SuccessResponse(res, "Project deleted successfully", project);
    } catch (error) {
      ErrorResponse(res, "", true);
    }
  }

  static async updateName(req: Request, res: Response) {
    try {
      const projectId = req.cookies.project_id;
      if (!projectId) return ErrorResponse(res, "Project does not exist");
      const name = req.body.name;
      const project = await ProjectService.update(projectId, { name });
      if (!project) return ErrorResponse(res, "Project could not be updated");
      SuccessResponse(res, "Project updated successfully", project);
    } catch (error) {
      ErrorResponse(res, "", true);
    }
  }

  static async temp(req: Request, res: Response) {
    try {
    } catch (error) {
      ErrorResponse(res, "", true);
    }
  }
}

export default ProjectController;
