import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
import options from "@/app/api/auth/options";
import TaskCard from "@/app/_components/task-card";

export default async function Home() {
  const session = await getServerSession(options);
  const tasks = await prisma.task.findMany({
    where: { owner: session?.user?.email! }
  });

  return (
    <main className="max-w-5xl mx-auto space-y-2">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </main>
  );
}
