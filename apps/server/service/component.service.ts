/**
 * Component Service : It will Assume that You have done all the Validation Checks
 */

import { and, desc, eq } from "drizzle-orm";
import { Component, ComponentInterface, Page, Section } from "../schema";
import { db } from "../database";
import { MatchComponent } from "@repo/common";
import _ from "lodash";

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
        where: eq(Section.component_id ?? " ", id),
      });

      if (!component) return null;
      // Fetch all Additional Sections related to the component
      const compnoentWithSections = {
        ...component,
        sections,
      };

      return compnoentWithSections;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getByName(
    name: string,
    projectId: string
  ): Promise<ComponentInterface | null> {
    try {
      const component = await this.getOneByConstaint(
        and(eq(Component.name, name), eq(Component.project, projectId)),
        {
          createdAt: "desc",
        }
      );
      console.log("component", component, name, projectId);
      return component ? component : null;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  }

  static async getOneByConstaint(
    where: any,
    orderBy?: any
  ): Promise<ComponentInterface | null> {
    try {
      const [component] = await db
        .select()
        .from(Component)
        .where(where)
        .orderBy(orderBy)
        .limit(1);

      return component ? component : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async create(
    projectId: string,
    payload: any
  ): Promise<ComponentInterface | null> {
    try {
      // console.log(payload);
      const compDefault = MatchComponent[payload.name];

      const prevComponent = await this.getOneByConstaint(
        and(eq(Component.project, projectId)),
        desc(Component.createdAt)
      );

      let name = `${_.capitalize(payload.name)} 1`; // Adding default name to be "payload.name 1"
      let order_no = 1;

      if (prevComponent) {
        const prevCodeNo = prevComponent.order_no;
        name = `${payload.name} ${prevCodeNo + 1}`;
        order_no = prevCodeNo + 1;
      }

      const [component] = await db
        .insert(Component)
        .values({
          ...payload,
          name: name,
          project: projectId,
          component: payload.name,
          order_no: order_no,
          configuration: { ...compDefault },
        })
        .returning();
      return component ? component : null;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  }

  static async update(
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
