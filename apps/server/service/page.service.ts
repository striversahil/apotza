import { db } from "../database";
import { and, desc, eq } from "drizzle-orm";
import {
  Component,
  Page,
  PageInterface,
  ProjectInterface,
  Section,
} from "../schema";

export class PageService {
  static async getOne(
    name: string,
    project_id: string,
    page_id?: string
  ): Promise<PageInterface | null> {
    try {
      let page;
      if (page_id) {
        page = await db.query.Page.findFirst({
          with: {
            sections: {
              orderBy: [Section.createdAt],
            },
          },
          where: eq(Page.id, page_id),
        });
      } else {
        page = await db.query.Page.findFirst({
          with: {
            sections: {
              orderBy: [Section.createdAt],
            },
          },
          where: and(eq(Page.name, name), eq(Page.project, project_id)),
        });
      }

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

    static async getByName(
      name: string,
      projectId: string,
    ) : Promise<PageInterface | null> {
      try {
        const page = await this.getOneByConstaint(and(eq(Page.name, name) , eq(Page.project , projectId)), {
          createdAt: "desc",
        });
        return page ? page : null;
        
      } catch (error) {
        console.log(error);
        throw new Error(error as string);
      }
    }

  static async getById(id: string): Promise<PageInterface | null> {
    try {
      const page = await db.query.Page.findFirst({
        with: {
          sections: {
            orderBy: [Section.createdAt],
          },
        },
        where: eq(Page.id, id),
      });
      
      return page ? page : null;
    } catch (error) {
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
