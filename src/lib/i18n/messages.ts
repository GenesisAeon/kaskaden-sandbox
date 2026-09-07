export type Locale = "de" | "en";

export type ElementId =
  | "greenland_ice_sheet"
  | "west_antarctic_ice_sheet"
  | "amoc"
  | "amazon";

export type SignKind = "destabilizing" | "stabilizing" | "unclear";

export type ElementMetaI18n = {
  short: string;
  name: string;
  full: string;
  region: string;
};

export type Messages = {
  language: string;
  documentTitle: string;
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  lead: string;
  disclaimerLine: string;
  disclaimerHint: string;
  edgesHeading: string;
  readMore: string;
  linkAmoc: string;
  linkAmazon: string;
  linkKlima: string;
  hintSandbox: string;
  hintPackage: string;
  footerRocha: string;
  footerSource: string;
  ownerLine: string;
  couplingStrength: string;
  couplingAria: string;
  presetIsolated: string;
  presetHalf: string;
  presetMax: string;
  scaleIsolated: string;
  scaleMax: string;
  criticalTemp: string;
  maxAtD1: (max: string) => string;
  couplingBody: (amoc: string, wais: string) => string;
  overshootLabel: string;
  overshootTitle: string;
  overshootAria: string;
  on: string;
  off: string;
  withoutOvershoot: string;
  withOvershoot: string;
  relativeIndex: string;
  overshootBody: (pct: string, withIdx: string) => string;
  detailTitle: string;
  detailEmpty: string;
  tippingElement: string;
  signDestabilizing: string;
  signStabilizing: string;
  signUnclear: string;
  elements: Record<ElementId, ElementMetaI18n>;
};

