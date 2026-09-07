import { OVERSHOOT_CASCADE_RISK_INCREASE_PCT_MAX } from "@/lib/kaskade/constants";
import { cascadeRiskIndex } from "@/lib/kaskade/scale";
import { Switch } from "@/components/ui/switch";
import { cn, fmtDe } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/locale";

export function OvershootPanel({
  overshoot,
  onChange,
}: {
  overshoot: boolean;
  onChange: (on: boolean) => void;
}) {
  const { t } = useLocale();
  const idx = cascadeRiskIndex();

  return (
    <section className="rounded-xl bg-surface p-4 shadow-border sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-2xs font-medium uppercase tracking-[0.14em] text-subtle">
            {t.overshootLabel}
          </p>
          <h2 className="mt-1 font-heading text-xl leading-snug tracking-tight">{t.overshootTitle}</h2>
        </div>
        <div className="flex items-center gap-3 pt-1">
          <span className="text-xs text-muted">{overshoot ? t.on : t.off}</span>
          <Switch
            checked={overshoot}
            onCheckedChange={onChange}
            aria-label={t.overshootAria}
          />
        </div>
      </div>

      <div
        className={cn(
          "mt-4 grid grid-cols-2 gap-3 transition-opacity duration-200",
          overshoot ? "opacity-100" : "opacity-70",
        )}
      >
        <IndexCard
          label={t.withoutOvershoot}
          value={idx.base}
          hint={t.relativeIndex}
          active={!overshoot}
        />
        <IndexCard
          label={t.withOvershoot}
          value={idx.withOvershoot}
          hint={`+${fmtDe(idx.increasePct, 0)} %`}
          active={overshoot}
          emphasize
        />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">{t.overshootBody(fmtDe(OVERSHOOT_CASCADE_RISK_INCREASE_PCT_MAX, 0), fmtDe(idx.withOvershoot, 0))}</p>
    </section>
  );
}

function IndexCard({
  label,
  value,
  hint,
  active,
  emphasize,
}: {
  label: string;
  value: number;
  hint: string;
  active: boolean;
  emphasize?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg p-3 transition-colors duration-200",
        active ? "bg-elevated" : "bg-bg",
      )}
    >
      <p className="text-2xs font-medium uppercase tracking-[0.14em] text-subtle">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 font-mono text-3xl leading-none tabular-nums",
          emphasize && active ? "text-destab" : "text-fg",
        )}
      >
        {fmtDe(value, 0)}
      </p>
      <p className="mt-1 text-2xs text-muted">{hint}</p>
    </div>
  );
}
