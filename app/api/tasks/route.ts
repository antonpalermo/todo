import { z } from "zod";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import options from "@/app/api/auth/options";
import errors, { toErrorMap } from "@/lib/errors";
import { revalidateTag } from "next/cache";

const schema = z.object({
  name: z
    .string()
    .refine(data => data.trim() !== "", { message: "Task name is required." })
    .refine(data => data.length >= 3 || data.trim() === "", {
      message: "Task name must be at least 3 characters long."
    })
});

export async function GET(req: NextRequest) {
  try {
    const tasks = await prisma.task.findMany();

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return new NextResponse(errors.message.SERVER, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(options);

  const parse = schema.safeParse(await req.json());

  if (!session) {
    return new NextResponse(errors.message.UNAUTHORIZED, { status: 401 });
  }

  try {
    if (!parse.success) {
      return NextResponse.json(
        { errors: toErrorMap(parse.error) },
        { status: 400 }
      );
    }

    const data = { name: parse.data.name, owner: session.user?.email! };

    await prisma.task.create({ data });
  } catch (error) {
    return new NextResponse(errors.message.SERVER, { status: 500 });
  }

  revalidateTag("a");

  return NextResponse.json(
    { message: "Task successfully created" },
    { status: 201 }
  );
}
