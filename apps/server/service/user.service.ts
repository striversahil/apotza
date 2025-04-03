/**
 * User Service : It will Assume that You have done all the Validation Checks
 */

import { eq } from "drizzle-orm";
import { db } from "../database";
import { User, UserType } from "../schema/user";
import PasswordService from "../utils/passwordService";
import TokensService from "../utils/AccessRefreshToken";

class Userervice {
  static async getUserById(userId: string): Promise<UserType | null> {
    /**
     * (Get User By Id) Return : User Object Containing User Details
     */
    try {
      const user = await db.query.User.findFirst({
        with: {
          workspaces: true,
        },
        where: eq(User.id, userId),
      });
      return user ? user : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getUserByEmail(email: string): Promise<UserType | null> {
    try {
      const [user] = await db.select().from(User).where(eq(User.email, email));

      return user ?? null; // More concise: If user exists, return it; otherwise, return null.
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }

  static async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<any> {
    /**
     * (Create User) Return : User Object Containing User Details
     */
    try {
      const [user] = await db
        .insert(User)
        .values({
          name: name,
          email: email,
          password: password,
          refreshToken: "",
        })
        .returning();

      return user ? user : null;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async updateUser(userId: string, clause = {}): Promise<any> {
    /**
     * (Update User) Return : User Object Containing User Details
     */
    try {
      return await db
        .update(User)
        .set(clause)
        .where(eq(User.id, userId))
        .returning();
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async deleteUser(userId: string): Promise<any> {
    /**
     * (Delete User) Return : User Object Containing User Details
     */
    try {
      const [user] = await db
        .delete(User)
        .where(eq(User.id, userId))
        .returning();

      return user ? user : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default Userervice;
