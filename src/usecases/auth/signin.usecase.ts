import { lucia } from "@/lib/auth";
import { SignIn } from "@/lib/validation-schemas/auth/signin.schema";
import { verify } from "@node-rs/argon2";
import { PrismaClient } from "@prisma/client";
import { Cookie } from "lucia";

export default async function signinUsecase(input: SignIn): Promise<Cookie> {
  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordMatch = await verify(user.password_hash, input.password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }

  const session = await lucia.createSession(user.id, {});

  return lucia.createSessionCookie(session.id);
}
