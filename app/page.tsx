import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
import options from "@/app/api/auth/options";

import Task from "@/components/tasks/task";
import { Task as _Task } from "@prisma/client";

async function getAvailableTasks() {
  const req = await fetch(`http://localhost:3000/api/tasks`, {
    next: { tags: ["a"] }
  });

  if (!req.ok) {
    throw new Error("Unable to fetch all available tasks");
  }

  return await req.json();
}

export default async function Home() {
  const session = await getServerSession(options);
  const name = session?.user?.name?.split(" ")[0];

  const tasks = await getAvailableTasks();

  return (
    <main className="max-w-2xl mx-auto px-2">
      <div className="py-10 space-y-5">
        <div>
          <h1 className="text-2xl font-semibold">Hello {name}!</h1>
          <p className="text-slate-500">
            Currently there are {tasks.length} task opened
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
