import type { ElementId } from "./constants.ts";
import type { Coupling } from "./network.ts";

export type ElementMeta = {
  id: ElementId;
  short: string;
  name: string;
  full: string;
  region: string;
};

export const ELEMENT_META: Record<ElementId, ElementMeta> = {
  greenland_ice_sheet: {
    id: "greenland_ice_sheet",
    short: "GIS",
    name: "Grönland",
    full: "Grönländischer Eisschild",
    region: "Nordatlantik",
  },
  west_antarctic_ice_sheet: {
    id: "west_antarctic_ice_sheet",
    short: "WAIS",
    name: "Westantarktis",
    full: "Westantarktischer Eisschild",
    region: "Südlicher Ozean",
  },
  amoc: {
    id: "amoc",
    short: "AMOC",
    name: "AMOC",
    full: "Atlantische Umwälzzirkulation",
    region: "Nordatlantik / Golfstrom-System",
  },
  amazon: {
    id: "amazon",
    short: "AMZ",
    name: "Amazonas",
    full: "Amazonas-Regenwald",
    region: "Tropisches Südamerika",
  },
};

export type SignKind = "destabilizing" | "stabilizing" | "unclear";

export function signKind(c: Coupling): SignKind {
  if (!c.signKnown || c.destabilizing === null) return "unclear";
  return c.destabilizing ? "destabilizing" : "stabilizing";
}

export function signLabel(kind: SignKind): string {
  if (kind === "destabilizing") return "klar destabilisierend";
  if (kind === "stabilizing") return "klar stabilisierend";
  return "unklar / konkurrierende Mechanismen";
}

export function paperForCoupling(): {
  year: 2021;
  doi: string;
  short: string;
} {
  return {
    year: 2021,
    doi: "10.5194/esd-12-601-2021",
    short: "Wunderling et al. 2021",
  };
}
