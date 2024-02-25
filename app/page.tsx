import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
import options from "@/app/api/auth/options";

export default async function Home() {
  const session = await getServerSession(options);
  const name = session?.user?.name?.split(" ")[0];

  const tasks = await prisma.task.findMany();

  return (
    <main className="max-w-2xl mx-auto px-2">
      <div className="py-10 space-y-5">
        <div>
          <h1 className="text-2xl font-semibold">Hello {name}!</h1>
          <p className="text-slate-500">
            Currently there are {tasks.length} task opened
          </p>
        </div>
      </div>
    </main>
  );
}
