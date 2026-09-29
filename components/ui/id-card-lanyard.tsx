"use client";

/**
 * IDCardLanyard: the pasted canvas-rope lanyard (verlet rope, drag to swing, click to flip, hover tilt + sheen).
 * Physics and card visuals are kept as pasted. Adaptations for this site:
 *  a. `contained` (default true): the stage is position:absolute inset:0 inside the parent (give the parent
 *     position:relative and a height), so the badge lives in a layout slot and scrolls with the page. Pointer math
 *     still reads the stage rect on every event, so it stays right while scrolled. The rope canvas spans the
 *     viewport width (not just the slot) so the rope never clips when the card swings past the slot; the card is
 *     kept inside the viewport and above the slot's floor. The hint pill is absolute within the stage.
 *     `contained={false}` keeps the original full-window fixed overlay.
 *  b. The rAF loop pauses when the stage is offscreen (IntersectionObserver) and when the tab is hidden.
 *  c. prefers-reduced-motion: still draggable and flippable, but no foil animation, no swing-in, more friction,
 *     a gentler release and less tilt.
 *  d. `photoSrc` + `photoAlt` put a real photo on the face (<img>, object-fit cover). Without one, `artSrc` shows
 *     badge art on a navy grid; without either, the pasted placeholder SVG. (`photo` still accepts any node.)
 *  e. All visible copy is props with neutral defaults: footer words, back-face scan title/text, hint, labels.
 *  f. No runtime Google Fonts: uses the site's already-loaded Fraunces (display), Inter (body), JetBrains Mono
 *     (mono) and Mrs Saint Delafield (signature). `--idcl-accent` and the rope colour follow the site blue.
 *  Also: canvas is DPR-scaled, the stage re-measures on ResizeObserver, and the card flips from the keyboard.
 */

import React, { useEffect, useRef, useState } from "react";

export interface IDCardLanyardProps {
  /** Full name shown on the card and used for the back-face signature. */
  name?: string;
  /** Job title / role line under the name. */
  role?: string;
  /** Wordmark shown top-left on the front face. */
  brand?: string;
  /** Small caption under the wordmark. */
  brandTagline?: string;
  /** Three short values stacked top-right (e.g. your working pillars). */
  pillars?: [string, string, string];
  location?: string;
  idNumber?: string;
  validThru?: string;
  /** URL/label shown next to the back-face QR code. */
  site?: string;
  /** Social links shown as small icon buttons on the back face. Omit any you don't want rendered. */
  githubUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  /** Render inside the parent (absolute, inset 0) instead of as a full-window fixed overlay. */
  contained?: boolean;
  /** Horizontal anchor for the lanyard clip: a percentage ("50%"), a px value ("120px"), or "calc(100% - 130px)". */
  anchorX?: string;
  /** Vertical anchor offset in px from the top of the stage. */
  anchorY?: number;
  /** Stacking order of the stage. */
  zIndex?: number;
  /** Show the hint until the visitor first interacts with the card. */
  showHint?: boolean;
  /** Give the lanyard a gentle push on mount so the card swings in by itself (skipped for reduced motion). */
  swingOnMount?: boolean;
  /** A photo for the front face. */
  photoSrc?: string;
  photoAlt?: string;
  /** Badge art shown on a navy grid when there is no photo. */
  artSrc?: string;
  /** Any node for the front face (overrides photoSrc/artSrc). */
  photo?: React.ReactNode;
  /** Rope colour. */
  ropeColor?: string;
  /** Words on the front footer, joined with dots. */
  footer?: string[];
  /** Back face: bold line and the text under the site next to the QR code. */
  scanTitle?: string;
  scanText?: string;
  hintText?: string;
  connectLabel?: string;
  signatureLabel?: string;
  idLabel?: string;
  locationLabel?: string;
  validLabel?: string;
  /** Accessible label for the card (it is a button: Enter or Space flips it). */
  cardLabel?: string;
  className?: string;
}

