"use client";

import CreateDialog from "@/app/_components/create-dialog";
import { Fragment, ReactNode, createContext, useEffect, useState } from "react";

interface IModalProviderProps {
  children: ReactNode;
}

interface IModalContextProviderProps {
  isOpen: boolean;
  toggle: () => void;
}

export const ModalContext = createContext<IModalContextProviderProps | null>(
  null
);

export default function ModalProvider({ children }: IModalProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function toggle() {
    return setIsOpen(prev => !prev);
  }

  return (
    <ModalContext.Provider value={{ isOpen, toggle }}>
      {children}
    </ModalContext.Provider>
  );
}
