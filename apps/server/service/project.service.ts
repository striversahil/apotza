import { CodeBlock, Component, Project, ProjectInterface, Section, StepBlock } from "../schema";
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

  static async globalContext(
    projectId: string,
  ) : Promise<Record<string, any> | null> {
    try {
      const project: any = await this.getById(projectId);
      if (!project) return null;

      // Getting codeblocks, components, and stepblocks
      const component = await db.query.Component.findMany({
        where: eq(Component.project , projectId)
      })

      const section = await db.query.Section.findMany({
        where: eq(Section.project, projectId)
      });

      const stepblock = await db.query.StepBlock.findMany({
        where: eq(StepBlock.project , projectId)
      });

      const context: Record<string, any> = {};

      // Setting up the global context
      if (project.codeblocks?.length) {
        project.codeblocks.forEach((codeBlock: any) => {
          context[codeBlock.name] = {
            response : codeBlock.response,
            error: codeBlock.error,
          }
        }
        );
      }

      if (component?.length) {
        component.forEach((component: any) => {
          context[component.name] = {
            ...component.configuration
          };
        });
      }

      if (section?.length) {
        section.forEach((section: any) => {
          context[section.name] = {
            ...section.configuration
          };
        });
      }

      if (stepblock?.length) {
        stepblock.forEach((stepblock: any) => {
          context[stepblock.name] = {
            ...stepblock.configuration
          };
        });
      }

      return context;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  }
}

export default ProjectService;
