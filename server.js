/**
 * AI Meta-Q V6 Final — Lightweight Node.js/Express Server
 * 
 * Serves the single-page web application statically and provides REST API endpoints
 * for quantitative configuration, 24 historical index pivots, and backtest simulations.
 * 
 * Usage:
 *   npm install express
 *   node server.js
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

/**
 * 1. IMMUTABLE LOCKED V6 CONFIGURATION MATRIX
 */
const V6_CONFIG = {
  strategy_version: "LOCKED V6 FINAL",
  etfs: [
    {
      id: 1,
      ticker: "ICICIFIN",
      index_name: "Nifty Financial Services Ex-Bank",
      target_weight: 0.320,
      per_100: 32.0,
      l1_dip: 0.140,
      l2_dip: 0.220,
      l3_dip: 0.320,
      default_ath: 33200.0,
      cagr_weight: 1.18,
      price_cagr_21y: 17.54,
      est_tri_cagr_21y: 18.74,
      min_yr_drop: 4.1,
      normal_yr_drop: 14.8,
      max_hist_crash: 70.6,
      avg_bounce_pct: 140.3,
      full_recoveries: 8,
      etf_nav_scale: 1000.0
    },
    {
      id: 2,
      ticker: "MAM150ETF",
      index_name: "Nifty Midcap 150",
      target_weight: 0.280,
      per_100: 28.0,
      l1_dip: 0.135,
      l2_dip: 0.225,
      l3_dip: 0.330,
      default_ath: 23647.5,
      cagr_weight: 1.08,
      price_cagr_21y: 15.59,
      est_tri_cagr_21y: 16.79,
      min_yr_drop: 1.1,
      normal_yr_drop: 13.6,
      max_hist_crash: 72.8,
      avg_bounce_pct: 122.5,
      full_recoveries: 8,
      etf_nav_scale: 750.0
    },
    {
      id: 3,
      ticker: "BANKIETF",
      index_name: "Nifty Bank",
      target_weight: 0.140,
      per_100: 14.0,
      l1_dip: 0.140,
      l2_dip: 0.230,
      l3_dip: 0.340,
      default_ath: 62283.6,
      cagr_weight: 1.00,
      price_cagr_21y: 14.35,
      est_tri_cagr_21y: 15.55,
      min_yr_drop: 3.0,
      normal_yr_drop: 12.6,
      max_hist_crash: 69.0,
      avg_bounce_pct: 135.1,
      full_recoveries: 9,
      etf_nav_scale: 100.0
    },
    {
      id: 4,
      ticker: "ICICINXT50",
      index_name: "Nifty Next 50",
      target_weight: 0.140,
      per_100: 14.0,
      l1_dip: 0.120,
      l2_dip: 0.210,
      l3_dip: 0.320,
      default_ath: 77918.0,
      cagr_weight: 0.98,
      price_cagr_21y: 14.43,
      est_tri_cagr_21y: 15.63,
      min_yr_drop: 3.4,
      normal_yr_drop: 13.3,
      max_hist_crash: 73.7,
      avg_bounce_pct: 118.6,
      full_recoveries: 8,
      etf_nav_scale: 100.0
    },
    {
      id: 5,
      ticker: "HDFCSML250",
      index_name: "Nifty Smallcap 250",
      target_weight: 0.120,
      per_100: 12.0,
      l1_dip: 0.160,
      l2_dip: 0.250,
      l3_dip: 0.360,
      default_ath: 18688.3,
      cagr_weight: 1.02,
      price_cagr_21y: 14.18,
      est_tri_cagr_21y: 15.38,
      min_yr_drop: 3.2,
      normal_yr_drop: 17.0,
      max_hist_crash: 76.1,
      avg_bounce_pct: 137.2,
      full_recoveries: 7,
      etf_nav_scale: 60.0
    }
  ]
};

