import { create } from "zustand";

export enum ModalAction {
  create,
  update
}

type ModalStore = {
  isOpen: boolean;
  action: string;
  toggle: (form: ModalAction) => void;
};

export const modalStore = create<ModalStore>((set, _) => ({
  isOpen: false,
  action: "create",
  toggle: (form: ModalAction) =>
    set(state => ({
      action: form === ModalAction.create ? "create" : "update",
      isOpen: !state.isOpen
    }))
}));
