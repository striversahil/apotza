import { eq } from "drizzle-orm";
import { db } from "../database";
import SectionDefault from "../package/common/section_column/sectionDefault.json";
import { Section, SectionInterface } from "../schema";

class SectionService {
  static async getById(id: number): Promise<SectionInterface | null> {
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

  static async create(project_id: number): Promise<SectionInterface | null> {
    try {
      const [section] = await db
        .insert(Section)
        .values({
          name: "Untitled Section",
          project: project_id,
        })
        .returning();
      return section ? section : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async delete(section_id: number): Promise<SectionInterface | null> {
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
