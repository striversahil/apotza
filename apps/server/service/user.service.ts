/**
 * Workspace Service : It will Assume that You have done all the Validation Checks
 */

import { eq } from "drizzle-orm";
import { db } from "../database";
import { User } from "../models/auth/user.model";
import { users } from "../schema/user";
import { PgSerial, serial } from "drizzle-orm/pg-core";

class UserService {
  static async login(email: string, password: string): Promise<any> {
    /**
     * (Login User) Return : User Object Containing User Details
     */
    try {
      const CurrentUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
      if (!CurrentUser) return null;
      const isVerified = await CurrentUser.isCorrectPassword(password);
      if (!isVerified) return null;
      return CurrentUser;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getUser(userId: number): Promise<any> {
    /**
     * (Get User By Id) Return : User Object Containing User Details
     */
    try {
      return await db.select().from(users).where(eq(users.id, userId));
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getUserByEmail(email: string): Promise<any> {
    /**
     * (Get User By Email) Return : User Object Containing User Details
     */
    try {
      return await db.select().from(users).where(eq(users.email, email));
    } catch (error) {
      throw new Error(error as string);
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
      const userExists = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
      if (userExists) return null;
      const user = await db
        .insert(users)
        .values({
          name: name,
          email: email,
          password: password,
          refreshToken: "",
        })
        .returning();
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async updateUser(userId: number, data: any): Promise<any> {
    /**
     * (Update User) Return : User Object Containing User Details
     */
    try {
      return await db
        .update(users)
        .set(data)
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
