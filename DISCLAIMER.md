# DISCLAIMER — Reine Zitat-Wissenschaft, kein Framework-Overlay

> **Reine Zitat-Wissenschaft — kein Framework-Overlay.**

Diese Webapp (`kaskaden-sandbox`) ist die interaktive Evidence-Graph-Oberfläche
zu [`cascading-tipping-utac`](https://github.com/GenesisAeon/cascading-tipping-utac)
(GenesisAeon P87). Alle Zahlen und Kanten stammen 1:1 aus den Paket-Konstanten.

## What this is

- Das reale, veröffentlichte Kippelement-Netz aus Wunderling et al. (2021,
  *Earth System Dynamics* 12, 601–619) mit genau vier Elementen: grönländischer
  Eisschild (GIS), westantarktischer Eisschild (WAIS), AMOC, Amazonas-Regenwald.
- Dokumentierte paarweise Kopplungsbereiche (`s_ij`) und Mechanismen, inklusive
  der zwei Kanten (WAIS→AMOC, AMOC→Amazonas), deren Nettovorzeichen die
  Originalarbeit selbst als unklar bezeichnet. Diese App rät kein Vorzeichen.
- Quantifizierte Befunde: Wechselwirkungen senken die effektive kritische
  Temperatur für AMOC und WAIS um ~55 % bzw. ~40 % bei maximal dokumentierter
  Kopplung (Wunderling et al. 2021). Temporäre Temperatur-Overshoots können das
  Cascade-Risiko um bis zu 72 % gegenüber Szenarien ohne Overshoot erhöhen
  (Wunderling et al. 2022).
- Rocha et al. (2018, *Science*) ist verwandter Kontext, nicht dasselbe Netz.

## What this is NOT

- **Keine Monte-Carlo-Engine** und keine Neuimplementierung der bistabilen ODEs
  aus Wunderling et al. Der Slider skaliert linear die dokumentierten
  Prozentwerte; er simuliert keine Ensembles.
- **Nicht verbunden** mit `permafrost-utac` oder `carbon-sinks-utac`. Diese
  Pakete sind nicht Teil des validierten Vier-Elemente-Netzes.
- **Kein UTAC/CREP/AFET-Overlay**, kein erfundenes Γ. Die Kernfunktion braucht
  kein Login.

## References

- Wunderling, N., Donges, J.F., Kurths, J., Winkelmann, R. (2021).
  "Interacting tipping elements increase risk of climate domino effects
  under global warming". *Earth System Dynamics*, 12, 601-619.
- Wunderling, N. et al. (2022). "Global warming overshoots increase risks
  of climate tipping cascades in a network model". *Nature Climate Change*.
- Wunderling, N. et al. (2024). "Climate tipping point interactions and
  cascades: a review". *Earth System Dynamics*, 15, 41-74.
- Rocha, J.C., Peterson, G., Bodin, O., Levin, S. (2018). "Cascading
  regime shifts within and across scales". *Science*, 362(6421), 1379-1383.

Verified 2026-08-02 as part of the KlimaAktuell citation-accuracy review.
