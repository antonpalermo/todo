import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import options from "../auth/options";
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

    return NextResponse.json(
      { message: "Task successfully created" },
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(errors.message.SERVER, { status: 500 });
  }
}
