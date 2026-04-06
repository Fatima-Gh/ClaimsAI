import { useState, useMemo } from "react";

/* ═══ SVG CAR IMAGES ═══ */
const svgCar = (angle) => {
  const bg = { front: "#16213e", rear: "#1a1a2e", left: "#152238", right: "#1b1f3a", top: "#131929" }[angle];
  const title = { front: "Front View", rear: "Rear View", left: "Left Side", right: "Right Side", top: "Top / Roof" }[angle];
  const body = {
    front: `<rect x="100" y="140" width="400" height="180" rx="20" fill="#2c3e50"/><rect x="120" y="120" width="360" height="50" rx="10" fill="#34495e"/><rect x="150" y="100" width="300" height="28" rx="8" fill="#3d566e"/><circle cx="180" cy="250" r="42" fill="#1a1a2e" stroke="#555" stroke-width="3"/><circle cx="420" cy="250" r="42" fill="#1a1a2e" stroke="#555" stroke-width="3"/><rect x="155" y="155" width="70" height="35" rx="5" fill="#f4d03f" opacity="0.85"/><rect x="375" y="155" width="70" height="35" rx="5" fill="#f4d03f" opacity="0.85"/><rect x="230" y="290" width="140" height="18" rx="4" fill="#7f8c8d"/>`,
    rear: `<rect x="100" y="130" width="400" height="190" rx="18" fill="#2c3e50"/><rect x="130" y="110" width="340" height="40" rx="10" fill="#34495e"/><circle cx="180" cy="260" r="42" fill="#1a1a2e" stroke="#555" stroke-width="3"/><circle cx="420" cy="260" r="42" fill="#1a1a2e" stroke="#555" stroke-width="3"/><rect x="155" y="155" width="55" height="30" rx="5" fill="#c0392b" opacity="0.9"/><rect x="390" y="155" width="55" height="30" rx="5" fill="#c0392b" opacity="0.9"/>`,
    left: `<rect x="50" y="160" width="500" height="120" rx="14" fill="#2c3e50"/><rect x="130" y="115" width="140" height="55" rx="12" fill="#34495e"/><rect x="320" y="115" width="140" height="55" rx="12" fill="#34495e"/><circle cx="130" cy="280" r="42" fill="#1a1a2e" stroke="#555" stroke-width="3"/><circle cx="470" cy="280" r="42" fill="#1a1a2e" stroke="#555" stroke-width="3"/>`,
    right: `<rect x="50" y="160" width="500" height="120" rx="14" fill="#2c3e50"/><rect x="130" y="115" width="140" height="55" rx="12" fill="#34495e"/><rect x="320" y="115" width="140" height="55" rx="12" fill="#34495e"/><circle cx="130" cy="280" r="42" fill="#1a1a2e" stroke="#555" stroke-width="3"/><circle cx="470" cy="280" r="42" fill="#1a1a2e" stroke="#555" stroke-width="3"/>`,
    top: `<rect x="150" y="60" width="300" height="300" rx="50" fill="#2c3e50"/><rect x="180" y="80" width="240" height="120" rx="20" fill="#34495e" opacity="0.6"/><rect x="180" y="220" width="240" height="120" rx="20" fill="#34495e" opacity="0.6"/>`,
  }[angle];
  const dmg = {
    front: `<path d="M130 175 Q100 195 112 235" fill="none" stroke="#e74c3c" stroke-width="4" stroke-dasharray="8,4"/><circle cx="148" cy="188" r="14" fill="none" stroke="#e74c3c" stroke-width="3"/>`,
    rear: `<path d="M355 275 Q385 295 465 288" fill="none" stroke="#e74c3c" stroke-width="3"/><circle cx="445" cy="175" r="12" fill="none" stroke="#e74c3c" stroke-width="3"/>`,
    left: `<line x1="200" y1="195" x2="440" y2="192" stroke="#e74c3c" stroke-width="3"/><line x1="215" y1="205" x2="430" y2="203" stroke="#e74c3c" stroke-width="2" opacity="0.7"/>`,
    right: `<circle cx="380" cy="200" r="18" fill="none" stroke="#e74c3c" stroke-width="3"/><circle cx="350" cy="185" r="10" fill="#e74c3c" opacity="0.3"/>`,
    top: `<circle cx="250" cy="130" r="7" fill="none" stroke="#f39c12" stroke-width="1.5"/><circle cx="310" cy="110" r="9" fill="none" stroke="#f39c12" stroke-width="1.5"/><circle cx="350" cy="150" r="6" fill="none" stroke="#f39c12" stroke-width="1.5"/><circle cx="280" cy="260" r="8" fill="none" stroke="#f39c12" stroke-width="1.5"/>`,
  }[angle];
  const col = angle === "top" ? "#f39c12" : "#e74c3c";
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><rect width="600" height="400" fill="${bg}"/>${body}${dmg}<text x="300" y="380" text-anchor="middle" fill="${col}" font-size="13" font-family="monospace">${title}</text></svg>`)}`;
};

const ANGLES = [
  { key: "front", label: "Front", icon: "⬆", req: true },
  { key: "rear", label: "Rear", icon: "⬇", req: true },
  { key: "left", label: "Left Side", icon: "⬅", req: true },
  { key: "right", label: "Right Side", icon: "➡", req: true },
  { key: "top", label: "Top / Roof", icon: "⏺", req: false },
];
const mkP = (keys) => keys.reduce((o, k) => ({ ...o, [k]: { src: svgCar(k) } }), {});

/* ═══ SHARED DATA ═══ */
const AGENTS = ["Jane Doe", "Mark Chen", "Lisa Patel"];
const SHOPS = [
  { name: "AutoBody Pro — Downtown", rating: 4.8, dist: "2.3 mi", spec: "Collision Repair" },
  { name: "Premier Auto Repair", rating: 4.6, dist: "4.1 mi", spec: "Full Service" },
  { name: "Elite Collision Center", rating: 4.9, dist: "7.8 mi", spec: "Luxury & Import" },
];

const VEH_REC = {
  "CLM-0041": { make: "Toyota", model: "Camry", year: "2023", color: "Silver Metallic", plate: "RKS-4821", vin: "4T1G11AK*P", conf: 96, match: true },
  "CLM-0040": { make: "Honda", model: "Civic", year: "2022", color: "Lunar Silver", plate: "BXM-3092", vin: "2HGFE2F5*N", conf: 98, match: true },
  "CLM-0039": { make: "BMW", model: "X5", year: "2024", color: "Carbon Black", plate: "LMT-7764", vin: "5UXCR6C0*R", conf: 91, match: true },
  "CLM-0038": { make: "Ford", model: "F-150", year: "2023", color: "Oxford White", plate: "TXP-2210", vin: "1FTFW1E8*P", conf: 95, match: true },
  "CLM-0037": { make: "Tesla", model: "Model 3", year: "2025", color: "Pearl White", plate: "EVG-8891", vin: "5YJ3E1EA*S", conf: 97, match: true },
  "CLM-0036": { make: "Hyundai", model: "Tucson", year: "2024", color: "Amazon Gray", plate: "KRN-5540", vin: "KM8J3CA4*R", conf: 88, match: true },
  "CLM-0035": { make: "Mercedes", model: "C300", year: "2023", color: "Obsidian Black", plate: "LUX-4412", vin: "W1KWF8DB*P", conf: 93, match: true },
  "CLM-0034": { make: "Kia", model: "Sportage", year: "2024", color: "Gravity Blue", plate: "FLR-7783", vin: "KNDPM3AC*R", conf: 90, match: false },
};

