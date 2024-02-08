import { getServerSession } from "next-auth";

import options from "@/app/api/auth/options";
import { Button } from "@/components/ui/button";
import { CreateDialogTrigger } from "./create-dialog";

export default async function Navbar() {
  const session = await getServerSession(options);

  return (
    <nav className="max-w-5xl mx-auto">
      <div className="w-full flex flex-row items-center justify-between py-5">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 mb-1">
            Hello, {session?.user?.name}
          </h1>
          <p className="text-slate-500">Currently here are your open tasks.</p>
        </div>
        <CreateDialogTrigger />
      </div>
    </nav>
  );
}
