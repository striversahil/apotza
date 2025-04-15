import { eq } from "drizzle-orm";
import { db } from "../database";
import languageDefault from "../common/defaultLanguageOutput.json";
import { StepBlock, StepBlockInterface } from "../schema";

class StepBlockService {
  static async getById(
    stepBlock_id: string
  ): Promise<StepBlockInterface | null> {
    try {
      const [stepBlock] = await db
        .select()
        .from(StepBlock)
        .where(eq(StepBlock.id, stepBlock_id));
      return stepBlock ? stepBlock : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async create(
    codeBlock_id: string,
    language: string
  ): Promise<StepBlockInterface | null> {
    try {
      const payload = languageDefault.find((item: any) => {
        if (item.value === language) {
          return item;
        }
      });
      if (!payload) return null;
      const [newStepBlock] = await db
        .insert(StepBlock)
        .values({
          name: payload.label,
          codeblock: codeBlock_id,
          code: payload.code,
          language: payload.value,
          output: payload.stdout,
          stdout: payload.stdout,
        })
        .returning();

      return newStepBlock ? newStepBlock : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async createMultiple(
    codeBlock_id: string,
    language: string[]
  ): Promise<StepBlockInterface[] | null> {
    try {
      const payload = language.map((lang: string) => {
        const item = languageDefault.find((item: any) => {
          if (item.value === lang) {
            return item;
          }
        });
        return item;
      });
      if (!payload[0]) return null;
      const Insert = payload.map((item: any) => ({
        name: item.label,
        codeblock: codeBlock_id,
        code: item.code,
        language: item.value,
        output: item.stdout,
        stdout: item.stdout,
      }));
      if (!Insert) return null;
      const newStepBlock = await db
        .insert(StepBlock)
        .values(Insert)
        .returning();

      return newStepBlock ? newStepBlock : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async update(
    stepBlock_id: string,
    clause = {}
  ): Promise<StepBlockInterface | null> {
    try {
      const [stepBlock] = await db
        .update(StepBlock)
        .set(clause)
        .where(eq(StepBlock.id, stepBlock_id))
        .returning();
      return stepBlock ? stepBlock : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async delete(
    stepBlock_id: string
  ): Promise<StepBlockInterface | null> {
    try {
      const [stepBlock] = await db
        .delete(StepBlock)
        .where(eq(StepBlock.id, stepBlock_id))
        .returning();
      return stepBlock ? stepBlock : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default StepBlockService;
