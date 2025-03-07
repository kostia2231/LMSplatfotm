import { UserRole } from "@/drizzle/schema";
import { clerkClient } from "@clerk/nextjs/server";


export async function syncClerkUserMetadata(user: {
  id: string;
  clerkUserId: string;
  role: UserRole;
}) {
  const client = await clerkClient();
  try {
    return client.users.updateUserMetadata(user.clerkUserId, {
      publicMetadata: {
        dbId: user.id,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("error syncing clerk user metadata", (err as Error).message)
  }
}
