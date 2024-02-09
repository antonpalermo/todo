import { z } from "zod";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import errors from "@/lib/errors";
import options from "@/app/api/auth/options";

const schema = z.object({
  name: z
    .string()
    .refine(data => data.trim() !== "", { message: "Task name is required." })
    .refine(data => data.length >= 3 || data.trim() === "", {
      message: "Task name must be at least 3 characters long."
    })
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(options);
  const body = schema.safeParse(await req.json());

  if (!session) {
    return new NextResponse(errors.message.UNAUTHORIZED, { status: 401 });
  }

  if (!body.success) {
    return NextResponse.json(
      { errors: errors.toErrorMap(body.error) },
      { status: 400 }
    );
  }

  try {
    await prisma.task.create({
      data: { name: body.data.name }
    });

    return NextResponse.json(
      { message: "Task successfully created" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return new NextResponse(
        "[TASK CREATE] There's an error encountered creating tasks",
        { status: 500 }
      );
    }
    return new NextResponse(errors.message.SERVER, { status: 500 });
  }
}
