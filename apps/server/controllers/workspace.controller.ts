import { Response, Request } from "express";
import WorkspaceService from "../service/workspace.service";
import { workspaceCookie } from "../utils/CookieConfig";

class workspaceController {
  static async getWorkspace(req: Request, res: Response) {
    try {
      if (!req.user) {
        res.status(400).json({
          success: false,
          message: "User is not authenticated Please Login",
          payload: null,
        });
        return;
      }
      const workspaceId = req.cookies.workspace_id;
      if (!workspaceId) {
        res.status(400).json({
          success: false,
          message: "Workspace does not exist Create it",
          payload: null,
        });
        return;
      }
      const workspace = await WorkspaceService.getById(workspaceId);

      if (!workspace) {
        res.status(500).json({
          success: false,
          message: "Workspace could not be fetched",
          payload: null,
        });
        return;
      }
      res.cookie("workspace_id", workspace.id, workspaceCookie);
      res.status(200).json({
        success: true,
        message: "Workspace fetched successfully 🚀",
        payload: workspace,
      });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error ⚠️",
        error: error,
      });
      return;
    }
  }

  static async createWorkspace(req: Request, res: Response) {
    try {
      try {
        if (!req.user) {
          res.status(400).json({
            success: false,
            message: "User is not authenticated",
            payload: null,
          });
          return;
        }
        const workspace = await WorkspaceService.new(req.user.id);

        if (!workspace) {
          res.status(500).json({
            success: false,
            message: "Workspace could not be created",
            payload: null,
          });
          return;
        }
        res.cookie("workspace_id", workspace.id, workspaceCookie);

        res.status(200).json({
          success: true,
          message: "Workspace created successfully",
          payload: workspace,
        });
        return;
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error ⚠️",
          error: error,
        });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error ⚠️",
        error: error,
      });
      return;
    }
  }

  static async deleteWorkspace(req: Request, res: Response) {
    try {
      const workspaceId = req.cookies.workspace_id;

      if (!workspaceId) {
        res.status(400).json({
          success: false,
          message: "Workspace does not exist",
          payload: null,
        });
        return;
      }
      const workspace = await WorkspaceService.delete(workspaceId);

      if (!workspace) {
        res.status(500).json({
          success: false,
          message: "Workspace could not be deleted",
          payload: null,
        });
        return;
      }
      res.clearCookie("workspace_id");
      res.status(200).json({
        success: true,
        message: "Workspace deleted successfully 🚀",
        payload: workspace,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error ⚠️",
        error: error,
      });
      return;
    }
  }
}

export default workspaceController;
