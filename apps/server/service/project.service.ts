import { CodeBlock, Project, ProjectInterface } from "../schema";
import { db } from "../database";
import { eq } from "drizzle-orm";

class ProjectService {
  static async getById(id: string): Promise<ProjectInterface | null> {
    try {
      const project = await db.query.Project.findFirst({
        with: {
          codeblocks: {
            orderBy: [CodeBlock.createdAt],
          },
          pages: true,
        },
        where: eq(Project.id, id),
      });
      return project ? project : null;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  }

  static async create(workspace_id: string): Promise<ProjectInterface | null> {
    try {
      const [project] = await db
        .insert(Project)
        .values({
          name: "Untitled Project",
          workspace: workspace_id,
        })
        .returning();
      return project ? project : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async update(id: string, clause: {}) {
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

  static async delete(id: string): Promise<ProjectInterface | null> {
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
