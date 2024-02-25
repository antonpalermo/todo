import Image from "next/image";

import Logo from "@/public/logo.svg";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="w-full">
      <div className="max-w-2xl mx-auto px-2">
        <div className="w-full flex items-center justify-between py-4">
          <Image src={Logo} alt="brand logo" width={70} height={44} />
          <Button>Create</Button>
        </div>
      </div>
    </nav>
  );
}
