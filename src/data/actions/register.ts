"use server";
import { db, schema } from "..";
import { setCookie } from "@/utils/cookies";
import { makeSessionToken } from "@/utils/makeSessionToken";
import { hashPassword } from "@/utils/hash";

export async function register(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "Email and password are required" };
  }

  const user = await db.query.usersTable.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    return { success: false, message: "User already exists" };
  }

  const [newUser] = await db
    .insert(schema.usersTable)
    .values({
      name: email,
      email,
      passwordHash: await hashPassword(password),
    })
    .returning({ id: schema.usersTable.id });

  const token = await makeSessionToken();

  await db.insert(schema.sessionTable).values({
    userId: newUser.id,
    tokenHash: token,
  });

  await setCookie("token", token);

  return { success: true, message: "Registration successful" };
}