const CSS = `
.idcl-root{
  --idcl-ink-faint:#5b6270;
  --idcl-accent:#0e3b8f;
  --idcl-accent-dim:#0a2b6a;
  --idcl-card:#faf7f1;
  --idcl-card-2:#efeadf;
  --idcl-card-ink:#15171d;
  --idcl-card-soft:#666c78;
  --idcl-card-line:#e1dbcb;
  --idcl-font-display:Fraunces,Georgia,serif;
  --idcl-font-mono:'JetBrains Mono','Consolas',monospace;
  --idcl-font-script:'Mrs Saint Delafield','Snell Roundhand','Segoe Script',cursive;
  font-family:Inter,system-ui,sans-serif;
}
.idcl-root *{ box-sizing:border-box; }
.idcl-root.idcl-contained{ position:absolute; inset:0; }

/* full-viewport overlay: transparent, click-through except on the card itself */
.idcl-stage{
  position:fixed;
  inset:0;
  z-index:var(--idcl-z, 60);
  pointer-events:none;
  overflow:visible;
}
.idcl-contained .idcl-stage{ position:absolute; }

.idcl-rope{ position:absolute; left:0; top:0; width:100%; height:100%; pointer-events:none; }

.idcl-rail{
  position:absolute; top:0; width:64px; height:6px;
  transform:translateX(-50%);
  background:linear-gradient(180deg, #3a4150, #21252f);
  border-radius:0 0 4px 4px;
  box-shadow:0 2px 6px rgba(0,0,0,.5);
  pointer-events:none;
}

.idcl-card{
  position:absolute;
  width:var(--idcl-card-w, clamp(196px, 60vw, 236px));
  aspect-ratio: 236 / 460;
  perspective:1400px;
  cursor:grab; touch-action:none; user-select:none; -webkit-user-select:none;
  transform-origin:top center;
  pointer-events:auto;
  outline:0;
}
.idcl-card:active{ cursor:grabbing; }
.idcl-card:focus-visible .idcl-face{ outline:2px solid var(--idcl-accent); outline-offset:3px; }

.idcl-flipper{ position:relative; width:100%; height:100%; transform-style:preserve-3d; }

.idcl-face{
  position:absolute; inset:0; border-radius:18px;
  padding:16px 16px 14px;
  display:flex; flex-direction:column;
  backface-visibility:hidden; -webkit-backface-visibility:hidden;
  box-shadow:
    0 32px 60px -16px rgba(0,0,0,.6),
    0 10px 20px -8px rgba(0,0,0,.4),
    inset 0 1px 0 rgba(255,255,255,.65),
    inset 0 0 0 1px rgba(0,0,0,.05);
}
.idcl-face::before{
  content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
  background:
    linear-gradient(180deg, rgba(255,255,255,.55) 0%, transparent 24%),
    radial-gradient(rgba(0,0,0,.07) 1px, transparent 1.3px) 0 0/3px 3px;
  mix-blend-mode:multiply; opacity:.6;
}
.idcl-face::after{
  content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
  background:radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,.6), transparent 40%);
  mix-blend-mode:overlay; opacity:0; transition:opacity .3s ease;
}
.idcl-card.idcl-hovering .idcl-face::after{ opacity:1; }
@media (prefers-reduced-motion: reduce){ .idcl-face::after{ transition:none; } }

.idcl-front{ background:linear-gradient(165deg, var(--idcl-card), var(--idcl-card-2)); align-items:stretch; text-align:left; }
.idcl-back{ background:linear-gradient(165deg, var(--idcl-card-2), var(--idcl-card)); transform:rotateY(180deg); }

.idcl-holo{
  position:absolute; top:14px; bottom:14px; right:5px; width:6px; border-radius:5px;
  background:repeating-linear-gradient(125deg, #eef1f7 0%, #cfd6e4 10%, #b9c2d6 20%, #e7ebf3 30%, #eef1f7 40%);
  background-size:220% 220%;
  animation:idcl-foil 7s linear infinite;
  box-shadow:inset 0 0 0 1px rgba(0,0,0,.1), 0 0 6px rgba(255,255,255,.3);
}
@keyframes idcl-foil{ to{ background-position:220% 0%; } }
@media (prefers-reduced-motion: reduce){ .idcl-holo{ animation:none; } }
.idcl-paused .idcl-holo{ animation-play-state:paused; }

.idcl-hole{ width:32px; height:9px; background:var(--idcl-card-ink); border-radius:5px; margin:0 auto 10px; flex-shrink:0; opacity:.85; }

.idcl-header{ display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; }
.idcl-brand{ display:flex; align-items:flex-start; gap:6px; }
.idcl-brand-mark{ flex-shrink:0; width:9px; height:9px; margin-top:2px; background:var(--idcl-accent); }
.idcl-brand-text{ display:flex; flex-direction:column; }
.idcl-brand-text b{ font-family:var(--idcl-font-mono); font-weight:600; font-size:10.5px; letter-spacing:.08em; color:var(--idcl-card-ink); line-height:1.25; }
.idcl-brand-text small{ font-family:var(--idcl-font-mono); font-size:6.3px; letter-spacing:.09em; text-transform:uppercase; color:var(--idcl-card-soft); }
.idcl-pillars{ display:flex; flex-direction:column; align-items:flex-end; gap:1px; }
.idcl-pillars span{ font-family:var(--idcl-font-mono); font-size:7px; letter-spacing:.1em; text-transform:uppercase; color:var(--idcl-card-soft); }
.idcl-pillars i{ width:16px; height:2px; background:var(--idcl-card-ink); margin-top:3px; }

.idcl-photo{
  position:relative; width:100%; height:112px; border-radius:10px;
  background:#eae7de; margin-bottom:12px; flex-shrink:0;
  box-shadow:inset 0 0 0 1px rgba(0,0,0,.08), inset 0 2px 6px rgba(0,0,0,.12);
}
.idcl-photo-in{ position:absolute; inset:0; border-radius:inherit; overflow:hidden; }
.idcl-photo-in > svg{ width:100%; height:100%; display:block; }
.idcl-photo-in > img{ width:100%; height:100%; display:block; object-fit:cover; object-position:50% 30%; pointer-events:none; }
.idcl-art{ display:grid; place-items:center; width:100%; height:100%; background-color:#0d1226;
  background-image:linear-gradient(rgba(232,241,255,.16) 1px,transparent 1px),linear-gradient(90deg,rgba(232,241,255,.16) 1px,transparent 1px);
  background-size:14px 14px; }
.idcl-art img{ width:88px; height:88px; max-width:none; object-fit:contain; background:#fff; border-radius:50%; padding:6px; pointer-events:none; }
.idcl-verified{
  position:absolute; right:-6px; bottom:-6px; width:22px; height:22px; border-radius:50%;
  background:linear-gradient(160deg, var(--idcl-accent), var(--idcl-accent-dim));
  display:flex; align-items:center; justify-content:center;
  box-shadow:0 2px 6px rgba(0,0,0,.4), 0 0 0 3px var(--idcl-card);
}
.idcl-verified svg{ width:11px; height:11px; }

.idcl-name{ margin:0 0 3px; font-family:var(--idcl-font-display); font-weight:500; font-size:22px; line-height:1.05; color:var(--idcl-card-ink); letter-spacing:-.02em; }
.idcl-role{ margin:0 0 10px; font-family:var(--idcl-font-mono); font-size:8.5px; color:var(--idcl-card-soft); font-weight:500; letter-spacing:.12em; text-transform:uppercase; }

.idcl-divider{ width:100%; height:1px; background:var(--idcl-card-line); margin-bottom:10px; }

.idcl-idrow{ width:100%; display:flex; justify-content:space-between; align-items:flex-start; gap:10px; margin-bottom:16px; }
.idcl-idrow-labels{ display:flex; flex-direction:column; gap:5px; font-family:var(--idcl-font-mono); }
.idcl-idrow-labels div{ display:flex; gap:8px; align-items:baseline; }
.idcl-idrow-labels span{ width:56px; flex-shrink:0; font-size:7.6px; letter-spacing:.06em; text-transform:uppercase; color:var(--idcl-card-soft); }
.idcl-idrow-labels b{ font-size:9.5px; font-weight:600; color:var(--idcl-card-ink); }

.idcl-footer{
  width:100%; margin-top:auto; padding-top:10px; border-top:1px solid var(--idcl-card-line);
  text-align:center; font-family:var(--idcl-font-mono); font-size:7.4px; letter-spacing:.12em; text-transform:uppercase;
  color:var(--idcl-card-soft); white-space:nowrap;
}
.idcl-footer i{ color:var(--idcl-card-line); font-style:normal; margin:0 4px; }

.idcl-stripe{ width:100%; height:30px; background:repeating-linear-gradient(45deg, #1b1d24, #1b1d24 6px, #26282f 6px, #26282f 12px); border-radius:3px; margin-bottom:12px; }
.idcl-barcode{ display:flex; align-items:flex-end; gap:2px; height:32px; width:100%; background:#fff; border-radius:3px; padding:0 4px; margin-bottom:8px; overflow:hidden; }
.idcl-barcode span{ width:2px; background:#1a1c22; }
.idcl-idnum{ margin:0 0 8px; font-family:var(--idcl-font-mono); font-size:10px; font-weight:600; color:var(--idcl-card-ink); letter-spacing:.03em; display:flex; justify-content:space-between; font-variant-numeric: tabular-nums; }
.idcl-idnum em{ font-style:normal; color:var(--idcl-card-soft); }

.idcl-backrow{ display:flex; gap:12px; align-items:flex-start; margin-bottom:10px; }
.idcl-qr{ display:grid; grid-template-columns:repeat(9,1fr); gap:1px; width:58px; height:58px; background:#fff; padding:4px; border-radius:4px; flex-shrink:0; box-shadow:0 0 0 1px var(--idcl-card-line); }
.idcl-qr i{ background:transparent; }
.idcl-qr i.on{ background:#181a20; }
.idcl-qr.idcl-small{ width:46px; height:46px; padding:3px; }

.idcl-scan{ font-family:var(--idcl-font-mono); font-size:8.4px; color:var(--idcl-card-soft); line-height:1.5; padding-top:2px; text-align:left; }
.idcl-scan b{ color:var(--idcl-card-ink); display:block; font-size:9px; margin-bottom:2px; letter-spacing:.03em; }
.idcl-scan span{ display:block; }

.idcl-connect{ display:flex; align-items:center; justify-content:space-between; margin-top:14px; }
.idcl-connect span{ font-family:var(--idcl-font-mono); font-size:8px; letter-spacing:.1em; text-transform:uppercase; color:var(--idcl-card-soft); }
.idcl-connect-icons{ display:flex; gap:6px; }
.idcl-connect-icons a{
  width:24px; height:24px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  border:1px solid var(--idcl-card-line); color:var(--idcl-card-soft);
  transition:border-color .15s ease, color .15s ease, transform .15s ease;
}
.idcl-connect-icons a:hover, .idcl-connect-icons a:focus-visible{ border-color:var(--idcl-accent); color:var(--idcl-accent); transform:translateY(-1px); }
.idcl-connect-icons svg{ width:12px; height:12px; }

.idcl-sig{ margin-top:auto; }
.idcl-sig .idcl-script{ font-family:var(--idcl-font-script); font-size:32px; color:var(--idcl-card-ink); line-height:1; white-space:nowrap; }
.idcl-sig small{ display:block; font-family:var(--idcl-font-mono); font-size:8px; letter-spacing:.08em; text-transform:uppercase; color:var(--idcl-card-soft); border-top:1px solid var(--idcl-card-line); margin-top:4px; padding-top:4px; }

.idcl-hint{
  position:fixed; top:16px; left:50%; transform:translateX(-50%);
  display:flex; align-items:center; gap:6px;
  background:rgba(10,12,16,.72);
  color:#f3f0e9;
  padding:7px 14px;
  border-radius:999px;
  font-family:var(--idcl-font-mono);
  font-size:11px; letter-spacing:.03em;
  pointer-events:none;
  opacity:1;
  transition:opacity .4s ease;
  white-space:nowrap;
}
.idcl-contained .idcl-hint{ position:absolute; top:auto; bottom:-34px; }
.idcl-hint.idcl-hint-hidden{ opacity:0; }
.idcl-hint svg{ width:13px; height:13px; opacity:.75; flex-shrink:0; }
`;

