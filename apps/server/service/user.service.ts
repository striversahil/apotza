/**
 * User Service : It will Assume that You have done all the Validation Checks
 */

import { eq } from "drizzle-orm";
import { db } from "../database";
import { users, UserType } from "../schema/user";
import PasswordService from "../utils/passwordService";
import TokensService from "../utils/AccessRefreshToken";

class UserService {
  static async getUserById(userId: number): Promise<any> {
    /**
     * (Get User By Id) Return : User Object Containing User Details
     */
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);
      return user ? user : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getUserByEmail(email: string): Promise<UserType | null> {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

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
        .insert(users)
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

  static async updateUser(userId: number, clause = {}): Promise<any> {
    /**
     * (Update User) Return : User Object Containing User Details
     */
    try {
      return await db
        .update(users)
        .set(clause)
        .where(eq(users.id, userId))
        .returning();
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async deleteUser(userId: number): Promise<any> {
    /**
     * (Delete User) Return : User Object Containing User Details
     */
    try {
      return await db.delete(users).where(eq(users.id, userId)).returning();
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default UserService;
