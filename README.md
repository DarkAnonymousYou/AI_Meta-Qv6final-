# AI Meta-Q V6 Final — Institutional Quantitative ETF Platform

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-10b981?style=for-the-badge&logo=github)](https://darkanonymousyou.github.io/AI_Meta-Qv6final-/)
[![Strategy](https://img.shields.io/badge/Strategy-LOCKED%20V6%20FINAL-6366f1?style=for-the-badge)](https://darkanonymousyou.github.io/AI_Meta-Qv6final-/)
[![Backtest](https://img.shields.io/badge/Empirical%20Proof-21.5%20Years%20(2005--2026)-06b6d4?style=for-the-badge)](https://darkanonymousyou.github.io/AI_Meta-Qv6final-/)
[![PWA Ready](https://img.shields.io/badge/PWA-Installable-f59e0b?style=for-the-badge&logo=pwa)](https://darkanonymousyou.github.io/AI_Meta-Qv6final-/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

> **Live Web Application URL:**  
> 🔗 [https://darkanonymousyou.github.io/AI_Meta-Qv6final-/](https://darkanonymousyou.github.io/AI_Meta-Qv6final-/)

---

## 🏛️ Executive Summary

**AI Meta-Q V6 Final** is an institutional-grade, bespoke Quantitative ETF Wealth Research & Execution Platform designed for Indian index equity portfolios. Built with inspiration from **Zerodha, Tijori Finance, Stripe, and Linear**, the platform combines high-contrast financial terminal typography (`JetBrains Mono` and `Plus Jakarta Sans`) with an asymmetric crash-deployment algorithm refined across **21.5 years of real NSE historical data (2005–2026)**.

The engine replaces naive monthly Systematic Investment Plans (SIP) with a high-conviction, valuation-anchored liquidity deployment strategy governed by **Four Locked Guardrails**.

---

## 📊 The 5-ETF Structural Allocation

The strategy allocates capital across 5 non-overlapping, high-beta, and high-quality Indian equity index ETFs:

| # | Ticker | Underlying Index | Target Weight | L1 Dip (30%) | L2 Dip (42%) | L3 Dip (28%) | 21Y Price CAGR | 21Y Est. TRI CAGR |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| **1** | `ICICIFIN` | Nifty Financial Services Ex-Bank | **32.0%** | -14.0% | -22.0% | -32.0% | 17.54% | 18.74% |
| **2** | `MAM150ETF` | Nifty Midcap 150 | **28.0%** | -14.0% | -22.0% | -32.0% | 15.93% | 17.13% |
| **3** | `BANKIETF` | Nifty Bank | **14.0%** | -15.0% | -24.0% | -34.0% | 14.73% | 15.93% |
| **4** | `ICICINXT50` | Nifty Next 50 | **14.0%** | -15.0% | -24.0% | -34.0% | 14.49% | 15.69% |
| **5** | `HDFCSML250` | Nifty Smallcap 250 | **12.0%** | -16.0% | -25.0% | -36.0% | 14.18% | 15.38% |

---

## 🛡️ The Four Locked V6 Guardrails

1. **Guardrail 1 — Zero Bull-Run Pullback Chasing:**  
   Deploy **₹0** when $\text{Drop} < \text{L1\_Dip}$. Market dips between $-7\%$ and $-10\%$ during secular bull runs are ignored to preserve cash exclusively for true institutional corrections ($\ge -14\%$).
2. **Guardrail 2 — L1 Hysteresis Lock (1x Buy Per Wave):**  
   Once L1 (30% bucket cash) is triggered in a correction wave, L1 locks (`l1Locked = true`) preventing repetitive whipsaw purchases in sideways or grinding bear markets. The lock automatically resets only on a **New ATH** or escalation to **L2** (60% remaining cash).
3. **Guardrail 3 — L3 Asymmetric Priority & Quiet Cross-Pool Surge:**  
   In severe crashes ($\text{Drop} \ge 32\%\text{--}36\%$), triggered ETFs are ranked by:
   $$\text{Score} = \left(\frac{d}{1 - d}\right) \times \text{CAGR\_Weight}$$
   The algorithm deploys 100% of their remaining bucket cash and borrows **40% idle cash strictly from quiet buckets** whose current drawdown is $< 8.0\%$.
4. **Guardrail 4 — +8.0% Overweight Rebalance Brake:**  
   If $(\text{Current\_Weight} - \text{Target\_Weight}) > +8.0\%$, all new L1 cash deployments into that ETF are blocked and automatically redirected to the most underweight asset in the portfolio.

---

## 📈 Empirical Evolution Matrix (2005–2026)

Tested across **260 monthly periods** and **10 real market crash cycles** (2006 Selloff, 2008 GFC, 2011 Eurozone Bear, 2013 Taper Tantrum, 2015 China Devaluation, 2016 Demonetization, 2018 IL&FS Crisis, 2020 Covid Crash, 2022 Fed Rate Hikes, and 2025 Correction):

| Strategy Version | Price XIRR | Est. TRI XIRR | Terminal Wealth | Max Drawdown | Trades | Key Strategic Flaw / Distinction |
|:---|:---:|:---:|:---:|:---:|:---:|:---|
| **0. Baseline Equal SIP** | 13.86% | 15.06% | ₹2.91 Cr | -58.7% | 260 | Monthly 20% equal deployment regardless of valuation |
| **1. Version 1 (V1 Silo)** | 14.28% | 15.48% | ₹3.08 Cr | -54.1% | 580 | Rigid isolated buckets; over-weighted financials (50%) |
| **2. Version 2 (V2 Cross-50)** | 14.55% | 15.75% | ₹3.20 Cr | -55.7% | 439 | Over-allocated Next 50 (31.5%) & under-allocated FinEx (15%) |
| **3. Version 3 (V3 3-Tier)** | 14.53% | 15.73% | ₹3.19 Cr | -55.3% | 545 | 80% cross-pool borrowing starved Small/Midcap bottoms |
| **4. Version 4 (V4 Anti-Starve)** | 14.49% | 15.69% | ₹3.17 Cr | -54.7% | 434 | 8% bull-pullback buys generated 51 premature trades |
| **5. Version 5 (V5 Repeat-T1)** | 14.50% | 15.70% | ₹3.17 Cr | -54.7% | 498 | Repeated L1 buys in sideways bears drained L2/L3 cash |
| **6. LOCKED V6 FINAL** | **14.61%** | **15.81%** | **₹3.22 Cr** | **-54.1%** | **383** | **CHAMPION:** Zero bull chasing + Hysteresis Lock + Quiet Surge |

---

## ⚡ Core Platform Capabilities

* **100% Equity-Only Portfolio Balancer:**  
  Calculates weights and rebalance drifts strictly using $\text{Total Equity} = \sum \text{ETF Holdings}$ as the 100% denominator, preventing cash reserves from distorting target asset allocation.
* **Top-Tier Priority Queue Cards:**  
  Instant visual display of ranked buying priorities (`#1 BUY`, `#2 BUY`, `#3 BUY`) with exact Rupee top-ups, alongside active `OVERWEIGHT +8% CAP` warning alerts.
* **Full 2-Decimal Paisa Support:**  
  Exact decimal precision (`₹76.52`, `₹20,249.52`) with clean integer display (`₹20,000`) and unconstrained `step="any"` input entry.
* **Tactical Sniper & What-If Slider:**  
  Non-destructive drawdown simulation slider ($0\%$ to $-40\%$) with instant reset to saved prices for testing market crash scenarios.
* **Tactical Cash Bucket Planner:**  
  Pre-allocates dry-powder capital across the 5 V6 buckets and previews exact L1 (30%), L2 (42%), and L3 (28%) tranche deployments with quick-load chips.
* **Institutional Design System:**  
  Dark/Light mode switcher with persistence in `localStorage`, hairline obsidian borders, and tabular JetBrains Mono typography.
* **Zero Server Dependency (Pure SPA):**  
  Runs 100% locally in the browser with `localStorage` export/import and data-URI PWA installation support.

---

## 🚀 How to Enable GitHub Pages (Hosting Guide)

To host this repository on GitHub Pages:

1. Open your repository on GitHub:  
   👉 [https://github.com/DarkAnonymousYou/AI_Meta-Qv6final-](https://github.com/DarkAnonymousYou/AI_Meta-Qv6final-)
2. Click on **Settings** (top navigation bar of the repository).
3. In the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   * **Source:** Select **`Deploy from a branch`**.
   * **Branch:** Select **`main`** (or `master`) and folder **`/ (root)`**.
5. Click **Save**.
6. GitHub will take 1–2 minutes to build and publish your site.
7. Your website will be live at:  
   🌐 **`https://darkanonymousyou.github.io/AI_Meta-Qv6final-/`**

---

## 💻 Local Development & Deployment

### Option A: Open directly in your browser
Simply double-click or open `index.html` in any modern web browser (Chrome, Safari, Edge, Firefox).

### Option B: High-Performance Python Server
```bash
# Serves SPA & REST API endpoints on port 3000
python server.py 3000
```
Visit: `http://localhost:3000`

### Option C: Node.js / Express Server
```bash
node server.js
```
Visit: `http://localhost:3000`

---

## 📂 Repository File Structure

```text
├── .gitignore               # Clean ignore file for Python, Node, and OS caches
├── .nojekyll                # Ensures GitHub Pages processes all assets directly
├── README.md                # Institutional documentation and live deployment links
├── index.html               # Complete, standalone production Single Page Application
├── build_index.py           # Assembly compiler to rebuild index.html from parts
├── server.py                # Multi-threaded Python standard library HTTP & REST server
├── server.js                # Node.js/Express static file and API server
├── stock.ipynb              # Quantitative Jupyter analysis notebook
└── parts/                   # Modular human-maintainable source components
    ├── 01_head.html         # Head, PWA manifest, font imports & Dark/Light CSS
    ├── 02_header_nav.html   # Sticky navigation bar & theme toggle
    ├── 03_view1_overview.html # Quantitative framework & guardrails documentation
    ├── 04_view2_sandbox.html  # Historical backtest simulator & Mode B wealth projector
    ├── 05_view3_empirical.html # 21.5Y empirical charts & version comparison matrix
    ├── 06_view4_balancer.html # 100% equity-only portfolio rebalancer & priority cards
    ├── 07_view5_sniper.html   # Tactical sniper & What-If drawdown preview slider
    ├── 08_view6_scanner.html  # Crash scanner & Tactical Cash Bucket Planner
    ├── 09_view7_faq.html      # Comprehensive quantitative FAQ & mathematical audit
    └── 10_script.js         # Reactive JavaScript calculation engine & state persistence
```

---

## ⚖️ License & Disclaimer

**MIT License** — Copyright (c) 2026 DarkAnonymousYou.

*Disclaimer: This platform is for quantitative research, backtesting, and educational purposes only. It does not constitute financial, investment, or legal advice. Indian equity markets involve risk of principal loss. Always conduct independent research or consult a SEBI-registered financial advisor before deploying capital.*
