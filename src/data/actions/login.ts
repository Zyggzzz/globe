"use server";
import { makeSessionToken } from "@/utils/makeSessionToken";
import { db, schema } from "..";
import { setCookie } from "@/utils/cookies";
import { verifyPassword } from "@/utils/hash";

export async function login(_previousState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required",
    };
  }

  const user = await db.query.usersTable.findFirst({
    where: {
      email,
    },
  });

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  const token = await makeSessionToken();

  await db.insert(schema.sessionTable).values({
    userId: user.id,
    tokenHash: token,
  });

  await setCookie("token", token);
  return { success: true, message: "Login successful" };
}
