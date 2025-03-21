/**
 * CodeBlock Service : It will Assume that You have done all the Validation Checks
 */

import { eq } from "drizzle-orm";
import { db } from "../database";
import { CodeBlock, CodeBlockInterface } from "../schema";

class CodeBlockService {
  static async getById(id: number): Promise<CodeBlockInterface | null> {
    try {
      const codeBlock = await db.query.CodeBlock.findFirst({
        with: {
          stepBlocks: true,
        },
        where: eq(CodeBlock.id, id),
      });

      return codeBlock ? codeBlock : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async create(
    project_id: number,
    name: string
  ): Promise<CodeBlockInterface | null> {
    try {
      const [codeBlock] = await db
        .insert(CodeBlock)
        .values({
          name: name,
          project: project_id,
        })
        .returning();

      return codeBlock ? codeBlock : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  //   static async updateCodeBlock(id: string, codeBlock: typeof CodeBlock) {
  //     // Todo : Update Todo to some Strong UseCase
  //     return await CodeBlock.findByIdAndUpdate(id, codeBlock);
  //   }

  static async update(
    id: number,
    clause = {}
  ): Promise<CodeBlockInterface | null> {
    try {
      const [codeBlock] = await db
        .update(CodeBlock)
        .set(clause)
        .where(eq(CodeBlock.id, id))
        .returning();
      return codeBlock ? codeBlock : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async delete(id: number): Promise<CodeBlockInterface | null> {
    try {
      const [codeBlock] = await db
        .delete(CodeBlock)
        .where(eq(CodeBlock.id, id))
        .returning();
      return codeBlock ? codeBlock : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default CodeBlockService;
