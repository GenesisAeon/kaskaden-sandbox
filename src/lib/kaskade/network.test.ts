import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import {
  AMOC_CRITICAL_TEMP_REDUCTION_PCT_AT_MAX_COUPLING,
  COUPLING_RANGES,
  DISCLAIMER_LINE,
  ELEMENT_IDS,
  ELEMENTS,
  OVERSHOOT_CASCADE_RISK_INCREASE_PCT_MAX,
  PACKAGE_ID,
  SOURCE_VERSION,
  WAIS_CRITICAL_TEMP_REDUCTION_PCT_AT_MAX_COUPLING,
} from "./constants.ts";
import { TippingNetwork, allCouplings } from "./network.ts";
import {
  cascadeRiskIndex,
  criticalTempReductionPct,
  remainingThresholdFraction,
} from "./scale.ts";

const FORBIDDEN_ELEMENTS = ["permafrost", "carbon_sinks", "carbon-sinks"];

describe("package constants (cascading-tipping-utac 1.0.1)", () => {
  it("keeps package identity", () => {
    assert.equal(PACKAGE_ID, 87);
    assert.equal(SOURCE_VERSION, "1.0.1");
  });

  it("exposes exactly the four Wunderling elements", () => {
    assert.equal(ELEMENTS.length, 4);
    assert.deepEqual([...ELEMENT_IDS], [
      "greenland_ice_sheet",
      "west_antarctic_ice_sheet",
      "amoc",
      "amazon",
    ]);
  });

  it("does not include permafrost or carbon-sinks nodes", () => {
    for (const id of ELEMENTS) {
      for (const forbidden of FORBIDDEN_ELEMENTS) {
        assert.equal(id.includes(forbidden), false);
      }
    }
    const blob = JSON.stringify(COUPLING_RANGES);
    assert.equal(blob.includes("permafrost"), false);
    assert.equal(blob.includes("carbon"), false);
  });

  it("documents the published max-coupling reductions", () => {
    assert.equal(AMOC_CRITICAL_TEMP_REDUCTION_PCT_AT_MAX_COUPLING, 55);
    assert.equal(WAIS_CRITICAL_TEMP_REDUCTION_PCT_AT_MAX_COUPLING, 40);
  });

  it("documents the published overshoot cascade-risk increase", () => {
    assert.equal(OVERSHOOT_CASCADE_RISK_INCREASE_PCT_MAX, 72);
  });

  it("keeps the disclaimer line verbatim", () => {
    assert.equal(
      DISCLAIMER_LINE,
      "Reine Zitat-Wissenschaft — kein Framework-Overlay.",
    );
  });
});

describe("couplings", () => {
  it("is nonempty", () => {
    assert.ok(allCouplings().length > 0);
  });

  it("marks GIS → AMOC as destabilizing", () => {
    const c = allCouplings().find(
      (x) => x.source === "greenland_ice_sheet" && x.target === "amoc",
    );
    assert.ok(c);
    assert.equal(c.destabilizing, true);
    assert.ok(c.sIjLow > 0);
  });

  it("marks AMOC → GIS as stabilizing", () => {
    const c = allCouplings().find(
      (x) => x.source === "amoc" && x.target === "greenland_ice_sheet",
    );
    assert.ok(c);
    assert.equal(c.destabilizing, false);
    assert.ok(c.sIjHigh < 0);
  });

  it("does not guess the WAIS → AMOC sign", () => {
    const c = allCouplings().find(
      (x) => x.source === "west_antarctic_ice_sheet" && x.target === "amoc",
    );
    assert.ok(c);
    assert.equal(c.signKnown, false);
    assert.equal(c.destabilizing, null);
  });

  it("does not guess the AMOC → Amazon sign", () => {
    const c = allCouplings().find(
      (x) => x.source === "amoc" && x.target === "amazon",
    );
    assert.ok(c);
    assert.equal(c.signKnown, false);
  });

  it("has exactly two unclear-sign couplings", () => {
    const net = new TippingNetwork();
    const unclear = net.unclearSignCouplings();
    assert.equal(unclear.length, 2);
    const keys = new Set(unclear.map((c) => `${c.source}->${c.target}`));
    assert.ok(keys.has("west_antarctic_ice_sheet->amoc"));
    assert.ok(keys.has("amoc->amazon"));
  });
});

describe("TippingNetwork", () => {
  it("lists AMOC outgoing targets", () => {
    const net = new TippingNetwork();
    const targets = new Set(net.couplingsFrom("amoc").map((c) => c.target));
    assert.ok(targets.has("greenland_ice_sheet"));
    assert.ok(targets.has("west_antarctic_ice_sheet"));
    assert.ok(targets.has("amazon"));
  });

  it("throws on unknown element", () => {
    const net = new TippingNetwork();
    assert.throws(() => net.couplingsFrom("not_a_real_element" as never));
    assert.throws(() => net.couplingsTo("not_a_real_element" as never));
  });

  it("excludes unclear pairs from destabilizingCouplings", () => {
    const net = new TippingNetwork();
    assert.ok(net.destabilizingCouplings().every((c) => c.destabilizing === true));
  });

  it("summarizes counts", () => {
    const summary = new TippingNetwork().summary();
    assert.ok(summary.includes("4 elements"));
    assert.ok(summary.includes("unclear"));
  });
});

describe("slider scaling", () => {
  it("is zero at isolated coupling", () => {
    assert.equal(criticalTempReductionPct("amoc", 0), 0);
    assert.equal(criticalTempReductionPct("wais", 0), 0);
    assert.equal(remainingThresholdFraction("amoc", 0), 1);
  });

  it("hits the published maxima at d = 1", () => {
    assert.equal(criticalTempReductionPct("amoc", 1), 55);
    assert.equal(criticalTempReductionPct("wais", 1), 40);
  });

  it("scales linearly", () => {
    assert.equal(criticalTempReductionPct("amoc", 0.5), 27.5);
    assert.equal(criticalTempReductionPct("wais", 0.5), 20);
  });

  it("clamps d", () => {
    assert.equal(criticalTempReductionPct("amoc", -1), 0);
    assert.equal(criticalTempReductionPct("amoc", 2), 55);
  });

  it("maps overshoot to the published +72 % index", () => {
    const idx = cascadeRiskIndex();
    assert.equal(idx.base, 100);
    assert.equal(idx.increasePct, 72);
    assert.equal(idx.withOvershoot, 172);
  });
});

describe("no invented overlay in the domain module", () => {
  it("does not mention UTAC, CREP, AFET or Gamma in constants/network/scale", () => {
    const here = dirname(fileURLToPath(import.meta.url));
    for (const file of ["constants.ts", "network.ts", "scale.ts", "labels.ts"]) {
      const text = readFileSync(join(here, file), "utf8");
      assert.equal(/\bUTAC\b/.test(text), false, file);
      assert.equal(/\bCREP\b/.test(text), false, file);
      assert.equal(/\bAFET\b/.test(text), false, file);
      assert.equal(/Γ/.test(text), false, file);
    }
  });
});
