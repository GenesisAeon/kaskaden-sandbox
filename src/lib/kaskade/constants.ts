/**
 * Real, independently verified constants for cascading-tipping-utac (P87).
 *
 * Checked 2026-08-02. Implements the real, published Wunderling et al.
 * tipping-element interaction network (Greenland Ice Sheet / West Antarctic
 * Ice Sheet / AMOC / Amazon rainforest) — deliberately no additional
 * framework overlay beyond what the cited papers themselves quantify.
 *
 * Ported 1:1 from `src/cascading_tipping_utac/constants.py`.
 * Do not invent numbers. Do not add elements.
 */

export const PACKAGE_ID = 87;
export const PACKAGE_NAME = "cascading-tipping-utac";
export const SOURCE_VERSION = "1.0.1";

export const WUNDERLING_2021_CITATION =
  "Wunderling, N., Donges, J.F., Kurths, J., Winkelmann, R. (2021). " +
  '"Interacting tipping elements increase risk of climate domino ' +
  'effects under global warming". Earth System Dynamics, 12, 601-619. ' +
  "DOI: 10.5194/esd-12-601-2021.";

export const WUNDERLING_2022_CITATION =
  "Wunderling, N., Winkelmann, R., Rockstrom, J. et al. (2022). " +
  '"Global warming overshoots increase risks of climate tipping ' +
  'cascades in a network model". Nature Climate Change. ' +
  "DOI: 10.1038/s41558-022-01545-9.";

export const WUNDERLING_2024_REVIEW_CITATION =
  "Wunderling, N. et al. (2024). " +
  '"Climate tipping point interactions and cascades: a review". ' +
  "Earth System Dynamics, 15, 41-74. DOI: 10.5194/esd-15-41-2024.";

export const ROCHA_2018_CITATION =
  "Rocha, J.C., Peterson, G., Bodin, O., Levin, S. (2018). " +
  '"Cascading regime shifts within and across scales". Science, 362(6421), ' +
  "1379-1383. DOI: 10.1126/science.aat7850.";

export const WUNDERLING_2021_DOI = "10.5194/esd-12-601-2021";
export const WUNDERLING_2022_DOI = "10.1038/s41558-022-01545-9";
export const WUNDERLING_2024_DOI = "10.5194/esd-15-41-2024";
export const ROCHA_2018_DOI = "10.1126/science.aat7850";

export const ELEMENT_IDS = [
  "greenland_ice_sheet",
  "west_antarctic_ice_sheet",
  "amoc",
  "amazon",
] as const;

export type ElementId = (typeof ELEMENT_IDS)[number];

export const ELEMENTS: readonly ElementId[] = ELEMENT_IDS;

export type CouplingRecord = {
  s_ij_range: readonly [number, number];
  mechanism: string;
  mechanismDe: string;
  destabilizing: boolean | null;
  sign_known: boolean;
};

/**
 * Real, documented pairwise coupling ranges (Wunderling 2021).
 * Each entry: (source, target) → range, mechanism, known sign.
 * `sign_known` is false where the paper itself states the
 * destabilizing/stabilizing direction is unclear (competing mechanisms).
 */
export const COUPLING_RANGES: ReadonlyArray<{
  source: ElementId;
  target: ElementId;
  data: CouplingRecord;
}> = [
  {
    source: "greenland_ice_sheet",
    target: "amoc",
    data: {
      s_ij_range: [1.0, 10.0],
      mechanism:
        "Enhanced meltwater freshens the North Atlantic, weakening AMOC.",
      mechanismDe:
        "Zusätzliches Schmelzwasser versüßt den Nordatlantik und schwächt die AMOC.",
      destabilizing: true,
      sign_known: true,
    },
  },
  {
    source: "amoc",
    target: "greenland_ice_sheet",
    data: {
      s_ij_range: [-10.0, -1.0],
      mechanism:
        "AMOC weakening causes regional cooling around Greenland, reducing melt.",
      mechanismDe:
        "Eine abgeschwächte AMOC kühlt die Region um Grönland und reduziert das Schmelzen.",
      destabilizing: false,
      sign_known: true,
    },
  },
  {
    source: "west_antarctic_ice_sheet",
    target: "amoc",
    data: {
      s_ij_range: [-3.0, 3.0],
      mechanism:
        "Competing processes (bipolar ocean seesaw, salinity anomalies, Drake Passage effects); the paper itself states the net sign is unclear.",
      mechanismDe:
        "Konkurrierende Prozesse (bipolare Ozean-Wippe, Salzanomalien, Drake-Passage-Effekte); die Originalarbeit selbst nennt das Nettovorzeichen unklar.",
      destabilizing: null,
      sign_known: false,
    },
  },
  {
    source: "amoc",
    target: "west_antarctic_ice_sheet",
    data: {
      s_ij_range: [-10.0, -1.0],
      mechanism:
        "AMOC collapse reduces northward heat transport, warming the Southern Ocean.",
      mechanismDe:
        "Ein AMOC-Kollaps reduziert den nordwärtigen Wärmetransport und wärmt den Südlichen Ozean.",
      destabilizing: true,
      sign_known: true,
    },
  },
  {
    source: "greenland_ice_sheet",
    target: "west_antarctic_ice_sheet",
    data: {
      s_ij_range: [1.0, 10.0],
      mechanism: "Sea-level rise via gravitational/rotational (fingerprint) effects.",
      mechanismDe:
        "Meeresspiegelanstieg über gravitative und rotatorische Fingerabdruck-Effekte.",
      destabilizing: true,
      sign_known: true,
    },
  },
  {
    source: "west_antarctic_ice_sheet",
    target: "greenland_ice_sheet",
    data: {
      s_ij_range: [1.0, 10.0],
      mechanism: "Sea-level rise via gravitational/rotational (fingerprint) effects.",
      mechanismDe:
        "Meeresspiegelanstieg über gravitative und rotatorische Fingerabdruck-Effekte.",
      destabilizing: true,
      sign_known: true,
    },
  },
  {
    source: "amoc",
    target: "amazon",
    data: {
      s_ij_range: [-3.0, 3.0],
      mechanism:
        "AMOC weakening shifts the Intertropical Convergence Zone, altering Amazon precipitation; the paper itself states the regional effect is ambiguous.",
      mechanismDe:
        "AMOC-Abschwächung verschiebt die innertropische Konvergenzzone und ändert den Amazonas-Niederschlag; die Originalarbeit selbst nennt den regionalen Effekt mehrdeutig.",
      destabilizing: null,
      sign_known: false,
    },
  },
];

/** At maximum documented interaction strength (d = 1.0), Wunderling et al. 2021. */
export const AMOC_CRITICAL_TEMP_REDUCTION_PCT_AT_MAX_COUPLING = 55.0;
export const WAIS_CRITICAL_TEMP_REDUCTION_PCT_AT_MAX_COUPLING = 40.0;

/** Temporary temperature overshoot vs non-overshoot, Wunderling et al. 2022. */
export const OVERSHOOT_CASCADE_RISK_INCREASE_PCT_MAX = 72.0;

export const LINKS = {
  amocSandbox: "https://amoc-kipppunkt.vercel.app",
  amazonSandbox: "https://amazon-kipppunkt.vercel.app",
  klimakatalog: "https://klimakatalog.vercel.app/p/cascading-tipping-utac",
  sourceRepo: "https://github.com/GenesisAeon/cascading-tipping-utac",
  org: "https://github.com/GenesisAeon",
} as const;

export const DISCLAIMER_LINE =
  "Reine Zitat-Wissenschaft — kein Framework-Overlay.";
