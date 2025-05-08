import { db } from "../database";
import { and, desc, eq } from "drizzle-orm";
import { Component, Page, PageInterface, ProjectInterface } from "../schema";

export class PageService {
  static async getOne(
    id: string,
    project_id: string
  ): Promise<PageInterface | null> {
    try {
      const page = await db.query.Page.findFirst({
        with: {
          sections: true,
        },
        where: and(eq(Page.name, id), eq(Page.project, project_id)),
      });
      if (!page) return null;

      // Fetch all Additional Component's for the component
      const components = await db.query.Component.findMany({
        where: eq(Component.page ?? "1", page.id),
      });

      const pageWithComponent = {
        ...page,
        components,
      };

      return pageWithComponent;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  }

  static async getOneByConstaint(
    where: any,
    orderBy?: any
  ): Promise<PageInterface | null> {
    try {
      const [page] = await db
        .select()
        .from(Page)
        .where(where)
        .orderBy(orderBy)
        .limit(1);

      return page ? page : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async create(
    project_id: string,
    ...payload: any
  ): Promise<PageInterface | null> {
    try {
      const prevPage = await this.getOneByConstaint(
        eq(Page.project, project_id),
        desc(Page.createdAt)
      );

      let name = `Page 1`; // Adding default name to be "Page 1"
      let order_no = 1;

      if (prevPage) {
        const prevCodeNo = prevPage.order_no;
        name = `Page ${prevCodeNo + 1}`;
        order_no = prevCodeNo + 1;
      }

      const [page] = await db
        .insert(Page)
        .values({
          name: name,
          project: project_id,
          order_no: order_no,
          ...payload[0],
        })
        .returning();
      return page ? page : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async update(id: string, clause: {}): Promise<PageInterface | null> {
    try {
      const [page] = await db
        .update(Page)
        .set(clause)
        .where(eq(Page.id, id))
        .returning();
      return page ? page : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async delete(id: string): Promise<PageInterface | null> {
    try {
      const [page] = await db.delete(Page).where(eq(Page.id, id)).returning();
      return page ? page : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
