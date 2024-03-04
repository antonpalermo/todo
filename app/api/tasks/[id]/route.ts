import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import options from "@/app/api/auth/options";

import prisma from "@/lib/prisma";
import errors from "@/lib/errors";
import { revalidateTag } from "next/cache";

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
