import { Request, Response } from "express";
import ProjectService from "../service/project.service";
import { projectCookie } from "../utils/CookieConfig";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";

class ProjectController {
  static async getProject(req: Request, res: Response) {
    try {
      const projectId = req.cookies.project_id;
      if (!projectId) return ErrorResponse(res, "Project does not exist");
      const project = await ProjectService.getById(parseInt(projectId));

      if (!project) return ErrorResponse(res, "Project could not be fetched");
      SuccessResponse(res, "Project fetched successfully", project);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  static async getAllProjects(req: Request, res: Response) {
    try {
      const workspace_id = req.cookies.workspace_id;
      if (!workspace_id) return ErrorResponse(res, "User is not authenticated");
      const projects = await ProjectService.getAll(workspace_id);
      if (!projects) return ErrorResponse(res, "Projects could not be fetched");
      SuccessResponse(res, "Projects fetched successfully", projects);
      return;
    } catch (error) {
      console.log(error);
    }
  }
  static async createProject(req: Request, res: Response) {
    try {
      const workspace_id = req.cookies.workspace_id;
      const project = await ProjectService.create(workspace_id);
      if (!project) return ErrorResponse(res, "Project could not be created");
      res.cookie("project_id", project.id, projectCookie);
      SuccessResponse(res, "Project created successfully", project);
      return;
    } catch (error) {
      console.log(error);
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
      console.log(error);
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

export default ProjectController;
