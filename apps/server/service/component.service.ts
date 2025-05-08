/**
 * Component Service : It will Assume that You have done all the Validation Checks
 */

import { and, desc, eq } from "drizzle-orm";
import { Component, ComponentInterface, Page, Section } from "../schema";
import { db } from "../database";
import { MatchComponent } from "@repo/common";

class ComponentService {
  static async getById(id: string): Promise<ComponentInterface | null> {
    try {
      const component = await db.query.Component.findFirst({
        where: eq(Component.id, id),
      });

      // Fetch all sections for the component
      const sections = await db.query.Section.findMany({
        with: {
          components: true,
        },
        where: eq(Section.component_id ?? "1", id),
      });

      if (!component) return null;
      const compnoentWithSections = {
        ...component,
        sections,
      };

      return compnoentWithSections;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getOneByConstaint(
    section_id: string,
    where: any,
    orderBy?: any
  ): Promise<ComponentInterface | null> {
    try {
      const [component] = await db
        .select()
        .from(Component)
        .where(and(eq(Component.section, section_id), where ?? {}))
        .orderBy(orderBy)
        .limit(1);

      return component ? component : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async create(payload: any): Promise<ComponentInterface | null> {
    try {
      // console.log(payload);
      const compDefault = MatchComponent[payload.name];

      const prevComponent = await this.getOneByConstaint(
        payload.section,
        null,
        desc(Component.createdAt)
      );

      let name = `${payload.name} 1`; // Adding default name to be "payload.name 1"

      if (prevComponent) {
        const prevCodeNo = Number(prevComponent.name.split(" ")[1]);
        name = `${payload.name} ${prevCodeNo + 1}`;
      }

      const [component] = await db
        .insert(Component)
        .values({
          ...payload,
          name: name,
          ...compDefault,
        })
        .returning();
      return component ? component : null;
    } catch (error) {
      console.log(error);
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
      const page = await db.query.Page.findMany({
        with: {
          sections: {
            with: {
              components: true,
            },
          },
        },
        where: eq(Page.project, project_id),
      });
      const componentId: string[] = [];
      page.forEach((page) => {
        page.sections.forEach((section) => {
          section.components.forEach((component) => {
            componentId.push(component.id);
          });
        });
      });
      return componentId ? componentId : null;
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
