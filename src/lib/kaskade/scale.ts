/**
 * Slider scaling of documented findings. Linear in coupling strength d
 * (Wunderling's interaction strength, 0 = isolated, 1 = max documented).
 * Not a Monte-Carlo engine — the published percentages are the only numbers.
 */

import {
  AMOC_CRITICAL_TEMP_REDUCTION_PCT_AT_MAX_COUPLING,
  OVERSHOOT_CASCADE_RISK_INCREASE_PCT_MAX,
  WAIS_CRITICAL_TEMP_REDUCTION_PCT_AT_MAX_COUPLING,
} from "./constants.ts";
import { clamp } from "../utils.ts";

export type ReductionElement = "amoc" | "wais";

const MAX_REDUCTION: Record<ReductionElement, number> = {
  amoc: AMOC_CRITICAL_TEMP_REDUCTION_PCT_AT_MAX_COUPLING,
  wais: WAIS_CRITICAL_TEMP_REDUCTION_PCT_AT_MAX_COUPLING,
};

/** Effective critical-temperature reduction (%) at coupling strength d ∈ [0, 1]. */
export function criticalTempReductionPct(
  element: ReductionElement,
  d: number,
): number {
  return clamp(d, 0, 1) * MAX_REDUCTION[element];
}

/** Remaining isolated-threshold fraction after reduction (1 = isolated). */
export function remainingThresholdFraction(
  element: ReductionElement,
  d: number,
): number {
  return 1 - criticalTempReductionPct(element, d) / 100;
}

export type CascadeRiskIndex = {
  /** Relative index without overshoot, fixed at 100. */
  base: 100;
  /** Relative index with overshoot = 100 × (1 + 72/100). */
  withOvershoot: number;
  increasePct: number;
};

/**
 * Relative cascade-risk index from Wunderling 2022.
 * Absolute cascade probabilities are not published as a single number
 * here — only the documented +72 % increase under overshoot.
 */
export function cascadeRiskIndex(): CascadeRiskIndex {
  return {
    base: 100,
    withOvershoot: 100 * (1 + OVERSHOOT_CASCADE_RISK_INCREASE_PCT_MAX / 100),
    increasePct: OVERSHOOT_CASCADE_RISK_INCREASE_PCT_MAX,
  };
}

export function maxReduction(element: ReductionElement): number {
  return MAX_REDUCTION[element];
}