export const messages: Record<Locale, Messages> = {
  de: {
    language: "Sprache",
    documentTitle: "Kaskadenkarte",
    eyebrow: "GenesisAeon P87 · cascading-tipping-utac",
    titleLead: "Kaskadenkarte.",
    titleAccent: " Vier Elemente, echte Kanten.",
    lead: "Das veröffentlichte Wunderling-Netz aus Grönland, Westantarktis, AMOC und Amazonas. Gerichtete Kopplungen, inklusive der zwei Kanten, deren Vorzeichen die Originalarbeit selbst offen lässt.",
    disclaimerLine: "Reine Zitat-Wissenschaft - kein Framework-Overlay.",
    disclaimerHint:
      "Dokumentierte Struktur plus Slider. Keine Monte-Carlo-Engine, keine Erweiterung um Permafrost oder Kohlenstoffsenken.",
    edgesHeading: "Dokumentierte Kanten",
    readMore: "Weiterlesen",
    linkAmoc: "AMOC-Kipppunkt",
    linkAmazon: "Amazonas-Kipppunkt",
    linkKlima: "Klimakatalog P87",
    hintSandbox: "Sandbox",
    hintPackage: "cascading-tipping-utac",
    footerRocha:
      "Rocha et al. 2018 wird als verwandter Kontext zitiert - eine breitere Methodik für Regime-Shift-Kaskaden, nicht dasselbe Vier-Elemente-Netz.",
    footerSource: "Quellpaket:",
    ownerLine: "Owner: GenesisAeon / Johann Römer.",
    couplingStrength: "Kopplungsstärke d",
    couplingAria: "Kopplungsstärke d",
    presetIsolated: "Isoliert",
    presetHalf: "d = 0,5",
    presetMax: "Max. Kopplung",
    scaleIsolated: "0 isoliert",
    scaleMax: "1 max. dokumentiert",
    criticalTemp: "kritische Temperatur",
    maxAtD1: (max) => `max. ${max} % bei d = 1`,
    couplingBody: (amoc, wais) =>
      `Lineare Skala der dokumentierten Befunde (Wunderling et al. 2021). Bei maximaler Kopplung (d = 1) sinkt die effektive Kippschwelle der AMOC um rund ${amoc} % und die des westantarktischen Eisschilds um rund ${wais} % gegenüber der isolierten Betrachtung. Keine eigene Simulation.`,
    overshootLabel: "Overshoot-Szenario",
    overshootTitle: "Temporäres Überschießen",
    overshootAria: "Overshoot-Szenario",
    on: "an",
    off: "aus",
    withoutOvershoot: "Ohne Overshoot",
    withOvershoot: "Mit Overshoot",
    relativeIndex: "relativer Index",
    overshootBody: (pct, withIdx) =>
      `Wunderling et al. 2022: temporäre Temperatur-Overshoots können das Cascade-Risiko um bis zu ${pct} % gegenüber Szenarien ohne Überschießen erhöhen - auch wenn die langfristige Gleichgewichtstemperatur im Paris-Bereich bleibt. Der Index 100 / ${withIdx} skaliert nur diesen dokumentierten Zuschlag. Keine Monte-Carlo-Engine.`,
    detailTitle: "Detail",
    detailEmpty:
      "Knoten oder Kante antippen, um Mechanismus, Paper und Unsicherheit zu sehen.",
    tippingElement: "Kippelement",
    signDestabilizing: "klar destabilisierend",
    signStabilizing: "klar stabilisierend",
    signUnclear: "unklar / konkurrierende Mechanismen",
    elements: {
      greenland_ice_sheet: {
        short: "GIS",
        name: "Grönland",
        full: "Grönländischer Eisschild",
        region: "Nordatlantik",
      },
      west_antarctic_ice_sheet: {
        short: "WAIS",
        name: "Westantarktis",
        full: "Westantarktischer Eisschild",
        region: "Südlicher Ozean",
      },
      amoc: {
        short: "AMOC",
        name: "AMOC",
        full: "Atlantische Umwälzzirkulation",
        region: "Nordatlantik / Golfstrom-System",
      },
      amazon: {
        short: "AMZ",
        name: "Amazonas",
        full: "Amazonas-Regenwald",
        region: "Tropisches Südamerika",
      },
    },
  },
  en: {
    language: "Language",
    documentTitle: "Cascade map",
    eyebrow: "GenesisAeon P87 · cascading-tipping-utac",
    titleLead: "Cascade map.",
    titleAccent: " Four elements, real edges.",
    lead: "The published Wunderling network of Greenland, West Antarctica, AMOC and Amazonia. Directed couplings, including the two edges whose sign the original paper itself leaves open.",
    disclaimerLine: "Citation science only - no framework overlay.",
    disclaimerHint:
      "Documented structure plus sliders. No Monte-Carlo engine, no extension to permafrost or carbon sinks.",
    edgesHeading: "Documented edges",
    readMore: "Read on",
    linkAmoc: "AMOC tipping point",
    linkAmazon: "Amazon tipping point",
    linkKlima: "Climate catalog P87",
    hintSandbox: "Sandbox",
    hintPackage: "cascading-tipping-utac",
    footerRocha:
      "Rocha et al. 2018 is cited as related context - a broader methodology for regime-shift cascades, not the same four-element network.",
    footerSource: "Source package:",
    ownerLine: "Owner: GenesisAeon / Johann Römer.",
    couplingStrength: "Coupling strength d",
    couplingAria: "Coupling strength d",
    presetIsolated: "Isolated",
    presetHalf: "d = 0.5",
    presetMax: "Max. coupling",
    scaleIsolated: "0 isolated",
    scaleMax: "1 max. documented",
    criticalTemp: "critical temperature",
    maxAtD1: (max) => `max. ${max} % at d = 1`,
    couplingBody: (amoc, wais) =>
      `Linear scale of the documented findings (Wunderling et al. 2021). At maximum coupling (d = 1) the effective tipping threshold of the AMOC falls by about ${amoc} % and that of the West Antarctic Ice Sheet by about ${wais} % versus the isolated view. No own simulation.`,
    overshootLabel: "Overshoot scenario",
    overshootTitle: "Temporary overshoot",
    overshootAria: "Overshoot scenario",
    on: "on",
    off: "off",
    withoutOvershoot: "Without overshoot",
    withOvershoot: "With overshoot",
    relativeIndex: "relative index",
    overshootBody: (pct, withIdx) =>
      `Wunderling et al. 2022: temporary temperature overshoots can raise cascade risk by up to ${pct} % versus scenarios without overshoot - even when the long-term equilibrium temperature stays in the Paris range. The index 100 / ${withIdx} only scales this documented surcharge. No Monte-Carlo engine.`,
    detailTitle: "Detail",
    detailEmpty: "Tap a node or edge to see mechanism, paper and uncertainty.",
    tippingElement: "Tipping element",
    signDestabilizing: "clearly destabilizing",
    signStabilizing: "clearly stabilizing",
    signUnclear: "unclear / competing mechanisms",
    elements: {
      greenland_ice_sheet: {
        short: "GIS",
        name: "Greenland",
        full: "Greenland Ice Sheet",
        region: "North Atlantic",
      },
      west_antarctic_ice_sheet: {
        short: "WAIS",
        name: "West Antarctica",
        full: "West Antarctic Ice Sheet",
        region: "Southern Ocean",
      },
      amoc: {
        short: "AMOC",
        name: "AMOC",
        full: "Atlantic Meridional Overturning Circulation",
        region: "North Atlantic / Gulf Stream system",
      },
      amazon: {
        short: "AMZ",
        name: "Amazonia",
        full: "Amazon rainforest",
        region: "Tropical South America",
      },
    },
  },
};

export function signLabelI18n(kind: SignKind, t: Messages): string {
  if (kind === "destabilizing") return t.signDestabilizing;
  if (kind === "stabilizing") return t.signStabilizing;
  return t.signUnclear;
}