const ASS = {
  "CLM-0041": { severity: "Moderate", confidence: 87, areas: [
    { area: "Front Bumper", type: "Dent & Scratch", sev: "High", repair: "Replace", cost: { min: 800, max: 1200 }, src: "front" },
    { area: "Hood", type: "Surface Scratch", sev: "Low", repair: "Buff & Paint", cost: { min: 200, max: 400 }, src: "front" },
    { area: "Left Headlight", type: "Cracked Lens", sev: "Medium", repair: "Replace", cost: { min: 300, max: 500 }, src: "front" },
    { area: "Left Door Panel", type: "Scratch", sev: "Low", repair: "Buff & Paint", cost: { min: 150, max: 280 }, src: "left" },
  ], totalEst: { min: 1450, max: 2380 }, structural: false, driveable: true, rec: "Approve for repair at authorized shop", fraud: [] },
  "CLM-0040": { severity: "Minor", confidence: 94, areas: [
    { area: "Right Door Panel", type: "Scratch", sev: "Low", repair: "Buff & Paint", cost: { min: 150, max: 300 }, src: "right" },
    { area: "Right Fender", type: "Minor Dent", sev: "Low", repair: "PDR", cost: { min: 100, max: 200 }, src: "right" },
  ], totalEst: { min: 250, max: 500 }, structural: false, driveable: true, rec: "Approve for repair", fraud: [] },
  "CLM-0039": { severity: "Severe", confidence: 62, areas: [
    { area: "Rear Quarter Panel", type: "Structural Deformation", sev: "High", repair: "Replace", cost: { min: 2500, max: 4000 }, src: "rear" },
    { area: "Trunk Lid", type: "Crumple Damage", sev: "High", repair: "Replace", cost: { min: 1200, max: 1800 }, src: "rear" },
    { area: "Rear Bumper", type: "Shattered", sev: "High", repair: "Replace", cost: { min: 600, max: 900 }, src: "rear" },
    { area: "Tail Light", type: "Destroyed", sev: "High", repair: "Replace", cost: { min: 800, max: 1200 }, src: "rear" },
    { area: "Roof", type: "Hail Dents (12)", sev: "Medium", repair: "PDR", cost: { min: 400, max: 700 }, src: "top" },
  ], totalEst: { min: 5500, max: 8600 }, structural: true, driveable: false, rec: "Escalate — structural damage, >$5k", fraud: [{ type: "warning", msg: "Multiple damage types — verify timeline" }, { type: "info", msg: "Near total loss threshold" }] },
  "CLM-0038": { severity: "Minor", confidence: 92, areas: [
    { area: "Rear Bumper", type: "Scratch", sev: "Low", repair: "Buff & Paint", cost: { min: 180, max: 350 }, src: "rear" },
  ], totalEst: { min: 180, max: 350 }, structural: false, driveable: true, rec: "Approve for repair", fraud: [] },
  "CLM-0037": { severity: "Moderate", confidence: 85, areas: [
    { area: "Front Bumper", type: "Crack", sev: "Medium", repair: "Replace", cost: { min: 900, max: 1400 }, src: "front" },
    { area: "Front Sensor Array", type: "Misaligned", sev: "Medium", repair: "Recalibrate", cost: { min: 400, max: 600 }, src: "front" },
    { area: "Hood", type: "Dent", sev: "Low", repair: "PDR", cost: { min: 200, max: 350 }, src: "front" },
  ], totalEst: { min: 1500, max: 2350 }, structural: false, driveable: true, rec: "Approve for repair", fraud: [] },
  "CLM-0036": { severity: "Moderate", confidence: 78, areas: [
    { area: "Left Fender", type: "Dent", sev: "Medium", repair: "Panel Repair", cost: { min: 500, max: 800 }, src: "left" },
    { area: "Left Door", type: "Deep Scratch", sev: "Medium", repair: "Repaint", cost: { min: 600, max: 900 }, src: "left" },
    { area: "Left Mirror", type: "Cracked", sev: "Low", repair: "Replace", cost: { min: 150, max: 250 }, src: "left" },
  ], totalEst: { min: 1250, max: 1950 }, structural: false, driveable: true, rec: "Approve for repair", fraud: [] },
  "CLM-0035": { severity: "Severe", confidence: 71, areas: [
    { area: "Front Bumper", type: "Shattered", sev: "High", repair: "Replace", cost: { min: 1800, max: 2800 }, src: "front" },
    { area: "Radiator", type: "Punctured", sev: "High", repair: "Replace", cost: { min: 900, max: 1500 }, src: "front" },
    { area: "Hood", type: "Severe Crumple", sev: "High", repair: "Replace", cost: { min: 1200, max: 2000 }, src: "front" },
    { area: "Right Headlight", type: "Destroyed", sev: "High", repair: "Replace", cost: { min: 700, max: 1100 }, src: "front" },
  ], totalEst: { min: 4600, max: 7400 }, structural: true, driveable: false, rec: "Escalate — structural damage", fraud: [] },
  "CLM-0034": { severity: "Minor", confidence: 60, areas: [
    { area: "Right Rear Door", type: "Scratch", sev: "Low", repair: "Buff & Paint", cost: { min: 200, max: 350 }, src: "right" },
  ], totalEst: { min: 200, max: 350 }, structural: false, driveable: true, rec: "Review — low confidence, possible vehicle mismatch", fraud: [{ type: "warning", msg: "Vehicle attributes do NOT match policy — verify identity" }] },
};

const ts = (offset) => { const d = new Date(); d.setHours(d.getHours() - offset); return d.toISOString(); };

const INIT_CLAIMS = [
  { id: "CLM-0041", holder: "Ahmed Al-Rashid", policy: "POL-00312", date: "2026-04-04", vehicle: "2023 Toyota Camry", desc: "Front-end collision at intersection.", agent: "Jane Doe", status: "agent_review", severity: "Moderate", photos: mkP(["front","rear","left","right"]), video: null, assess: ASS["CLM-0041"], vehRec: VEH_REC["CLM-0041"], agentCosts: null, agentNotes: "", agentDecision: null, seniorNotes: "", seniorDecision: null, shop: null,
    history: [
      { ts: ts(48), actor: "System", action: "claim_created", detail: "Claim initiated by policyholder" },
      { ts: ts(47), actor: "System", action: "photos_uploaded", detail: "4 photos uploaded (front, rear, left, right)" },
      { ts: ts(46), actor: "AI Engine", action: "ai_complete", detail: "Assessment complete — Moderate severity, 87% confidence, $2,380 estimate" },
      { ts: ts(46), actor: "AI Engine", action: "vehicle_verified", detail: "Vehicle attributes verified: 2023 Toyota Camry Silver — 96% match" },
    ] },
  { id: "CLM-0040", holder: "Sara Johnson", policy: "POL-00287", date: "2026-04-03", vehicle: "2022 Honda Civic", desc: "Side scrape in parking garage.", agent: "Mark Chen", status: "authorized", severity: "Minor", photos: mkP(["front","rear","left","right"]), video: null, assess: ASS["CLM-0040"], vehRec: VEH_REC["CLM-0040"], agentCosts: { 0: 280, 1: 180 }, agentNotes: "Minor cosmetic damage, straightforward repair.", agentDecision: "approve", seniorNotes: "Agreed. Standard approval.", seniorDecision: "approve", shop: SHOPS[0],
    history: [
      { ts: ts(96), actor: "System", action: "claim_created", detail: "Claim initiated" },
      { ts: ts(95), actor: "AI Engine", action: "ai_complete", detail: "Minor severity, 94% confidence, $500 estimate" },
      { ts: ts(95), actor: "AI Engine", action: "vehicle_verified", detail: "2022 Honda Civic — 98% match" },
      { ts: ts(90), actor: "Mark Chen", action: "agent_modified", detail: "Adjusted total: $460 (was $500)" },
      { ts: ts(90), actor: "Mark Chen", action: "agent_approved", detail: "Recommended approval. Notes: Minor cosmetic damage." },
      { ts: ts(72), actor: "Sarah Kim (Senior)", action: "senior_approved", detail: "Approved. Assigned to AutoBody Pro — Downtown." },
    ] },
  { id: "CLM-0039", holder: "Omar Hassan", policy: "POL-00195", date: "2026-04-02", vehicle: "2024 BMW X5", desc: "Rear-ended at highway speed plus hail damage.", agent: "Lisa Patel", status: "senior_review", severity: "Severe", photos: mkP(["front","rear","left","right","top"]), video: { name: "walkaround.mp4", dur: "0:42" }, assess: ASS["CLM-0039"], vehRec: VEH_REC["CLM-0039"], agentCosts: { 0: 3800, 1: 1600, 2: 850, 3: 1100, 4: 650 }, agentNotes: "Structural damage confirmed visually. Recommend total loss evaluation.", agentDecision: "escalate", seniorNotes: "", seniorDecision: null, shop: null,
    history: [
      { ts: ts(120), actor: "System", action: "claim_created", detail: "Claim initiated" },
      { ts: ts(119), actor: "System", action: "photos_uploaded", detail: "5 photos + walkaround video uploaded" },
      { ts: ts(118), actor: "AI Engine", action: "ai_complete", detail: "Severe, 62% confidence, $8,600 estimate. Structural damage flagged." },
      { ts: ts(118), actor: "AI Engine", action: "vehicle_verified", detail: "2024 BMW X5 — 91% match" },
      { ts: ts(118), actor: "AI Engine", action: "fraud_flag", detail: "⚠ Multiple damage types from single incident — verify timeline" },
      { ts: ts(100), actor: "Lisa Patel", action: "agent_modified", detail: "Adjusted total: $8,000 (was $8,600)" },
      { ts: ts(100), actor: "Lisa Patel", action: "agent_escalated", detail: "Escalated. Notes: Structural damage confirmed, recommend total loss evaluation." },
    ] },
  { id: "CLM-0038", holder: "Fatima Al-Sayed", policy: "POL-00401", date: "2026-04-01", vehicle: "2023 Ford F-150", desc: "Backed into pole in driveway.", agent: "Jane Doe", status: "authorized", severity: "Minor", photos: mkP(["front","rear","left","right"]), video: null, assess: ASS["CLM-0038"], vehRec: VEH_REC["CLM-0038"], agentCosts: { 0: 320 }, agentNotes: "Simple bumper scratch.", agentDecision: "approve", seniorNotes: "Approved.", seniorDecision: "approve", shop: SHOPS[1],
    history: [
      { ts: ts(144), actor: "System", action: "claim_created", detail: "Claim initiated" },
      { ts: ts(143), actor: "AI Engine", action: "ai_complete", detail: "Minor, 92% confidence, $350 estimate" },
      { ts: ts(140), actor: "Jane Doe", action: "agent_approved", detail: "Approved at $320." },
      { ts: ts(130), actor: "Sarah Kim (Senior)", action: "senior_approved", detail: "Approved. Assigned to Premier Auto Repair." },
    ] },
  { id: "CLM-0037", holder: "David Park", policy: "POL-00455", date: "2026-03-31", vehicle: "2025 Tesla Model 3", desc: "Hit deer on highway, front-end damage.", agent: "Mark Chen", status: "agent_review", severity: "Moderate", photos: mkP(["front","rear","left","right"]), video: { name: "dashcam_clip.mp4", dur: "0:18" }, assess: ASS["CLM-0037"], vehRec: VEH_REC["CLM-0037"], agentCosts: null, agentNotes: "", agentDecision: null, seniorNotes: "", seniorDecision: null, shop: null,
    history: [
      { ts: ts(168), actor: "System", action: "claim_created", detail: "Claim initiated" },
      { ts: ts(167), actor: "AI Engine", action: "ai_complete", detail: "Moderate, 85% confidence, $2,350 estimate" },
      { ts: ts(167), actor: "AI Engine", action: "vehicle_verified", detail: "2025 Tesla Model 3 — 97% match" },
    ] },
  { id: "CLM-0036", holder: "Maria Garcia", policy: "POL-00478", date: "2026-03-30", vehicle: "2024 Hyundai Tucson", desc: "T-boned at parking lot exit.", agent: "Lisa Patel", status: "senior_review", severity: "Moderate", photos: mkP(["front","rear","left","right"]), video: null, assess: ASS["CLM-0036"], vehRec: VEH_REC["CLM-0036"], agentCosts: { 0: 750, 1: 850, 2: 220 }, agentNotes: "Left side damage consistent with T-bone. Mirror replacement needed.", agentDecision: "approve", seniorNotes: "", seniorDecision: null, shop: null,
    history: [
      { ts: ts(192), actor: "System", action: "claim_created", detail: "Claim initiated" },
      { ts: ts(191), actor: "AI Engine", action: "ai_complete", detail: "Moderate, 78% confidence, $1,950 estimate" },
      { ts: ts(170), actor: "Lisa Patel", action: "agent_modified", detail: "Adjusted total: $1,820 (was $1,950)" },
      { ts: ts(170), actor: "Lisa Patel", action: "agent_approved", detail: "Recommended approval." },
    ] },
  { id: "CLM-0035", holder: "James Wilson", policy: "POL-00510", date: "2026-03-29", vehicle: "2023 Mercedes C300", desc: "Head-on collision with utility pole.", agent: "Jane Doe", status: "rejected", severity: "Severe", photos: mkP(["front","rear","left","right"]), video: null, assess: ASS["CLM-0035"], vehRec: VEH_REC["CLM-0035"], agentCosts: { 0: 2600, 1: 1400, 2: 1800, 3: 1000 }, agentNotes: "Extensive front-end damage. Likely total loss.", agentDecision: "escalate", seniorNotes: "Total loss declared. Claim processed through total loss pathway.", seniorDecision: "reject", shop: null,
    history: [
      { ts: ts(240), actor: "System", action: "claim_created", detail: "Claim initiated" },
      { ts: ts(239), actor: "AI Engine", action: "ai_complete", detail: "Severe, 71% confidence, $7,400 estimate. Structural damage." },
      { ts: ts(220), actor: "Jane Doe", action: "agent_escalated", detail: "Escalated. Likely total loss." },
      { ts: ts(200), actor: "Sarah Kim (Senior)", action: "senior_rejected", detail: "Total loss declared. Processed through total loss pathway." },
    ] },
  { id: "CLM-0034", holder: "Noor Abbasi", policy: "POL-00533", date: "2026-03-28", vehicle: "2024 Kia Sportage", desc: "Minor scrape on right side.", agent: "Mark Chen", status: "new", severity: null, photos: mkP(["front","rear","left","right"]), video: null, assess: null, vehRec: null, agentCosts: null, agentNotes: "", agentDecision: null, seniorNotes: "", seniorDecision: null, shop: null,
    history: [
      { ts: ts(288), actor: "System", action: "claim_created", detail: "Claim initiated" },
      { ts: ts(287), actor: "System", action: "photos_uploaded", detail: "4 photos uploaded" },
    ] },
];

