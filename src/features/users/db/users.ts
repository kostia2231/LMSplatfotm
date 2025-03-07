import { UserTable } from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";

export async function insertUser(data: typeof UserTable.$inferInsert) {
  const [newUser] = await db.insert(UserTable).values(data).returning().onConflictDoUpdate({
    target: [UserTable.clerkUserId],
    set: data
  })

  if (newUser == null) throw new Error("failed to create new user")

  return newUser
}

export async function updateUser({ clerkUserId }: { clerkUserId: string }, data: Partial<typeof UserTable.$inferInsert>) {
  const [updatedUser] = await db.update(UserTable).set(data).where(eq(UserTable.clerkUserId, clerkUserId)).returning()

  if (updatedUser == null) throw new Error("failed to create new user")

  return updatedUser
}

export async function deleteUser({ clerkUserId }: { clerkUserId: string }) {
  const [deletedUser] = await db.update(UserTable).set({
    deletedAt: new Date(),
    email: "deleted@deleted.com",
    name: "deleted user",
    clerkUserId: `deleted-${clerkUserId}`,
    imageUrl: null
  }).where(eq(UserTable.clerkUserId, clerkUserId)).returning()

  if (deletedUser == null) throw new Error("failed to create new user")

  return deletedUser
}
