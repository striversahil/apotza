import { eq } from "drizzle-orm";
import { db } from "../database";
import { StepBlock, StepBlockInterface } from "../schema";
import stepBlockDefault from "../utils/stepBlockDefault";

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
    type: string
  ): Promise<StepBlockInterface | null> {
    try {
      const payload = stepBlockDefault(type);
      if (!payload) return null;
      const [newStepBlock] = await db
        .insert(StepBlock)
        .values({
          name: payload.name,
          type: type,
          codeblock: codeBlock_id,
          config: payload.config,
          stdout: payload.stdout,
          output: payload.output,
          request: "",
        })
        .returning();

      return newStepBlock ? newStepBlock : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async runBlock(
    stepBlock_id: string,
    type: string,
    data: any
  ): Promise<StepBlockInterface | null> {
    try {
      const response = await fetch(
        `${process.env.TRANSFORMER_SERVER}/${type}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data }),
        }
      );
      if (!response) return null;
      console.log(response.json());
      const [stepBlock] = await db
        .update(StepBlock)
        .set({ ...data })
        .where(eq(StepBlock.id, stepBlock_id))
        .returning();
      return stepBlock ? stepBlock : null;
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
        const Valid = stepBlockDefault(lang);

        if (!Valid) return null;

        return {
          name: Valid.name,
          type: lang,
          codeblock: codeBlock_id,
          config: Valid.config,
          stdout: Valid.stdout,
          output: Valid.output,
          request: "",
        };
      });
      const filteredPayload = payload.filter((item) => item !== null);
      // if (!payload[0]) return null;

      const newStepBlock = await db
        .insert(StepBlock)
        .values(filteredPayload)
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
