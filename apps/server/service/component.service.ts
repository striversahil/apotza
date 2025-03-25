/**
 * Component Service : It will Assume that You have done all the Validation Checks
 */

import { eq } from "drizzle-orm";
import { Component, ComponentInterface, Section } from "../schema";
import { db } from "../database";

class ComponentService {
  static async getById(id: string): Promise<ComponentInterface | null> {
    try {
      const [component] = await db
        .select()
        .from(Component)
        .where(eq(Component.id, id))
        .limit(1);

      return component ? component : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async updateComponent(
    id: string,
    clause = {}
  ): Promise<ComponentInterface | null> {
    try {
      const [component] = await db
        .update(Component)
        .set(clause)
        .where(eq(Component.id, id))
        .returning();

      return component ? component : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getAllComponentsId(
    project_id: string
  ): Promise<string[] | null> {
    try {
      const sections = await db.query.Section.findMany({
        with: {
          components: true,
        },
        where: eq(Section.project, project_id),
      });
      const componentId: string[] = [];
      sections.forEach((section) => {
        section.components.forEach((component) => {
          componentId.push(component.id);
        });
      });
      return componentId ? componentId : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async create(...payload: any): Promise<ComponentInterface | null> {
    try {
      const slug = { ...payload[0] };

      const [component] = await db
        .insert(Component)
        .values({
          ...slug,
        })
        .returning();
      return component ? component : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  //   static async updateComponent(id: string, Component: any) {
  //     // Todo : Update Todo to some Strong UseCase
  //     return await Component.findByIdAndUpdate(id, Component);
  //   }

  static async delete(componentId: string): Promise<ComponentInterface | null> {
    try {
      const [component] = await db
        .delete(Component)
        .where(eq(Component.id, componentId))
        .returning();
      return component ? component : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default ComponentService;