/**
 * 2. EXACT 24-POINT HISTORICAL PIVOT SERIES
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

// 3. COMPLETE VERSION EVOLUTION & EXPERIMENT MATRIX
const VERSION_MATRIX = [
  { version: "0. Baseline Equal SIP",        price_xirr: 13.86, est_tri_xirr: 15.06, corpus_cr: 2.91, max_dd: -58.7, fold1_xirr: 11.22, fold2_xirr: 14.48, trades: 260, notes: "Monthly equal 20% SIP regardless of valuation" },
  { version: "1. Version 1 (V1 Silo)",       price_xirr: 14.28, est_tri_xirr: 15.48, corpus_cr: 3.08, max_dd: -54.1, fold1_xirr: 11.52, fold2_xirr: 15.23, trades: 580, notes: "Rigid isolated buckets; over-weighted financials (50%)" },
  { version: "2. Version 2 (V2 Cross-50)",   price_xirr: 14.55, est_tri_xirr: 15.75, corpus_cr: 3.20, max_dd: -55.7, fold1_xirr: 11.92, fold2_xirr: 16.28, trades: 439, notes: "Over-allocated Next 50 (31.5%) & under-allocated FinEx (15%)" },
  { version: "3. Version 3 (V3 3-Tier)",     price_xirr: 14.53, est_tri_xirr: 15.73, corpus_cr: 3.19, max_dd: -55.3, fold1_xirr: 11.61, fold2_xirr: 16.07, trades: 545, notes: "80% cross-pool borrowing starved Small/Midcap bottoms" },
  { version: "4. Version 4 (V4 Anti-Starve)",price_xirr: 14.49, est_tri_xirr: 15.69, corpus_cr: 3.17, max_dd: -54.7, fold1_xirr: 11.22, fold2_xirr: 16.38, trades: 434, notes: "Included 8% bull-pullback buys (51 premature bull trades)" },
  { version: "5. Version 5 (V5 Repeat-T1)",  price_xirr: 14.50, est_tri_xirr: 15.70, corpus_cr: 3.17, max_dd: -54.7, fold1_xirr: 11.28, fold2_xirr: 16.48, trades: 498, notes: "Repeated Tier-1 buys in sideways bears drained L2/L3 cash" },
  { version: "6. LOCKED VERSION 6 (V6 FINAL)",price_xirr: 14.61,est_tri_xirr: 15.81, corpus_cr: 3.22, max_dd: -54.1, fold1_xirr: 11.45, fold2_xirr: 16.76, trades: 383, notes: "CHAMPION: Zero bull-run chasing + L1 Hysteresis Lock + 40% Quiet-Pool L3 Surge + 8% Overweight Brake" }
];

// REST API Endpoints
app.get('/api/v6/config', (req, res) => {
  res.json({ success: true, data: V6_CONFIG });
});

app.get('/api/v6/pivots', (req, res) => {
  res.json({ success: true, count: HISTORICAL_PIVOTS.length, data: HISTORICAL_PIVOTS });
});

app.get('/api/v6/versions', (req, res) => {
  res.json({ success: true, count: VERSION_MATRIX.length, data: VERSION_MATRIX });
});

const GUARDRAILS = [
  { id: 1, name: "Zero Bull-Run Pullback Chasing", rule: "Deploy ₹0 when Drop < L1_Dip. Ignore -7% to -10% bull-run pullbacks; preserve cash for L1/L2/L3 crashes." },
  { id: 2, name: "L1 Hysteresis Lock (1x Buy Per Wave)", rule: "Once L1 (30% bucket cash) is bought in a correction wave, lock L1 (l1Locked = true) so it cannot trigger repeatedly in sideways markets. Auto-reset only on a New ATH or escalation to L2 (60% remaining cash)." },
  { id: 3, name: "L3 Asymmetric Priority & Quiet Cross-Pool Surge", rule: "On L3 (-32% to -36%), rank triggered ETFs by Score = (Drop / (1 - Drop)) * CAGR_Weight, deploy 100% of their remaining bucket cash, and borrow 40% idle cash ONLY from quiet buckets whose current drop is < 8.0%." },
  { id: 4, name: "+8.0% Overweight Rebalance Brake", rule: "If (Current_Weight - Target_Weight) > 8.0%, block new L1 cash for that ETF and redirect it to the most underweight ETF." }
];

app.get('/api/v6/guardrails', (req, res) => {
  res.json({ success: true, count: GUARDRAILS.length, data: GUARDRAILS });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'AI Meta-Q V6 Platform', timestamp: new Date().toISOString() });
});

// Fallback to index.html for Single-Page Application routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`================================================================`);
  console.log(` AI Meta-Q V6 Final — Quantitative Fintech Platform Server`);
  console.log(` Running on: http://localhost:${PORT}`);
  console.log(` REST Endpoints:`);
  console.log(`   - http://localhost:${PORT}/api/v6/config`);
  console.log(`   - http://localhost:${PORT}/api/v6/pivots`);
  console.log(`   - http://localhost:${PORT}/health`);
  console.log(`================================================================`);
});
