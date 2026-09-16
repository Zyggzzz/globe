import { db, schema } from "@/data";
import { eq, sql } from "drizzle-orm";
import type { User } from "@/types/user";

export async function validateAuth(token: string): Promise<User | null> {
  const tokenData = await db.query.sessionTable.findFirst({
    columns: {
      id: true,
    },
    where: {
      tokenHash: token,
      expiresAt: { gt: new Date() },
      revokedAt: { isNull: true },
      deletedAt: { isNull: true },
    },
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          email: true,
        },
        where: {
          deletedAt: { isNull: true },
        },
      },
    },
  });

  if (!tokenData?.user) {
    return null;
  }

  await db
    .update(schema.sessionTable)
    .set({
      expiresAt: sql`now() + interval '24 hours'`,
    })
    .where(eq(schema.sessionTable.tokenHash, token));

  return tokenData.user;
}
