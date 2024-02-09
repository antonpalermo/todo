import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import errors from "@/lib/errors";
import options from "@/app/api/auth/options";

export async function DELETE(
  req: NextRequest,
  ctx: { params: { id: string } }
) {
  const id = ctx.params.id;
  const session = await getServerSession(options);

  if (!session) {
    return new NextResponse(errors.message.UNAUTHORIZED, { status: 401 });
  }

  try {
    if (!id) {
      return new NextResponse(
        "Oops! we're unable to process your request right now.",
        { status: 400 }
      );
    }

    await prisma.task.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: "Task successfully removed" },
      { status: 200 }
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
