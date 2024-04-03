import { getServerSession } from "next-auth";
import { Task as _Task } from "@prisma/client";

import Tasks from "@/components/tasks";
import options from "@/app/api/auth/options";

export default async function Home() {
  const session = await getServerSession(options);
  const name = session?.user?.name?.split(" ")[0];

  const { tasks, count } = await getAvailableTasks();

  async function getAvailableTasks() {
    const request = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tasks`, {
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
        <Tasks tasks={tasks} />
      </div>
    </main>
  );
}
