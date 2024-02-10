"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

import options from "@/app/api/auth/options";

import prisma from "@/lib/prisma";
import errors, { toErrorMap } from "@/lib/errors";

const schema = z.object({
  name: z
    .string()
    .refine(data => data.trim() !== "", { message: "Task name is required." })
    .refine(data => data.length >= 3 || data.trim() === "", {
      message: "Task name must be at least 3 characters long."
    })
});

export type TaskStateAction = {
  message: string;
  errors?: any;
};

export async function createTask(
  prevState: any,
  formData: FormData
): Promise<TaskStateAction> {
  const session = await getServerSession(options);

  const parse = schema.safeParse({
    name: formData.get("name")
  });

  if (!session) {
    throw new Error(errors.message.UNAUTHORIZED);
  }

  try {
    if (!parse.success) {
      return { message: "Invalid Fields", errors: toErrorMap(parse.error) };
    }

    const data = { name: parse.data.name, owner: session.user?.email! };

    await prisma.task.create({ data });

    revalidatePath("/");

    return { message: "Task successfully created" };
  } catch (error) {
    throw new Error("Unable to create task.");
  }
}
