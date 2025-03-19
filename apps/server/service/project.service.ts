import { Project, ProjectInterface, Workspace, WorkspaceType } from "../schema";
import { db } from "../database";
import { eq } from "drizzle-orm";

class ProjectService {
  static async create(workspace_id: number): Promise<ProjectInterface | null> {
    try {
      const [project] = await db.insert(Project).values({
        name: "Untitled Project",
        workspace: workspace_id,
      });
      return project ? project : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getAll(workspace_id: number): Promise<WorkspaceType | null> {
    try {
      const [projects] = await db.query.Workspace.findMany({
        with: {
          projects: true,
        },
        where: eq(Workspace.id, workspace_id),
      });
      return projects ? projects : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getById(id: number): Promise<ProjectInterface | null> {
    try {
      const project = await db.query.Project.findFirst({
        with: {
          codeBlocks: true,
          sections: true,
        },
        where: eq(Project.id, id),
      });
      return project ? project : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async update(id: number, clause: {}) {
    try {
      const [project] = await db
        .update(Project)
        .set(clause)
        .where(eq(Project.id, id))
        .returning();
      return project ? project : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async delete(id: number): Promise<ProjectInterface | null> {
    try {
      const [project] = await db
        .delete(Project)
        .where(eq(Project.id, id))
        .returning();
      return project ? project : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default ProjectService;
