import prisma from "@/lib/prisma";
import TaskCard from "./_components/task-card";

export default async function Home() {
  const tasks = await prisma.task.findMany();

  return (
    <main className="max-w-5xl mx-auto space-y-2">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </main>
  );
}
