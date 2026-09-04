import { create } from "zustand";
import type { ElementId } from "./constants.ts";
import { clamp } from "../utils.ts";

export type Selection =
  | { kind: "element"; id: ElementId }
  | { kind: "coupling"; id: string }
  | null;

type KaskadeState = {
  couplingD: number;
  overshoot: boolean;
  selection: Selection;
  setCouplingD: (d: number) => void;
  setOvershoot: (on: boolean) => void;
  select: (selection: Selection) => void;
};

export const useKaskade = create<KaskadeState>((set) => ({
  couplingD: 1,
  overshoot: false,
  selection: null,
  setCouplingD: (d) => set({ couplingD: clamp(d, 0, 1) }),
  setOvershoot: (on) => set({ overshoot: on }),
  select: (selection) => set({ selection }),
}));
