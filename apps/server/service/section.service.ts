import { eq } from "drizzle-orm";
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

  static async create(
    page_id: string | null,
    component_id: string | null
  ): Promise<SectionInterface | null> {
    try {
      const [section] = await db
        .insert(Section)
        .values({
          name: "Untitled Section",
          page: page_id ?? null,
          component_id: component_id ?? null,
          layout: sectionDefault.layout,
          appearance: sectionDefault.appearance,
        })
        .returning();
      return section ? section : null;
    } catch (error) {
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