const STATUS_CFG = {
  new: { label: "New", color: "#3b82f6", bg: "#dbeafe" },
  ai_analysis: { label: "AI Analyzing", color: "#f59e0b", bg: "#fef3c7" },
  agent_review: { label: "Agent Review", color: "#8b5cf6", bg: "#ede9fe" },
  senior_review: { label: "Senior Review", color: "#f97316", bg: "#ffedd5" },
  authorized: { label: "Authorized", color: "#10b981", bg: "#d1fae5" },
  rejected: { label: "Rejected", color: "#6b7280", bg: "#f3f4f6" },
};
const SEV_C = { Low: "#10b981", Medium: "#f59e0b", High: "#ef4444", Minor: "#10b981", Moderate: "#f59e0b", Severe: "#ef4444" };
const WORKFLOW = [{ key: "new", label: "Intake", icon: "📋" }, { key: "ai_analysis", label: "AI Analysis", icon: "🤖" }, { key: "agent_review", label: "Agent Review", icon: "👤" }, { key: "senior_review", label: "Senior Review", icon: "👔" }, { key: "authorized", label: "Authorized", icon: "✅" }];
const HIST_ICONS = { claim_created: "📋", photos_uploaded: "📷", ai_complete: "🤖", vehicle_verified: "🔍", fraud_flag: "⚠️", agent_approved: "✅", agent_escalated: "↑", agent_rejected: "✕", agent_modified: "✏️", senior_approved: "✅", senior_rejected: "✕", senior_returned: "↩", senior_modified: "✏️" };
const HIST_COLORS = { claim_created: "#3b82f6", photos_uploaded: "#3b82f6", ai_complete: "#6366f1", vehicle_verified: "#6366f1", fraud_flag: "#ef4444", agent_approved: "#10b981", agent_escalated: "#f97316", agent_rejected: "#ef4444", agent_modified: "#f59e0b", senior_approved: "#10b981", senior_rejected: "#ef4444", senior_returned: "#f97316", senior_modified: "#f59e0b" };

const INIT_FB = [
  { id: 1, claimId: "CLM-0038", date: "2026-04-01", rating: "accurate", cat: "damage_type", comment: "Correct", adj: 0 },
  { id: 2, claimId: "CLM-0037", date: "2026-03-31", rating: "overestimated", cat: "cost", comment: "PDR suffices", adj: -450 },
  { id: 3, claimId: "CLM-0036", date: "2026-03-30", rating: "missed_damage", cat: "detection", comment: "Missed door dent", adj: 320 },
  { id: 4, claimId: "CLM-0035", date: "2026-03-29", rating: "accurate", cat: "severity", comment: "", adj: 0 },
  { id: 5, claimId: "CLM-0034", date: "2026-03-28", rating: "underestimated", cat: "cost", comment: "Paint blending", adj: 600 },
  { id: 6, claimId: "CLM-0033", date: "2026-03-27", rating: "accurate", cat: "vehicle_id", comment: "Perfect match", adj: 0 },
];

