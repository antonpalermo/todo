"use client";

import Image from "next/image";

import Logo from "@/public/logo.svg";
import CreateModal from "@/components/tasks/modal/create";

export default function Navbar() {
  return (
    <nav className="w-full">
      <div className="max-w-2xl mx-auto px-2">
        <div className="w-full flex items-center justify-between py-4">
          <Image src={Logo} alt="brand logo" width={70} height={44} />
          <CreateModal />
        </div>
      </div>
    </nav>
  );
}
