import { Request, Response } from "express";
import ProjectService from "../service/project.service";
import { projectCookie } from "../utils/CookieConfig";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";
import CodeBlockService from "../service/codeblock.service";
import StepBlockService from "../service/stepblock.service";
import TemplateInit from "../common/templateProject.json";
import SectionService from "../service/section.service";
import ComponentService from "../service/component.service";
import { redis } from "..";

class ProjectController {
  static async getProject(req: Request, res: Response) {
    try {
      const projectId = req.cookies.project_id;
      if (!projectId) return ErrorResponse(res, "Project does not exist", 404);
      const redis_project = await redis.get(`project:${projectId}`);
      if (redis_project) {
        const project = JSON.parse(redis_project);
        SuccessResponse(res, "Project fetched successfully", null, project);
        return;
      }
      const project = await ProjectService.getById(projectId);
      if (!project)
        return ErrorResponse(res, "Project could not be fetched", 404);
      await redis.set(`project:${projectId}`, JSON.stringify(project));
      res.cookie("project_id", project.id, projectCookie);
      SuccessResponse(res, "Project fetched successfully", null, project);
    } catch (error) {
      ErrorResponse(res, "", null);
      return;
    }
  }

  static async createProject(req: Request, res: Response) {
    // Autofilled Project with Template Data
    try {
      const workspace_id = req.cookies.workspace_id;
      const project = await ProjectService.create(workspace_id);
      if (!project)
        return ErrorResponse(res, "Project could not be created", 400);
      res.cookie("project_id", project.id, projectCookie);
      // Create Default CodeBlocks with Template
      for (const codeblock of TemplateInit.codeBlocks) {
        const codeBlock = await CodeBlockService.create(
          project.id,
          codeblock.name
        );
        if (!codeBlock)
          return ErrorResponse(res, "CodeBlock could not be created", 400);
        const stepBlocks = await StepBlockService.createMultiple(
          codeBlock.id,
          codeblock.stepBlocks
        );
        if (!stepBlocks)
          return ErrorResponse(res, "StepBlock could not be created", 400);
      }
      // Todo : Add Default Section with component and section for Template
      for (const section of TemplateInit.sections) {
        const section_ = await SectionService.create(project.id, null);
        if (!section_)
          return ErrorResponse(res, "Section could not be created", 400);
        // for (const component of section.components) {
        //   await ComponentService.create(
        //     component.metadata,
        //     component.payload,
        //     section_.id
        //   );
        // }
      }
      const project_ = await ProjectService.getById(project.id);
      SuccessResponse(res, "Project created successfully", null, project_);
      return;
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async deleteProject(req: Request, res: Response) {
    try {
      const projectId = req.cookies.project_id;
      if (!projectId) return ErrorResponse(res, "Project does not exist", 404);
      const project = await ProjectService.delete(projectId);
      if (!project)
        return ErrorResponse(res, "Project could not be deleted", 400);
      res.clearCookie("project_id");
      SuccessResponse(res, "Project deleted successfully", null, project);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async updateName(req: Request, res: Response) {
    try {
      const projectId = req.cookies.project_id;
      if (!projectId) return ErrorResponse(res, "Project does not exist", 404);
      const name = req.body.name;
      const project = await ProjectService.update(projectId, { name });
      if (!project)
        return ErrorResponse(res, "Project could not be updated", 400);

      await this.refechProject(projectId);
      SuccessResponse(res, "Project updated successfully", null, project);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async globalContext(req: Request, res: Response) {
    try {
      const { id } = req.cookies.project_id;
      if (!id) return ErrorResponse(res, "Project does not exist", 404);
      const project: any = await ProjectService.getById(id);
      if (!project)
        return ErrorResponse(res, "Project could not be fetched", 404);

      const context: Record<string, any> = {};

      // Todo : Add Global Context of codeBlocks not done for Component for now
      if (project.codeblock?.length) {
        for (const codeBlock of project.codeBlock) {
          context[codeBlock.name] = codeBlock.output;
        }
      }

      SuccessResponse(res, "Project fetched successfully", null, context);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async refechProject(id: string) {
    try {
      const project: any = await ProjectService.getById(id);
      if (!project) return false;

      await redis.del(`project:${id}`);
      await redis.set(`project:${id}`, JSON.stringify(project));
      return true;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async temp(req: Request, res: Response) {
    try {
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }
}

export default ProjectController;
