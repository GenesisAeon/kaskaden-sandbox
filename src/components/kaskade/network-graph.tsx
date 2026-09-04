import { MountainSnow, Snowflake, TreeDeciduous, Waves } from "lucide-react";
import type { ElementId } from "@/lib/kaskade/constants";
import { ELEMENT_IDS } from "@/lib/kaskade/constants";
import { ELEMENT_META, signKind, type SignKind } from "@/lib/kaskade/labels";
import { NETWORK, type Coupling } from "@/lib/kaskade/network";
import {
  criticalTempReductionPct,
  remainingThresholdFraction,
} from "@/lib/kaskade/scale";
import type { Selection } from "@/lib/kaskade/store";
import { cn, fmtDe } from "@/lib/utils";

const VB = { w: 1000, h: 720 };

const POS: Record<ElementId, { x: number; y: number }> = {
  greenland_ice_sheet: { x: 500, y: 126 },
  west_antarctic_ice_sheet: { x: 812, y: 348 },
  amazon: { x: 500, y: 584 },
  amoc: { x: 188, y: 348 },
};

const NODE_R = 62;
const ICONS = {
  greenland_ice_sheet: Snowflake,
  west_antarctic_ice_sheet: MountainSnow,
  amoc: Waves,
  amazon: TreeDeciduous,
} as const;

type Pt = { x: number; y: number };

function unit(a: Pt, b: Pt): Pt {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: dx / len, y: dy / len };
}

function bendFor(source: ElementId, target: ElementId): number {
  const pair = [source, target].sort().join("|");
  const mag: Record<string, number> = {
    "amoc|greenland_ice_sheet": 72,
    "amoc|west_antarctic_ice_sheet": 86,
    "greenland_ice_sheet|west_antarctic_ice_sheet": 68,
    "amoc|amazon": 54,
  };
  const sign = source < target ? 1 : -1;
  return (mag[pair] ?? 40) * sign;
}

function edgeGeometry(from: Pt, to: Pt, bend: number) {
  const u = unit(from, to);
  const n = { x: -u.y, y: u.x };
  const start = {
    x: from.x + u.x * NODE_R + n.x * 10,
    y: from.y + u.y * NODE_R + n.y * 10,
  };
  const end = {
    x: to.x - u.x * (NODE_R + 14) + n.x * 10,
    y: to.y - u.y * (NODE_R + 14) + n.y * 10,
  };
  const mid = {
    x: (start.x + end.x) / 2 + n.x * bend,
    y: (start.y + end.y) / 2 + n.y * bend,
  };
  const d = `M ${start.x} ${start.y} Q ${mid.x} ${mid.y} ${end.x} ${end.y}`;
  const t = 0.46;
  const label = {
    x: (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * mid.x + t * t * end.x,
    y: (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * mid.y + t * t * end.y,
  };
  return { d, label };
}

const KIND_STROKE: Record<SignKind, string> = {
  destabilizing: "var(--color-destab)",
  stabilizing: "var(--color-stab)",
  unclear: "var(--color-muted)",
};

export function NetworkGraph({
  couplingD,
  selection,
  onSelect,
}: {
  couplingD: number;
  selection: Selection;
  onSelect: (s: Selection) => void;
}) {
  const couplings = NETWORK.couplings;
  const amocRed = criticalTempReductionPct("amoc", couplingD);
  const waisRed = criticalTempReductionPct("wais", couplingD);
  const amocRemain = remainingThresholdFraction("amoc", couplingD);
  const waisRemain = remainingThresholdFraction("wais", couplingD);
  const edgeAlpha = 0.32 + couplingD * 0.68;
  const edgeWidth = 1.6 + couplingD * 1.6;

  return (
    <div className="relative aspect-[1000/720] w-full overflow-hidden rounded-xl bg-elevated/60 shadow-border">
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        className="absolute inset-0 size-full"
        role="img"
        aria-label="Gerichteter Evidence-Graph der vier Kippelemente"
      >
        <defs>
          {(["destabilizing", "stabilizing", "unclear"] as const).map((k) => (
            <marker
              key={k}
              id={`arrow-${k}`}
              viewBox="0 0 12 12"
              refX="10"
              refY="6"
              markerWidth="8"
              markerHeight="8"
              orient="auto"
            >
              <path d="M 0 1 L 12 6 L 0 11 z" fill={KIND_STROKE[k]} />
            </marker>
          ))}
        </defs>

        {couplings.map((c) => {
          const kind = signKind(c);
          const geo = edgeGeometry(
            POS[c.source],
            POS[c.target],
            bendFor(c.source, c.target),
          );
          const active = selection?.kind === "coupling" && selection.id === c.id;
          const dashed = kind === "unclear";
          return (
            <g key={c.id}>
              <path
                d={geo.d}
                fill="none"
                stroke={KIND_STROKE[kind]}
                strokeWidth={active ? edgeWidth + 1.6 : edgeWidth}
                strokeOpacity={active ? 1 : edgeAlpha}
                strokeDasharray={dashed ? "8 7" : undefined}
                strokeLinecap="round"
                markerEnd={`url(#arrow-${kind})`}
                className="transition-[stroke-width,stroke-opacity] duration-200"
              />
              <path
                d={geo.d}
                fill="none"
                stroke="transparent"
                strokeWidth="22"
                className="cursor-pointer"
                onClick={() => onSelect({ kind: "coupling", id: c.id })}
              />
            </g>
          );
        })}

        {ELEMENT_IDS.map((id) => {
          const p = POS[id];
          const selected = selection?.kind === "element" && selection.id === id;
          return (
            <circle
              key={id}
              cx={p.x}
              cy={p.y}
              r={NODE_R}
              fill="var(--color-surface)"
              stroke={selected ? "var(--color-fg)" : "var(--color-ring)"}
              strokeWidth={selected ? 1.8 : 1}
            />
          );
        })}

        <ReductionRing cx={POS.amoc.x} cy={POS.amoc.y} remain={amocRemain} />
        <ReductionRing
          cx={POS.west_antarctic_ice_sheet.x}
          cy={POS.west_antarctic_ice_sheet.y}
          remain={waisRemain}
        />
      </svg>

      {couplings
        .filter((c) => signKind(c) === "unclear")
        .map((c) => {
          const geo = edgeGeometry(
            POS[c.source],
            POS[c.target],
            bendFor(c.source, c.target),
          );
          const active = selection?.kind === "coupling" && selection.id === c.id;
          return (
            <button
              key={`lbl-${c.id}`}
              type="button"
              onClick={() => onSelect({ kind: "coupling", id: c.id })}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2 py-0.5",
                "bg-bg font-mono text-3xs tracking-wide uppercase text-muted shadow-border",
                "hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                active && "text-fg",
              )}
              style={{
                left: `${(geo.label.x / VB.w) * 100}%`,
                top: `${(geo.label.y / VB.h) * 100}%`,
              }}
            >
              unklar
            </button>
          );
        })}

      {ELEMENT_IDS.map((id) => {
        const p = POS[id];
        const meta = ELEMENT_META[id];
        const Icon = ICONS[id];
        const selected = selection?.kind === "element" && selection.id === id;
        const reduction =
          id === "amoc"
            ? amocRed
            : id === "west_antarctic_ice_sheet"
              ? waisRed
              : null;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect({ kind: "element", id })}
            className={cn(
              "absolute flex aspect-square w-[12.4%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-full",
              "text-fg transition-colors duration-150",
              "after:absolute after:inset-[-10px] after:rounded-full",
              "hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
              selected && "text-fg",
            )}
            style={{
              left: `${(p.x / VB.w) * 100}%`,
              top: `${(p.y / VB.h) * 100}%`,
            }}
            aria-pressed={selected}
            aria-label={meta.full}
          >
            <Icon className="size-3.5 text-accent sm:size-4" strokeWidth={1.6} />
            <span className="font-heading text-sm leading-none tracking-tight sm:text-lg">
              {meta.short}
            </span>
            {reduction !== null ? (
              <span className="font-mono text-3xs tabular-nums text-destab">
                −{fmtDe(reduction, 0)} %
              </span>
            ) : (
              <span className="hidden text-3xs text-subtle sm:block">
                {meta.name}
              </span>
            )}
          </button>
        );
      })}

      <Legend />
    </div>
  );
}

