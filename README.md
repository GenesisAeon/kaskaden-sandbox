# kaskaden-sandbox

Interactive evidence-graph / tipping-element network sandbox for the published
Wunderling et al. four-element network (GIS / WAIS / AMOC / Amazon). Companion
UI to
[`cascading-tipping-utac`](https://github.com/GenesisAeon/cascading-tipping-utac)
(GenesisAeon P87). **Deliberately has no UTAC/CREP/AFET overlay** — see
[DISCLAIMER.md](DISCLAIMER.md).

The interface is German. Numbers and citations stay in their original units.

## What's real here

- **Wunderling et al. 2021** (*Earth System Dynamics* 12, 601–619): documented
  pairwise couplings between four tipping elements, including two interactions
  the paper itself flags as having an **unclear net sign**.
- **Wunderling et al. 2021**: interactions reduce the effective critical
  temperature for AMOC / WAIS tipping by ~55 % / ~40 % at maximum coupling.
- **Wunderling et al. 2022** (*Nature Climate Change*): temporary warming
  overshoot scenarios can increase cascade risk by up to 72 % vs. non-overshoot
  scenarios.
- **Wunderling et al. 2024** review and **Rocha et al. 2018** (*Science*) cited
  as related context.

The slider scales those published percentages linearly with coupling strength
`d` (0 = isolated, 1 = max documented). There is **no Monte-Carlo engine**.

Permafrost and carbon-sink packages are **not** nodes in this graph.

## License

MIT. Owner: GenesisAeon / Johann Römer.

## Citation

See [CITATION.cff](CITATION.cff).
