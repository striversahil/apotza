import { db } from "../database";
import { eq } from "drizzle-orm";
import { Component, Page, PageInterface } from "../schema";

export class PageService {
  static async getOne(id: string): Promise<PageInterface | null> {
    try {
      const page = await db.query.Page.findFirst({
        with: {
          sections: true,
        },
        where: eq(Page.name, id),
      });

      // Fetch all Additional Component's for the component
      const [components] = await db.query.Component.findMany({
        where: eq(Component.page ?? "", id),
      });

      if (!page) return null;
      const pageWithComponent = {
        ...page,
        components,
      };

      return pageWithComponent;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async create(
    project_id: string,
    ...payload: any
  ): Promise<PageInterface | null> {
    try {
      const [page] = await db
        .insert(Page)
        .values({
          name: "Untitled Page",
          project: project_id,
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
