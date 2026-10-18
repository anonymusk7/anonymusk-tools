# anonymusk free tools
Static, client-side tools. Live: https://anonymusk7.github.io/anonymusk-tools/

- `decks.html` — "Deck in 24h": crypto pitch deck template pack ($29, Gumroad link const `GUMROAD_DECK_PACK` = l/vmpnxc) + custom deck service (→ service.html). Sample slides/PDFs in `decks/`.

- `holder-map.html` — token holder bubble map (force-graph). Holders/labels/first funders from Blockscout v2 (eth/base/arbitrum/optimism); direct holder↔holder transfers from Transfer logs via free public RPCs (best-effort, window printed on page). Our own decentralization score. Upsell → report.html. Spec: /workspace/anonymusk/rea/bubblemaps/SPEC.md.
- `wallet-flow.html` — animated wallet fund-flow graph (Blockscout v2 transactions + ERC-20 transfers, current USD prices, expand counterparties, replay timeline). Upsell → report.html. Spec: rea/arkham-flow-graph.
- `trending.html` — hot-token board from GeckoTerminal public API `trending_pools` (attribution "On-chain data provided by GeckoTerminal" kept next to the table, per CoinGecko attribution guide). Does NOT call DexScreener (their API terms forbid competing products). Spec: rea/dexscreener-trending.
- `mindshare.html` + `mindshare.json` — treemap of share of X posts across the coins on CoinGecko trending. Static snapshot; method/timestamps are inside the JSON and shown on the page.
  **Refresh:** `cd /workspace/anonymusk/plays/mindshare`, refresh `x_counts.json` (daily counts per coin from the X API v2 recent counts endpoint, e.g. the bot's X read tool `get_posts_counts_recent` with `granularity=day`, ~15 calls; 7-day lookback max), save a fresh `curl https://api.coingecko.com/api/v3/search/trending > trending.json`, then `TRENDING_FILE=trending.json python3 collect.py x_counts.json ../../tools/mindshare.json` and commit. Automatable later with a GitHub Action only if an X API bearer token is added as a repo secret (none is used now). Note: CoinGecko's keyless API is meant for non-commercial use.

## Design system
All pages share `assets/anon.css` (tokens: colors, type, spacing, radii, shadows; base elements; buttons, inputs, segmented controls, cards, badges, tables, skeletons, toasts, header/footer) and `assets/anon.js` (toasts via `anonToast(msg,type)`, header scroll state, index tool filter, GoatCounter click events; no network calls of its own). Fonts are self-hosted (Inter + JetBrains Mono, OFL) in `assets/fonts/`. Favicon: `assets/favicon.svg` + `favicon.ico`; social card: `assets/og.png`. Every page carries the same static `.site-header` and `.site-footer`. Page-specific styles stay inline in each page and use the `var(--…)` tokens.

Signup forms (`form[data-signup]` on heatmap, DCA, yields, Fear & Greed, IL) and the service.html intake share one constant, `FORMSPREE_ID` at the top of `assets/anon.js`. While it is `''` they open a pre-filled mailto: to anonymusk@mail.grokbot.com; set it to a Formspree form id to POST there instead.

SEO: `sitemap.xml` lists every page; `robots.txt` points to it. Crawlers only read the root-domain robots.txt (anonymusk7.github.io/robots.txt), so submit `https://anonymusk7.github.io/anonymusk-tools/sitemap.xml` directly in Search Console. Head meta and footer fixes are applied by `plays/beautify/build/postfix.py` (run after transform.py).
