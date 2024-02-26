import { create } from "zustand";

type ModalStore = {
  isOpen: boolean;
  toggle: () => void;
};

export const modalStore = create<ModalStore>((set, _) => ({
  isOpen: false,
  toggle: () => set(state => ({ isOpen: !state.isOpen }))
}));