function ReductionRing({
  cx,
  cy,
  remain,
}: {
  cx: number;
  cy: number;
  remain: number;
}) {
  const r = NODE_R + 11;
  const c = 2 * Math.PI * r;
  const dash = Math.max(0, Math.min(1, remain)) * c;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      stroke="var(--color-destab)"
      strokeWidth="2.2"
      strokeDasharray={`${dash} ${c}`}
      strokeDashoffset={c * 0.25}
      strokeLinecap="round"
      opacity="0.9"
    />
  );
}

function Legend() {
  const items: { kind: SignKind; label: string; dashed?: boolean }[] = [
    { kind: "destabilizing", label: "klar destabilisierend" },
    { kind: "stabilizing", label: "klar stabilisierend" },
    {
      kind: "unclear",
      label: "unklar / konkurrierende Mechanismen",
      dashed: true,
    },
  ];
  return (
    <ul className="absolute right-3 bottom-3 left-3 flex flex-col gap-1 text-2xs text-muted sm:flex-row sm:flex-wrap sm:gap-x-4">
      {items.map((item) => (
        <li key={item.kind} className="flex items-center gap-2">
          <span
            className="inline-block w-5 shrink-0"
            style={{
              borderTop: `${item.dashed ? "1.5px dashed" : "2px solid"} ${KIND_STROKE[item.kind]}`,
            }}
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export function CouplingRow({
  coupling,
  active,
  onSelect,
}: {
  coupling: Coupling;
  active: boolean;
  onSelect: () => void;
}) {
  const kind = signKind(coupling);
  const from = ELEMENT_META[coupling.source].short;
  const to = ELEMENT_META[coupling.target].short;
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex min-h-11 w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors duration-150",
        "hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
        active ? "bg-elevated" : "bg-transparent",
      )}
    >
      <span className="font-mono text-xs tabular-nums">
        {from}
        <span className="mx-1.5 text-subtle">→</span>
        {to}
      </span>
      <span
        className={cn(
          "text-2xs",
          kind === "destabilizing" && "text-destab",
          kind === "stabilizing" && "text-stab",
          kind === "unclear" && "text-subtle",
        )}
      >
        {kind === "unclear"
          ? "unklar"
          : kind === "stabilizing"
            ? "stabilisierend"
            : "destabilisierend"}
      </span>
    </button>
  );
}
