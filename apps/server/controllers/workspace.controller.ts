import { Response, Request } from "express";
import WorkspaceService from "../service/workspace.service";

class workspaceController {
  static getWorkspace(req: Request, res: Response) {
    if (!req.user) {
      res.status(400).json({
        success: false,
        message: "User is not authenticated",
        payload: null,
      });
      return;
    }
    const workspaceId = req.cookies.workspace_id;
    if (!workspaceId) {
      res.status(400).json({
        success: false,
        message: "Workspace does not exist",
        payload: null,
      });
      return;
    }
    const workspace = WorkspaceService.getById(parseInt(workspaceId));

    if (!workspace) {
      res.status(500).json({
        success: false,
        message: "Workspace could not be fetched",
        payload: null,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Workspace fetched successfully",
      payload: workspace,
    });
    return;
  }

  static createWorkspace(req: Request, res: Response) {
    if (!req.user) {
      res.status(400).json({
        success: false,
        message: "User is not authenticated",
        payload: null,
      });
      return;
    }
    const workspace = WorkspaceService.new(req.user.id);

    if (!workspace) {
      res.status(500).json({
        success: false,
        message: "Workspace could not be created",
        payload: null,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Workspace created successfully",
      payload: workspace,
    });
    return;
  }
  static getAllWorkspaces(req: Request, res: Response) {
    if (!req.user) {
      res.status(400).json({
        success: false,
        message: "User is not authenticated",
        payload: null,
      });
      return;
    }
    const workspaces = WorkspaceService.getAll(req.user.id);

    if (!workspaces) {
      res.status(500).json({
        success: false,
        message: "Workspaces could not be fetched",
        payload: null,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Workspaces fetched successfully",
      payload: workspaces,
    });
    return;
  }
  static deleteWorkspace(req: Request, res: Response) {
    const workspaceId = req.cookies.workspace_id;

    if (!workspaceId) {
      res.status(400).json({
        success: false,
        message: "Workspace does not exist",
        payload: null,
      });
      return;
    }
    const workspace = WorkspaceService.delete(workspaceId);

    if (!workspace) {
      res.status(500).json({
        success: false,
        message: "Workspace could not be deleted",
        payload: null,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Workspace deleted successfully 🚀",
      payload: workspace,
    });
  }
}

export default workspaceController;
