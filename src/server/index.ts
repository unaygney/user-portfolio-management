import { z } from "zod";

import { publicProcedure, router } from "./trpc";

import { usersTable as users } from "@/db/schema";

import { db } from "@/db";

export const appRouter = router({
  getUsers: publicProcedure.query(async () => {
    return await db.select().from(users);
  }),
  addUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        age: z.number(),
        email: z.string(),
      })
    )
    .mutation(async (opts) => {
      await db.insert(users).values({
        name: opts.input.name,
        age: opts.input.age,
        email: opts.input.email,
      });
      return true;
    }),
});

export type AppRouter = typeof appRouter;
