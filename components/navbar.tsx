"use client";

import Image from "next/image";

import Logo from "@/public/logo.svg";
import { ModalAction, modalStore } from "@/lib/stores/modal";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  const toggle = modalStore((state: any) => state.toggle);

  return (
    <nav className="w-full">
      <div className="max-w-2xl mx-auto px-2">
        <div className="w-full flex items-center justify-between py-4">
          <Image src={Logo} alt="brand logo" width={70} height={44} />
          <Button onClick={() => toggle(ModalAction.create)}>Create</Button>
        </div>
      </div>
    </nav>
  );
}
