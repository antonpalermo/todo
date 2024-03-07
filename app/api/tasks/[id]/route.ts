import { z } from "zod";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const parse = schema.safeParse(await req.json());
  const session = await getServerSession(options);

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

    const data = { name: parse.data.name };

    await prisma.task.update({
      where: { id, owner: session.user?.email! },
      data
    });
  } catch (error) {
    return new NextResponse(errors.message.SERVER, { status: 500 });
  }

  revalidateTag("tasks");

  return NextResponse.json(
    { message: "Task successfully updated" },
    { status: 200 }
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const session = await getServerSession(options);

  if (!session) {
    return new NextResponse(errors.message.UNAUTHORIZED, { status: 401 });
  }

  try {
    await prisma.task.delete({
      where: { id, AND: { owner: session.user?.email! } }
    });
  } catch (error) {
    return new NextResponse(errors.message.SERVER, { status: 500 });
  }

  revalidateTag("tasks");

  return NextResponse.json(
    { message: "Task successfully deleted" },
    { status: 200 }
  );
}
