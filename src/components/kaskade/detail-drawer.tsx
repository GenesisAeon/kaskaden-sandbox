import type { ReactNode } from "react";
import {
  WUNDERLING_2021_CITATION,
  WUNDERLING_2021_DOI,
  WUNDERLING_2022_CITATION,
  WUNDERLING_2022_DOI,
  WUNDERLING_2024_DOI,
  WUNDERLING_2024_REVIEW_CITATION,
  type ElementId,
} from "@/lib/kaskade/constants";
import { ELEMENT_META, paperForCoupling, signKind, signLabel } from "@/lib/kaskade/labels";
import { NETWORK } from "@/lib/kaskade/network";
import type { Selection } from "@/lib/kaskade/store";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { fmtDe } from "@/lib/utils";

const DOI_HREF = (doi: string) => `https://doi.org/${doi}`;

export function DetailDrawer({
  selection,
  onClose,
}: {
  selection: Selection;
  onClose: () => void;
}) {
  const open = selection !== null;
  return (
    <Sheet open={open} onOpenChange={(next) => !next && onClose()}>
      <SheetContent>
        {selection?.kind === "element" ? (
          <ElementDetail id={selection.id} />
        ) : selection?.kind === "coupling" ? (
          <CouplingDetail id={selection.id} />
        ) : (
          <EmptyHint />
        )}
      </SheetContent>
    </Sheet>
  );
}

function EmptyHint() {
  return (
    <>
      <SheetTitle>Detail</SheetTitle>
      <SheetDescription>
        Knoten oder Kante antippen, um Mechanismus, Paper und Unsicherheit zu
        sehen.
      </SheetDescription>
    </>
  );
}

function ElementDetail({ id }: { id: ElementId }) {
  const meta = ELEMENT_META[id];
  const incoming = NETWORK.couplingsTo(id);
  const outgoing = NETWORK.couplingsFrom(id);
  return (
    <>
      <p className="text-2xs font-medium uppercase tracking-[0.14em] text-subtle">
        Kippelement · {meta.short}
      </p>
      <SheetTitle className="mt-2">{meta.full}</SheetTitle>
      <SheetDescription className="mt-1">{meta.region}</SheetDescription>

      <Block title="Eingehende Kopplungen">
        {incoming.length === 0 ? (
          <p className="text-sm text-muted">Keine dokumentierte eingehende Kante.</p>
        ) : (
          <ul className="space-y-2">
            {incoming.map((c) => (
              <li key={c.id} className="text-sm">
                <span className="font-mono text-xs">
                  {ELEMENT_META[c.source].short} → {meta.short}
                </span>
                <Badge className="ml-2" variant={badgeVariant(signKind(c))}>
                  {signLabel(signKind(c))}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </Block>

      <Block title="Ausgehende Kopplungen">
        {outgoing.length === 0 ? (
          <p className="text-sm text-muted">Keine dokumentierte ausgehende Kante.</p>
        ) : (
          <ul className="space-y-2">
            {outgoing.map((c) => (
              <li key={c.id} className="text-sm">
                <span className="font-mono text-xs">
                  {meta.short} → {ELEMENT_META[c.target].short}
                </span>
                <Badge className="ml-2" variant={badgeVariant(signKind(c))}>
                  {signLabel(signKind(c))}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </Block>

      <PaperBlock />
    </>
  );
}

function CouplingDetail({ id }: { id: string }) {
  const c = NETWORK.couplingById(id);
  if (!c) {
    return (
      <>
        <SheetTitle>Unbekannte Kante</SheetTitle>
        <SheetDescription>Diese Kopplung ist nicht dokumentiert.</SheetDescription>
      </>
    );
  }
  const kind = signKind(c);
  const from = ELEMENT_META[c.source];
  const to = ELEMENT_META[c.target];
  const paper = paperForCoupling();
  const range = `${fmtDe(c.sIjLow, 0)} … ${fmtDe(c.sIjHigh, 0)}`;

  return (
    <>
      <p className="text-2xs font-medium uppercase tracking-[0.14em] text-subtle">
        Kopplung · s<sub>ij</sub>
      </p>
      <SheetTitle className="mt-2">
        {from.short} → {to.short}
      </SheetTitle>
      <SheetDescription className="mt-1">
        {from.full} wirkt auf {to.full}.
      </SheetDescription>

      <div className="mt-4">
        <Badge variant={badgeVariant(kind)}>{signLabel(kind)}</Badge>
      </div>

      <Block title="Mechanismus">
        <p className="text-sm leading-relaxed text-fg">{c.mechanismDe}</p>
        <p className="mt-2 text-xs leading-relaxed text-muted">{c.mechanism}</p>
      </Block>

      <Block title="Kopplungsbereich (s_ij)">
        <p className="font-mono text-lg tabular-nums">{range}</p>
        <p className="mt-1 text-xs text-muted">
          Dimensionsloser Bereich aus Wunderling et al. 2021. Vorzeichen und
          Intervall werden nicht geraten.
        </p>
      </Block>

      {kind === "unclear" ? (
        <Block title="Unsicherheit">
          <p className="text-sm leading-relaxed text-fg">
            Die Originalarbeit selbst nennt das Nettovorzeichen unklar, weil
            mehrere Mechanismen gegeneinander arbeiten. Diese Sandbox übernimmt
            genau diese Unsicherheit — ohne eigene Vermutung.
          </p>
        </Block>
      ) : null}

      <Block title="Paper">
        <a
          href={DOI_HREF(paper.doi)}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-accent underline-offset-4 hover:underline"
        >
          {paper.short}
        </a>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          {WUNDERLING_2021_CITATION}
        </p>
      </Block>
    </>
  );
}

function PaperBlock() {
  return (
    <Block title="Quellen">
      <ul className="space-y-3 text-xs leading-relaxed text-muted">
        <li>
          <a
            href={DOI_HREF(WUNDERLING_2021_DOI)}
            target="_blank"
            rel="noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            Wunderling et al. 2021
          </a>
          <p className="mt-1">{WUNDERLING_2021_CITATION}</p>
        </li>
        <li>
          <a
            href={DOI_HREF(WUNDERLING_2022_DOI)}
            target="_blank"
            rel="noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            Wunderling et al. 2022
          </a>
          <p className="mt-1">{WUNDERLING_2022_CITATION}</p>
        </li>
        <li>
          <a
            href={DOI_HREF(WUNDERLING_2024_DOI)}
            target="_blank"
            rel="noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            Wunderling et al. 2024
          </a>
          <p className="mt-1">{WUNDERLING_2024_REVIEW_CITATION}</p>
        </li>
      </ul>
    </Block>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-5">
      <p className="text-2xs font-medium uppercase tracking-[0.14em] text-subtle">
        {title}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function badgeVariant(kind: ReturnType<typeof signKind>) {
  if (kind === "destabilizing") return "destab" as const;
  if (kind === "stabilizing") return "stab" as const;
  return "unclear" as const;
}
