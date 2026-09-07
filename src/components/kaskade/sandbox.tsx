import { ArrowUpRight } from "lucide-react";
import { CouplingPanel } from "@/components/kaskade/coupling-panel";
import { DetailDrawer } from "@/components/kaskade/detail-drawer";
import { CouplingRow, NetworkGraph } from "@/components/kaskade/network-graph";
import { OvershootPanel } from "@/components/kaskade/overshoot-panel";
import {
  LINKS,
  ROCHA_2018_CITATION,
  ROCHA_2018_DOI,
} from "@/lib/kaskade/constants";
import { NETWORK } from "@/lib/kaskade/network";
import { useKaskade } from "@/lib/kaskade/store";
import { LocaleSwitch } from "@/components/locale-switch";
import { useLocale } from "@/lib/i18n/locale";

export function KaskadeSandbox() {
  const { t } = useLocale();
  const couplingD = useKaskade((s) => s.couplingD);
  const overshoot = useKaskade((s) => s.overshoot);
  const selection = useKaskade((s) => s.selection);
  const setCouplingD = useKaskade((s) => s.setCouplingD);
  const setOvershoot = useKaskade((s) => s.setOvershoot);
  const select = useKaskade((s) => s.select);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12">
        <header className="max-w-3xl">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <p className="text-2xs font-medium uppercase tracking-[0.18em] text-subtle">
              {t.eyebrow}
            </p>
            <LocaleSwitch />
          </div>
          <h1 className="mt-3 font-heading text-4xl leading-[1.05] tracking-tight sm:text-5xl">
            {t.titleLead}
            <span className="italic text-accent">{t.titleAccent}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {t.lead}
          </p>
        </header>

        <div className="mt-6 rounded-lg bg-elevated px-4 py-3 sm:px-5">
          <p className="text-sm leading-relaxed text-fg">{t.disclaimerLine}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">{t.disclaimerHint}</p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.85fr)]">
          <NetworkGraph
            couplingD={couplingD}
            selection={selection}
            onSelect={select}
          />
          <div className="flex flex-col gap-4">
            <CouplingPanel couplingD={couplingD} onChange={setCouplingD} />
            <OvershootPanel overshoot={overshoot} onChange={setOvershoot} />
          </div>
        </div>

        <section className="mt-4 rounded-xl bg-surface p-4 shadow-border sm:p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-heading text-lg tracking-tight">
              {t.edgesHeading}
            </h2>
            <p className="text-2xs text-subtle">{NETWORK.summary()}</p>
          </div>
          <div className="mt-3 divide-y divide-ring">
            {NETWORK.couplings.map((c) => (
              <CouplingRow
                key={c.id}
                coupling={c}
                active={selection?.kind === "coupling" && selection.id === c.id}
                onSelect={() => select({ kind: "coupling", id: c.id })}
              />
            ))}
          </div>
        </section>

        <nav className="mt-4 rounded-xl bg-surface p-4 shadow-border sm:p-5">
          <p className="text-2xs font-medium uppercase tracking-[0.14em] text-subtle">
            {t.readMore}
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-3">
            <LinkCard href={LINKS.amocSandbox} label={t.linkAmoc} hint={t.hintSandbox} />
            <LinkCard
              href={LINKS.amazonSandbox}
              label={t.linkAmazon}
              hint={t.hintSandbox}
            />
            <LinkCard
              href={LINKS.klimakatalog}
              label={t.linkKlima}
              hint={t.hintPackage}
            />
          </ul>
        </nav>

        <footer className="mt-6 space-y-3 text-xs leading-relaxed text-muted">
          <p>{t.footerRocha}{" "}
            <a
              href={`https://doi.org/${ROCHA_2018_DOI}`}
              target="_blank"
              rel="noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              DOI
            </a>
          </p>
          <p className="text-subtle">{ROCHA_2018_CITATION}</p>
          <p>
            {t.footerSource}{" "}
            <a
              href={LINKS.sourceRepo}
              target="_blank"
              rel="noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              GenesisAeon/cascading-tipping-utac
            </a>
            . {t.ownerLine}
          </p>
        </footer>
      </div>

      <DetailDrawer selection={selection} onClose={() => select(null)} />
    </div>
  );
}

function LinkCard({
  href,
  label,
  hint,
}: {
  href: string;
  label: string;
  hint: string;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="flex min-h-14 items-center justify-between gap-3 rounded-lg bg-elevated px-3 py-2 text-sm text-fg transition-colors duration-150 hover:bg-elevated/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
      >
        <span>
          <span className="block">{label}</span>
          <span className="block text-2xs text-subtle">{hint}</span>
        </span>
        <ArrowUpRight className="size-4 shrink-0 text-muted" />
      </a>
    </li>
  );
}
