/**
 * Tipping-element interaction network, using Wunderling et al.'s real,
 * published coupling structure. No framework overlay — see DISCLAIMER.md
 * and constants.ts.
 *
 * Ported 1:1 from `src/cascading_tipping_utac/network.py`.
 * Deliberately does not simulate the full stochastic network dynamics.
 */

import {
  COUPLING_RANGES,
  ELEMENTS,
  type ElementId,
} from "./constants.ts";

export type Coupling = {
  source: ElementId;
  target: ElementId;
  sIjLow: number;
  sIjHigh: number;
  mechanism: string;
  mechanismDe: string;
  destabilizing: boolean | null;
  signKnown: boolean;
  sIjMidpoint: number;
  id: string;
};

export function couplingId(source: ElementId, target: ElementId): string {
  return `${source}->${target}`;
}

export function allCouplings(): Coupling[] {
  return COUPLING_RANGES.map(({ source, target, data }) => {
    const [low, high] = data.s_ij_range;
    return {
      source,
      target,
      sIjLow: low,
      sIjHigh: high,
      mechanism: data.mechanism,
      mechanismDe: data.mechanismDe,
      destabilizing: data.destabilizing,
      signKnown: data.sign_known,
      sIjMidpoint: (low + high) / 2,
      id: couplingId(source, target),
    };
  });
}

export class TippingNetwork {
  readonly elements: readonly ElementId[];
  readonly couplings: readonly Coupling[];

  constructor(
    elements: readonly ElementId[] = ELEMENTS,
    couplings: readonly Coupling[] = allCouplings(),
  ) {
    this.elements = elements;
    this.couplings = couplings;
  }

  couplingsFrom(element: ElementId): Coupling[] {
    if (!this.elements.includes(element)) {
      throw new Error(`Unknown element: ${element}`);
    }
    return this.couplings.filter((c) => c.source === element);
  }

  couplingsTo(element: ElementId): Coupling[] {
    if (!this.elements.includes(element)) {
      throw new Error(`Unknown element: ${element}`);
    }
    return this.couplings.filter((c) => c.target === element);
  }

  destabilizingCouplings(): Coupling[] {
    return this.couplings.filter((c) => c.destabilizing === true);
  }

  unclearSignCouplings(): Coupling[] {
    return this.couplings.filter((c) => !c.signKnown);
  }

  stabilizingCouplings(): Coupling[] {
    return this.couplings.filter((c) => c.destabilizing === false);
  }

  couplingById(id: string): Coupling | undefined {
    return this.couplings.find((c) => c.id === id);
  }

  summary(): string {
    const nDestab = this.destabilizingCouplings().length;
    const nUnclear = this.unclearSignCouplings().length;
    const nTotal = this.couplings.length;
    return (
      `${this.elements.length} elements, ${nTotal} documented couplings ` +
      `(${nDestab} clearly destabilizing, ${nUnclear} unclear sign per ` +
      "the source papers)"
    );
  }
}

export const NETWORK = new TippingNetwork();
