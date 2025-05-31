import { and, desc, eq } from "drizzle-orm";
import { db } from "../database";
import { StepBlock, StepBlockInterface } from "../schema";
import stepBlockDefault from "../utils/stepBlockDefault";
import CodeBlockService from "./codeblock.service";

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

  static async getOneByConstaint(
    where?: any,
    orderBy?: any
  ): Promise<StepBlockInterface | null> {
    try {
      const [stepBlock] = await db
        .select()
        .from(StepBlock)
        .where(where)
        .orderBy(orderBy)
        .limit(1);
      return stepBlock ? stepBlock : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async create(
    project_id: string,
    codeBlock_id: string,
    type: string
  ): Promise<StepBlockInterface | null> {
    try {
      const payload = stepBlockDefault(type);
      if (!payload) return null;

      const prevStepBlock = await this.getOneByConstaint(
        and(eq(StepBlock.project, project_id), eq(StepBlock.type, type)),
        desc(StepBlock.createdAt)
      );

      let name = `${payload.name} 1`; // Adding default name to be "payload.name 1"
      let order_no = 1;

      if (prevStepBlock) {
        const prevCodeNo = prevStepBlock.order_no;
        name = `${payload.name} ${prevCodeNo + 1}`;
        order_no = prevCodeNo + 1;
      }
      const [newStepBlock] = await db
        .insert(StepBlock)
        .values({
          name: name,
          type: type,
          project: project_id,
          codeblock: codeBlock_id,
          order_no: order_no,
          configuration: payload.configuration,
          stdout: payload.stdout,
          response: payload.output,
          error: null,
        })
        .returning();

      if (!newStepBlock) return null;

      // Updating the codeBlock context with the new stepBlock
      const codeBlock: any = await CodeBlockService.getById(codeBlock_id);
      if (!codeBlock) return null;
      await CodeBlockService.update(codeBlock_id, {
        stepblockContext: {
          ...codeBlock?.stepblockContext,
          [newStepBlock.id]: {},
        },
      });

      return newStepBlock ? newStepBlock : null;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  }

  static async runBlock(
    stepBlock_id: string
  ): Promise<StepBlockInterface | null> {
    try {
      const _stepBlock = await this.getById(stepBlock_id);
      if (!_stepBlock) return null;

      const response = await fetch(
        `${process.env.TRANSFORMER_SERVER}/${_stepBlock.type}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...(_stepBlock.configuration as object) }),
        }
      );
      if (!response.ok) return null;

      let updated_result = null;
      const result = await response.json();

      if (!result) return null;

      // Checking if the result is an error so set Response and Error accordingly
      if (result.success === false) {
        const updateErrorStepBlock = await this.update(stepBlock_id, {
          error: result.message,
          response: null,
        });
        return updateErrorStepBlock ? updateErrorStepBlock : null;
      }

      if (result.success === true) {
        updated_result = result.payload;
      }

      if (typeof updated_result !== "object") {
        updated_result = { message: updated_result };
      }

      const updated_stepBlock = await this.update(stepBlock_id, {
        response: updated_result,
        error: null,
      });

      return updated_stepBlock ? updated_stepBlock : null;
    } catch (error) {
      console.log(error);
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
          config: Valid.configuration,
          stdout: Valid.stdout,
          response: Valid.output,
          error: null,
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
      console.log(error);
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
      console.log(error);
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
      if (!stepBlock) return null;

      // Updating the codeBlock context with the new stepBlock
      const codeBlock: any = await CodeBlockService.getById(
        stepBlock.codeblock!
      );
      if (!codeBlock) return null;
      const updatedCodeBlock = await CodeBlockService.update(codeBlock.id, {
        stepblockContext: codeBlock?.stepblockContext.filter(
          (item: any) => item !== stepBlock.id
        ),
      });
      if (!updatedCodeBlock) return null;
      return stepBlock ? stepBlock : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default StepBlockService;
