import { getServerSession } from "next-auth";

import options from "@/app/api/auth/options";

import Task from "@/components/tasks/task";
import { Task as _Task } from "@prisma/client";

export default async function Home() {
  const session = await getServerSession(options);
  const name = session?.user?.name?.split(" ")[0];

  const { tasks, count } = await getAvailableTasks();

  async function getAvailableTasks() {
    const request = await fetch("http://localhost:3000/api/tasks", {
      next: { revalidate: 3600, tags: ["tasks"] }
    });

    return await request.json();
  }

  return (
    <main className="max-w-2xl mx-auto px-2">
      <div className="py-10 space-y-5">
        <div>
          <h1 className="text-2xl font-semibold">Hello {name}!</h1>
          <p className="text-slate-500">
            Currently there are {count} task opened
          </p>
        </div>
        <div className="space-y-3">
          {tasks.map((task: _Task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </div>
    </main>
  );
}