/* ═══ STYLES ═══ */
const F = "'DM Sans','Segoe UI',sans-serif", Mo = "'JetBrains Mono','Fira Code',monospace";
const Z = { bg: "#0f1117", surf: "#1a1d27", hov: "#22263a", brd: "#2a2e3e", acc: "#6366f1", accL: "#818cf8", txt: "#e2e8f0", mut: "#94a3b8", ok: "#10b981", warn: "#f59e0b", err: "#ef4444", ora: "#f97316" };
const card = { background: Z.surf, borderRadius: 12, border: `1px solid ${Z.brd}`, padding: 24 };
const lbl = { display: "block", fontSize: 11, fontWeight: 600, color: Z.mut, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 };
const inp = { width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${Z.brd}`, background: Z.bg, color: Z.txt, fontSize: 14, fontFamily: F, outline: "none", boxSizing: "border-box" };
const btnS = (bg, col) => ({ padding: "10px 20px", borderRadius: 10, border: bg === "transparent" ? `1px solid ${col}` : "none", background: bg, color: bg === "transparent" ? col : "#fff", cursor: "pointer", fontSize: 13, fontFamily: F, fontWeight: 600 });

/* ═══════════════ COMPONENT ═══════════════ */
export default function ClaimsAI() {
  const [view, setView] = useState("dashboard");
  const [claims, setClaims] = useState(INIT_CLAIMS);
  const [activeId, setActiveId] = useState(null);
  const [tab, setTab] = useState("pipeline");
  const [form, setForm] = useState({ policy: "", name: "", make: "", model: "", year: "", desc: "" });
  const [newPhotos, setNewPhotos] = useState({});
  const [newVideo, setNewVideo] = useState(null);
  const [formTouched, setFormTouched] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState("");
  const [editCosts, setEditCosts] = useState({});
  const [editNotes, setEditNotes] = useState("");
  const [editSeniorNotes, setEditSeniorNotes] = useState("");
  const [editShop, setEditShop] = useState(null);
  const [fStatus, setFStatus] = useState("all");
  const [fAgent, setFAgent] = useState("all");
  const [fSev, setFSev] = useState("all");
  const [fFrom, setFFrom] = useState("");
  const [fTo, setFTo] = useState("");
  const [selAngle, setSelAngle] = useState("front");
  const [fb, setFb] = useState(INIT_FB);
  const [showFb, setShowFb] = useState(false);
  const [fbForm, setFbForm] = useState({ rating: "", cat: "", comment: "" });

  const cl = claims.find(c => c.id === activeId) || null;

  const upd = (id, patch) => setClaims(cs => cs.map(c => c.id === id ? { ...c, ...patch } : c));
  const addHist = (id, actor, action, detail) => {
    setClaims(cs => cs.map(c => c.id === id ? { ...c, history: [...(c.history || []), { ts: new Date().toISOString(), actor, action, detail }] } : c));
  };

  const stageIdx = (s) => { const i = WORKFLOW.findIndex(w => w.key === s); return i >= 0 ? i : 0; };
  const fbStats = useMemo(() => { const t = fb.length, a = fb.filter(f => f.rating === "accurate").length; return { total: t, rate: t ? Math.round(a / t * 100) : 0, avgAdj: t ? Math.round(fb.reduce((s, f) => s + Math.abs(f.adj), 0) / t) : 0 }; }, [fb]);

  const filtered = useMemo(() => claims.filter(c => {
    if (fStatus !== "all" && c.status !== fStatus) return false;
    if (fAgent !== "all" && c.agent !== fAgent) return false;
    if (fSev !== "all" && c.severity !== fSev) return false;
    if (fFrom && c.date < fFrom) return false;
    if (fTo && c.date > fTo) return false;
    return true;
  }), [claims, fStatus, fAgent, fSev, fFrom, fTo]);

  // Form validation
  const reqPhotos = ANGLES.filter(a => a.req).map(a => a.key);
  const hasAllPhotos = reqPhotos.every(k => newPhotos[k]);
  const formFields = [form.policy, form.name, form.make, form.model, form.year, form.desc];
  const allFieldsFilled = formFields.every(f => f.trim().length > 0);
  const formValid = allFieldsFilled && hasAllPhotos;
  const missingFields = [];
  if (!form.policy.trim()) missingFields.push("Policy Number");
  if (!form.name.trim()) missingFields.push("Policyholder Name");
  if (!form.make.trim()) missingFields.push("Vehicle Make");
  if (!form.model.trim()) missingFields.push("Vehicle Model");
  if (!form.year.trim()) missingFields.push("Vehicle Year");
  if (!form.desc.trim()) missingFields.push("Accident Description");
  const missingPhotos = reqPhotos.filter(k => !newPhotos[k]).map(k => ANGLES.find(a => a.key === k)?.label);

  const openClaim = (c) => {
    setActiveId(c.id); setTab("pipeline"); setSelAngle("front");
    const costs = {}; if (c.assess) c.assess.areas.forEach((d, i) => { costs[i] = (c.agentCosts || {})[i] ?? d.cost.max; }); setEditCosts(costs);
    setEditNotes(c.agentNotes || ""); setEditSeniorNotes(c.seniorNotes || ""); setEditShop(c.shop || null); setShowFb(false); setView("claim");
  };

  const newClaimView = () => { setView("new_claim"); setForm({ policy: "", name: "", make: "", model: "", year: "", desc: "" }); setNewPhotos({}); setNewVideo(null); setFormTouched(false); };

  const submitNew = () => {
    setFormTouched(true);
    if (!formValid) return;
    const id = `CLM-${String(42 + claims.length).padStart(4, "0")}`;
    const c = { id, holder: form.name, policy: form.policy, date: new Date().toISOString().split("T")[0], vehicle: `${form.year} ${form.make} ${form.model}`, desc: form.desc, agent: "Jane Doe", status: "new", severity: null, photos: { ...newPhotos }, video: newVideo, assess: null, vehRec: null, agentCosts: null, agentNotes: "", agentDecision: null, seniorNotes: "", seniorDecision: null, shop: null,
      history: [{ ts: new Date().toISOString(), actor: "System", action: "claim_created", detail: "Claim initiated by policyholder" }, { ts: new Date().toISOString(), actor: "System", action: "photos_uploaded", detail: `${Object.keys(newPhotos).length} photos${newVideo ? " + video" : ""} uploaded` }] };
    setClaims([c, ...claims]); openClaim(c);
  };

  const steps = ["Detecting vehicle in all submitted angles...", "Recognizing vehicle make, model, year, color...", "Reading license plate and partial VIN...", "Validating attributes against policy database...", "Segmenting damage regions across all views...", "Classifying damage types per region...", "Assessing severity per damage area...", "Cross-referencing OEM parts catalog...", "Computing regional labor rates...", "Running fraud signal analysis...", "Compiling multi-angle assessment report..."];

  const runAI = () => {
    setAnalyzing(true); setProgress(0); upd(activeId, { status: "ai_analysis" });
    let step = 0;
    const iv = setInterval(() => { step++; setProgress((step / steps.length) * 100); setStepText(steps[Math.min(step - 1, steps.length - 1)]);
      if (step >= steps.length) { clearInterval(iv); setTimeout(() => {
        setAnalyzing(false);
        const assess = ASS[activeId] || ASS["CLM-0041"], vr = VEH_REC[activeId] || VEH_REC["CLM-0041"];
        const costs = {}; assess.areas.forEach((d, i) => { costs[i] = d.cost.max; }); setEditCosts(costs); setEditNotes("");
        upd(activeId, { status: "agent_review", assess, vehRec: vr, severity: assess.severity, agentCosts: null, agentNotes: "", agentDecision: null });
        addHist(activeId, "AI Engine", "ai_complete", `${assess.severity} severity, ${assess.confidence}% confidence, $${assess.totalEst.max} estimate`);
        addHist(activeId, "AI Engine", "vehicle_verified", `${vr.year} ${vr.make} ${vr.model} ${vr.color} — ${vr.conf}% ${vr.match ? "match" : "MISMATCH"}`);
        if (assess.fraud?.length) assess.fraud.forEach(f => addHist(activeId, "AI Engine", "fraud_flag", f.msg));
      }, 400); }
    }, 420);
  };

  const agentSubmit = (decision) => {
    const tot = cl.assess.areas.reduce((s, d, i) => s + (editCosts[i] ?? d.cost.max), 0);
    const aiT = cl.assess.totalEst.max;
    if (tot !== aiT) addHist(activeId, cl.agent, "agent_modified", `Adjusted total: $${tot.toLocaleString()} (AI was $${aiT.toLocaleString()})`);
    const actionMap = { approve: "agent_approved", escalate: "agent_escalated", reject: "agent_rejected" };
    const labelMap = { approve: "Recommended approval", escalate: "Escalated for review", reject: "Recommended rejection" };
    addHist(activeId, cl.agent, actionMap[decision], `${labelMap[decision]}.${editNotes ? ` Notes: ${editNotes}` : ""}`);
    upd(activeId, { agentCosts: { ...editCosts }, agentNotes: editNotes, agentDecision: decision, status: "senior_review" });
  };

  const seniorDecide = (decision) => {
    const seniorName = "Sarah Kim (Senior)";
    if (decision === "approve" || decision === "modify") {
      if (!editShop) return;
      const finalCosts = decision === "modify" ? { ...editCosts } : cl.agentCosts;
      if (decision === "modify") {
        const modTot = cl.assess.areas.reduce((s, d, i) => s + (editCosts[i] ?? d.cost.max), 0);
        addHist(activeId, seniorName, "senior_modified", `Modified total to $${modTot.toLocaleString()}`);
      }
      addHist(activeId, seniorName, "senior_approved", `Approved. Assigned to ${editShop.name}.${editSeniorNotes ? ` Notes: ${editSeniorNotes}` : ""}`);
      upd(activeId, { agentCosts: finalCosts, seniorNotes: editSeniorNotes, seniorDecision: "approve", status: "authorized", shop: editShop });
    } else if (decision === "return") {
      addHist(activeId, seniorName, "senior_returned", `Returned to agent.${editSeniorNotes ? ` Notes: ${editSeniorNotes}` : ""}`);
      upd(activeId, { seniorNotes: editSeniorNotes, seniorDecision: null, status: "agent_review", agentDecision: null });
      setEditNotes("");
    } else if (decision === "reject") {
      addHist(activeId, seniorName, "senior_rejected", `Rejected.${editSeniorNotes ? ` Notes: ${editSeniorNotes}` : ""}`);
      upd(activeId, { seniorNotes: editSeniorNotes, seniorDecision: "reject", status: "rejected" });
    }
  };

  const Badge = ({ status }) => { const s = STATUS_CFG[status] || STATUS_CFG.new; return <span style={{ padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600, color: s.color, background: s.bg, whiteSpace: "nowrap" }}>{s.label}</span>; };

  const Stepper = ({ current }) => { const ci = stageIdx(current === "rejected" ? "senior_review" : current); return (<div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
    {WORKFLOW.map((w, i) => { const done = i < ci, act = i === ci; return (<div key={w.key} style={{ display: "flex", alignItems: "center", flex: i < WORKFLOW.length - 1 ? 1 : "none" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 72 }}><div style={{ width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: done ? Z.ok : act ? Z.acc : Z.bg, border: `2px solid ${done ? Z.ok : act ? Z.acc : Z.brd}`, color: done || act ? "#fff" : Z.mut }}>{done ? "✓" : w.icon}</div><div style={{ fontSize: 10, marginTop: 5, fontWeight: act ? 600 : 400, color: done ? Z.ok : act ? Z.accL : Z.mut, textAlign: "center" }}>{w.label}</div></div>
      {i < WORKFLOW.length - 1 && <div style={{ flex: 1, height: 2, margin: "0 6px", marginBottom: 18, background: done ? Z.ok : Z.brd }} />}
    </div>); })}
  </div>); };

  // Refresh after state updates
  const assess = cl?.assess, vr = cl?.vehRec, photos = cl?.photos || {}, video = cl?.video, history = cl?.history || [];

  return (
    <div style={{ fontFamily: F, background: Z.bg, color: Z.txt, minHeight: "100vh", display: "flex" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}} .fi{animation:fi .3s ease} .hr:hover{background:${Z.hov}!important} select{appearance:auto}`}</style>

      {/* SIDEBAR */}
      <div style={{ width: 250, background: Z.surf, borderRight: `1px solid ${Z.brd}`, padding: "24px 14px", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28, padding: "0 6px" }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${Z.acc}, #a855f7)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#fff" }}>C</div>
          <div><div style={{ fontWeight: 700, fontSize: 15 }}>ClaimsAI</div><div style={{ fontSize: 10, color: Z.mut }}>Intelligent Assessment</div></div>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {[{ id: "dashboard", icon: "📊", l: "Dashboard" }, { id: "ai_perf", icon: "🤖", l: "AI Performance" }].map(n => (
            <button key={n.id} onClick={() => { setView(n.id); setActiveId(null); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 11px", borderRadius: 8, border: "none", background: view === n.id ? `${Z.acc}22` : "transparent", color: view === n.id ? Z.accL : Z.mut, cursor: "pointer", fontSize: 13, fontFamily: F, fontWeight: 500, textAlign: "left" }}><span>{n.icon}</span> {n.l}</button>
          ))}
        </nav>
        <button onClick={newClaimView} style={{ marginTop: 14, padding: "11px 14px", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${Z.acc}, #7c3aed)`, color: "#fff", cursor: "pointer", fontSize: 13, fontFamily: F, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><span style={{ fontSize: 16 }}>+</span> New Claim</button>
        <div style={{ marginTop: 20, padding: "12px 10px", background: Z.bg, borderRadius: 10 }}>
          <div style={{ fontSize: 10, color: Z.mut, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8, fontWeight: 600 }}>AI Model Health</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}><span style={{ fontSize: 11, color: Z.mut }}>Accuracy</span><span style={{ fontSize: 11, fontWeight: 600, color: fbStats.rate >= 70 ? Z.ok : Z.warn }}>{fbStats.rate}%</span></div>
          <div style={{ background: Z.brd, borderRadius: 4, height: 5, overflow: "hidden", marginBottom: 8 }}><div style={{ height: "100%", width: `${fbStats.rate}%`, background: fbStats.rate >= 70 ? Z.ok : Z.warn, borderRadius: 4 }} /></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 10, color: Z.mut }}>Avg adj.</span><span style={{ fontSize: 10, fontWeight: 600, color: Z.warn }}>${fbStats.avgAdj}</span></div>
        </div>
        <div style={{ marginTop: "auto", padding: "10px 6px", borderTop: `1px solid ${Z.brd}`, paddingTop: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: Z.acc, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#fff" }}>JD</div>
            <div><div style={{ fontSize: 12, fontWeight: 500 }}>Jane Doe</div><div style={{ fontSize: 10, color: Z.mut }}>Senior Claims Agent</div></div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: 28, overflowY: "auto", maxHeight: "100vh" }}>

        {/* ════ DASHBOARD ════ */}
        {view === "dashboard" && (<div className="fi">
          <div style={{ marginBottom: 22 }}><h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Claims Dashboard</h1><p style={{ color: Z.mut, margin: "4px 0 0", fontSize: 13 }}>AI-assisted damage assessment pipeline</p></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
            {[{ l: "Open", v: claims.filter(c => !["authorized","rejected"].includes(c.status)).length, s: `${claims.length} total`, c: Z.acc }, { l: "AI Assessed", v: "847", s: "Month", c: Z.ok }, { l: "Avg Time", v: "4.2m", s: "-68%", c: Z.warn }, { l: "Saved", v: "$124K", s: "Quarter", c: "#a855f7" }].map((s, i) => (<div key={i} style={{ ...card, padding: 18 }}><div style={{ fontSize: 10, color: Z.mut, marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.l}</div><div style={{ fontSize: 26, fontWeight: 700, color: s.c }}>{s.v}</div><div style={{ fontSize: 11, color: Z.mut, marginTop: 3 }}>{s.s}</div></div>))}
          </div>
          {/* Filters */}
          <div style={{ ...card, padding: 14, marginBottom: 14, display: "flex", gap: 10, alignItems: "flex-end", flexWrap: "wrap" }}>
            <div><label style={{ ...lbl, marginBottom: 3, fontSize: 10 }}>Status</label><select value={fStatus} onChange={e => setFStatus(e.target.value)} style={{ ...inp, padding: "7px 8px", fontSize: 12, width: 140 }}><option value="all">All</option>{Object.entries(STATUS_CFG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select></div>
            <div><label style={{ ...lbl, marginBottom: 3, fontSize: 10 }}>Agent</label><select value={fAgent} onChange={e => setFAgent(e.target.value)} style={{ ...inp, padding: "7px 8px", fontSize: 12, width: 130 }}><option value="all">All</option>{AGENTS.map(a => <option key={a} value={a}>{a}</option>)}</select></div>
            <div><label style={{ ...lbl, marginBottom: 3, fontSize: 10 }}>Severity</label><select value={fSev} onChange={e => setFSev(e.target.value)} style={{ ...inp, padding: "7px 8px", fontSize: 12, width: 120 }}><option value="all">All</option>{["Minor","Moderate","Severe"].map(s => <option key={s} value={s}>{s}</option>)}</select></div>
            <div><label style={{ ...lbl, marginBottom: 3, fontSize: 10 }}>From</label><input type="date" value={fFrom} onChange={e => setFFrom(e.target.value)} style={{ ...inp, padding: "7px 8px", fontSize: 12, width: 140 }} /></div>
            <div><label style={{ ...lbl, marginBottom: 3, fontSize: 10 }}>To</label><input type="date" value={fTo} onChange={e => setFTo(e.target.value)} style={{ ...inp, padding: "7px 8px", fontSize: 12, width: 140 }} /></div>
            <button onClick={() => { setFStatus("all"); setFAgent("all"); setFSev("all"); setFFrom(""); setFTo(""); }} style={{ padding: "7px 12px", borderRadius: 6, border: `1px solid ${Z.brd}`, background: "transparent", color: Z.mut, cursor: "pointer", fontSize: 11, fontFamily: F }}>Clear</button>
          </div>
          <div style={{ ...card, padding: 0 }}>
            <div style={{ padding: "12px 20px", borderBottom: `1px solid ${Z.brd}` }}><h2 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Claims ({filtered.length})</h2></div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}><thead><tr style={{ borderBottom: `1px solid ${Z.brd}` }}>{["ID", "Policyholder", "Vehicle", "Date", "Agent", "Severity", "Status", ""].map(h => <th key={h} style={{ textAlign: "left", padding: "9px 16px", fontSize: 10, color: Z.mut, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>)}</tr></thead>
              <tbody>{filtered.map(c => (<tr key={c.id} className="hr" style={{ borderBottom: `1px solid ${Z.brd}`, cursor: "pointer", background: "transparent" }} onClick={() => openClaim(c)}>
                <td style={{ padding: "11px 16px", fontFamily: Mo, fontSize: 11 }}>{c.id}</td><td style={{ padding: "11px 16px", fontSize: 13 }}>{c.holder}</td><td style={{ padding: "11px 16px", fontSize: 12, color: Z.mut }}>{c.vehicle}</td><td style={{ padding: "11px 16px", fontSize: 12, color: Z.mut }}>{c.date}</td><td style={{ padding: "11px 16px", fontSize: 12, color: Z.mut }}>{c.agent}</td>
                <td style={{ padding: "11px 16px" }}>{c.severity ? <span style={{ fontSize: 10, fontWeight: 600, color: SEV_C[c.severity], background: `${SEV_C[c.severity]}18`, padding: "2px 7px", borderRadius: 4 }}>{c.severity}</span> : "—"}</td>
                <td style={{ padding: "11px 16px" }}><Badge status={c.status} /></td>
                <td style={{ padding: "11px 16px" }}><button onClick={e => { e.stopPropagation(); openClaim(c); }} style={{ padding: "4px 10px", borderRadius: 5, border: `1px solid ${Z.brd}`, background: "transparent", color: Z.accL, cursor: "pointer", fontSize: 11, fontFamily: F }}>View</button></td>
              </tr>))}</tbody></table>
          </div>
        </div>)}

        {/* ════ AI PERF ════ */}
        {view === "ai_perf" && (<div className="fi">
          <div style={{ marginBottom: 22 }}><h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>AI Model Performance</h1></div>
          <div style={{ ...card, padding: 0 }}>
            <div style={{ padding: "12px 20px", borderBottom: `1px solid ${Z.brd}` }}><h3 style={{ fontSize: 13, fontWeight: 600, margin: 0, color: Z.mut, textTransform: "uppercase" }}>Feedback Log</h3></div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}><thead><tr style={{ borderBottom: `1px solid ${Z.brd}` }}>{["Date", "Claim", "Rating", "Category", "Adj.", "Comment"].map(h => <th key={h} style={{ textAlign: "left", padding: "9px 16px", fontSize: 10, color: Z.mut, fontWeight: 600, textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
              <tbody>{fb.map(f => { const rc = { accurate: { l: "Accurate", c: Z.ok, b: "#d1fae5" }, overestimated: { l: "Over", c: Z.ora, b: "#ffedd5" }, underestimated: { l: "Under", c: Z.err, b: "#fee2e2" }, missed_damage: { l: "Missed", c: "#a855f7", b: "#ede9fe" } }[f.rating] || { l: f.rating, c: Z.mut, b: Z.bg }; return (
                <tr key={f.id} style={{ borderBottom: `1px solid ${Z.brd}` }}><td style={{ padding: "9px 16px", fontSize: 12, color: Z.mut }}>{f.date}</td><td style={{ padding: "9px 16px", fontSize: 11, fontFamily: Mo }}>{f.claimId}</td><td style={{ padding: "9px 16px" }}><span style={{ padding: "2px 7px", borderRadius: 4, fontSize: 10, fontWeight: 600, color: rc.c, background: rc.b }}>{rc.l}</span></td><td style={{ padding: "9px 16px", fontSize: 12, color: Z.mut, textTransform: "capitalize" }}>{f.cat.replace("_", " ")}</td><td style={{ padding: "9px 16px", fontSize: 12, fontFamily: Mo, color: f.adj === 0 ? Z.ok : f.adj > 0 ? Z.err : Z.ora }}>{f.adj === 0 ? "—" : `${f.adj > 0 ? "+" : ""}$${f.adj}`}</td><td style={{ padding: "9px 16px", fontSize: 12, color: Z.mut, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.comment || "—"}</td></tr>); })}</tbody>
            </table>
          </div>
        </div>)}

        {/* ════ NEW CLAIM (validated) ════ */}
        {view === "new_claim" && (<div className="fi" style={{ maxWidth: 780 }}>
          <button onClick={() => setView("dashboard")} style={{ background: "none", border: "none", color: Z.mut, cursor: "pointer", fontSize: 13, fontFamily: F, marginBottom: 16 }}>← Back</button>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 20px" }}>Initiate New Claim</h1>
          <div style={{ ...card }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[{ k: "policy", l: "Policy Number *", p: "POL-2024-00123" }, { k: "name", l: "Policyholder Name *", p: "Full name" }, { k: "make", l: "Vehicle Make *", p: "Toyota" }, { k: "model", l: "Vehicle Model *", p: "Camry" }].map(f => (
                <div key={f.k}><label style={lbl}>{f.l}</label><input value={form[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })} placeholder={f.p} style={{ ...inp, borderColor: formTouched && !form[f.k].trim() ? Z.err : Z.brd }} /></div>
              ))}
              <div><label style={lbl}>Vehicle Year *</label><input value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} placeholder="2023" style={{ ...inp, borderColor: formTouched && !form.year.trim() ? Z.err : Z.brd }} /></div>
            </div>
            <div style={{ marginTop: 14 }}><label style={lbl}>Accident Description *</label><textarea value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} placeholder="Describe the accident..." rows={3} style={{ ...inp, resize: "vertical", borderColor: formTouched && !form.desc.trim() ? Z.err : Z.brd }} /></div>
            <div style={{ marginTop: 18 }}>
              <label style={lbl}>Damage Photos — All Angles *</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
                {ANGLES.map(a => { const p = newPhotos[a.key]; const missing = formTouched && a.req && !p; return (
                  <div key={a.key} onClick={() => { const i = document.createElement("input"); i.type = "file"; i.accept = "image/*"; i.onchange = (e) => { const file = e.target.files?.[0]; if (!file) return; const r = new FileReader(); r.onload = (ev) => setNewPhotos(prev => ({ ...prev, [a.key]: { src: ev.target.result } })); r.readAsDataURL(file); }; i.click(); }}
                    style={{ borderRadius: 10, border: `2px ${p ? "solid" : "dashed"} ${p ? Z.ok : missing ? Z.err : a.req ? Z.acc + "60" : Z.brd}`, cursor: "pointer", overflow: "hidden", background: Z.bg, textAlign: "center", aspectRatio: "4/3", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    {p ? <img src={p.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} /> : <><div style={{ fontSize: 18 }}>{a.icon}</div><div style={{ fontSize: 10, color: missing ? Z.err : Z.mut, marginTop: 3 }}>{a.label}</div>{a.req && <div style={{ fontSize: 9, color: missing ? Z.err : Z.acc, marginTop: 1 }}>{missing ? "Missing!" : "Required"}</div>}</>}
                    {p && <div style={{ position: "absolute", top: 3, right: 3, width: 16, height: 16, borderRadius: "50%", background: Z.ok, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff" }}>✓</div>}
                  </div>); })}
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <label style={lbl}>Walkaround Video (optional)</label>
              <div onClick={() => { const i = document.createElement("input"); i.type = "file"; i.accept = "video/*"; i.onchange = (e) => { const f = e.target.files?.[0]; if (f) setNewVideo({ name: f.name, dur: `${(f.size / 1024 / 1024).toFixed(1)}MB` }); }; i.click(); }}
                style={{ border: `2px dashed ${newVideo ? Z.ok : Z.brd}`, borderRadius: 10, padding: 12, textAlign: "center", cursor: "pointer", background: Z.bg, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                {newVideo ? <><span>🎬</span><span style={{ fontSize: 12 }}>{newVideo.name}</span><span style={{ color: Z.ok }}>✓</span></> : <><span>🎬</span><span style={{ fontSize: 12, color: Z.mut }}>Upload walkaround video</span></>}
              </div>
            </div>

            {/* Validation summary */}
            {formTouched && !formValid && (<div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 10, background: `${Z.err}10`, border: `1px solid ${Z.err}30` }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: Z.err, marginBottom: 6 }}>Please complete all required fields:</div>
              {missingFields.length > 0 && <div style={{ fontSize: 12, color: Z.err, marginBottom: 4 }}>Missing fields: {missingFields.join(", ")}</div>}
              {missingPhotos.length > 0 && <div style={{ fontSize: 12, color: Z.err }}>Missing photos: {missingPhotos.join(", ")}</div>}
            </div>)}

            <button onClick={submitNew} style={{ marginTop: 20, width: "100%", padding: "14px", borderRadius: 10, border: "none", background: formValid ? `linear-gradient(135deg, ${Z.acc}, #7c3aed)` : Z.brd, color: formValid ? "#fff" : Z.mut, cursor: "pointer", fontSize: 15, fontFamily: F, fontWeight: 600 }}>Submit Claim</button>
          </div>
        </div>)}

        {/* ════ CLAIM VIEW ════ */}
        {view === "claim" && cl && (<div className="fi">
          <button onClick={() => setView("dashboard")} style={{ background: "none", border: "none", color: Z.mut, cursor: "pointer", fontSize: 13, fontFamily: F, marginBottom: 14 }}>← Back</button>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div><h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>{cl.id}</h1><p style={{ color: Z.mut, margin: "3px 0 0", fontSize: 13 }}>{cl.holder} · {cl.vehicle} · {cl.policy} · Agent: {cl.agent}</p>{cl.desc && <p style={{ color: Z.mut, margin: "5px 0 0", fontSize: 12, fontStyle: "italic" }}>"{cl.desc}"</p>}</div>
            <Badge status={cl.status} />
          </div>
          <Stepper current={cl.status} />
          <div style={{ display: "flex", gap: 4, marginBottom: 18, background: Z.surf, borderRadius: 10, padding: 4, border: `1px solid ${Z.brd}`, width: "fit-content" }}>
            {[{ id: "pipeline", l: "Pipeline" }, { id: "media", l: `Media` }, { id: "history", l: `History (${history.length})` }, { id: "feedback", l: "Feedback" }].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "7px 16px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 500, fontFamily: F, cursor: "pointer", background: tab === t.id ? Z.acc : "transparent", color: tab === t.id ? "#fff" : Z.mut }}>{t.l}</button>
            ))}
          </div>

          {/* Media */}
          {tab === "media" && (<div className="fi"><div style={{ ...card }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, margin: "0 0 12px", color: Z.mut, textTransform: "uppercase", letterSpacing: 0.5 }}>Multi-Angle Photos</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginBottom: 14 }}>
              {ANGLES.map(a => { const p = photos[a.key]; return (<div key={a.key} onClick={() => p && setSelAngle(a.key)} style={{ borderRadius: 8, overflow: "hidden", border: `2px solid ${selAngle === a.key && p ? Z.acc : p ? Z.ok : Z.brd}`, cursor: p ? "pointer" : "default", aspectRatio: "4/3", background: Z.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", opacity: p ? 1 : 0.3 }}>
                {p ? <img src={p.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 10, color: Z.mut }}>{a.label}</span>}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.6)", padding: "2px 4px", fontSize: 9, color: "#fff", textAlign: "center" }}>{a.label}</div>
              </div>); })}
            </div>
            {photos[selAngle] && <img src={photos[selAngle].src} alt="" style={{ width: "100%", maxHeight: 340, objectFit: "contain", borderRadius: 8, background: Z.bg }} />}
            {video && (<div style={{ marginTop: 16, background: Z.bg, borderRadius: 8, padding: 14, display: "flex", alignItems: "center", gap: 12 }}><span style={{ fontSize: 22 }}>🎬</span><div><div style={{ fontWeight: 600, fontSize: 13 }}>{video.name}</div><div style={{ fontSize: 11, color: Z.mut }}>{video.dur}</div></div></div>)}
          </div></div>)}

          {/* ── History Timeline ── */}
          {tab === "history" && (<div className="fi"><div style={{ ...card }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, margin: "0 0 16px", color: Z.mut, textTransform: "uppercase", letterSpacing: 0.5 }}>Interaction History</h3>
            <div style={{ position: "relative", paddingLeft: 28 }}>
              <div style={{ position: "absolute", left: 10, top: 4, bottom: 4, width: 2, background: Z.brd }} />
              {[...history].reverse().map((h, i) => {
                const col = HIST_COLORS[h.action] || Z.acc;
                const icon = HIST_ICONS[h.action] || "•";
                const time = new Date(h.ts);
                const timeStr = `${time.toLocaleDateString()} ${time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
                return (<div key={i} style={{ position: "relative", marginBottom: 18, paddingLeft: 18 }}>
                  <div style={{ position: "absolute", left: -22, top: 2, width: 22, height: 22, borderRadius: "50%", background: `${col}20`, border: `2px solid ${col}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>{icon}</div>
                  <div style={{ fontSize: 10, color: Z.mut, marginBottom: 2 }}>{timeStr}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: col, marginBottom: 2 }}>{h.actor}</div>
                  <div style={{ fontSize: 12, color: Z.txt, lineHeight: 1.5 }}>{h.detail}</div>
                </div>);
              })}
            </div>
          </div></div>)}

          {/* Pipeline */}
          {tab === "pipeline" && (<div className="fi">
            {cl.status === "new" && (<div style={{ ...card, textAlign: "center", padding: 36 }}><div style={{ fontSize: 36, marginBottom: 10 }}>🤖</div><h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Ready for AI Analysis</h3><p style={{ color: Z.mut, fontSize: 13, marginBottom: 18 }}>AI will analyze all photos{video ? " + video" : ""}, recognize vehicle attributes, and estimate costs.</p><button onClick={runAI} style={{ ...btnS(`linear-gradient(135deg, ${Z.acc}, #7c3aed)`, "#fff"), padding: "12px 28px" }}>🤖 Run AI Analysis</button></div>)}
            {cl.status === "ai_analysis" && analyzing && (<div style={{ ...card, borderColor: Z.acc }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}><div style={{ width: 18, height: 18, border: `3px solid ${Z.acc}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} /><span style={{ fontWeight: 600, fontSize: 13, color: Z.accL }}>AI Analysis</span></div><div style={{ background: Z.bg, borderRadius: 6, height: 8, overflow: "hidden", marginBottom: 10 }}><div style={{ height: "100%", background: `linear-gradient(90deg, ${Z.acc}, #a855f7)`, borderRadius: 6, width: `${progress}%`, transition: "width 0.3s" }} /></div><div style={{ fontSize: 12, color: Z.mut, fontFamily: Mo }}>{stepText}</div></div>)}

            {assess && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              {/* LEFT */}
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {vr && (<div style={{ ...card, padding: 20, borderColor: vr.match ? Z.ok : Z.err }}><h3 style={{ fontSize: 12, fontWeight: 600, margin: "0 0 12px", color: Z.mut, textTransform: "uppercase", letterSpacing: 0.5 }}>🔍 Vehicle Recognition</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 12 }}>{[{ l: "Make", v: vr.make }, { l: "Model", v: vr.model }, { l: "Year", v: vr.year }, { l: "Color", v: vr.color }, { l: "Plate", v: vr.plate }, { l: "VIN", v: vr.vin }].map((r, i) => (<div key={i} style={{ background: Z.bg, borderRadius: 6, padding: 8 }}><div style={{ fontSize: 9, color: Z.mut, textTransform: "uppercase" }}>{r.l}</div><div style={{ fontSize: 12, fontWeight: 600, fontFamily: Mo, marginTop: 1 }}>{r.v}</div></div>))}</div>
                  <div style={{ padding: "8px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: vr.match ? `${Z.ok}15` : `${Z.err}15`, color: vr.match ? Z.ok : Z.err, display: "flex", justifyContent: "space-between" }}><span>{vr.match ? "✓ Match" : "✕ MISMATCH"}</span><span>{vr.conf}%</span></div>
                </div>)}
                {assess.fraud?.length > 0 && (<div style={{ ...card, padding: 18, borderColor: Z.err, background: `${Z.err}06` }}><h3 style={{ fontSize: 12, fontWeight: 600, margin: "0 0 8px", color: Z.err, textTransform: "uppercase" }}>⚠ Fraud Signals</h3>{assess.fraud.map((s, i) => (<div key={i} style={{ padding: "6px 10px", borderRadius: 6, marginBottom: 4, background: `${Z.warn}12`, border: `1px solid ${Z.warn}30`, fontSize: 12, color: Z.warn }}>{s.msg}</div>))}</div>)}
                <div style={{ ...card, padding: 20 }}><h3 style={{ fontSize: 12, fontWeight: 600, margin: "0 0 12px", color: Z.mut, textTransform: "uppercase", letterSpacing: 0.5 }}>AI Summary</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>{[{ l: "Severity", v: assess.severity, c: SEV_C[assess.severity] }, { l: "Confidence", v: `${assess.confidence}%`, c: assess.confidence >= 80 ? Z.ok : Z.warn }, { l: "Structural", v: assess.structural ? "YES" : "No", c: assess.structural ? Z.err : Z.ok }, { l: "Driveable", v: assess.driveable ? "Yes" : "NO", c: assess.driveable ? Z.ok : Z.err }].map((m, i) => (<div key={i} style={{ background: Z.bg, borderRadius: 6, padding: 10 }}><div style={{ fontSize: 9, color: Z.mut, textTransform: "uppercase" }}>{m.l}</div><div style={{ fontSize: 16, fontWeight: 700, color: m.c, marginTop: 1 }}>{m.v}</div></div>))}</div>
                  <div style={{ background: `${Z.acc}12`, border: `1px solid ${Z.acc}30`, borderRadius: 8, padding: 10, fontSize: 12, color: Z.accL }}>💡 {assess.rec}</div>
                </div>
              </div>
              {/* RIGHT */}
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ ...card, padding: 20 }}><h3 style={{ fontSize: 12, fontWeight: 600, margin: "0 0 10px", color: Z.mut, textTransform: "uppercase", letterSpacing: 0.5 }}>Damage Breakdown ({assess.areas.length})</h3>
                  {assess.areas.map((d, i) => { const ed = cl.status === "agent_review" && !cl.agentDecision; const sed = cl.status === "senior_review" && !cl.seniorDecision; const cv = (ed || sed) ? (editCosts[i] ?? d.cost.max) : ((cl.agentCosts || {})[i] ?? d.cost.max); return (<div key={i} style={{ background: Z.bg, borderRadius: 6, padding: 10, marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 12 }}>{d.area}</div><div style={{ fontSize: 10, color: Z.mut }}>{d.type} · {d.repair} · <span style={{ color: Z.accL }}>{d.src}</span></div></div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 9, fontWeight: 600, color: SEV_C[d.sev], background: `${SEV_C[d.sev]}18`, padding: "1px 5px", borderRadius: 3 }}>{d.sev}</span><div style={{ textAlign: "right" }}><div style={{ fontSize: 9, color: Z.mut }}>AI: ${d.cost.min}–${d.cost.max}</div>
                      {(ed || sed) ? (<div style={{ display: "flex", alignItems: "center", gap: 2 }}><span style={{ fontSize: 10, color: Z.mut }}>$</span><input type="number" value={cv} onChange={e => setEditCosts({ ...editCosts, [i]: Number(e.target.value) })} style={{ width: 60, padding: "2px 4px", borderRadius: 5, border: `1px solid ${Z.brd}`, background: Z.surf, color: Z.txt, fontSize: 12, fontWeight: 600, fontFamily: Mo, outline: "none", textAlign: "right" }} /></div>) : <div style={{ fontSize: 12, fontWeight: 600 }}>${cv}</div>}
                    </div></div></div>); })}
                  {(() => { const ed = cl.status === "agent_review" && !cl.agentDecision; const sed = cl.status === "senior_review" && !cl.seniorDecision; const tot = assess.areas.reduce((s, d, i) => s + ((ed || sed) ? (editCosts[i] ?? d.cost.max) : ((cl.agentCosts || {})[i] ?? d.cost.max)), 0); const ai = assess.totalEst.max; return (<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0 0", borderTop: `1px solid ${Z.brd}`, marginTop: 4 }}><div><div style={{ fontSize: 10, color: Z.mut }}>Total</div><div style={{ fontSize: 20, fontWeight: 700, color: Z.accL }}>${tot.toLocaleString()}</div></div>{tot !== ai && <div style={{ fontSize: 11, color: tot > ai ? Z.err : Z.ok, fontWeight: 500 }}>{tot > ai ? "▲" : "▼"} ${Math.abs(tot - ai)}</div>}</div>); })()}
                </div>

                {/* Agent panel */}
                {cl.status === "agent_review" && !cl.agentDecision && (<div style={{ ...card, padding: 20, borderColor: Z.acc }}><h3 style={{ fontSize: 12, fontWeight: 600, margin: "0 0 12px", color: Z.accL, textTransform: "uppercase" }}>👤 Agent Decision</h3>
                  <div style={{ marginBottom: 12 }}><label style={lbl}>Notes</label><textarea value={editNotes} onChange={e => setEditNotes(e.target.value)} placeholder="Review notes..." rows={3} style={{ ...inp, resize: "vertical", fontSize: 12 }} /></div>
                  <div style={{ display: "flex", gap: 8 }}><button onClick={() => agentSubmit("approve")} style={{ ...btnS(Z.ok, "#fff"), flex: 1 }}>✓ Approve</button><button onClick={() => agentSubmit("escalate")} style={{ ...btnS("transparent", Z.ora), flex: 1 }}>↑ Escalate</button><button onClick={() => agentSubmit("reject")} style={{ ...btnS("transparent", Z.err), flex: 1 }}>✕ Reject</button></div>
                  <div style={{ marginTop: 8, fontSize: 10, color: Z.mut, textAlign: "center" }}>All decisions go to Senior Adjuster for final approval.</div>
                </div>)}
                {cl.agentDecision && cl.status !== "agent_review" && (<div style={{ ...card, padding: 18, borderColor: cl.agentDecision === "approve" ? Z.ok : cl.agentDecision === "reject" ? Z.err : Z.ora }}><h3 style={{ fontSize: 11, fontWeight: 600, margin: "0 0 8px", color: Z.mut, textTransform: "uppercase" }}>👤 Agent Decision</h3>
                  <div style={{ padding: 10, borderRadius: 6, fontSize: 13, fontWeight: 600, textAlign: "center", background: `${cl.agentDecision === "approve" ? Z.ok : cl.agentDecision === "reject" ? Z.err : Z.ora}15`, color: cl.agentDecision === "approve" ? Z.ok : cl.agentDecision === "reject" ? Z.err : Z.ora }}>{cl.agentDecision === "approve" ? "✓ Recommended Approval" : cl.agentDecision === "escalate" ? "↑ Escalated" : "✕ Recommended Rejection"}</div>
                  {cl.agentNotes && <div style={{ fontSize: 12, color: Z.mut, background: Z.bg, borderRadius: 6, padding: 8, marginTop: 8 }}><div style={{ fontSize: 9, color: Z.mut, textTransform: "uppercase", marginBottom: 3 }}>Agent Notes</div>{cl.agentNotes}</div>}
                </div>)}

                {/* Senior panel */}
                {cl.status === "senior_review" && !cl.seniorDecision && (<div style={{ ...card, padding: 20, borderColor: Z.ora }}><h3 style={{ fontSize: 12, fontWeight: 600, margin: "0 0 12px", color: Z.ora, textTransform: "uppercase" }}>👔 Senior Adjuster</h3>
                  <div style={{ marginBottom: 12 }}><label style={lbl}>Senior Notes</label><textarea value={editSeniorNotes} onChange={e => setEditSeniorNotes(e.target.value)} placeholder="Approval conditions..." rows={2} style={{ ...inp, resize: "vertical", fontSize: 12 }} /></div>
                  <div style={{ marginBottom: 12 }}><label style={lbl}>Assign Repair Shop *</label>
                    {SHOPS.map((shop, i) => (<div key={i} onClick={() => setEditShop(shop)} style={{ background: Z.bg, borderRadius: 8, padding: 10, cursor: "pointer", border: `2px solid ${editShop?.name === shop.name ? Z.ok : Z.brd}`, marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><div style={{ fontWeight: 600, fontSize: 12 }}>{shop.name}</div><div style={{ fontSize: 10, color: Z.mut }}>{shop.spec} · {shop.dist}</div></div><div style={{ textAlign: "right" }}><div style={{ fontSize: 12, fontWeight: 600, color: Z.warn }}>★ {shop.rating}</div>{editShop?.name === shop.name && <div style={{ fontSize: 9, color: Z.ok }}>✓</div>}</div></div>))}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}><button onClick={() => seniorDecide("approve")} disabled={!editShop} style={{ ...btnS(editShop ? Z.ok : Z.brd, editShop ? "#fff" : Z.mut), flex: 2, cursor: editShop ? "pointer" : "not-allowed" }}>✓ Approve</button><button onClick={() => seniorDecide("modify")} disabled={!editShop} style={{ ...btnS(editShop ? Z.acc : Z.brd, editShop ? "#fff" : Z.mut), flex: 1, cursor: editShop ? "pointer" : "not-allowed" }}>Modify & Approve</button></div>
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}><button onClick={() => seniorDecide("return")} style={{ ...btnS("transparent", Z.ora), flex: 1 }}>↩ Return</button><button onClick={() => seniorDecide("reject")} style={{ ...btnS("transparent", Z.err), flex: 1 }}>✕ Reject</button></div>
                </div>)}

                {cl.status === "authorized" && (<div style={{ ...card, padding: 18, borderColor: Z.ok }}><h3 style={{ fontSize: 12, fontWeight: 600, margin: "0 0 10px", color: Z.ok, textTransform: "uppercase" }}>✅ Authorized</h3>{cl.seniorNotes && <div style={{ fontSize: 12, color: Z.mut, background: Z.bg, borderRadius: 6, padding: 8, marginBottom: 10 }}><div style={{ fontSize: 9, textTransform: "uppercase", marginBottom: 2, color: Z.mut }}>Senior Notes</div>{cl.seniorNotes}</div>}{cl.shop && <div style={{ padding: 12, borderRadius: 8, background: `${Z.ok}12`, border: `1px solid ${Z.ok}30`, fontSize: 13, color: Z.ok, textAlign: "center", fontWeight: 600 }}>Authorized at <strong>{cl.shop.name}</strong> — ${assess.areas.reduce((s, d, i) => s + ((cl.agentCosts || {})[i] ?? d.cost.max), 0).toLocaleString()}</div>}</div>)}

                {cl.status === "rejected" && (<div style={{ ...card, padding: 18, borderColor: Z.err }}><h3 style={{ fontSize: 12, fontWeight: 600, margin: "0 0 10px", color: Z.err, textTransform: "uppercase" }}>✕ Rejected</h3>{cl.seniorNotes && <div style={{ fontSize: 12, color: Z.mut, background: Z.bg, borderRadius: 6, padding: 8, marginBottom: 8 }}><div style={{ fontSize: 9, textTransform: "uppercase", marginBottom: 2, color: Z.mut }}>Senior Notes</div>{cl.seniorNotes}</div>}<div style={{ padding: 10, borderRadius: 8, background: `${Z.err}12`, border: `1px solid ${Z.err}30`, fontSize: 12, color: Z.err, textAlign: "center" }}>Policyholder notified.</div></div>)}
              </div>
            </div>)}
          </div>)}

          {/* Feedback */}
          {tab === "feedback" && (<div className="fi"><div style={{ ...card }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}><h3 style={{ fontSize: 13, fontWeight: 600, margin: 0, color: Z.mut, textTransform: "uppercase" }}>AI Feedback</h3>{!showFb && assess && <button onClick={() => setShowFb(true)} style={btnS(Z.acc, "#fff")}>+ Feedback</button>}</div>
            {!assess && <div style={{ textAlign: "center", padding: 28, color: Z.mut }}>Run AI first</div>}
            {showFb && assess && (<div style={{ background: Z.bg, borderRadius: 10, padding: 18, border: `1px solid ${Z.acc}40` }}>
              <div style={{ marginBottom: 12 }}><label style={lbl}>Rating</label><div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{[{ id: "accurate", l: "✓ Accurate", c: Z.ok }, { id: "overestimated", l: "↑ Over", c: Z.ora }, { id: "underestimated", l: "↓ Under", c: Z.err }, { id: "missed_damage", l: "⊘ Missed", c: "#a855f7" }].map(o => (<button key={o.id} onClick={() => setFbForm({ ...fbForm, rating: o.id })} style={{ padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500, fontFamily: F, cursor: "pointer", border: `2px solid ${fbForm.rating === o.id ? o.c : Z.brd}`, background: fbForm.rating === o.id ? `${o.c}20` : "transparent", color: fbForm.rating === o.id ? o.c : Z.mut }}>{o.l}</button>))}</div></div>
              <div style={{ marginBottom: 12 }}><label style={lbl}>Category</label><div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{["cost", "damage_type", "severity", "detection", "vehicle_id"].map(c => (<button key={c} onClick={() => setFbForm({ ...fbForm, cat: c })} style={{ padding: "4px 10px", borderRadius: 5, fontSize: 11, fontFamily: F, cursor: "pointer", border: `1px solid ${fbForm.cat === c ? Z.accL : Z.brd}`, background: fbForm.cat === c ? `${Z.acc}20` : "transparent", color: fbForm.cat === c ? Z.accL : Z.mut, textTransform: "capitalize" }}>{c.replace("_", " ")}</button>))}</div></div>
              <div style={{ marginBottom: 12 }}><label style={lbl}>Comment</label><textarea value={fbForm.comment} onChange={e => setFbForm({ ...fbForm, comment: e.target.value })} rows={2} style={{ ...inp, resize: "vertical", fontSize: 12 }} /></div>
              <div style={{ display: "flex", gap: 8 }}><button onClick={() => { if (!fbForm.rating || !cl.assess) return; const at = cl.assess.areas.reduce((s, d, i) => s + (editCosts[i] ?? d.cost.max), 0); setFb([{ id: fb.length + 1, claimId: cl.id, date: new Date().toISOString().split("T")[0], rating: fbForm.rating, cat: fbForm.cat || "general", comment: fbForm.comment, adj: at - cl.assess.totalEst.max }, ...fb]); setShowFb(false); setFbForm({ rating: "", cat: "", comment: "" }); }} disabled={!fbForm.rating} style={{ ...btnS(fbForm.rating ? Z.acc : Z.brd, fbForm.rating ? "#fff" : Z.mut), cursor: fbForm.rating ? "pointer" : "not-allowed" }}>Submit</button><button onClick={() => { setShowFb(false); setFbForm({ rating: "", cat: "", comment: "" }); }} style={btnS("transparent", Z.mut)}>Cancel</button></div>
            </div>)}
          </div></div>)}
        </div>)}
      </div>
    </div>
  );
}
