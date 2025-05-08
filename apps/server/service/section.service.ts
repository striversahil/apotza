import { and, desc, eq } from "drizzle-orm";
import { db } from "../database";
import { Section, SectionInterface } from "../schema";
import sectionDefault from "../common/sectionDefault.json";

class SectionService {
  static async getById(id: string): Promise<SectionInterface | null> {
    try {
      const section = await db.query.Section.findFirst({
        with: {
          components: true,
        },
        where: eq(Section.id, id),
      });
      return section ? section : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getOneByConstaint(
    where: any,
    orderBy?: any
  ): Promise<SectionInterface | null> {
    try {
      const [section] = await db
        .select()
        .from(Section)
        .where(where)
        .orderBy(orderBy)
        .limit(1);

      return section ? section : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async create(
    page_id: string | null,
    component_id: string | null
  ): Promise<SectionInterface | null> {
    try {
      const prevSection = await this.getOneByConstaint(
        and(
          eq(Section.page, page_id ?? ""),
          eq(Section.component_id, component_id ?? "")
        ),
        desc(Section.createdAt)
      );

      let name = `Section 1`; // Adding default name to be "Section 1"
      let order_no = 1;

      if (prevSection) {
        const prevCodeNo = prevSection.order_no;
        name = `Section ${prevCodeNo + 1}`;
        order_no = prevCodeNo + 1;
      }

      const [section] = await db
        .insert(Section)
        .values({
          name: name,
          page: page_id ?? "",
          component_id: component_id ?? "",
          order_no: order_no,
          layout: sectionDefault.layout,
          appearance: sectionDefault.appearance,
        })
        .returning();
      return section ? section : null;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  }

  static async delete(section_id: string): Promise<SectionInterface | null> {
    try {
      const [section] = await db
        .delete(Section)
        .where(eq(Section.id, section_id))
        .returning();
      return section ? section : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default SectionService;