export function IDCardLanyard({
  name = "Maya Chen",
  role = "Creative Developer",
  brand = "MAYA CHEN",
  brandTagline = "Creative Dev Studio",
  pillars = ["Design", "Code", "Ship"],
  location = "Brooklyn, NY",
  idNumber = "MC-042019",
  validThru = "12/2029",
  site = "mayachen.dev/work",
  githubUrl,
  linkedinUrl,
  instagramUrl,
  contained = true,
  anchorX,
  anchorY = 6,
  zIndex,
  showHint = true,
  swingOnMount = false,
  photoSrc,
  photoAlt = "",
  artSrc,
  photo,
  ropeColor = "#1c1e23",
  footer = ["Build", "Ship", "Iterate"],
  scanTitle = "Scan for portfolio",
  scanText = "Full case studies, source & credits.",
  hintText = "Drag to swing · Click to flip",
  connectLabel = "Connect",
  signatureLabel = "Authorized Signature",
  idLabel = "ID",
  locationLabel = "Location",
  validLabel = "Valid Thru",
  cardLabel = "ID card. Drag to swing it; click, Enter or Space flips it.",
  className = "",
}: IDCardLanyardProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const flipperRef = useRef<HTMLDivElement>(null);
  const barcodeRef = useRef<HTMLDivElement>(null);
  const qrBackRef = useRef<HTMLDivElement>(null);
  const qrFrontRef = useRef<HTMLDivElement>(null);
  const [interacted, setInteracted] = useState(false);
  const ax = anchorX ?? (contained ? "50%" : "calc(100% - 130px)");
  const z = zIndex ?? (contained ? 2 : 60);

  useEffect(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    const rail = railRef.current;
    const card = cardRef.current;
    const flipper = flipperRef.current;
    const barcodeEl = barcodeRef.current;
    const qrBackEl = qrBackRef.current;
    const qrFrontEl = qrFrontRef.current;
    if (!scene || !canvas || !rail || !card || !flipper || !barcodeEl || !qrBackEl || !qrFrontEl) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    barcodeEl.innerHTML = "";
    for (let i = 0; i < 30; i++) {
      const bar = document.createElement("span");
      bar.style.height = ((i * 37) % 100 > 40 ? 100 : 55) + "%";
      barcodeEl.appendChild(bar);
    }

    function buildQR(el: HTMLDivElement, seed: number) {
      el.innerHTML = "";
      const N = 9;
      const seedOn = new Set([
        0, 1, 2, 9, 10, 11, 18, 19, 20,
        6, 7, 8, 15, 16, 17, 24, 25, 26,
        54, 55, 56, 63, 64, 65, 72, 73, 74,
      ]);
      for (let i = 0; i < N * N; i++) {
        const cell = document.createElement("i");
        const pseudoRandom = (i * seed) % 97 < 46;
        if (seedOn.has(i) || pseudoRandom) cell.classList.add("on");
        el.appendChild(cell);
      }
    }
    buildQR(qrBackEl, 928371);
    buildQR(qrFrontEl, 574123);

    // resolve anchorX ("50%", "120px", or "calc(100% - 130px)") against the stage width
    function resolveAnchorX(width: number) {
      const v = ax.trim();
      const calcMatch = v.match(/^calc\(\s*100%\s*-\s*([\d.]+)px\s*\)$/);
      if (calcMatch) return width - parseFloat(calcMatch[1]);
      if (v.endsWith("%")) return width * (parseFloat(v) / 100);
      return parseFloat(v);
    }

    const NUM_POINTS = 13;
    const MAX_REST_LENGTH = 140;
    const GRAVITY = 0.55;
    const FRICTION = reduced ? 0.9 : 0.98;
    const RELEASE = reduced ? 0.35 : 1;
    const CONSTRAINT_ITERATIONS = 6;
    const TAP_THRESHOLD = 6;
    const MAX_TILT = reduced ? 4 : 9;

    const anchor = { x: 0, y: anchorY };
    // stage size (W,H), the viewport span in stage coords (xMin..xMax), card size, and the rope's segment length
    let W = 0, H = 0, xMin = 0, xMax = 0, cardW = 0, cardH = 0, seg = MAX_REST_LENGTH / (NUM_POINTS - 1);

    function resize() {
      const rect = scene!.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      cardW = card!.offsetWidth;
      cardH = card!.offsetHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      // contained: the canvas spans the viewport width so the rope is never clipped by the slot
      const vw = document.documentElement.clientWidth;
      const left = contained ? -rect.left : 0;
      const cw = contained ? vw : W;
      xMin = left;
      xMax = left + cw;
      canvas!.style.left = left + "px";
      canvas!.style.width = cw + "px";
      canvas!.style.height = H + "px";
      canvas!.width = Math.round(cw * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, -left * dpr, 0);
      anchor.x = resolveAnchorX(W);
      rail!.style.left = anchor.x + "px";
      rail!.style.top = anchor.y - 3 + "px";
      // contained: shorten the rope if the slot is too short for the full length, so the card hangs inside it
      const room = contained ? H - anchor.y - cardH - 12 : MAX_REST_LENGTH;
      seg = Math.max(40, Math.min(MAX_REST_LENGTH, room)) / (NUM_POINTS - 1);
    }
    resize();

    type Pt = { x: number; y: number; oldx: number; oldy: number; pinned: boolean };
    const points: Pt[] = [];
    for (let i = 0; i < NUM_POINTS; i++) {
      const y = anchor.y + i * seg;
      points.push({ x: anchor.x, y, oldx: anchor.x, oldy: y, pinned: i === 0 });
    }

    // a sideways push that grows toward the card, so the whole chain swings (verlet: velocity = x - oldx)
    if (swingOnMount && !reduced) {
      for (let i = 1; i < points.length; i++) points[i].oldx = points[i].x - i * 0.6;
    }

    let dragging = false;
    let flipped = false;
    let downPos = { x: anchor.x, y: anchor.y };
    let pointer = { x: anchor.x, y: anchor.y + seg * (NUM_POINTS - 1) };
    let lastPointer = { ...pointer };
    const velocity = { x: 0, y: 0 };

    let flipTarget = 0;
    let flipCurrent = 0;
    const tiltTarget = { x: 0, y: 0 };
    const tiltCurrent = { x: 0, y: 0 };
    let mouse = { x: -9999, y: -9999 };

    function getScenePos(e: PointerEvent) {
      const rect = scene!.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    // floor for the rope: contained keeps the whole card inside the slot
    const floorY = () => (contained ? H - cardH - 4 : H - 30);

    function clampRope(p: { x: number; y: number }) {
      const margin = 18;
      p.x = Math.max(xMin + margin, Math.min(xMax - margin, p.x));
      p.y = Math.max(anchor.y + 20, Math.min(floorY(), p.y));
      return p;
    }
    // the card end: contained keeps the card inside the viewport width (no sideways page scroll)
    function clampCard(p: { x: number; y: number }) {
      clampRope(p);
      if (contained) {
        const m = cardW / 2 + 6;
        if (xMax - xMin > 2 * m) p.x = Math.max(xMin + m, Math.min(xMax - m, p.x));
      }
      return p;
    }

    function updatePoints() {
      for (let i = 1; i < points.length; i++) {
        if (dragging && i === points.length - 1) continue;
        const p = points[i];
        const vx = (p.x - p.oldx) * FRICTION;
        const vy = (p.y - p.oldy) * FRICTION;
        p.oldx = p.x;
        p.oldy = p.y;
        p.x += vx;
        p.y += vy + GRAVITY;
      }
    }

    function applyConstraints() {
      points[0].x = anchor.x;
      points[0].y = anchor.y;
      if (dragging) {
        const last = points[points.length - 1];
        last.x = pointer.x;
        last.y = pointer.y;
      }
      for (let iter = 0; iter < CONSTRAINT_ITERATIONS; iter++) {
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
          const diff = (seg - dist) / dist;
          const offX = dx * diff * 0.5;
          const offY = dy * diff * 0.5;
          const p1Locked = p1.pinned;
          const p2Locked = dragging && i + 1 === points.length - 1;
          if (!p1Locked) {
            p1.x -= offX;
            p1.y -= offY;
          }
          if (!p2Locked) {
            p2.x += offX;
            p2.y += offY;
          }
        }
      }
      for (let i = 1; i < points.length - 1; i++) clampRope(points[i]);
      clampCard(points[points.length - 1]);
    }

    function drawRope() {
      ctx!.clearRect(xMin, 0, xMax - xMin, H);
      const path: { x: number; y: number; cx?: number; cy?: number }[] = [];
      path.push({ x: points[0].x, y: points[0].y });
      for (let i = 1; i < points.length - 1; i++) {
        const midX = (points[i].x + points[i + 1].x) / 2;
        const midY = (points[i].y + points[i + 1].y) / 2;
        path.push({ x: points[i].x, y: points[i].y, cx: midX, cy: midY });
      }
      path.push({ x: points[points.length - 1].x, y: points[points.length - 1].y });

      function strokeRibbon(style: string | CanvasGradient, width: number) {
        ctx!.beginPath();
        ctx!.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
          const p = path[i];
          if (p.cx !== undefined) ctx!.quadraticCurveTo(p.x, p.y, p.cx, p.cy as number);
          else ctx!.lineTo(p.x, p.y);
        }
        ctx!.strokeStyle = style;
        ctx!.lineWidth = width;
        ctx!.lineCap = "round";
        ctx!.lineJoin = "round";
        ctx!.stroke();
      }

      ctx!.save();
      ctx!.translate(2, 4);
      ctx!.globalAlpha = 0.3;
      strokeRibbon("#000000", 16);
      ctx!.restore();

      strokeRibbon(ropeColor, 16);
      strokeRibbon("rgba(0,0,0,0.35)", 16.5);
      strokeRibbon(ropeColor, 13.5);
      strokeRibbon("rgba(255,255,255,0.07)", 3);

      const markIdx = Math.floor(points.length * 0.3);
      const m = points[markIdx];
      const mPrev = points[markIdx - 1];
      const mNext = points[markIdx + 1];
      const angle = Math.atan2(mNext.y - mPrev.y, mNext.x - mPrev.x) + Math.PI / 2;
      ctx!.save();
      ctx!.translate(m.x, m.y);
      ctx!.rotate(angle);
      ctx!.strokeStyle = "rgba(255,255,255,0.5)";
      ctx!.lineWidth = 1.3;
      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";
      ctx!.beginPath();
      ctx!.moveTo(-4, 3.5);
      ctx!.lineTo(0, -3.5);
      ctx!.lineTo(4, 3.5);
      ctx!.stroke();
      ctx!.restore();
    }

    function drawClip() {
      ctx!.save();
      ctx!.translate(anchor.x, anchor.y - 2);
      const g = ctx!.createLinearGradient(-11, -9, 11, 9);
      g.addColorStop(0, "#e7e9ec");
      g.addColorStop(0.35, "#aeb2b8");
      g.addColorStop(0.65, "#7c8087");
      g.addColorStop(1, "#4d5157");
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.roundRect(-11, -9, 22, 16, 4);
      ctx!.fill();
      ctx!.strokeStyle = "rgba(0,0,0,.25)";
      ctx!.lineWidth = 1;
      ctx!.stroke();
      ctx!.strokeStyle = "rgba(255,255,255,.55)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(-8, -6);
      ctx!.lineTo(8, -6);
      ctx!.stroke();
      ctx!.fillStyle = "#3a3d42";
      ctx!.beginPath();
      ctx!.arc(0, 0, 2.2, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
    }

    function positionCard() {
      const last = points[points.length - 1];
      const prev = points[points.length - 2];
      const angle = Math.atan2(last.y - prev.y, last.x - prev.x) - Math.PI / 2;
      card!.style.left = last.x - cardW / 2 + "px";
      card!.style.top = last.y + "px";
      card!.style.transform = `rotate(${angle}rad)`;
    }

    function updateTiltAndSheen() {
      flipCurrent += (flipTarget - flipCurrent) * (reduced ? 0.3 : 0.16);

      const hovering = !dragging && mouse.x > -1000;
      if (hovering) {
        const cx = card!.offsetLeft + cardW / 2;
        const cy = card!.offsetTop + cardH / 2;
        const dx = Math.max(-1, Math.min(1, (mouse.x - cx) / (cardW / 2)));
        const dy = Math.max(-1, Math.min(1, (mouse.y - cy) / (cardH / 2)));
        tiltTarget.y = dx * MAX_TILT;
        tiltTarget.x = -dy * MAX_TILT;

        const mx = Math.max(0, Math.min(100, ((mouse.x - card!.offsetLeft) / cardW) * 100));
        const my = Math.max(0, Math.min(100, ((mouse.y - card!.offsetTop) / cardH) * 100));
        card!.style.setProperty("--mx", mx + "%");
        card!.style.setProperty("--my", my + "%");
        card!.classList.add("idcl-hovering");
      } else {
        tiltTarget.x = 0;
        tiltTarget.y = 0;
        card!.classList.remove("idcl-hovering");
      }

      tiltCurrent.x += (tiltTarget.x - tiltCurrent.x) * 0.12;
      tiltCurrent.y += (tiltTarget.y - tiltCurrent.y) * 0.12;

      flipper!.style.transform = `rotateY(${flipCurrent + tiltCurrent.y}deg) rotateX(${tiltCurrent.x}deg)`;
    }

    // the loop runs only while the stage is on screen and the tab is visible
    let raf = 0;
    let onScreen = true;
    function frame() {
      updatePoints();
      applyConstraints();
      drawRope();
      drawClip();
      positionCard();
      updateTiltAndSheen();
      raf = requestAnimationFrame(frame);
    }
    function drawStill() {
      applyConstraints();
      drawRope();
      drawClip();
      positionCard();
    }
    const onResize = () => {
      resize();
      if (!raf) drawStill();
    };
    function start() {
      if (raf || !onScreen || document.hidden) return;
      scene!.dataset.running = "1";
      scene!.parentElement?.classList.remove("idcl-paused");
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      scene!.dataset.running = "0";
      scene!.parentElement?.classList.add("idcl-paused");
    }

    // only the card can be grabbed: .idcl-stage has pointer-events:none so the page underneath (and page
    // scrolling on touch) still works. Pointer position for the hover tilt is tracked at the window level.
    const onCardDown = (e: PointerEvent) => {
      // let the back-face social links behave like normal links instead of starting a drag
      if ((e.target as HTMLElement).closest("a")) return;
      e.preventDefault();
      dragging = true;
      setInteracted(true);
      card!.setPointerCapture(e.pointerId);
      const pos = clampCard(getScenePos(e));
      pointer = pos;
      lastPointer = pos;
      // tap test uses the raw pointer (the card end may be clamped to the slot's floor)
      downPos = getScenePos(e);
      velocity.x = velocity.y = 0;
    };
    const onWindowMove = (e: PointerEvent) => {
      mouse = getScenePos(e);
      if (!dragging) return;
      const pos = clampCard({ ...mouse });
      velocity.x = pos.x - lastPointer.x;
      velocity.y = pos.y - lastPointer.y;
      lastPointer = pos;
      pointer = pos;
    };
    const flip = () => {
      flipped = !flipped;
      flipTarget = flipped ? 180 : 0;
      card!.setAttribute("aria-pressed", String(flipped));
    };
    const onWindowUp = (e: PointerEvent) => {
      // touch has no hover: forget the last touch point so the card doesn't stay tilted toward it
      if (e.pointerType !== "mouse") mouse = { x: -9999, y: -9999 };
      if (!dragging) return;
      dragging = false;
      const pos = getScenePos(e);
      const dist = Math.hypot(pos.x - downPos.x, pos.y - downPos.y);
      const last = points[points.length - 1];
      if (dist < TAP_THRESHOLD) {
        flip();
        last.oldx = last.x;
        last.oldy = last.y;
        return;
      }
      last.oldx = last.x - velocity.x * RELEASE;
      last.oldy = last.y - velocity.y * RELEASE;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      if ((e.target as HTMLElement).closest("a")) return;
      e.preventDefault();
      setInteracted(true);
      flip();
    };
    const onPointerOut = (e: PointerEvent) => {
      // relatedTarget is null when the pointer actually leaves the browser viewport
      if (e.relatedTarget === null) mouse = { x: -9999, y: -9999 };
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    card.addEventListener("pointerdown", onCardDown);
    card.addEventListener("keydown", onKey);
    window.addEventListener("pointermove", onWindowMove);
    window.addEventListener("pointerup", onWindowUp);
    window.addEventListener("pointercancel", onWindowUp);
    window.addEventListener("resize", onResize);
    document.addEventListener("pointerout", onPointerOut);
    document.addEventListener("visibilitychange", onVisibility);
    const ro = new ResizeObserver(onResize);
    ro.observe(scene);
    ro.observe(card);
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) start();
        else stop();
      },
      { rootMargin: "80px" }
    );
    io.observe(scene);

    // draw one frame right away (and after any resize while paused, since resizing clears the canvas)
    drawStill();
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      card.removeEventListener("pointerdown", onCardDown);
      card.removeEventListener("keydown", onKey);
      window.removeEventListener("pointermove", onWindowMove);
      window.removeEventListener("pointerup", onWindowUp);
      window.removeEventListener("pointercancel", onWindowUp);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ax, anchorY, contained, ropeColor, swingOnMount]);

  const face =
    photo ??
    (photoSrc ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={photoSrc} alt={photoAlt} draggable={false} />
    ) : artSrc ? (
      <span className="idcl-art">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={artSrc} alt="" draggable={false} />
      </span>
    ) : (
      <svg viewBox="0 0 182 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="idcl-faceGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8fb0ff" />
            <stop offset="1" stopColor="#3f5fd8" />
          </linearGradient>
          <pattern id="idcl-dots" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="0.8" fill="#ffffff" opacity="0.35" />
          </pattern>
        </defs>
        <rect width="182" height="100" fill="#12151c" />
        <circle cx="91" cy="62" r="46" fill="url(#idcl-faceGrad)" />
        <path d="M42,46 Q91,-18 140,46 L140,66 Q91,38 42,66 Z" fill="#1c2029" />
        <circle cx="72" cy="62" r="3.6" fill="#12151c" />
        <circle cx="110" cy="62" r="3.6" fill="#12151c" />
        <path d="M75,78 Q91,86 107,78" stroke="#12151c" strokeWidth="2.8" fill="none" strokeLinecap="round" />
        <rect width="182" height="100" fill="url(#idcl-dots)" />
      </svg>
    ));

  return (
    <div
      className={`idcl-root ${contained ? "idcl-contained" : ""} ${className}`}
      style={{ "--idcl-z": z } as React.CSSProperties}
    >
      {/* raw CSS: dangerouslySetInnerHTML so SSR does not HTML-escape the quotes (which breaks hydration) */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="idcl-stage" ref={sceneRef}>
        <canvas className="idcl-rope" ref={canvasRef} aria-hidden="true" />
        <div className="idcl-rail" ref={railRef} />

        <div
          className="idcl-card"
          ref={cardRef}
          role="button"
          tabIndex={0}
          aria-label={cardLabel}
          aria-pressed="false"
        >
          <div className="idcl-flipper" ref={flipperRef}>
            <div className="idcl-face idcl-front">
              <div className="idcl-hole" />
              <div className="idcl-holo" />

              <div className="idcl-header">
                <div className="idcl-brand">
                  <span className="idcl-brand-mark" aria-hidden="true" />
                  <div className="idcl-brand-text">
                    <b>{brand}</b>
                    <small>{brandTagline}</small>
                  </div>
                </div>
                <div className="idcl-pillars">
                  {pillars.map((p) => (
                    <span key={p}>{p}</span>
                  ))}
                  <i />
                </div>
              </div>

              <div className="idcl-photo">
                <div className="idcl-photo-in">{face}</div>
                <span className="idcl-verified">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                </span>
              </div>

              <h2 className="idcl-name">{name}</h2>
              <p className="idcl-role">{role}</p>
              <div className="idcl-divider" />

              <div className="idcl-idrow">
                <div className="idcl-idrow-labels">
                  <div>
                    <span>{idLabel}</span>
                    <b>{idNumber}</b>
                  </div>
                  <div>
                    <span>{locationLabel}</span>
                    <b>{location}</b>
                  </div>
                  <div>
                    <span>{validLabel}</span>
                    <b>{validThru}</b>
                  </div>
                </div>
                <div className="idcl-qr idcl-small" ref={qrFrontRef} />
              </div>

              <div className="idcl-footer">
                {footer.map((w, i) => (
                  <React.Fragment key={w}>
                    {i > 0 && <i>·</i>}
                    {w}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="idcl-face idcl-back">
              <div className="idcl-hole" />
              <div className="idcl-holo" />
              <div className="idcl-stripe" />

              <div className="idcl-idnum">
                <span>NO. {idNumber}</span>
                <em>VALID {validThru}</em>
              </div>
              <div className="idcl-barcode" ref={barcodeRef} />

              <div className="idcl-backrow">
                <div className="idcl-qr" ref={qrBackRef} />
                <div className="idcl-scan">
                  <b>{scanTitle}</b>
                  <span>{site}</span>
                  <span>{scanText}</span>
                </div>
              </div>

              {(githubUrl || linkedinUrl || instagramUrl) && (
                <div className="idcl-connect">
                  <span>{connectLabel}</span>
                  <div className="idcl-connect-icons">
                    {githubUrl && (
                      <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                      </a>
                    )}
                    {linkedinUrl && (
                      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </a>
                    )}
                    {instagramUrl && (
                      <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )}

              <div className="idcl-sig">
                <div className="idcl-script">{name}</div>
                <small>{signatureLabel}</small>
              </div>
            </div>
          </div>
        </div>

        {showHint && (
          <div className={`idcl-hint ${interacted ? "idcl-hint-hidden" : ""}`} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M12 3v18M7 8l-4 4 4 4M17 8l4 4-4 4" />
            </svg>
            {hintText}
          </div>
        )}
      </div>
    </div>
  );
}

export default IDCardLanyard;
