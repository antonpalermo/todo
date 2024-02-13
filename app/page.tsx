import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
import options from "@/app/api/auth/options";

import Task from "@/app/_components/tasks";

export default async function Home() {
  const session = await getServerSession(options);
  const tasks = await prisma.task.findMany({
    where: { owner: session?.user?.email! }
  });

  return (
    <main className="max-w-5xl mx-auto space-y-2">
      <div className="space-y-3">
        {tasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </main>
  );
}
