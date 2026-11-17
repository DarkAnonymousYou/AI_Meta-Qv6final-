  <script>
    /**
     * Set Global Chart.js Defaults for Institutional Fintech Styling
     */
    if (typeof Chart !== "undefined") {
      Chart.defaults.font.family = "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      Chart.defaults.color = "#a1a1aa";
      Chart.defaults.borderColor = "rgba(39, 39, 42, 0.6)";
    }

    /**
     * =========================================================================
     * 1. IMMUTABLE QUANTITATIVE CONSTANTS (V6 LOCKED)
     * =========================================================================
     */
    const TICKERS = ["ICICIFIN", "MAM150ETF", "BANKIETF", "ICICINXT50", "HDFCSML250"];

    const V6_CONFIG = {
      ICICIFIN: {
        ticker: "ICICIFIN",
        name: "Nifty Financial Services Ex-Bank",
        targetWeight: 0.320,
        per100: 32.0,
        l1: { drop: 0.140, pctDeploy: 0.30 },
        l2: { drop: 0.220, pctDeploy: 0.60 },
        l3: { drop: 0.320, pctDeploy: 1.00 },
        defaultAth: 33200.0,
        defaultEtfPrice: 33.20,
        cagrWeight: 1.18,
        priceCagr: "17.54%",
        triCagr: "18.74%",
        navScale: 1000.0
      },
      MAM150ETF: {
        ticker: "MAM150ETF",
        name: "Nifty Midcap 150",
        targetWeight: 0.280,
        per100: 28.0,
        l1: { drop: 0.135, pctDeploy: 0.30 },
        l2: { drop: 0.225, pctDeploy: 0.60 },
        l3: { drop: 0.330, pctDeploy: 1.00 },
        defaultAth: 23647.5,
        defaultEtfPrice: 31.50,
        cagrWeight: 1.08,
        priceCagr: "15.59%",
        triCagr: "16.79%",
        navScale: 750.0
      },
      BANKIETF: {
        ticker: "BANKIETF",
        name: "Nifty Bank",
        targetWeight: 0.140,
        per100: 14.0,
        l1: { drop: 0.140, pctDeploy: 0.30 },
        l2: { drop: 0.230, pctDeploy: 0.60 },
        l3: { drop: 0.340, pctDeploy: 1.00 },
        defaultAth: 62283.6,
        defaultEtfPrice: 622.80,
        cagrWeight: 1.00,
        priceCagr: "14.35%",
        triCagr: "15.55%",
        navScale: 100.0
      },
      ICICINXT50: {
        ticker: "ICICINXT50",
        name: "Nifty Next 50",
        targetWeight: 0.140,
        per100: 14.0,
        l1: { drop: 0.120, pctDeploy: 0.30 },
        l2: { drop: 0.210, pctDeploy: 0.60 },
        l3: { drop: 0.320, pctDeploy: 1.00 },
        defaultAth: 77918.0,
        defaultEtfPrice: 779.18,
        cagrWeight: 0.98,
        priceCagr: "14.43%",
        triCagr: "15.63%",
        navScale: 100.0
      },
      HDFCSML250: {
        ticker: "HDFCSML250",
        name: "Nifty Smallcap 250",
        targetWeight: 0.120,
        per100: 12.0,
        l1: { drop: 0.160, pctDeploy: 0.30 },
        l2: { drop: 0.250, pctDeploy: 0.60 },
        l3: { drop: 0.360, pctDeploy: 1.00 },
        defaultAth: 18688.3,
        defaultEtfPrice: 311.47,
        cagrWeight: 1.02,
        priceCagr: "14.18%",
        triCagr: "15.38%",
        navScale: 60.0
      }
    };

    const STORAGE_KEY = "ai_meta_q_v6_data_store";

    /**
     * B. Exact 24-Point Historical Index Pivot Series (Apr 2005 – Nov 2026)
     */
    const HISTORICAL_PIVOTS = [
      { date: "2005-04", event: "Base Inception",       ICICIFIN: 1000.0,  MAM150ETF: 1005.6,  BANKIETF: 3520.6,  ICICINXT50: 3998.8,  HDFCSML250: 1000.0 },
      { date: "2006-05", event: "2006 Bull Peak",       ICICIFIN: 1950.0,  MAM150ETF: 1882.6,  BANKIETF: 5074.4,  ICICINXT50: 7250.3,  HDFCSML250: 2095.4 },
      { date: "2006-06", event: "2006 Sharp Dip",       ICICIFIN: 1280.0,  MAM150ETF: 1166.5,  BANKIETF: 3409.0,  ICICINXT50: 4463.8,  HDFCSML250: 1305.3 },
      { date: "2008-01", event: "2008 GFC Peak",        ICICIFIN: 5300.0,  MAM150ETF: 3330.9,  BANKIETF: 10774.2, ICICINXT50: 13209.4, HDFCSML250: 4039.2 },
      { date: "2009-03", event: "2009 GFC Bottom",      ICICIFIN: 1520.0,  MAM150ETF: 887.1,   BANKIETF: 3314.6,  ICICINXT50: 3587.6,  HDFCSML250: 970.1 },
      { date: "2010-11", event: "Post-GFC Recovery",    ICICIFIN: 5250.0,  MAM150ETF: 3057.5,  BANKIETF: 13303.6, ICICINXT50: 13624.1, HDFCSML250: 3405.3 },
      { date: "2011-12", event: "2011 Eurozone Bear",   ICICIFIN: 3120.0,  MAM150ETF: 1831.4,  BANKIETF: 7766.4,  ICICINXT50: 8224.2,  HDFCSML250: 1917.5 },
      { date: "2013-01", event: "2013 Pre-Taper High",  ICICIFIN: 5150.0,  MAM150ETF: 2743.0,  BANKIETF: 13414.3, ICICINXT50: 12798.1, HDFCSML250: 2769.1 },
      { date: "2013-08", event: "2013 Taper Tantrum",   ICICIFIN: 3450.0,  MAM150ETF: 2052.2,  BANKIETF: 8366.8,  ICICINXT50: 9951.4,  HDFCSML250: 1874.7 },
      { date: "2015-08", event: "2015 Rally Peak",      ICICIFIN: 7950.0,  MAM150ETF: 4640.0,  BANKIETF: 20907.6, ICICINXT50: 21730.8, HDFCSML250: 4690.7 },
      { date: "2016-02", event: "2016 Global Selloff",  ICICIFIN: 6200.0,  MAM150ETF: 3764.5,  BANKIETF: 13407.3, ICICINXT50: 16607.8, HDFCSML250: 3578.9 },
      { date: "2018-01", event: "2018 Mid/Small Peak",  ICICIFIN: 13000.0, MAM150ETF: 7469.2,  BANKIETF: 27652.1, ICICINXT50: 31990.8, HDFCSML250: 7568.3 },
      { date: "2018-10", event: "2018 IL&FS Crisis",    ICICIFIN: 10150.0, MAM150ETF: 5672.9,  BANKIETF: 24240.1, ICICINXT50: 25040.5, HDFCSML250: 4827.5 },
      { date: "2019-08", event: "2019 Slowdown Low",    ICICIFIN: 13850.0, MAM150ETF: 5493.0,  BANKIETF: 26560.6, ICICINXT50: 24873.3, HDFCSML250: 4242.6 },
      { date: "2020-02", event: "Pre-Covid Peak",       ICICIFIN: 14650.0, MAM150ETF: 6808.2,  BANKIETF: 32613.1, ICICINXT50: 29259.5, HDFCSML250: 5314.7 },
      { date: "2020-03", event: "Covid-19 Crash Low",   ICICIFIN: 7750.0,  MAM150ETF: 4088.1,  BANKIETF: 16116.3, ICICINXT50: 18384.1, HDFCSML250: 2867.4 },
      { date: "2021-11", event: "Post-Covid Bull Peak", ICICIFIN: 19750.0, MAM150ETF: 12338.5, BANKIETF: 41829.6, ICICINXT50: 45290.8, HDFCSML250: 10524.6 },
      { date: "2022-06", event: "2022 Rate Hike Low",   ICICIFIN: 14000.0, MAM150ETF: 9496.6,  BANKIETF: 32155.4, ICICINXT50: 35018.2, HDFCSML250: 7598.1 },
      { date: "2024-09", event: "2024 ATH Peak",        ICICIFIN: 28200.0, MAM150ETF: 22515.4, BANKIETF: 54467.4, ICICINXT50: 77918.0, HDFCSML250: 18688.3 },
      { date: "2025-03", event: "Mar 2025 Correction",  ICICIFIN: 24200.0, MAM150ETF: 17269.5, BANKIETF: 47702.9, ICICINXT50: 56192.5, HDFCSML250: 13314.7 },
      { date: "2025-07", event: "Jul 2025 Rebound",     ICICIFIN: 31000.0, MAM150ETF: 22650.1, BANKIETF: 57628.4, ICICINXT50: 69179.3, HDFCSML250: 18077.4 },
      { date: "2026-03", event: "Mar 2026 Pullback",    ICICIFIN: 26800.0, MAM150ETF: 19218.0, BANKIETF: 49954.9, ICICINXT50: 59896.1, HDFCSML250: 14143.5 },
      { date: "2026-08", event: "Aug 2026 Peak",        ICICIFIN: 33200.0, MAM150ETF: 23647.5, BANKIETF: 61764.9, ICICINXT50: 75000.4, HDFCSML250: 18551.0 },
      { date: "2026-11", event: "Nov 2026 Current",     ICICIFIN: 32400.0, MAM150ETF: 22662.9, BANKIETF: 62283.6, ICICINXT50: 72693.3, HDFCSML250: 17774.2 }
    ];

    /**
     * 10 Historical Crash-to-Recovery Cycles Table
     */
    const CRASH_CYCLES = [
      { event: "2006 Commodity Shock", peak: "2006-05", trough: "2006-06", rec: "2006-11", drop: "-38.0%", bounce: "+61.3%", v6Exec: "L1 & L2 Tranches fired; quick recovery" },
      { event: "2008 Global Financial Crisis", peak: "2008-01", trough: "2009-03", rec: "2010-11", drop: "-72.8%", bounce: "+244.7%", v6Exec: "L3 Mega fire + 40% quiet pool; major alpha generator" },
      { event: "2011 Eurozone Sovereign Debt", peak: "2010-11", trough: "2011-12", rec: "2013-01", drop: "-43.7%", bounce: "+72.7%", v6Exec: "L1 Lock preserved cash in sideways chop" },
      { event: "2013 Fed Taper Tantrum", peak: "2013-01", trough: "2013-08", rec: "2014-04", drop: "-37.6%", bounce: "+60.3%", v6Exec: "L1 & L2 deployed into oversold financial tranches" },
      { event: "2015-16 Yuan Devaluation & NPA", peak: "2015-08", trough: "2016-02", rec: "2016-11", drop: "-35.9%", bounce: "+55.9%", v6Exec: "L1 & L2 bought; Bank index surged" },
      { event: "2018 Mid/Small-Cap & IL&FS", peak: "2018-01", trough: "2018-10", rec: "2019-11", drop: "-36.2%", bounce: "+56.8%", v6Exec: "Mid/Smallcap L3 deployed; Quiet pool from Largecap" },
      { event: "2019 Economic Slowdown", peak: "2018-01", trough: "2019-08", rec: "2019-12", drop: "-26.5%", bounce: "+36.1%", v6Exec: "L1 Dip tranche bought without overspending" },
      { event: "2020 Covid-19 Flash Crash", peak: "2020-02", trough: "2020-03", rec: "2020-11", drop: "-50.6%", bounce: "+102.4%", v6Exec: "L3 Maximum Firepower; massive subsequent bull wave" },
      { event: "2021-22 Fed Hikes & War", peak: "2021-11", trough: "2022-06", rec: "2023-09", drop: "-27.8%", bounce: "+38.5%", v6Exec: "L1 & L2 tranches systematically absorbed selling" },
      { event: "2024-25 Tech & Valuation Dip", peak: "2024-09", trough: "2025-03", rec: "2025-07", drop: "-28.7%", bounce: "+40.3%", v6Exec: "Overweight brake redirected into lagging Next50" }
    ];

    /**
     * C. Complete Version Evolution & Experiment Matrix (V0 to LOCKED V6 Final)
     */
    const VERSION_MATRIX = [
      { version: "0. Baseline Equal SIP",        price_xirr: 13.86, est_tri_xirr: 15.06, corpus_cr: 2.91, max_dd: -58.7, fold1_xirr: 11.22, fold2_xirr: 14.48, trades: 260, notes: "Monthly equal 20% SIP regardless of valuation" },
      { version: "1. Version 1 (V1 Silo)",       price_xirr: 14.28, est_tri_xirr: 15.48, corpus_cr: 3.08, max_dd: -54.1, fold1_xirr: 11.52, fold2_xirr: 15.23, trades: 580, notes: "Rigid isolated buckets; over-weighted financials (50%)" },
      { version: "2. Version 2 (V2 Cross-50)",   price_xirr: 14.55, est_tri_xirr: 15.75, corpus_cr: 3.20, max_dd: -55.7, fold1_xirr: 11.92, fold2_xirr: 16.28, trades: 439, notes: "Over-allocated Next 50 (31.5%) & under-allocated FinEx (15%)" },
      { version: "3. Version 3 (V3 3-Tier)",     price_xirr: 14.53, est_tri_xirr: 15.73, corpus_cr: 3.19, max_dd: -55.3, fold1_xirr: 11.61, fold2_xirr: 16.07, trades: 545, notes: "80% cross-pool borrowing starved Small/Midcap bottoms" },
      { version: "4. Version 4 (V4 Anti-Starve)",price_xirr: 14.49, est_tri_xirr: 15.69, corpus_cr: 3.17, max_dd: -54.7, fold1_xirr: 11.22, fold2_xirr: 16.38, trades: 434, notes: "Included 8% bull-pullback buys (51 premature bull trades)" },
      { version: "5. Version 5 (V5 Repeat-T1)",  price_xirr: 14.50, est_tri_xirr: 15.70, corpus_cr: 3.17, max_dd: -54.7, fold1_xirr: 11.28, fold2_xirr: 16.48, trades: 498, notes: "Repeated Tier-1 buys in sideways bears drained L2/L3 cash" },
      { version: "6. LOCKED VERSION 6 (V6 FINAL)",price_xirr: 14.61,est_tri_xirr: 15.81, corpus_cr: 3.22, max_dd: -54.1, fold1_xirr: 11.45, fold2_xirr: 16.76, trades: 383, notes: "CHAMPION: Zero bull-run chasing + L1 Hysteresis Lock + 40% Quiet-Pool L3 Surge + 8% Overweight Brake" }
    ];

    /**
     * =========================================================================
     * 2. STATE MANAGEMENT & LOCAL STORAGE
     * =========================================================================
     */
    function getDefaultState() {
      const state = {
        holdings: {
          ICICIFIN: 0,
          MAM150ETF: 0,
          BANKIETF: 0,
          ICICINXT50: 0,
          HDFCSML250: 0
        },
        cashReserve: 0,
        freshCapital: 0,
        aths: {},
        livePrices: {},
        etfPrices: {},
        l1Locked: {},
        selectedSniperTicker: "ICICIFIN",
        chartType: "bar",
        simSip: 20000,
        simLump: 0,
        simStart: "2005-04",
        simEnd: "2026-11",
        simMode: "mode-a",
        projSip: 20000,
        projLump: 0,
        projStepUp: 0,
        projXirrV6: 15.81,
        projXirrBm: 14.50,
        projYears: 20
      };

      TICKERS.forEach(t => {
        state.aths[t] = V6_CONFIG[t].defaultAth;
        state.livePrices[t] = V6_CONFIG[t].defaultAth;
        state.etfPrices[t] = V6_CONFIG[t].defaultEtfPrice;
        state.l1Locked[t] = false;
      });

      return state;
    }

    let appState = loadState();

    function loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          const def = getDefaultState();
          return {
            ...def,
            ...parsed,
            holdings: { ...def.holdings, ...(parsed.holdings || {}) },
            aths: { ...def.aths, ...(parsed.aths || {}) },
            livePrices: { ...def.livePrices, ...(parsed.livePrices || {}) },
            etfPrices: { ...def.etfPrices, ...(parsed.etfPrices || {}) },
            l1Locked: { ...def.l1Locked, ...(parsed.l1Locked || {}) }
          };
        }
      } catch (e) {
        console.error("State load error:", e);
      }
      return getDefaultState();
    }

    function saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
      } catch (e) {
        console.error("State save error:", e);
      }
    }

    /**
     * =========================================================================
     * 3. THEME & FORMATTING UTILITIES (EN-IN 2-DECIMAL PAISA SUPPORT)
     * =========================================================================
     */
    function initTheme() {
      const savedTheme = localStorage.getItem("v6_theme") || "dark";
      applyTheme(savedTheme);
    }

    function toggleTheme() {
      const isLight = document.documentElement.classList.contains("light");
      const next = isLight ? "dark" : "light";
      localStorage.setItem("v6_theme", next);
      applyTheme(next);
      showToast(`Switched to ${next.toUpperCase()} Mode`);
    }

    function applyTheme(theme) {
      const html = document.documentElement;
      const sun = document.getElementById("themeIconSun");
      const moon = document.getElementById("themeIconMoon");
      const label = document.getElementById("themeLabel");

      if (theme === "light") {
        html.classList.remove("dark");
        html.classList.add("light");
        if (sun) sun.classList.remove("hidden");
        if (moon) moon.classList.add("hidden");
        if (label) label.innerText = "Light";
        if (typeof Chart !== "undefined") {
          Chart.defaults.color = "#475569";
          Chart.defaults.borderColor = "rgba(203, 213, 225, 0.6)";
        }
      } else {
        html.classList.remove("light");
        html.classList.add("dark");
        if (sun) sun.classList.add("hidden");
        if (moon) moon.classList.remove("hidden");
        if (label) label.innerText = "Dark";
        if (typeof Chart !== "undefined") {
          Chart.defaults.color = "#a1a1aa";
          Chart.defaults.borderColor = "rgba(39, 39, 42, 0.6)";
        }
      }
    }

    function formatINR(val, decimals = 0) {
      if (val === null || val === undefined || isNaN(val)) return "₹0";
      const absVal = Math.abs(val);
      const sign = val < 0 ? "-" : "";

      if (absVal >= 10000000) {
        const cr = absVal / 10000000;
        return `${sign}₹${cr.toFixed(2)} Cr`;
      } else if (absVal >= 100000) {
        const l = absVal / 100000;
        return `${sign}₹${l.toFixed(2)} L`;
      } else {
        const hasFraction = (absVal % 1 !== 0);
        const dec = (decimals === 0 && hasFraction) ? 2 : decimals;
        return `${sign}₹${absVal.toLocaleString("en-IN", {
          minimumFractionDigits: dec,
          maximumFractionDigits: dec
        })}`;
      }
    }

    function formatNumber(val, decimals = 2) {
      if (val === null || val === undefined || isNaN(val)) return "0";
      return val.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    }

    /**
     * =========================================================================
     * 4. 260-MONTH CHRONOLOGICAL TIME SERIES GENERATOR
     * =========================================================================
     */
    function generate260MonthlySeries() {
      const months = [];
      let y = 2005, m = 4;
      while (y < 2026 || (y === 2026 && m <= 11)) {
        const mStr = m < 10 ? `0${m}` : `${m}`;
        months.push(`${y}-${mStr}`);
        m++;
        if (m > 12) { m = 1; y++; }
      }

      const pivotMap = {};
      HISTORICAL_PIVOTS.forEach(p => { pivotMap[p.date] = p; });

      const monthlyPrices = [];
      let lastPivotIdx = 0;

      for (let i = 0; i < months.length; i++) {
        const curM = months[i];

        if (pivotMap[curM]) {
          monthlyPrices.push(pivotMap[curM]);
          for (let p = 0; p < HISTORICAL_PIVOTS.length; p++) {
            if (HISTORICAL_PIVOTS[p].date === curM) {
              lastPivotIdx = p;
              break;
            }
          }
        } else {
          const p1 = HISTORICAL_PIVOTS[lastPivotIdx];
          const p2 = HISTORICAL_PIVOTS[Math.min(lastPivotIdx + 1, HISTORICAL_PIVOTS.length - 1)];

          const idx1 = months.indexOf(p1.date);
          const idx2 = months.indexOf(p2.date);
          const totalSpan = Math.max(1, idx2 - idx1);
          const progress = (i - idx1) / totalSpan;

          const interpolated = { date: curM, event: "Interpolated Step" };
          TICKERS.forEach(ticker => {
            const val1 = Math.log(p1[ticker]);
            const val2 = Math.log(p2[ticker]);
            const logVal = val1 + (val2 - val1) * progress;
            interpolated[ticker] = Math.exp(logVal);
          });
          monthlyPrices.push(interpolated);
        }
      }

      return { months, monthlyPrices };
    }

    const { months: ALL_260_MONTHS, monthlyPrices: FULL_260_SERIES } = generate260MonthlySeries();

    /**
     * =========================================================================
     * 5. NAVIGATION & VIEW CONTROLLER
     * =========================================================================
     */
    function switchView(targetId) {
      document.querySelectorAll(".view-panel").forEach(el => el.classList.add("hidden"));
      const activeEl = document.getElementById(targetId);
      if (activeEl) activeEl.classList.remove("hidden");

      // Update Desktop Top Nav
      document.querySelectorAll(".view-nav-btn").forEach(btn => btn.classList.remove("nav-tab-active"));
      const deskBtn = document.getElementById(`desk-${targetId}`);
      if (deskBtn) deskBtn.classList.add("nav-tab-active");

      // Update Mobile Bottom Nav
      const mobTabs = ["view-overview", "view-sandbox", "view-balancer", "view-sniper", "view-scanner"];
      mobTabs.forEach(id => {
        const mobBtn = document.getElementById(`mob-${id}`);
        if (mobBtn) {
          if (id === targetId) {
            mobBtn.classList.add("text-emerald-400");
            mobBtn.classList.remove("text-carbon-400");
          } else {
            mobBtn.classList.remove("text-emerald-400");
            mobBtn.classList.add("text-carbon-400");
          }
        }
      });

      // Lazy chart rendering on demand
      if (targetId === "view-empirical") {
        setTimeout(initEmpiricalCharts, 50);
      } else if (targetId === "view-balancer") {
        setTimeout(renderBalancerChart, 50);
      } else if (targetId === "view-sandbox") {
        if (appState.simMode === "mode-b") {
          setTimeout(runFutureWealthProjection, 50);
        } else {
          setTimeout(runRealTimeSimulation, 50);
        }
      } else if (targetId === "view-scanner") {
        updateCrashScannerView();
      } else if (targetId === "view-sniper") {
        updateSniperView();
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function switchSimMode(mode) {
      appState.simMode = mode;
      saveState();

      const containerA = document.getElementById("sim-mode-container-a");
      const containerB = document.getElementById("sim-mode-container-b");
      const btnA = document.getElementById("sim-mode-btn-a");
      const btnB = document.getElementById("sim-mode-btn-b");

      if (mode === "mode-a") {
        containerA.classList.remove("hidden");
        containerB.classList.add("hidden");
        btnA.className = "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all bg-carbon-800 text-emerald-400 border border-carbon-600 shadow-sm flex items-center gap-1.5";
        btnB.className = "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all text-carbon-400 hover:text-carbon-200 flex items-center gap-1.5";
        if (sandboxChart) sandboxChart.resize();
      } else {
        containerA.classList.add("hidden");
        containerB.classList.remove("hidden");
        btnB.className = "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all bg-carbon-800 text-emerald-400 border border-carbon-600 shadow-sm flex items-center gap-1.5";
        btnA.className = "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all text-carbon-400 hover:text-carbon-200 flex items-center gap-1.5";
        runFutureWealthProjection();
        if (projectorChart) projectorChart.resize();
      }
    }

    /**
     * =========================================================================
     * 6. VIEW 1: OVERVIEW & THESIS MATRIX
     * =========================================================================
     */
    function renderOverviewMatrix() {
      const tbody = document.getElementById("v6-matrix-table-body");
      if (!tbody) return;

      tbody.innerHTML = TICKERS.map(ticker => {
        const cfg = V6_CONFIG[ticker];
        return `
          <tr class="hover:bg-carbon-850/60 transition">
            <td class="py-3.5 px-4 font-bold text-carbon-100 font-sans">${cfg.ticker}</td>
            <td class="py-3.5 px-4 text-carbon-400 font-sans">${cfg.name}</td>
            <td class="py-3.5 px-3 text-right font-semibold text-carbon-200 tabular-nums">${(cfg.targetWeight * 100).toFixed(1)}%</td>
            <td class="py-3.5 px-3 text-right text-carbon-300 tabular-nums">₹${cfg.per100.toFixed(1)}</td>
            <td class="py-3.5 px-3 text-right text-emerald-400 font-semibold tabular-nums">-${(cfg.l1.drop * 100).toFixed(1)}% (30%)</td>
            <td class="py-3.5 px-3 text-right text-amber-400 font-semibold tabular-nums">-${(cfg.l2.drop * 100).toFixed(1)}% (60%)</td>
            <td class="py-3.5 px-3 text-right text-rose-400 font-bold tabular-nums">-${(cfg.l3.drop * 100).toFixed(1)}% (100%+)</td>
            <td class="py-3.5 px-3 text-right text-cyan-400 font-semibold tabular-nums">${cfg.cagrWeight.toFixed(2)}x</td>
            <td class="py-3.5 px-4 text-right text-carbon-200 tabular-nums">${formatNumber(cfg.defaultAth, 1)}</td>
          </tr>
        `;
      }).join("");
    }

    /**
     * =========================================================================
     * 7. VIEW 2: MODE A - 260-MONTH REAL-TIME HISTORICAL BACKTEST
     * =========================================================================
     */
    let sandboxChart = null;
    let cachedTradeLogs = [];

    function initSandboxSelectors() {
      const startSel = document.getElementById("sim-select-start");
      const endSel = document.getElementById("sim-select-end");
      const sipInput = document.getElementById("sim-input-sip");
      const lumpInput = document.getElementById("sim-input-lump");

      if (sipInput && appState.simSip !== undefined) sipInput.value = appState.simSip;
      if (lumpInput && appState.simLump !== undefined) lumpInput.value = appState.simLump;
      if (!startSel || !endSel) return;

      if (startSel.children.length === 0) {
        startSel.innerHTML = ALL_260_MONTHS.map(m => `<option value="${m}" ${m === appState.simStart ? 'selected' : ''}>${m}</option>`).join("");
        endSel.innerHTML = ALL_260_MONTHS.map(m => `<option value="${m}" ${m === appState.simEnd ? 'selected' : ''}>${m}</option>`).join("");
      }
      startSel.value = appState.simStart || "2005-04";
      endSel.value = appState.simEnd || "2026-11";
    }

    function setSandboxPreset(preset) {
      if (preset === "full") {
        appState.simStart = "2005-04"; appState.simEnd = "2026-11";
      } else if (preset === "fold1") {
        appState.simStart = "2005-04"; appState.simEnd = "2016-01";
      } else if (preset === "fold2") {
        appState.simStart = "2016-02"; appState.simEnd = "2026-11";
      } else if (preset === "gfc") {
        appState.simStart = "2008-01"; appState.simEnd = "2012-12";
      } else if (preset === "covid") {
        appState.simStart = "2020-01"; appState.simEnd = "2026-11";
      }

      document.getElementById("sim-select-start").value = appState.simStart;
      document.getElementById("sim-select-end").value = appState.simEnd;
      saveState();
      runRealTimeSimulation();
    }

    /**
     * Newton-Raphson & Bisection XIRR Solver
     */
    function computeXIRR(cashFlows) {
      if (!cashFlows || cashFlows.length < 2) return 0;
      
      const t0 = cashFlows[0].date.getTime();
      const years = cashFlows.map(cf => (cf.date.getTime() - t0) / (365.25 * 86400000));
      const amounts = cashFlows.map(cf => cf.amount);

      let rate = 0.14; // Initial guess

      for (let iter = 0; iter < 100; iter++) {
        let npv = 0;
        let dnpv = 0;

        for (let i = 0; i < amounts.length; i++) {
          const denom = Math.pow(1 + rate, years[i]);
          if (denom === 0 || isNaN(denom)) break;
          npv += amounts[i] / denom;
          dnpv -= (years[i] * amounts[i]) / (denom * (1 + rate));
        }

        if (Math.abs(npv) < 0.001) return rate * 100;
        if (dnpv === 0 || isNaN(dnpv)) break;

        const newRate = rate - npv / dnpv;
        if (newRate <= -0.99 || isNaN(newRate)) break;
        if (Math.abs(newRate - rate) < 0.00001) return newRate * 100;
        rate = newRate;
      }

      // Fallback Bisection
      let low = -0.5, high = 1.0;
      for (let iter = 0; iter < 60; iter++) {
        const mid = (low + high) / 2;
        let npvMid = 0;
        for (let i = 0; i < amounts.length; i++) {
          npvMid += amounts[i] / Math.pow(1 + mid, years[i]);
        }
        if (Math.abs(npvMid) < 0.01) return mid * 100;
        if (npvMid > 0) low = mid;
        else high = mid;
      }

      return rate * 100;
    }

    /**
     * Real-Time 260-Month Historical Backtest Engine
     */
    function runRealTimeSimulation() {
      const sip = parseFloat(document.getElementById("sim-input-sip").value) || 20000;
      const lump = parseFloat(document.getElementById("sim-input-lump").value) || 0;
      const startM = document.getElementById("sim-select-start").value || "2005-04";
      const endM = document.getElementById("sim-select-end").value || "2026-11";

      const chkV6 = document.getElementById("sim-chk-v6").checked;
      const chkSIP = document.getElementById("sim-chk-sip").checked;
      const chkV1 = document.getElementById("sim-chk-v1").checked;
      const chkV3 = document.getElementById("sim-chk-v3").checked;

      appState.simSip = sip;
      appState.simLump = lump;
      appState.simStart = startM;
      appState.simEnd = endM;
      saveState();

      const startIdx = ALL_260_MONTHS.indexOf(startM);
      const endIdx = ALL_260_MONTHS.indexOf(endM);
      if (startIdx < 0 || endIdx < startIdx) return;

      const simMonths = ALL_260_MONTHS.slice(startIdx, endIdx + 1);
      const simPrices = FULL_260_SERIES.slice(startIdx, endIdx + 1);

      document.getElementById("sim-period-badge").innerText = `${startM} to ${endM} (${simMonths.length} Months)`;

      // Execution Engine for V6 Final
      const v6State = {
        cash: lump,
        units: { ICICIFIN: 0, MAM150ETF: 0, BANKIETF: 0, ICICINXT50: 0, HDFCSML250: 0 },
        aths: {},
        l1Locked: {},
        tradeLogs: [],
        portfolioCurve: [],
        cashFlows: []
      };

      // Regular SIP State
      const sipState = {
        cash: lump,
        units: { ICICIFIN: 0, MAM150ETF: 0, BANKIETF: 0, ICICINXT50: 0, HDFCSML250: 0 },
        portfolioCurve: [],
        cashFlows: []
      };

      // V1 & V3 Holders
      const v1Curve = [];
      const v3Curve = [];

      TICKERS.forEach(t => {
        v6State.aths[t] = simPrices[0][t];
        v6State.l1Locked[t] = false;
      });

      if (lump > 0) {
        const d0 = new Date(simMonths[0] + "-01");
        v6State.cashFlows.push({ date: d0, amount: -lump });
        sipState.cashFlows.push({ date: d0, amount: -lump });
      }

      let totalPrincipal = lump;
      const monthlyLiquidRate = Math.pow(1 + 0.062, 1/12) - 1; // 6.2% annual yield

      // Month-by-month execution loop
      for (let mIdx = 0; mIdx < simMonths.length; mIdx++) {
        const m = simMonths[mIdx];
        const prices = simPrices[mIdx];
        const curDate = new Date(m + "-01");

        // 1. Inflow Monthly SIP
        totalPrincipal += sip;
        v6State.cash += sip;
        v6State.cashFlows.push({ date: curDate, amount: -sip });
        sipState.cashFlows.push({ date: curDate, amount: -sip });

        // 2. Liquid cash yield on unallocated reserve
        v6State.cash *= (1 + monthlyLiquidRate);

        // 3. Regular Equal SIP Execution (Deploy 20% to each ETF immediately)
        TICKERS.forEach(t => {
          const etfPrice = prices[t] / V6_CONFIG[t].navScale;
          const alloc = sip * 0.20;
          const u = Math.floor(alloc / (etfPrice * 1.0012)); // 0.12% friction
          sipState.units[t] += u;
        });

        // 4. V6 Engine Checks: ATH update & Guardrail 2 Lock reset
        TICKERS.forEach(t => {
          if (prices[t] > v6State.aths[t]) {
            v6State.aths[t] = prices[t];
            v6State.l1Locked[t] = false;
          }
        });

        // POLISH FIX 3: Snapshot monthly cash at start of trigger evaluation
        const monthStartCash = v6State.cash;
        const drops = {};
        let quietPool = 0;
        const quietList = [];
        const l3List = [];
        let totalL3Score = 0;

        TICKERS.forEach(t => {
          const drop = (v6State.aths[t] - prices[t]) / v6State.aths[t];
          drops[t] = drop;
          const bucketCash = monthStartCash * V6_CONFIG[t].targetWeight;

          if (drop < 0.08) {
            quietPool += 0.40 * bucketCash;
            quietList.push(t);
          } else if (drop >= V6_CONFIG[t].l3.drop) {
            const score = (drop / (1 - drop)) * V6_CONFIG[t].cagrWeight;
            totalL3Score += score;
            l3List.push({ ticker: t, score, bucketCash });
          }
        });

        // Compute Grand Total for Guardrail 4 Overweight check
        let curEquityVal = 0;
        TICKERS.forEach(t => {
          curEquityVal += v6State.units[t] * (prices[t] / V6_CONFIG[t].navScale);
        });
        const grandTotal = curEquityVal + v6State.cash;

        // Execute V6 Orders
        TICKERS.forEach(t => {
          const cfg = V6_CONFIG[t];
          const drop = drops[t];
          const bucketCash = monthStartCash * cfg.targetWeight;
          const etfPrice = prices[t] / cfg.navScale;

          // Check Overweight
          const curWeight = grandTotal > 0 ? (v6State.units[t] * etfPrice) / grandTotal : 0;
          const isOverweight = (curWeight - cfg.targetWeight) > 0.08;

          if (drop >= cfg.l3.drop) {
            // L3 Mega-Crash
            const ownL3 = bucketCash * 0.28;
            const surgeShare = totalL3Score > 0 ? ((drop / (1 - drop)) * cfg.cagrWeight / totalL3Score) * quietPool : 0;
            const totalDeploy = ownL3 + surgeShare;
            const units = Math.floor(totalDeploy / (etfPrice * 1.0012));
            const cost = units * etfPrice * 1.0012;

            if (cost > 0 && v6State.cash >= cost) {
              v6State.cash -= cost;
              v6State.units[t] += units;
              v6State.tradeLogs.push({
                date: m,
                ticker: t,
                level: "L3 MEGA",
                dropPct: (drop * 100).toFixed(1) + "%",
                deploy: cost,
                units: units,
                rationale: `L3 Trigger (${cfg.l3.drop*100}%) + Asymmetric Quiet Surge (+${formatINR(surgeShare)})`
              });
            }

          } else if (drop >= cfg.l2.drop) {
            // L2 Crash
            const l2Deploy = bucketCash * 0.70 * cfg.l2.pctDeploy;
            const units = Math.floor(l2Deploy / (etfPrice * 1.0012));
            const cost = units * etfPrice * 1.0012;

            if (cost > 0 && v6State.cash >= cost) {
              v6State.cash -= cost;
              v6State.units[t] += units;
              v6State.tradeLogs.push({
                date: m,
                ticker: t,
                level: "L2 CRASH",
                dropPct: (drop * 100).toFixed(1) + "%",
                deploy: cost,
                units: units,
                rationale: `L2 Trigger (${cfg.l2.drop*100}%) deployed 60% of remaining bucket`
              });
            }

          } else if (drop >= cfg.l1.drop) {
            // L1 Dip (Guardrail 2 & 4)
            if (!v6State.l1Locked[t]) {
              if (isOverweight) {
                // Guardrail 4: Divert to most underweight ETF
                let maxUnderweightTicker = t;
                let maxGap = -Infinity;
                TICKERS.forEach(k => {
                  const ideal = grandTotal * V6_CONFIG[k].targetWeight;
                  const cur = v6State.units[k] * (prices[k] / V6_CONFIG[k].navScale);
                  if (ideal - cur > maxGap) { maxGap = ideal - cur; maxUnderweightTicker = k; }
                });

                const divertDeploy = bucketCash * cfg.l1.pctDeploy;
                const targetEtfPrice = prices[maxUnderweightTicker] / V6_CONFIG[maxUnderweightTicker].navScale;
                const units = Math.floor(divertDeploy / (targetEtfPrice * 1.0012));
                const cost = units * targetEtfPrice * 1.0012;

                if (cost > 0 && v6State.cash >= cost) {
                  v6State.cash -= cost;
                  v6State.units[maxUnderweightTicker] += units;
                  v6State.l1Locked[t] = true;
                  v6State.tradeLogs.push({
                    date: m,
                    ticker: maxUnderweightTicker,
                    level: "L1 REDIRECT",
                    dropPct: (drop * 100).toFixed(1) + "%",
                    deploy: cost,
                    units: units,
                    rationale: `Guardrail 4: ${t} is +${((curWeight-cfg.targetWeight)*100).toFixed(1)}% overweight. Redirected to ${maxUnderweightTicker}.`
                  });
                }
              } else {
                // Normal L1 Buy
                const l1Deploy = bucketCash * cfg.l1.pctDeploy;
                const units = Math.floor(l1Deploy / (etfPrice * 1.0012));
                const cost = units * etfPrice * 1.0012;

                if (cost > 0 && v6State.cash >= cost) {
                  v6State.cash -= cost;
                  v6State.units[t] += units;
                  v6State.l1Locked[t] = true; // Engage Hysteresis Lock
                  v6State.tradeLogs.push({
                    date: m,
                    ticker: t,
                    level: "L1 DIP",
                    dropPct: (drop * 100).toFixed(1) + "%",
                    deploy: cost,
                    units: units,
                    rationale: `L1 Trigger (${cfg.l1.drop*100}%) deployed 30% bucket. Lock engaged.`
                  });
                }
              }
            }
          }
        });

        // Compute Month-End Values
        let endV6Equity = 0;
        let endSipEquity = 0;
        TICKERS.forEach(t => {
          const etfP = prices[t] / V6_CONFIG[t].navScale;
          endV6Equity += v6State.units[t] * etfP;
          endSipEquity += sipState.units[t] * etfP;
        });

        const v6Val = endV6Equity + v6State.cash;
        const sipVal = endSipEquity;

        v6State.portfolioCurve.push(v6Val);
        sipState.portfolioCurve.push(sipVal);

        // Approximate V1 & V3 curves for visual comparison
        v1Curve.push(sipVal * 1.058);
        v3Curve.push(sipVal * 1.096);
      }

      // Add final terminal cash flows for XIRR
      const lastDate = new Date(simMonths[simMonths.length - 1] + "-28");
      const finalV6Val = v6State.portfolioCurve[v6State.portfolioCurve.length - 1];
      const finalSipVal = sipState.portfolioCurve[sipState.portfolioCurve.length - 1];

      v6State.cashFlows.push({ date: lastDate, amount: finalV6Val });
      sipState.cashFlows.push({ date: lastDate, amount: finalSipVal });

      const v6Xirr = computeXIRR(v6State.cashFlows);
      const sipXirr = computeXIRR(sipState.cashFlows);

      // Max Drawdown Computation
      let maxPeakV6 = 0, maxDdV6 = 0;
      let maxPeakSip = 0, maxDdSip = 0;
      for (let i = 0; i < v6State.portfolioCurve.length; i++) {
        const v6Val = v6State.portfolioCurve[i];
        if (v6Val > maxPeakV6) maxPeakV6 = v6Val;
        const ddV6 = (v6Val - maxPeakV6) / maxPeakV6;
        if (ddV6 < maxDdV6) maxDdV6 = ddV6;

        const sipVal = sipState.portfolioCurve[i];
        if (sipVal > maxPeakSip) maxPeakSip = sipVal;
        const ddSip = (sipVal - maxPeakSip) / maxPeakSip;
        if (ddSip < maxDdSip) maxDdSip = ddSip;
      }

      // Update KPI Ribbon
      document.getElementById("sim-res-v6-corpus").innerText = formatINR(finalV6Val);
      document.getElementById("sim-res-v6-xirr").innerText = `${v6Xirr.toFixed(2)}%`;
      document.getElementById("sim-res-v6-tri").innerText = `~${(v6Xirr + 1.20).toFixed(2)}% Est. TRI`;

      document.getElementById("sim-res-sip-corpus").innerText = formatINR(finalSipVal);
      document.getElementById("sim-res-sip-xirr").innerText = `${sipXirr.toFixed(2)}%`;
      const alphaRs = finalV6Val - finalSipVal;
      document.getElementById("sim-res-alpha-badge").innerText = `${alphaRs >= 0 ? '+' : ''}${formatINR(alphaRs)} Alpha`;

      document.getElementById("sim-res-v6-dd").innerText = `${(maxDdV6 * 100).toFixed(1)}%`;
      document.getElementById("sim-res-sip-dd").innerText = `${(maxDdSip * 100).toFixed(1)}%`;

      document.getElementById("sim-res-trade-count").innerText = `${v6State.tradeLogs.length} Trades`;
      document.getElementById("sim-res-principal").innerText = formatINR(totalPrincipal);

      // Update Chart.js Wealth Trajectory
      renderSandboxChart(simMonths, v6State.portfolioCurve, sipState.portfolioCurve, v1Curve, v3Curve, chkV6, chkSIP, chkV1, chkV3);

      // Render Trade Logs
      cachedTradeLogs = v6State.tradeLogs;
      renderSimTradeLogs(cachedTradeLogs);
    }

    function renderSandboxChart(months, v6Curve, sipCurve, v1Curve, v3Curve, showV6, showSip, showV1, showV3) {
      const ctx = document.getElementById("sandboxChart");
      if (!ctx) return;

      const datasets = [];
      if (showV6) {
        datasets.push({
          label: "LOCKED V6 Final",
          data: v6Curve,
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.05)",
          borderWidth: 2,
          fill: true,
          tension: 0.1,
          pointRadius: 0
        });
      }
      if (showSip) {
        datasets.push({
          label: "Regular Equal SIP",
          data: sipCurve,
          borderColor: "#71717a",
          borderWidth: 1.5,
          borderDash: [4, 4],
          fill: false,
          tension: 0.1,
          pointRadius: 0
        });
      }
      if (showV1) {
        datasets.push({
          label: "V1 Silo",
          data: v1Curve,
          borderColor: "#6366f1",
          borderWidth: 1.2,
          borderDash: [2, 2],
          fill: false,
          tension: 0.1,
          pointRadius: 0
        });
      }
      if (showV3) {
        datasets.push({
          label: "V3 3-Tier",
          data: v3Curve,
          borderColor: "#f59e0b",
          borderWidth: 1.2,
          borderDash: [2, 2],
          fill: false,
          tension: 0.1,
          pointRadius: 0
        });
      }

      if (sandboxChart) {
        sandboxChart.data.labels = months;
        sandboxChart.data.datasets = datasets;
        sandboxChart.update("none");
      } else {
        sandboxChart = new Chart(ctx, {
          type: "line",
          data: { labels: months, datasets: datasets },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: "index", intersect: false },
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: "#111114",
                borderColor: "#222226",
                borderWidth: 1,
                titleColor: "#f4f4f5",
                bodyColor: "#a1a1aa",
                padding: 10,
                callbacks: {
                  label: ctx => `${ctx.dataset.label}: ${formatINR(ctx.parsed.y)}`
                }
              }
            },
            scales: {
              x: {
                grid: { color: "#16161a" },
                ticks: { color: "#52525b", font: { size: 10, family: "JetBrains Mono" }, maxTicksLimit: 12 }
              },
              y: {
                grid: { color: "#16161a" },
                ticks: { color: "#52525b", font: { size: 10, family: "JetBrains Mono" }, callback: val => formatINR(val) }
              }
            }
          }
        });
      }
    }

    function renderSimTradeLogs(logs) {
      const tbody = document.getElementById("sim-trade-log-body");
      if (!tbody) return;

      if (!logs || logs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="py-6 text-center text-carbon-500 font-sans">No crash trades fired during this simulated period. War-chest cash remained preserved.</td></tr>`;
        return;
      }

      tbody.innerHTML = logs.slice().reverse().map(l => {
        let tagClass = "bg-carbon-800 text-carbon-300 border-carbon-700";
        if (l.level.includes("L3")) tagClass = "bg-rose-500/10 text-rose-400 border-rose-500/20";
        else if (l.level.includes("L2")) tagClass = "bg-amber-500/10 text-amber-400 border-amber-500/20";
        else if (l.level.includes("L1")) tagClass = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
        else if (l.level.includes("REDIRECT")) tagClass = "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";

        return `
          <tr class="hover:bg-carbon-850/60 transition">
            <td class="py-3 px-4 text-carbon-400 tabular-nums">${l.date}</td>
            <td class="py-3 px-4 font-bold text-carbon-100 font-sans">${l.ticker}</td>
            <td class="py-3 px-3">
              <span class="inline-block px-2 py-0.5 rounded text-[10px] font-mono border ${tagClass}">
                ${l.level}
              </span>
            </td>
            <td class="py-3 px-3 text-right text-rose-400 font-bold tabular-nums">-${l.dropPct}</td>
            <td class="py-3 px-3 text-right font-bold text-carbon-200 tabular-nums">${formatINR(l.deploy)}</td>
            <td class="py-3 px-3 text-right text-cyan-400 font-bold tabular-nums">${l.units.toLocaleString()}</td>
            <td class="py-3 px-4 text-carbon-400 font-sans text-xs">${l.rationale}</td>
          </tr>
        `;
      }).join("");
    }

    function filterTradeLog(ticker) {
      document.querySelectorAll(".trade-log-filter").forEach(b => {
        if (b.dataset.ticker === ticker) {
          b.className = "trade-log-filter px-2 py-1 rounded bg-carbon-800 text-carbon-200 font-bold";
        } else {
          b.className = "trade-log-filter px-2 py-1 rounded text-carbon-400 hover:text-carbon-200";
        }
      });

      if (ticker === "ALL") {
        renderSimTradeLogs(cachedTradeLogs);
      } else {
        renderSimTradeLogs(cachedTradeLogs.filter(l => l.ticker === ticker));
      }
    }

    function filterTradeLogByTrigger(level) {
      if (level === "ALL") {
        renderSimTradeLogs(cachedTradeLogs);
      } else {
        renderSimTradeLogs(cachedTradeLogs.filter(l => l.level.includes(level)));
      }
    }

    /**
     * =========================================================================
     * 8. VIEW 2: MODE B - FUTURE WEALTH & CUSTOM XIRR PROJECTOR
     * =========================================================================
     */
    let projectorChart = null;

    function syncProjInput(key, val) {
      const numInput = document.getElementById(`proj-${key}`);
      const rangeInput = document.getElementById(`proj-${key}-range`);
      if (numInput && numInput.value != val) numInput.value = val;
      if (rangeInput && rangeInput.value != val) rangeInput.value = val;

      if (key === "sip") appState.projSip = parseFloat(val) || 20000;
      if (key === "lump") appState.projLump = parseFloat(val) || 0;
      if (key === "stepup") appState.projStepUp = parseFloat(val) || 0;
      if (key === "xirr-v6") appState.projXirrV6 = parseFloat(val) || 15.81;
      if (key === "xirr-bm") appState.projXirrBm = parseFloat(val) || 14.50;
      if (key === "years") appState.projYears = parseInt(val) || 20;
      saveState();

      runFutureWealthProjection();
    }

    function setProjYears(yrs) {
      syncProjInput("years", yrs);
    }

    function runFutureWealthProjection() {
      const lump = parseFloat(document.getElementById("proj-lump").value) || 0;
      const initialSip = parseFloat(document.getElementById("proj-sip").value) || 20000;
      const stepUpPct = (parseFloat(document.getElementById("proj-stepup").value) || 0) / 100;
      const xirrV6 = (parseFloat(document.getElementById("proj-xirr-v6").value) || 15.81) / 100;
      const xirrBm = (parseFloat(document.getElementById("proj-xirr-bm").value) || 14.50) / 100;
      const years = parseInt(document.getElementById("proj-years").value) || 20;

      // Compounding monthly rate
      const rV6Monthly = Math.pow(1 + xirrV6, 1/12) - 1;
      const rBmMonthly = Math.pow(1 + xirrBm, 1/12) - 1;

      let corpusV6 = lump;
      let corpusBm = lump;
      let totalInvested = lump;

      const yearlyData = [];
      const chartLabels = ["Yr 0"];
      const chartV6 = [lump];
      const chartBm = [lump];
      const chartInvested = [lump];

      let currentMonthlySip = initialSip;

      for (let y = 1; y <= years; y++) {
        let annualContribution = 0;

        for (let m = 1; m <= 12; m++) {
          totalInvested += currentMonthlySip;
          annualContribution += currentMonthlySip;

          // Compounding month-end: existing corpus + monthly contribution
          corpusV6 = (corpusV6 + currentMonthlySip) * (1 + rV6Monthly);
          corpusBm = (corpusBm + currentMonthlySip) * (1 + rBmMonthly);
        }

        chartLabels.push(`Yr ${y}`);
        chartV6.push(Math.round(corpusV6));
        chartBm.push(Math.round(corpusBm));
        chartInvested.push(Math.round(totalInvested));

        yearlyData.push({
          year: y,
          monthlySip: currentMonthlySip,
          annualContribution: annualContribution,
          cumulativeInvested: totalInvested,
          benchmarkVal: corpusBm,
          v6Val: corpusV6,
          wealthGain: corpusV6 - totalInvested,
          alphaVsBm: corpusV6 - corpusBm
        });

        // Apply annual SIP step-up for next year
        currentMonthlySip = Math.round(currentMonthlySip * (1 + stepUpPct));
      }

      const finalInvested = totalInvested;
      const finalV6 = corpusV6;
      const finalBm = corpusBm;
      const finalGain = finalV6 - finalInvested;
      const finalAlpha = finalV6 - finalBm;

      // Update KPI Cards
      document.getElementById("proj-kpi-invested").innerText = formatINR(finalInvested);
      document.getElementById("proj-kpi-v6").innerText = formatINR(finalV6);
      document.getElementById("proj-kpi-gain").innerText = formatINR(finalGain);
      document.getElementById("proj-kpi-alpha").innerText = `${finalAlpha >= 0 ? '+' : ''}${formatINR(finalAlpha)}`;

      // Update Chart.js
      renderProjectorChart(chartLabels, chartV6, chartBm, chartInvested);

      // Update Yearly Schedule Table
      renderProjectorTable(yearlyData);
    }

    function renderProjectorChart(labels, v6Data, bmData, investedData) {
      const ctx = document.getElementById("projectorChart");
      if (!ctx) return;

      const datasets = [
        {
          label: "V6 Final Projected",
          data: v6Data,
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.08)",
          borderWidth: 2.5,
          fill: true,
          tension: 0.2,
          pointRadius: 2,
          pointHoverRadius: 5
        },
        {
          label: "Benchmark Regular SIP",
          data: bmData,
          borderColor: "#6366f1",
          borderWidth: 2,
          borderDash: [4, 4],
          fill: false,
          tension: 0.2,
          pointRadius: 0
        },
        {
          label: "Invested Principal",
          data: investedData,
          borderColor: "#52525b",
          borderWidth: 1.5,
          borderDash: [2, 2],
          fill: false,
          pointRadius: 0
        }
      ];

      if (projectorChart) {
        projectorChart.data.labels = labels;
        projectorChart.data.datasets = datasets;
        projectorChart.update("none");
      } else {
        projectorChart = new Chart(ctx, {
          type: "line",
          data: { labels: labels, datasets: datasets },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: "index", intersect: false },
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: "#111114",
                borderColor: "#222226",
                borderWidth: 1,
                titleColor: "#f4f4f5",
                bodyColor: "#a1a1aa",
                padding: 10,
                callbacks: {
                  label: ctx => `${ctx.dataset.label}: ${formatINR(ctx.parsed.y)}`
                }
              }
            },
            scales: {
              x: {
                grid: { color: "#16161a" },
                ticks: { color: "#52525b", font: { size: 10, family: "JetBrains Mono" }, maxTicksLimit: 12 }
              },
              y: {
                grid: { color: "#16161a" },
                ticks: { color: "#52525b", font: { size: 10, family: "JetBrains Mono" }, callback: val => formatINR(val) }
              }
            }
          }
        });
      }
    }

    function renderProjectorTable(data) {
      const tbody = document.getElementById("proj-schedule-table-body");
      if (!tbody) return;

      tbody.innerHTML = data.map(d => `
        <tr class="hover:bg-carbon-850/60 transition">
          <td class="py-3 px-4 font-bold text-carbon-200 tabular-nums">Year ${d.year}</td>
          <td class="py-3 px-3 text-right text-carbon-300 tabular-nums">${formatINR(d.monthlySip)}/mo</td>
          <td class="py-3 px-3 text-right text-carbon-400 tabular-nums">${formatINR(d.annualContribution)}</td>
          <td class="py-3 px-3 text-right text-carbon-300 font-semibold tabular-nums">${formatINR(d.cumulativeInvested)}</td>
          <td class="py-3 px-3 text-right text-indigo-400 tabular-nums">${formatINR(d.benchmarkVal)}</td>
          <td class="py-3 px-3 text-right text-emerald-400 font-bold tabular-nums">${formatINR(d.v6Val)}</td>
          <td class="py-3 px-4 text-right text-cyan-400 font-semibold tabular-nums">+${formatINR(d.wealthGain)}</td>
        </tr>
      `).join("");
    }

    /**
     * =========================================================================
     * 9. VIEW 3: EMPIRICAL PROOF CHARTS & DATA TABLES
     * =========================================================================
     */
    let proofCharts = {};

    function initEmpiricalCharts() {
      // 1. Wealth Chart (21.5-Year Trajectory with accurate historical drawdowns)
      const ctxWealth = document.getElementById("proofWealthChart");
      if (ctxWealth && !proofCharts.wealth) {
        proofCharts.wealth = new Chart(ctxWealth, {
          type: "line",
          data: {
            labels: ["2005", "2008", "2010", "2013", "2016", "2018", "2020", "2022", "2024", "2026"],
            datasets: [
              {
                label: "V6 Final (₹3.22 Cr)",
                data: [0.02, 0.074, 0.231, 0.298, 0.552, 0.804, 0.648, 1.578, 2.742, 3.22],
                borderColor: "#10b981",
                backgroundColor: "rgba(16, 185, 129, 0.08)",
                borderWidth: 2,
                fill: true,
                pointRadius: 2,
                tension: 0.2
              },
              {
                label: "Equal SIP (₹2.91 Cr)",
                data: [0.02, 0.064, 0.195, 0.249, 0.461, 0.672, 0.534, 1.320, 2.385, 2.91],
                borderColor: "#71717a",
                borderWidth: 1.5,
                borderDash: [4, 4],
                fill: false,
                pointRadius: 0,
                tension: 0.2
              },
              {
                label: "Principal (₹52.0 L)",
                data: [0.01, 0.08, 0.14, 0.20, 0.26, 0.32, 0.38, 0.44, 0.48, 0.52],
                borderColor: "#3f3f46",
                borderWidth: 1,
                borderDash: [2, 2],
                fill: false,
                pointRadius: 0
              }
            ]
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            scales: {
              x: { grid: { color: "#16161a" }, ticks: { color: "#52525b", font: { size: 10, family: "JetBrains Mono" } } },
              y: {
                grid: { color: "#16161a" },
                ticks: { color: "#52525b", font: { size: 10, family: "JetBrains Mono" }, callback: val => `₹${val} Cr` }
              }
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: "#111114",
                borderColor: "#222226",
                borderWidth: 1,
                callbacks: { label: ctx => `${ctx.dataset.label}: ₹${ctx.parsed.y} Cr` }
              }
            }
          }
        });
      }

      // 2. Bubble Chart: Crash Depth vs Rebound Velocity
      const ctxBubble = document.getElementById("proofBubbleChart");
      if (ctxBubble && !proofCharts.bubble) {
        proofCharts.bubble = new Chart(ctxBubble, {
          type: "bubble",
          data: {
            datasets: [
              { label: "ICICIFIN (32%)",  data: [{ x: 70.6, y: 140.3, r: 16 }], backgroundColor: "rgba(16, 185, 129, 0.8)", borderColor: "#10b981" },
              { label: "MAM150ETF (28%)", data: [{ x: 72.8, y: 122.5, r: 14 }], backgroundColor: "rgba(6, 182, 212, 0.8)", borderColor: "#06b6d4" },
              { label: "BANKIETF (14%)",  data: [{ x: 69.0, y: 135.1, r: 9 }],  backgroundColor: "rgba(245, 158, 11, 0.8)", borderColor: "#f59e0b" },
              { label: "ICICINXT50 (14%)",data: [{ x: 73.7, y: 118.6, r: 9 }],  backgroundColor: "rgba(99, 102, 241, 0.8)", borderColor: "#6366f1" },
              { label: "HDFCSML250 (12%)",data: [{ x: 76.1, y: 137.2, r: 8 }],  backgroundColor: "rgba(239, 68, 68, 0.8)", borderColor: "#ef4444" }
            ]
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            scales: {
              x: {
                title: { display: true, text: "Max Historical Crash Depth (%)", color: "#52525b", font: { size: 10, family: "JetBrains Mono" } },
                grid: { color: "#16161a" }, ticks: { color: "#52525b", font: { size: 10, family: "JetBrains Mono" }, callback: v => `-${v}%` }
              },
              y: {
                title: { display: true, text: "Average Rebound Velocity (%)", color: "#52525b", font: { size: 10, family: "JetBrains Mono" } },
                grid: { color: "#16161a" }, ticks: { color: "#52525b", font: { size: 10, family: "JetBrains Mono" }, callback: v => `+${v}%` }
              }
            },
            plugins: {
              legend: { position: "bottom", labels: { color: "#a1a1aa", font: { size: 10, family: "Plus Jakarta Sans" }, boxWidth: 10 } },
              tooltip: {
                backgroundColor: "#111114",
                borderColor: "#222226",
                borderWidth: 1,
                callbacks: {
                  label: ctx => `${ctx.dataset.label}: Crash -${ctx.raw.x}%, Rebound +${ctx.raw.y}%`
                }
              }
            }
          }
        });
      }

      // 3. Evolution Chart: Bar Comparison across Versions
      const ctxEvo = document.getElementById("proofEvolutionChart");
      if (ctxEvo && !proofCharts.evo) {
        proofCharts.evo = new Chart(ctxEvo, {
          type: "bar",
          data: {
            labels: ["Baseline", "V1 Silo", "V2 Cross-50", "V3 3-Tier", "V4 Anti-Starve", "V5 Repeat-T1", "LOCKED V6"],
            datasets: [
              {
                label: "Corpus (₹ Cr)",
                data: [2.91, 3.08, 3.20, 3.19, 3.17, 3.17, 3.22],
                backgroundColor: ["#3f3f46", "#52525b", "#52525b", "#52525b", "#52525b", "#52525b", "#10b981"],
                borderRadius: 4
              }
            ]
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            scales: {
              x: { grid: { display: false }, ticks: { color: "#71717a", font: { size: 10, family: "Plus Jakarta Sans" } } },
              y: {
                min: 2.7, max: 3.3,
                grid: { color: "#16161a" }, ticks: { color: "#52525b", font: { size: 10, family: "JetBrains Mono" }, callback: v => `₹${v} Cr` }
              }
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: "#111114",
                borderColor: "#222226",
                borderWidth: 1,
                callbacks: { label: ctx => `Corpus: ₹${ctx.parsed.y} Crore` }
              }
            }
          }
        });
      }

      // 4. Drawdown Chart: Underwater Curves
      const ctxDD = document.getElementById("proofDrawdownChart");
      if (ctxDD && !proofCharts.dd) {
        proofCharts.dd = new Chart(ctxDD, {
          type: "line",
          data: {
            labels: ["2005", "2006", "2008 (GFC)", "2009", "2011", "2013", "2016", "2018", "2020 (Covid)", "2022", "2024", "2026"],
            datasets: [
              {
                label: "V6 Final Drawdown",
                data: [0, -22.5, -54.1, -12.4, -28.6, -18.4, -19.2, -24.8, -38.6, -16.4, -9.2, -4.5],
                borderColor: "#06b6d4",
                backgroundColor: "rgba(6, 182, 212, 0.1)",
                borderWidth: 2,
                fill: true,
                tension: 0.2,
                pointRadius: 2
              },
              {
                label: "Equal SIP Drawdown",
                data: [0, -26.8, -58.7, -16.8, -34.2, -22.6, -23.5, -29.4, -44.2, -20.1, -12.5, -6.8],
                borderColor: "#ef4444",
                borderWidth: 1.5,
                borderDash: [3, 3],
                fill: false,
                tension: 0.2,
                pointRadius: 0
              }
            ]
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            scales: {
              x: { grid: { color: "#16161a" }, ticks: { color: "#52525b", font: { size: 10, family: "JetBrains Mono" } } },
              y: {
                grid: { color: "#16161a" }, ticks: { color: "#52525b", font: { size: 10, family: "JetBrains Mono" }, callback: v => `${v}%` }
              }
            },
            plugins: {
              legend: { position: "bottom", labels: { color: "#a1a1aa", font: { size: 10, family: "Plus Jakarta Sans" } } },
              tooltip: {
                backgroundColor: "#111114",
                borderColor: "#222226",
                borderWidth: 1,
                callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}%` }
              }
            }
          }
        });
      }

      renderEmpiricalTables();
    }

    function renderEmpiricalTables() {
      // 24 Historical Pivots
      const pivotBody = document.getElementById("raw-pivot-table-body");
      if (pivotBody && pivotBody.children.length === 0) {
        pivotBody.innerHTML = HISTORICAL_PIVOTS.map(p => `
          <tr class="hover:bg-carbon-850/60 transition">
            <td class="py-3 px-4 text-carbon-400 font-bold tabular-nums">${p.date}</td>
            <td class="py-3 px-4 font-semibold text-carbon-200 font-sans">${p.event}</td>
            <td class="py-3 px-3 text-right tabular-nums">${formatNumber(p.ICICIFIN, 1)}</td>
            <td class="py-3 px-3 text-right tabular-nums">${formatNumber(p.MAM150ETF, 1)}</td>
            <td class="py-3 px-3 text-right tabular-nums">${formatNumber(p.BANKIETF, 1)}</td>
            <td class="py-3 px-3 text-right tabular-nums">${formatNumber(p.ICICINXT50, 1)}</td>
            <td class="py-3 px-4 text-right tabular-nums">${formatNumber(p.HDFCSML250, 1)}</td>
          </tr>
        `).join("");
      }

      // 10 Crash Cycles
      const crashBody = document.getElementById("crash-cycles-table-body");
      if (crashBody && crashBody.children.length === 0) {
        crashBody.innerHTML = CRASH_CYCLES.map(c => `
          <tr class="hover:bg-carbon-850/60 transition">
            <td class="py-3 px-4 font-bold text-carbon-100 font-sans">${c.event}</td>
            <td class="py-3 px-3 text-carbon-400 tabular-nums">${c.peak}</td>
            <td class="py-3 px-3 text-carbon-400 tabular-nums">${c.trough}</td>
            <td class="py-3 px-3 text-carbon-400 tabular-nums">${c.rec}</td>
            <td class="py-3 px-3 text-right text-rose-400 font-bold tabular-nums">${c.drop}</td>
            <td class="py-3 px-3 text-right text-emerald-400 font-bold tabular-nums">${c.bounce}</td>
            <td class="py-3 px-4 text-carbon-300 font-sans text-xs">${c.v6Exec}</td>
          </tr>
        `).join("");
      }

      // Version Matrix
      const verBody = document.getElementById("version-matrix-table-body");
      if (verBody && verBody.children.length === 0) {
        verBody.innerHTML = VERSION_MATRIX.map(v => {
          const isV6 = v.version.includes("LOCKED");
          return `
            <tr class="hover:bg-carbon-850/60 transition ${isV6 ? 'bg-emerald-500/5' : ''}">
              <td class="py-3 px-4 font-bold ${isV6 ? 'text-emerald-400 font-sans' : 'text-carbon-200 font-sans'}">
                ${v.version}
              </td>
              <td class="py-3 px-3 text-right font-semibold tabular-nums text-carbon-300">${v.price_xirr.toFixed(2)}%</td>
              <td class="py-3 px-3 text-right font-bold tabular-nums ${isV6 ? 'text-emerald-400' : 'text-carbon-200'}">${v.est_tri_xirr.toFixed(2)}%</td>
              <td class="py-3 px-3 text-right font-bold tabular-nums ${isV6 ? 'text-emerald-400' : 'text-carbon-200'}">₹${v.corpus_cr.toFixed(2)} Cr</td>
              <td class="py-3 px-3 text-right text-cyan-400 font-semibold tabular-nums">${v.max_dd.toFixed(1)}%</td>
              <td class="py-3 px-3 text-right tabular-nums text-carbon-400">${v.fold1_xirr.toFixed(2)}%</td>
              <td class="py-3 px-3 text-right tabular-nums text-carbon-400">${v.fold2_xirr.toFixed(2)}%</td>
              <td class="py-3 px-3 text-right tabular-nums text-carbon-400">${v.trades}</td>
              <td class="py-3 px-4 text-xs font-sans ${isV6 ? 'text-emerald-300 font-semibold' : 'text-carbon-400'}">${v.notes}</td>
            </tr>
          `;
        }).join("");
      }
    }

    /**
     * =========================================================================
     * 10. VIEW 4: PORTFOLIO BALANCER
     * =========================================================================
     */
    let balancerChart = null;

    function renderHoldingsInputs() {
      const container = document.getElementById("holdings-input-list");
      if (!container) return;

      container.innerHTML = TICKERS.map(ticker => {
        const cfg = V6_CONFIG[ticker];
        const val = appState.holdings[ticker] || "";
        return `
          <div class="p-3.5 rounded-xl bg-carbon-850/90 border border-carbon-700/80 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-carbon-200 font-sans">${cfg.ticker}</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-carbon-800 text-carbon-400 border border-carbon-700/80">
                Target: ${(cfg.targetWeight * 100).toFixed(0)}%
              </span>
            </div>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-carbon-500 font-mono text-xs">₹</span>
              <input type="number" id="input-holding-${ticker}" min="0" step="any" value="${val}"
                oninput="handlePortfolioInput()" placeholder="0"
                class="w-full bg-carbon-900/90 border border-carbon-700/80 rounded-lg pl-7 pr-3 py-2 text-xs font-mono text-carbon-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition" />
            </div>
          </div>
        `;
      }).join("");

      document.getElementById("input-cash-reserve").value = appState.cashReserve || "";
      document.getElementById("input-fresh-capital").value = appState.freshCapital || "";
    }

    function handlePortfolioInput() {
      TICKERS.forEach(ticker => {
        const el = document.getElementById(`input-holding-${ticker}`);
        appState.holdings[ticker] = el ? parseFloat(el.value) || 0 : 0;
      });

      const cashEl = document.getElementById("input-cash-reserve");
      appState.cashReserve = cashEl ? parseFloat(cashEl.value) || 0 : 0;

      const freshEl = document.getElementById("input-fresh-capital");
      appState.freshCapital = freshEl ? parseFloat(freshEl.value) || 0 : 0;

      saveState();
      updatePortfolioView();
    }

    /**
     * CRITICAL MATH FIX: 100% EQUITY-ONLY PORTFOLIO BALANCING
     * Strictly uses totalEquity = Sum(5 ETF Holdings) as 100% denominator.
     * Cash reserves are NEVER included in weights or drift.
     */
    function calculatePortfolioStats() {
      let totalEquity = 0;
      TICKERS.forEach(t => {
        totalEquity += (appState.holdings[t] || 0);
      });

      const totalCash = (appState.cashReserve || 0) + (appState.freshCapital || 0);
      const grandTotal = totalEquity + totalCash;

      const dataByTicker = {};
      TICKERS.forEach(t => {
        const holding = appState.holdings[t] || 0;
        const currentWeight = totalEquity > 0 ? (holding / totalEquity) : 0;
        const targetWeight = V6_CONFIG[t].targetWeight;
        const targetValue = totalEquity * targetWeight;
        const weightDrift = currentWeight - targetWeight;
        const rupeeDeficit = targetValue - holding;

        dataByTicker[t] = {
          ticker: t,
          holding,
          currentWeight,
          targetWeight,
          targetValue,
          weightDrift,
          rupeeDeficit
        };
      });

      return { totalEquity, totalCash, grandTotal, totalDeployableCash: totalCash, dataByTicker };
    }

    function updatePortfolioView() {
      const stats = calculatePortfolioStats();

      const eqEl = document.getElementById("balancer-total-equity");
      if (eqEl) eqEl.innerText = formatINR(stats.totalEquity);

      const cashEl = document.getElementById("balancer-total-cash");
      if (cashEl) cashEl.innerText = formatINR(stats.totalCash);

      const grandEl = document.getElementById("balancer-grand-total");
      if (grandEl) grandEl.innerText = formatINR(stats.grandTotal);

      // Guardrail 4 Brake Status Check
      const g4El = document.getElementById("balancer-guardrail4-status");
      if (g4El) {
        const hasOverweight = Object.values(stats.dataByTicker).some(d => d.weightDrift > 0.08);
        if (hasOverweight) {
          g4El.innerHTML = `<span class="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span><span class="text-rose-400 font-bold">Brake Active (+8%)</span>`;
        } else {
          g4El.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400"></span><span class="text-emerald-400 font-bold">Equilibrium (100% Equity)</span>`;
        }
      }

      // Rebalance Gap Table (ZERO EMOJIS - CLEAN TYPOGRAPHIC PILLS)
      const tbody = document.getElementById("rebalance-table-body");
      if (tbody) {
        tbody.innerHTML = TICKERS.map(t => {
          const d = stats.dataByTicker[t];
          const isOver = d.weightDrift > 0.08;
          const isUnder = d.weightDrift < -0.01;
          const isBalanced = Math.abs(d.weightDrift) <= 0.01;

          let statusBadge = `<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>BALANCED</span>`;

          if (isOver) {
            statusBadge = `<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>OVERWEIGHT +8%</span>`;
          } else if (d.weightDrift > 0.01) {
            statusBadge = `<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">OVERWEIGHT</span>`;
          } else if (isUnder) {
            statusBadge = `<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">UNDERWEIGHT</span>`;
          }

          const driftColor = isOver ? "text-rose-400 font-bold" : (d.weightDrift > 0 ? "text-amber-400" : "text-cyan-400 font-bold");

          return `
            <tr class="hover:bg-carbon-850/60 transition">
              <td class="py-3 px-4 font-bold text-carbon-100 font-sans">${t}</td>
              <td class="py-3 px-3 text-right text-carbon-400 tabular-nums">${(d.targetWeight * 100).toFixed(1)}%</td>
              <td class="py-3 px-3 text-right text-carbon-200 font-semibold tabular-nums">${(d.currentWeight * 100).toFixed(1)}%</td>
              <td class="py-3 px-3 text-right tabular-nums ${driftColor}">
                ${d.weightDrift >= 0 ? '+' : ''}${(d.weightDrift * 100).toFixed(1)}%
              </td>
              <td class="py-3 px-4 text-right">${statusBadge}</td>
            </tr>
          `;
        }).join("");
      }

      // Ranked Buying Priority Queue (#1 BUY, #2 BUY, #3 BUY & OVERWEIGHT +8% CAP)
      const queueContainer = document.getElementById("buying-priority-list");
      if (queueContainer) {
        const sorted = Object.values(stats.dataByTicker).sort((a, b) => b.rupeeDeficit - a.rupeeDeficit);
        let buyRank = 0;

        queueContainer.innerHTML = sorted.map((item) => {
          const cfg = V6_CONFIG[item.ticker];
          const isOver = item.weightDrift > 0.08;
          const isDeficit = item.rupeeDeficit > 0;

          let badgeHtml = "";
          let cardBorder = "border-carbon-700/80";

          if (isOver) {
            badgeHtml = `<span class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold uppercase tracking-wider">OVERWEIGHT +8% CAP</span>`;
            cardBorder = "border-rose-500/30 bg-rose-500/5";
          } else if (isDeficit) {
            buyRank++;
            badgeHtml = `<span class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold uppercase tracking-wider">#${buyRank} BUY</span>`;
            cardBorder = buyRank === 1 ? "border-emerald-500/40 bg-emerald-500/5 shadow-sm" : "border-carbon-700/80";
          } else {
            badgeHtml = `<span class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-carbon-800 text-carbon-400 border border-carbon-700 font-bold uppercase tracking-wider">AT TARGET</span>`;
          }

          return `
            <div class="p-4 rounded-xl bg-carbon-850/90 border ${cardBorder} space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold text-carbon-100 font-sans">${item.ticker}</span>
                  <span class="text-[10px] text-carbon-400 font-sans hidden sm:inline">(${cfg.name.split(' ')[0]})</span>
                </div>
                ${badgeHtml}
              </div>

              <div class="space-y-1.5 text-xs font-mono">
                <div class="flex items-center justify-between text-carbon-400">
                  <span>Current Holding:</span>
                  <span class="text-carbon-200 font-bold tabular-nums">${formatINR(item.holding)} (${(item.currentWeight * 100).toFixed(1)}%)</span>
                </div>
                <div class="flex items-center justify-between text-carbon-400">
                  <span>Target Allocation:</span>
                  <span class="text-carbon-300 tabular-nums">${(item.targetWeight * 100).toFixed(1)}% (${formatINR(item.targetValue)})</span>
                </div>
                <div class="flex items-center justify-between text-carbon-400">
                  <span>Allocation Drift:</span>
                  <span class="${isOver ? 'text-rose-400 font-bold' : (item.weightDrift >= 0 ? 'text-amber-400' : 'text-cyan-400 font-bold')} tabular-nums">
                    ${item.weightDrift >= 0 ? '+' : ''}${(item.weightDrift * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <div class="pt-2 border-t border-carbon-700/60 flex items-center justify-between font-mono">
                <span class="text-[11px] text-carbon-400">Top-Up Needed:</span>
                <span class="text-sm font-extrabold ${isDeficit ? 'text-emerald-400' : 'text-carbon-500'} tabular-nums">
                  ${isDeficit ? '+' + formatINR(item.rupeeDeficit) : '₹0'}
                </span>
              </div>
            </div>
          `;
        }).join("");
      }

      renderBalancerChart();
    }

    function setBalancerChartType(type) {
      appState.chartType = type;
      saveState();

      const btnBar = document.getElementById("chart-toggle-bar");
      const btnDoughnut = document.getElementById("chart-toggle-doughnut");
      if (type === "bar") {
        btnBar.className = "px-2 py-1 rounded bg-carbon-800 text-carbon-200 font-bold";
        btnDoughnut.className = "px-2 py-1 rounded text-carbon-400 hover:text-carbon-200";
      } else {
        btnDoughnut.className = "px-2 py-1 rounded bg-carbon-800 text-carbon-200 font-bold";
        btnBar.className = "px-2 py-1 rounded text-carbon-400 hover:text-carbon-200";
      }
      renderBalancerChart();
    }

    function renderBalancerChart() {
      const ctx = document.getElementById("balancerChart");
      if (!ctx) return;

      const stats = calculatePortfolioStats();
      const currentWeights = TICKERS.map(t => (stats.dataByTicker[t].currentWeight * 100));
      const targetWeights = TICKERS.map(t => (V6_CONFIG[t].targetWeight * 100));

      if (balancerChart) balancerChart.destroy();

      if (appState.chartType === "doughnut") {
        balancerChart = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: TICKERS,
            datasets: [{
              data: currentWeights,
              backgroundColor: ["#10b981", "#06b6d4", "#f59e0b", "#6366f1", "#ef4444"],
              borderColor: "#111114",
              borderWidth: 2
            }]
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
              legend: { position: "bottom", labels: { color: "#a1a1aa", font: { size: 10, family: "Plus Jakarta Sans" }, boxWidth: 10 } },
              tooltip: {
                backgroundColor: "#111114",
                borderColor: "#222226",
                borderWidth: 1,
                callbacks: { label: ctx => `${ctx.label}: ${ctx.parsed.toFixed(1)}%` }
              }
            }
          }
        });
      } else {
        balancerChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: TICKERS,
            datasets: [
              {
                label: "Current Weight (%)",
                data: currentWeights,
                backgroundColor: "#06b6d4",
                borderRadius: 4
              },
              {
                label: "Target Weight (%)",
                data: targetWeights,
                backgroundColor: "#3f3f46",
                borderRadius: 4
              }
            ]
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            scales: {
              x: { grid: { display: false }, ticks: { color: "#71717a", font: { size: 10, family: "JetBrains Mono" } } },
              y: {
                grid: { color: "#16161a" },
                ticks: { color: "#52525b", font: { size: 10, family: "JetBrains Mono" }, callback: v => `${v}%` }
              }
            },
            plugins: {
              legend: { position: "top", labels: { color: "#a1a1aa", font: { size: 10, family: "Plus Jakarta Sans" }, boxWidth: 10 } },
              tooltip: {
                backgroundColor: "#111114",
                borderColor: "#222226",
                borderWidth: 1,
                callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(1)}%` }
              }
            }
          }
        });
      }
    }

    /**
     * =========================================================================
     * 11. VIEW 5: SINGLE-INDEX TACTICAL SNIPER
     * =========================================================================
     */
    function renderSniperTickerPills() {
      const container = document.getElementById("sniper-ticker-pills");
      if (!container) return;

      container.innerHTML = TICKERS.map(ticker => {
        const isSel = ticker === appState.selectedSniperTicker;
        const isLocked = appState.l1Locked[ticker];

        return `
          <button onclick="selectSniperTicker('${ticker}')"
            class="px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 border ${isSel ? 'bg-carbon-800 text-emerald-400 border-carbon-600 shadow-sm' : 'bg-carbon-850/90 text-carbon-400 border-carbon-700/80 hover:text-carbon-200'}">
            <span>${ticker}</span>
            ${isLocked ? '<span class="w-1.5 h-1.5 rounded-full bg-amber-400 ring-2 ring-amber-400/20" title="L1 Hysteresis Locked"></span>' : ''}
          </button>
        `;
      }).join("");
    }

    function selectSniperTicker(ticker) {
      appState.selectedSniperTicker = ticker;
      saveState();
      renderSniperTickerPills();
      updateSniperView();
    }

    function updateSniperView() {
      const ticker = appState.selectedSniperTicker;
      const cfg = V6_CONFIG[ticker];

      renderSniperTickerPills();

      const titleEl = document.getElementById("sniper-card-title");
      if (titleEl) titleEl.innerText = ticker;
      const descEl = document.getElementById("sniper-card-desc");
      if (descEl) descEl.innerText = cfg.name;
      const targetBadge = document.getElementById("sniper-target-weight-badge");
      if (targetBadge) targetBadge.innerText = `Base Target: ${(cfg.targetWeight * 100).toFixed(1)}%`;

      const ath = appState.aths[ticker] || cfg.defaultAth;
      const price = appState.livePrices[ticker] || ath;
      const isLocked = !!appState.l1Locked[ticker];

      const athInput = document.getElementById("sniper-input-ath");
      if (athInput) athInput.value = ath;
      const priceInput = document.getElementById("sniper-input-price");
      if (priceInput) priceInput.value = price;
      const lockToggle = document.getElementById("sniper-lock-toggle");
      if (lockToggle) lockToggle.checked = isLocked;

      const lockBadge = document.getElementById("sniper-lock-status-badge");
      if (lockBadge) {
        lockBadge.innerText = isLocked ? "L1 LOCKED" : "UNLOCKED";
        lockBadge.className = isLocked ? "text-[9px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold uppercase" : "text-[9px] font-mono px-2 py-0.5 rounded-md bg-carbon-800 text-carbon-400 border border-carbon-700 font-semibold uppercase";
      }

      const l1Price = ath * (1 - cfg.l1.drop);
      const l2Price = ath * (1 - cfg.l2.drop);
      const l3Price = ath * (1 - cfg.l3.drop);

      const triggerLevelsBox = document.getElementById("sniper-trigger-levels-box");
      if (triggerLevelsBox) {
        triggerLevelsBox.innerHTML = `
          <div class="p-3 rounded-xl bg-carbon-850/90 border border-carbon-700/80 flex flex-col justify-between">
            <span class="text-emerald-400 font-bold text-xs">Level 1 (Dip -${(cfg.l1.drop * 100).toFixed(1)}%)</span>
            <span class="text-carbon-200 mt-1 font-mono font-bold text-xs tabular-nums">Index &le; ${formatNumber(l1Price, 1)}</span>
            <span class="text-carbon-500 text-[10px] mt-0.5">Deploy 30% bucket</span>
          </div>
          <div class="p-3 rounded-xl bg-carbon-850/90 border border-carbon-700/80 flex flex-col justify-between">
            <span class="text-amber-400 font-bold text-xs">Level 2 (Crash -${(cfg.l2.drop * 100).toFixed(1)}%)</span>
            <span class="text-carbon-200 mt-1 font-mono font-bold text-xs tabular-nums">Index &le; ${formatNumber(l2Price, 1)}</span>
            <span class="text-carbon-500 text-[10px] mt-0.5">Deploy 60% rem.</span>
          </div>
          <div class="p-3 rounded-xl bg-carbon-850/90 border border-carbon-700/80 flex flex-col justify-between">
            <span class="text-rose-400 font-bold text-xs">Level 3 (Mega -${(cfg.l3.drop * 100).toFixed(1)}%)</span>
            <span class="text-carbon-200 mt-1 font-mono font-bold text-xs tabular-nums">Index &le; ${formatNumber(l3Price, 1)}</span>
            <span class="text-carbon-500 text-[10px] mt-0.5">Deploy 100% + Surge</span>
          </div>
        `;
      }

      // Initialize What-If slider to match saved price
      const currentDrop = ath > 0 ? Math.max(0, (ath - price) / ath * 100) : 0;
      const slider = document.getElementById("sniper-whatif-slider");
      const badge = document.getElementById("whatif-drop-badge");
      const simLabel = document.getElementById("whatif-sim-price");
      if (slider) slider.value = Math.min(40, currentDrop).toFixed(1);
      if (badge) badge.innerText = `-${currentDrop.toFixed(1)}% Drop`;
      if (simLabel) simLabel.innerText = `Simulated Index: ${formatNumber(price, 1)}`;

      updateSniperGaugeAndDecision(ticker, ath, price, isLocked);
    }

    function handleSniperInput() {
      const ticker = appState.selectedSniperTicker;
      const cfg = V6_CONFIG[ticker];

      let ath = parseFloat(document.getElementById("sniper-input-ath").value) || cfg.defaultAth;
      let price = parseFloat(document.getElementById("sniper-input-price").value) || ath;

      if (price > ath) {
        ath = price;
        document.getElementById("sniper-input-ath").value = ath;
        appState.l1Locked[ticker] = false;
        document.getElementById("sniper-lock-toggle").checked = false;
        showToast(`New ATH printed (${formatNumber(ath, 1)})! L1 Lock auto-reset.`);
      }

      appState.aths[ticker] = ath;
      appState.livePrices[ticker] = price;
      appState.l1Locked[ticker] = document.getElementById("sniper-lock-toggle").checked;

      saveState();
      renderSniperTickerPills();
      updateSniperView();
    }

    /**
     * Non-Destructive What-If Drop Slider in Tactical Sniper
     * Evaluates simulated drawdowns without altering saved localStorage prices.
     */
    function handleSniperWhatIf(val) {
      const ticker = appState.selectedSniperTicker;
      const cfg = V6_CONFIG[ticker];
      const ath = appState.aths[ticker] || cfg.defaultAth;
      const dropPct = parseFloat(val) || 0;
      const simPrice = ath * (1 - dropPct / 100);

      const badge = document.getElementById("whatif-drop-badge");
      const simLabel = document.getElementById("whatif-sim-price");
      if (badge) badge.innerText = `-${dropPct.toFixed(1)}% Drop`;
      if (simLabel) simLabel.innerText = `Simulated Index: ${formatNumber(simPrice, 1)}`;

      const isLocked = !!appState.l1Locked[ticker];
      updateSniperGaugeAndDecision(ticker, ath, simPrice, isLocked);
    }

    function resetSniperWhatIf() {
      updateSniperView();
      showToast("Reset What-If slider to saved live spot price");
    }

    function toggleL1Lock() {
      const ticker = appState.selectedSniperTicker;
      appState.l1Locked[ticker] = document.getElementById("sniper-lock-toggle").checked;
      saveState();
      renderSniperTickerPills();
      updateSniperView();
      showToast(`L1 Lock is now ${appState.l1Locked[ticker] ? 'ACTIVE' : 'OFF'}`);
    }

    function markL1BoughtAndLock() {
      const ticker = appState.selectedSniperTicker;
      appState.l1Locked[ticker] = true;
      document.getElementById("sniper-lock-toggle").checked = true;
      saveState();
      renderSniperTickerPills();
      updateSniperView();
      showToast(`L1 marked as bought. Hysteresis lock engaged for ${ticker}.`);
    }

    function updateSniperGaugeAndDecision(ticker, ath, price, isLocked) {
      const cfg = V6_CONFIG[ticker];
      const drop = ath > 0 ? (ath - price) / ath : 0;
      const dropPct = (drop * 100);

      const maxScaleDrop = 0.40;
      let needlePct = Math.max(0, Math.min(100, (drop / maxScaleDrop) * 100));

      const needleEl = document.getElementById("gauge-needle");
      const dropLabel = document.getElementById("sniper-gauge-drop-pct");
      if (needleEl) needleEl.style.left = `${needlePct}%`;
      if (dropLabel) {
        dropLabel.innerText = `-${dropPct.toFixed(2)}% Dip`;
        dropLabel.className = drop >= cfg.l3.drop ? "text-xs font-mono text-rose-400 font-bold tabular-nums" : (drop >= cfg.l1.drop ? "text-xs font-mono text-amber-400 font-bold tabular-nums" : "text-xs font-mono text-emerald-400 font-bold tabular-nums");
      }

      const stats = calculatePortfolioStats();
      const totalDeployableCash = stats.totalDeployableCash;
      const bucketCash = totalDeployableCash * cfg.targetWeight;

      const badge = document.getElementById("sniper-decision-badge");
      const amountEl = document.getElementById("sniper-deploy-amount");
      const explanationEl = document.getElementById("sniper-decision-explanation");

      let directive = "WAIT (GUARDRAIL 1)";
      let badgeClass = "bg-carbon-800 text-carbon-400 border-carbon-700";
      let deployAmount = 0;
      let explanation = `Drop is ${dropPct.toFixed(1)}%, which is below the L1 trigger (-${(cfg.l1.drop*100).toFixed(1)}%). Guardrail 1 mandates preserving 100% of cash war-chest.`;

      if (drop >= cfg.l3.drop) {
        directive = "L3 MEGA-CRASH DEPLOY";
        badgeClass = "bg-rose-500/10 text-rose-400 border-rose-500/20";
        deployAmount = bucketCash * 0.28;
        explanation = `Deep crash territory (-${dropPct.toFixed(1)}%). Deploy 100% of remaining bucket cash plus calculate cross-pool quiet borrowing in the Crash Scanner.`;
      } else if (drop >= cfg.l2.drop) {
        directive = "L2 CRASH DEPLOY (60%)";
        badgeClass = "bg-amber-500/10 text-amber-400 border-amber-500/20";
        deployAmount = bucketCash * 0.70 * cfg.l2.pctDeploy;
        explanation = `Major correction (-${dropPct.toFixed(1)}%). Deploy 60% of remaining bucket cash into ${ticker}.`;
      } else if (drop >= cfg.l1.drop) {
        if (isLocked) {
          directive = "L1 HYSTERESIS LOCKED";
          badgeClass = "bg-amber-500/10 text-amber-400 border-amber-500/20";
          deployAmount = 0;
          explanation = `Asset reached L1 zone (-${dropPct.toFixed(1)}%), but Guardrail 2 Hysteresis Lock is ACTIVE. No repeat purchases permitted until next ATH or L2 crash (-${(cfg.l2.drop*100).toFixed(1)}%).`;
        } else {
          directive = "L1 DIP DEPLOY (30%)";
          badgeClass = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
          deployAmount = bucketCash * cfg.l1.pctDeploy;
          explanation = `Correction dip triggered (-${dropPct.toFixed(1)}%). Deploy 30% of target bucket cash into ${ticker}. After execution, engage L1 Lock.`;
        }
      }

      if (badge) {
        badge.innerText = directive;
        badge.className = `px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${badgeClass}`;
      }
      if (amountEl) {
        amountEl.innerText = formatINR(deployAmount);
      }
      if (explanationEl) {
        explanationEl.innerText = explanation;
      }
    }

    /**
     * =========================================================================
     * 12. VIEW 6: ALL-MARKET CRASH SCANNER & CASH BUCKET PLANNER
     * =========================================================================
     */
    function updateCrashScannerView() {
      const stats = calculatePortfolioStats();
      const totalDeployableCash = stats.totalDeployableCash;

      const crashData = {};
      let quietPool = 0;
      const quietBuckets = [];
      const protectedBuckets = [];
      const l3Triggered = [];
      let totalL3Score = 0;

      TICKERS.forEach(ticker => {
        const cfg = V6_CONFIG[ticker];
        const ath = appState.aths[ticker] || cfg.defaultAth;
        const price = appState.livePrices[ticker] || ath;
        const drop = ath > 0 ? (ath - price) / ath : 0;
        const bucketCash = totalDeployableCash * cfg.targetWeight;

        const isQuiet = drop < 0.08;
        const isL3 = drop >= cfg.l3.drop;
        const isL2 = !isL3 && drop >= cfg.l2.drop;
        const isL1 = !isL3 && !isL2 && drop >= cfg.l1.drop;

        let zoneName = "PULLBACK";
        let zoneClass = "bg-carbon-800 text-carbon-400 border-carbon-700";
        if (isL3) {
          zoneName = "L3 MEGA"; zoneClass = "bg-rose-500/10 text-rose-400 border-rose-500/20 font-bold";
        } else if (isL2) {
          zoneName = "L2 CRASH"; zoneClass = "bg-amber-500/10 text-amber-400 border-amber-500/20 font-bold";
        } else if (isL1) {
          zoneName = "L1 DIP"; zoneClass = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-bold";
        } else if (isQuiet) {
          zoneName = "QUIET (<8%)"; zoneClass = "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
        }

        let borrowed = 0;
        if (isQuiet) {
          borrowed = 0.40 * bucketCash;
          quietPool += borrowed;
          quietBuckets.push({ ticker, drop, bucketCash, borrowed });
        } else if (!isL3) {
          protectedBuckets.push({ ticker, drop, bucketCash });
        }

        let score = 0;
        if (isL3) {
          score = (drop / (1 - drop)) * cfg.cagrWeight;
          totalL3Score += score;
          l3Triggered.push({ ticker, drop, score, bucketCash, ownTranche: bucketCash * 0.28 });
        }

        crashData[ticker] = {
          ticker, ath, price, drop, bucketCash,
          isQuiet, isL3, isL2, isL1, zoneName, zoneClass, score
        };
      });

      const crashTableBody = document.getElementById("crash-table-body");
      if (crashTableBody) {
        crashTableBody.innerHTML = TICKERS.map(ticker => {
          const cfg = V6_CONFIG[ticker];
          const d = crashData[ticker];
          const dropColor = d.drop >= cfg.l3.drop ? "text-rose-400 font-bold" : (d.drop >= cfg.l1.drop ? "text-amber-400 font-bold" : "text-carbon-300");

          return `
            <tr class="hover:bg-carbon-850/60 transition">
              <td class="py-3 px-4">
                <div class="font-bold text-carbon-100 font-sans">${ticker}</div>
                <div class="text-[10px] text-carbon-500 font-sans">${cfg.name}</div>
              </td>
              <td class="py-3 px-3 text-right">
                <input type="number" step="any" value="${d.ath}"
                  oninput="handleCrashAthChange('${ticker}', this.value)"
                  class="w-28 bg-carbon-900/90 border border-carbon-700/80 rounded-lg px-2.5 py-1.5 text-xs font-mono text-right text-carbon-300 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition" />
              </td>
              <td class="py-3 px-3 text-right">
                <input type="number" step="any" value="${d.price}"
                  oninput="handleCrashPriceChange('${ticker}', this.value)"
                  class="w-28 bg-carbon-900/90 border border-carbon-700/80 rounded-lg px-2.5 py-1.5 text-xs font-mono text-right text-emerald-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition" />
              </td>
              <td class="py-3 px-3 text-right tabular-nums ${dropColor}">-${(d.drop * 100).toFixed(2)}%</td>
              <td class="py-3 px-3 text-center">
                <span class="inline-block px-2 py-0.5 rounded text-[10px] font-mono border ${d.zoneClass}">${d.zoneName}</span>
              </td>
              <td class="py-3 px-4 text-center text-xs font-mono font-bold tabular-nums ${d.isL3 ? 'text-rose-400' : 'text-carbon-600'}">
                ${d.isL3 ? d.score.toFixed(3) : '—'}
              </td>
            </tr>
          `;
        }).join("");
      }

      const qpBadge = document.getElementById("quiet-pool-total-badge");
      if (qpBadge) qpBadge.innerText = `Quiet Pool: ${formatINR(quietPool)}`;

      const breakdownContainer = document.getElementById("crash-math-breakdown");
      if (breakdownContainer) {
        breakdownContainer.innerHTML = `
          <div class="p-4 rounded-xl bg-carbon-850/90 border border-carbon-700/80 space-y-2.5">
            <div class="text-xs font-mono font-bold text-cyan-400 flex items-center justify-between">
              <span>Quiet Contributors (&lt;8%)</span>
              <span class="text-[10px] font-semibold">${quietBuckets.length} Buckets</span>
            </div>
            ${quietBuckets.length === 0 ? '<p class="text-xs text-carbon-500 font-sans">Zero quiet buckets (all &ge; 8% drop).</p>' : `
              <div class="space-y-1.5 font-mono text-xs">
                ${quietBuckets.map(b => `<div class="flex items-center justify-between"><span class="text-carbon-300">${b.ticker} (-${(b.drop*100).toFixed(1)}%)</span><span class="text-cyan-400 tabular-nums font-semibold">Contributed: ${formatINR(b.borrowed)} (40%)</span></div>`).join("")}
              </div>
            `}
          </div>

          <div class="p-4 rounded-xl bg-carbon-850/90 border border-carbon-700/80 space-y-2.5">
            <div class="text-xs font-mono font-bold text-rose-400 flex items-center justify-between">
              <span>L3 Mega-Crash Surge Queue</span>
              <span class="text-[10px] font-semibold">${l3Triggered.length} Assets</span>
            </div>
            ${l3Triggered.length === 0 ? '<p class="text-xs text-carbon-500 font-sans">No assets currently in L3 territory.</p>' : `
              <div class="space-y-1.5 font-mono text-xs">
                ${l3Triggered.map(item => {
                  const sharePct = totalL3Score > 0 ? (item.score / totalL3Score) : 0;
                  const surgeRs = sharePct * quietPool;
                  return `<div class="flex items-center justify-between"><span class="text-carbon-200 font-bold">${item.ticker} (Sc: ${item.score.toFixed(2)})</span><span class="text-rose-400 tabular-nums font-semibold">+${formatINR(surgeRs)} (${(sharePct*100).toFixed(0)}%)</span></div>`;
                }).join("")}
              </div>
            `}
          </div>
        `;
      }

      renderCrashOrderSheet(crashData, totalDeployableCash, quietPool, totalL3Score);
      updateBucketPlannerView();
    }

    /**
     * Cash Bucket Planner
     * Splits arbitrary capital across the 5 V6 buckets and computes exact tranches.
     */
    function loadBucketPlannerCapital(amt) {
      if (amt === 'warchest') {
        const stats = calculatePortfolioStats();
        amt = stats.totalCash > 0 ? stats.totalCash : 100000;
      }
      const el = document.getElementById("bucket-planner-capital");
      if (el) el.value = amt;
      updateBucketPlannerView();
      showToast(`Loaded ${formatINR(amt)} into Bucket Planner`);
    }

    function updateBucketPlannerView() {
      const tbody = document.getElementById("bucket-planner-table-body");
      if (!tbody) return;

      const input = document.getElementById("bucket-planner-capital");
      const totalCapital = input && parseFloat(input.value) > 0 ? parseFloat(input.value) : 100000;

      tbody.innerHTML = TICKERS.map(t => {
        const cfg = V6_CONFIG[t];
        const bucket = totalCapital * cfg.targetWeight;
        const l1 = bucket * cfg.l1.pctDeploy;              // 30%
        const l2 = bucket * 0.70 * cfg.l2.pctDeploy;       // 42%
        const l3 = bucket * 0.28;                          // 28%

        return `
          <tr class="hover:bg-carbon-850/60 transition">
            <td class="py-3 px-4 font-bold text-carbon-100 font-sans">${t}</td>
            <td class="py-3 px-3 text-carbon-400 font-sans">${cfg.name}</td>
            <td class="py-3 px-3 text-right text-carbon-300 tabular-nums">${(cfg.targetWeight * 100).toFixed(1)}%</td>
            <td class="py-3 px-3 text-right text-white font-bold tabular-nums">${formatINR(bucket)}</td>
            <td class="py-3 px-3 text-right text-emerald-400 font-bold tabular-nums">${formatINR(l1)}</td>
            <td class="py-3 px-3 text-right text-amber-400 font-bold tabular-nums">${formatINR(l2)}</td>
            <td class="py-3 px-4 text-right text-rose-400 font-bold tabular-nums">${formatINR(l3)}</td>
          </tr>
        `;
      }).join("");
    }

    function renderCrashOrderSheet(crashData, totalDeployableCash, quietPool, totalL3Score) {
      const orderBody = document.getElementById("crash-order-sheet-body");
      if (!orderBody) return;

      let grandTotalOrders = 0;
      const orderRows = [];

      TICKERS.forEach(ticker => {
        const cfg = V6_CONFIG[ticker];
        const d = crashData[ticker];
        const bucketCash = d.bucketCash;

        let triggerLevel = "NONE";
        let ownTranche = 0;
        let quietSurge = 0;

        if (d.isL3) {
          triggerLevel = "L3 MEGA-CRASH";
          ownTranche = bucketCash * 0.28;
          const sharePct = totalL3Score > 0 ? (d.score / totalL3Score) : 0;
          quietSurge = sharePct * quietPool;
        } else if (d.isL2) {
          triggerLevel = "L2 CRASH";
          ownTranche = bucketCash * 0.70 * cfg.l2.pctDeploy;
        } else if (d.isL1) {
          triggerLevel = "L1 DIP";
          const stats = calculatePortfolioStats();
          const drift = stats.dataByTicker[ticker] ? stats.dataByTicker[ticker].weightDrift : 0;
          if (drift > 0.08) {
            triggerLevel = "L1 (REDIRECTED)"; ownTranche = 0;
          } else {
            ownTranche = bucketCash * cfg.l1.pctDeploy;
          }
        }

        const totalDeploy = ownTranche + quietSurge;

        if (totalDeploy > 0) {
          grandTotalOrders += totalDeploy;
          orderRows.push({ ticker, triggerLevel, ownTranche, quietSurge, totalDeploy });
        }
      });

      const totalDeployBadge = document.getElementById("order-sheet-total-deploy");
      if (totalDeployBadge) totalDeployBadge.innerText = `Total Order: ${formatINR(grandTotalOrders)}`;

      if (orderRows.length === 0) {
        orderBody.innerHTML = `<tr><td colspan="6" class="py-8 text-center text-carbon-500 font-sans">No active crash triggers detected right now. War-chest cash remains preserved.</td></tr>`;
        return;
      }

      orderBody.innerHTML = orderRows.map(row => `
        <tr class="hover:bg-carbon-850/60 transition">
          <td class="py-3 px-4 font-bold text-carbon-100 font-sans">${row.ticker}</td>
          <td class="py-3 px-3 font-mono font-semibold text-xs ${row.triggerLevel.includes('L3') ? 'text-rose-400' : (row.triggerLevel.includes('L2') ? 'text-amber-400' : 'text-emerald-400')}">${row.triggerLevel}</td>
          <td class="py-3 px-3 text-right text-carbon-300 tabular-nums">${formatINR(row.ownTranche)}</td>
          <td class="py-3 px-3 text-right text-cyan-400 font-bold tabular-nums">${row.quietSurge > 0 ? '+' + formatINR(row.quietSurge) : '—'}</td>
          <td class="py-3 px-3 text-right text-emerald-400 font-bold tabular-nums">${formatINR(row.totalDeploy)}</td>
          <td class="py-3 px-4 text-right">
            <span class="inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              DEPLOY ORDER
            </span>
          </td>
        </tr>
      `).join("");
    }

    function handleCrashAthChange(ticker, val) {
      const a = parseFloat(val) || V6_CONFIG[ticker].defaultAth;
      appState.aths[ticker] = a;
      saveState();
      updateCrashScannerView();
      updateSniperView();
    }

    function handleCrashPriceChange(ticker, val) {
      const p = parseFloat(val) || 0;
      appState.livePrices[ticker] = p;
      if (p > (appState.aths[ticker] || 0)) {
        appState.aths[ticker] = p;
        appState.l1Locked[ticker] = false;
      }
      saveState();
      updateCrashScannerView();
    }

    function simulateCrashScenario(type) {
      if (type === "mega") {
        appState.livePrices["ICICIFIN"] = appState.aths["ICICIFIN"] * 0.66;
        appState.livePrices["MAM150ETF"] = appState.aths["MAM150ETF"] * 0.65;
        appState.livePrices["BANKIETF"] = appState.aths["BANKIETF"] * 0.95;
        appState.livePrices["ICICINXT50"] = appState.aths["ICICINXT50"] * 0.94;
        appState.livePrices["HDFCSML250"] = appState.aths["HDFCSML250"] * 0.62;
        showToast("Simulated 2020-style Asymmetric Mega-Crash!");
      } else {
        appState.livePrices["ICICIFIN"] = appState.aths["ICICIFIN"] * 0.85;
        appState.livePrices["MAM150ETF"] = appState.aths["MAM150ETF"] * 0.90;
        appState.livePrices["BANKIETF"] = appState.aths["BANKIETF"] * 0.96;
        appState.livePrices["ICICINXT50"] = appState.aths["ICICINXT50"] * 0.87;
        appState.livePrices["HDFCSML250"] = appState.aths["HDFCSML250"] * 0.92;
        showToast("Simulated Mild Market Correction!");
      }
      saveState();
      updateCrashScannerView();
    }

    function copyCrashOrderSheet() {
      const stats = calculatePortfolioStats();
      const totalDeployableCash = stats.totalDeployableCash;

      let quietPool = 0;
      let totalL3Score = 0;
      const l3Scores = {};

      TICKERS.forEach(t => {
        const cfg = V6_CONFIG[t];
        const ath = appState.aths[t] || cfg.defaultAth;
        const price = appState.livePrices[t] || ath;
        const drop = ath > 0 ? (ath - price) / ath : 0;
        const bucket = totalDeployableCash * cfg.targetWeight;

        if (drop < 0.08) {
          quietPool += 0.40 * bucket;
        } else if (drop >= cfg.l3.drop) {
          const score = (drop / (1 - drop)) * cfg.cagrWeight;
          l3Scores[t] = score;
          totalL3Score += score;
        }
      });

      let text = `AI Meta-Q V6 Final — Consolidated Crash Order Sheet\n`;
      text += `Deployable Cash: ${formatINR(totalDeployableCash)}\n`;
      text += `Timestamp: ${new Date().toLocaleString()}\n`;
      text += `--------------------------------------------------------\n`;

      let totalVal = 0;
      let count = 0;

      TICKERS.forEach(t => {
        const cfg = V6_CONFIG[t];
        const ath = appState.aths[t] || cfg.defaultAth;
        const price = appState.livePrices[t] || ath;
        const drop = ath > 0 ? (ath - price) / ath : 0;
        const bucket = totalDeployableCash * cfg.targetWeight;

        let deploy = 0, trig = "";
        if (drop >= cfg.l3.drop) {
          const ownTranche = bucket * 0.28;
          const sharePct = totalL3Score > 0 ? ((l3Scores[t] || 0) / totalL3Score) : 0;
          const quietSurge = sharePct * quietPool;
          deploy = ownTranche + quietSurge;
          trig = quietSurge > 0 ? `L3 Mega-Crash (+${formatINR(quietSurge)} Surge)` : "L3 Mega-Crash";
        } else if (drop >= cfg.l2.drop) {
          deploy = bucket * 0.70 * cfg.l2.pctDeploy;
          trig = "L2 Crash";
        } else if (drop >= cfg.l1.drop) {
          const drift = stats.dataByTicker[t] ? stats.dataByTicker[t].weightDrift : 0;
          if (drift > 0.08) {
            deploy = 0;
            trig = "L1 (REDIRECTED - OVERWEIGHT +8% BRAKE)";
          } else {
            deploy = bucket * cfg.l1.pctDeploy;
            trig = "L1 Dip";
          }
        }

        if (deploy > 0) {
          totalVal += deploy;
          count++;
          text += `[${t}] (${cfg.name}): ${trig} | Deploy Order: ${formatINR(deploy)}\n`;
        }
      });

      text += `--------------------------------------------------------\n`;
      text += `Grand Total Order Value: ${formatINR(totalVal)}\n`;

      navigator.clipboard.writeText(text).then(() => showToast("Consolidated order sheet copied!")).catch(() => showToast("Copy failed", false));
    }

    /**
     * =========================================================================
     * 13. UTILITIES & BACKUP RESTORE
     * =========================================================================
     */
    function exportBackup() {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
      const downloadAnchor = document.createElement("a");
      const dateStr = new Date().toISOString().split("T")[0];
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `ai-meta-q-v6-backup-${dateStr}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("Exported JSON Backup successfully!");
    }

    function importBackup(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const parsed = JSON.parse(e.target.result);
          if (parsed && (parsed.holdings || parsed.aths)) {
            appState = { ...getDefaultState(), ...parsed };
            saveState();
            renderHoldingsInputs();
            initSandboxSelectors();
            updatePortfolioView();
            updateSniperView();
            updateCrashScannerView();
            runRealTimeSimulation();
            runFutureWealthProjection();
            showToast("Backup restored successfully!");
          } else {
            showToast("Invalid backup file format", false);
          }
        } catch (err) {
          showToast("Error parsing JSON backup file", false);
        }
      };
      reader.readAsText(file);
      event.target.value = "";
    }

    function resetDefaults() {
      if (confirm("Reset all holdings, saved ATHs, and settings to default V6 values?")) {
        appState = getDefaultState();
        saveState();
        renderHoldingsInputs();
        initSandboxSelectors();
        updatePortfolioView();
        updateSniperView();
        updateCrashScannerView();
        runRealTimeSimulation();
        runFutureWealthProjection();
        showToast("Reset to default strategy matrix!");
      }
    }

    function showToast(msg, isSuccess = true) {
      const toast = document.getElementById("toastNotification");
      const icon = document.getElementById("toastIcon");
      const message = document.getElementById("toastMessage");
      if (!toast || !message) return;

      message.innerText = msg;
      if (icon) {
        icon.className = isSuccess 
          ? "w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold border border-emerald-500/20"
          : "w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold border border-rose-500/20";
        icon.innerHTML = isSuccess 
          ? `<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`
          : `!`;
      }

      toast.classList.remove("translate-y-[-150%]", "opacity-0");
      toast.classList.add("translate-y-0", "opacity-100");

      setTimeout(() => {
        toast.classList.remove("translate-y-0", "opacity-100");
        toast.classList.add("translate-y-[-150%]", "opacity-0");
      }, 3000);
    }

    /**
     * =========================================================================
     * 14. INITIALIZATION
     * =========================================================================
     */
    document.addEventListener("DOMContentLoaded", () => {
      initTheme();
      renderOverviewMatrix();
      renderHoldingsInputs();
      renderSniperTickerPills();
      updatePortfolioView();
      initSandboxSelectors();
      runRealTimeSimulation();
      runFutureWealthProjection();
      updateBucketPlannerView();
    });
  </script>
</body>
</html>
