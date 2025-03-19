/**
 * Component Service : It will Assume that You have done all the Validation Checks
 */

import { eq } from "drizzle-orm";
import { Component, ComponentInterface } from "../schema";
import { db } from "../database";

class ComponentService {
  static async getById(id: number): Promise<ComponentInterface | null> {
    try {
      const [component] = await db
        .select()
        .from(Component)
        .where(eq(Component.id, id))
        .limit(1);

      return component ? component : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async updateComponent(
    id: number,
    clause = {}
  ): Promise<ComponentInterface | null> {
    try {
      const [component] = await db
        .update(Component)
        .set(clause)
        .where(eq(Component.id, id))
        .returning();

      return component ? component : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  // static async coordinatesUpdate(id: string, coordinates: any) {
  //   try {
  //     return await Component.findByIdAndUpdate(id, {
  //       $inc: {
  //         "coordinates.x": coordinates.x,
  //         "coordinates.y": coordinates.y,
  //       },
  //     });
  //   } catch (error) {
  //     throw new Error(error as string);
  //   }
  // }

  static async create(
    metadata: any,
    payload: any
  ): Promise<ComponentInterface | null> {
    try {
      const [component] = await db
        .insert(Component)
        .values({
          name: metadata.name,
          coordinates: { ...metadata.coordinates },
          payload: payload,
          configuration: metadata.configuration,
        })
        .returning();

      return component ? component : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  //   static async updateComponent(id: string, Component: any) {
  //     // Todo : Update Todo to some Strong UseCase
  //     return await Component.findByIdAndUpdate(id, Component);
  //   }

  static async delete(componentId: number): Promise<ComponentInterface | null> {
    try {
      const [component] = await db
        .delete(Component)
        .where(eq(Component.id, componentId))
        .returning();
      return component ? component : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default ComponentService;
