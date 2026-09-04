import {
  AMOC_CRITICAL_TEMP_REDUCTION_PCT_AT_MAX_COUPLING,
  WAIS_CRITICAL_TEMP_REDUCTION_PCT_AT_MAX_COUPLING,
} from "@/lib/kaskade/constants";
import { criticalTempReductionPct, maxReduction } from "@/lib/kaskade/scale";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { fmtDe } from "@/lib/utils";

const PRESETS = [
  { d: 0, label: "Isoliert" },
  { d: 0.5, label: "d = 0,5" },
  { d: 1, label: "Max. Kopplung" },
] as const;

export function CouplingPanel({
  couplingD,
  onChange,
}: {
  couplingD: number;
  onChange: (d: number) => void;
}) {
  const amoc = criticalTempReductionPct("amoc", couplingD);
  const wais = criticalTempReductionPct("wais", couplingD);

  return (
    <section className="rounded-xl bg-surface p-4 shadow-border sm:p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-2xs font-medium uppercase tracking-[0.14em] text-subtle">
            Kopplungsstärke d
          </p>
          <p className="mt-1 font-mono text-3xl leading-none tabular-nums">
            {fmtDe(couplingD, 2)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <Button
              key={p.d}
              type="button"
              variant="chip"
              size="sm"
              data-active={couplingD === p.d}
              onClick={() => onChange(p.d)}
            >
              {p.label}
            </Button>
          ))}
        </div>
      </div>

      <Slider
        className="mt-2"
        min={0}
        max={1}
        step={0.01}
        value={[couplingD]}
        onValueChange={(v) => onChange(v[0] ?? couplingD)}
        aria-label="Kopplungsstärke d"
      />
      <div className="flex justify-between gap-4 font-mono text-2xs tabular-nums text-subtle">
        <span>0 isoliert</span>
        <span className="text-right">1 max. dokumentiert</span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ReductionMeter
          label="AMOC"
          value={amoc}
          max={maxReduction("amoc")}
          caption="kritische Temperatur"
        />
        <ReductionMeter
          label="WAIS"
          value={wais}
          max={maxReduction("wais")}
          caption="kritische Temperatur"
        />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted">
        Lineare Skala der dokumentierten Befunde (Wunderling et al. 2021). Bei
        maximaler Kopplung (d = 1) sinkt die effektive Kippschwelle der AMOC um
        rund {fmtDe(AMOC_CRITICAL_TEMP_REDUCTION_PCT_AT_MAX_COUPLING, 0)} % und
        die des westantarktischen Eisschilds um rund{" "}
        {fmtDe(WAIS_CRITICAL_TEMP_REDUCTION_PCT_AT_MAX_COUPLING, 0)} % gegenüber
        der isolierten Betrachtung. Keine eigene Simulation.
      </p>
    </section>
  );
}

function ReductionMeter({
  label,
  value,
  max,
  caption,
}: {
  label: string;
  value: number;
  max: number;
  caption: string;
}) {
  const pct = max === 0 ? 0 : (value / max) * 100;
  return (
    <div className="rounded-lg bg-elevated p-3">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-2xs font-medium uppercase tracking-[0.14em] text-subtle">
          {label}
        </p>
        <p className="text-2xs text-subtle">{caption}</p>
      </div>
      <p className="mt-1 font-mono text-2xl leading-none tabular-nums text-destab">
        −{fmtDe(value, 1)} %
      </p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-bg">
        <div
          className="h-full rounded-full bg-destab transition-[width] duration-200 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 font-mono text-2xs tabular-nums text-subtle">
        max. {fmtDe(max, 0)} % bei d = 1
      </p>
    </div>
  );
}
