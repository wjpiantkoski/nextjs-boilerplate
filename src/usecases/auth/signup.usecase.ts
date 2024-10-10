import { lucia } from "@/lib/auth";
import { SignUp } from "@/lib/validation-schemas/auth/signup.schema";
import { hash } from "@node-rs/argon2";
import { PrismaClient } from "@prisma/client";
import { Cookie, generateIdFromEntropySize } from "lucia";

export default async function signupUsecase(input: SignUp): Promise<Cookie> {
  const password_hash = await hash(input.password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  const userId = generateIdFromEntropySize(10);
  const prisma = new PrismaClient();

  await prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      id: userId,
      password_hash,
    },
  });

  const session = await lucia.createSession(userId, {});

  return lucia.createSessionCookie(session.id);
}
