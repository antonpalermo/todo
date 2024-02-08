import { useContext } from "react";
import { ModalContext } from "@/components/providers/modal";

export default function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal should be used inside ModalProvider");
  }

  return context;
}
