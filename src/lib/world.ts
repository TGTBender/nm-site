/**
 * The world background engine.
 *
 * Ported from the NM Background Study (Pulse, 2026-10-28) world.js. The
 * color maths is kept exactly as written — OKLab interpolation so midpoints
 * stay saturated instead of going muddy, and smootherstep easing so a
 * transition has zero slope at both ends and shows no edge.
 *
 * Changed from the original only where a single-page script and a routed app
 * differ: `load` fires once in a client-side app, so the component drives
 * build() on mount and on navigation instead, and every listener is
 * returned for cleanup rather than left attached.
 */

export type BgName = "black" | "deep" | "green" | "cream" | "gold";

const COL: Record<BgName, string> = {
  black: "#0B0D0C",
  deep: "#06382B",
  green: "#0B5C45",
  cream: "#EFE6D2",
  gold: "#C9A227",
};

/** Which ink layer carries the contour lines on each ground. */
const INK: Record<BgName, string> = {
  black: "gold",
  deep: "gold",
  green: "gold",
  cream: "green",
  gold: "ink",
};

/** Transition zone height in px. Taller for dark<->cream, which is the
 *  biggest jump. Section edge padding must be at least half of this. */
const TB = 360;
const TL = 560;
const zoneFor = (a: BgName, b: BgName) =>
  (a === "cream") !== (b === "cream") ? TL : TB;

const hex = (h: string) => {
  const s = h.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(s.substr(i, 2), 16) / 255);
};
const lin = (c: number) =>
  c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
const gam = (c: number) =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;

function toLab(rgb: number[]) {
  const r = lin(rgb[0]), g = lin(rgb[1]), b = lin(rgb[2]);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function fromLab(L: number[]) {
  const l = Math.pow(L[0] + 0.3963377774 * L[1] + 0.2158037573 * L[2], 3);
  const m = Math.pow(L[0] - 0.1055613458 * L[1] - 0.0638541728 * L[2], 3);
  const s = Math.pow(L[0] - 0.0894841775 * L[1] - 1.291485548 * L[2], 3);
  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const b = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  return [r, g, b].map((c) =>
    Math.round(Math.min(1, Math.max(0, gam(c))) * 255),
  );
}

const mix = (a: string, b: string, t: number) => {
  const A = toLab(hex(a));
  const B = toLab(hex(b));
  return (
    "rgb(" + fromLab([0, 1, 2].map((i) => A[i] + (B[i] - A[i]) * t)).join(",") + ")"
  );
};

/** smootherstep: zero slope at both ends, so no visible edge. */
const ss = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

export function buildWorld() {
  const w = document.getElementById("world");
  if (!w) return;
  const secs = Array.from(document.querySelectorAll<HTMLElement>(".sec"));

  // The footer joins the world but must not conjure one. It is a .sec on
  // every route, so counting it would mean every page paints a full
  // document-height field — and since #world is positioned while an
  // ordinary page section is static, that field renders OVER pages that
  // still own their backgrounds, blanking them.
  const content = secs.filter((s) => !s.hasAttribute("data-world-tail"));
  if (!content.length) {
    // No themed content on this route: leave the world empty so the page's
    // own backgrounds show through rather than painting over them.
    w.innerHTML = "";
    w.style.height = "0px";
    document.documentElement.dataset.world = "off";
    return;
  }
  document.documentElement.dataset.world = "on";

  w.innerHTML = "";
  const docH = document.documentElement.scrollHeight;
  w.style.height = docH + "px";

  const tops = secs.map((s) => s.getBoundingClientRect().top + window.scrollY);
  const names = secs.map((s) => (s.dataset.bg || "black") as BgName);

  // 1) color field
  const stops: string[] = [COL[names[0]] + " 0px"];
  for (let i = 1; i < secs.length; i++) {
    const T = zoneFor(names[i - 1], names[i]);
    const b = tops[i];
    const a = b - T / 2;
    const z = b + T / 2;
    stops.push(COL[names[i - 1]] + " " + a + "px");
    for (let k = 1; k < 16; k++) {
      const t = k / 16;
      stops.push(
        mix(COL[names[i - 1]], COL[names[i]], ss(t)) + " " + (a + T * t).toFixed(1) + "px",
      );
    }
    stops.push(COL[names[i]] + " " + z + "px");
  }
  const f = document.createElement("div");
  f.className = "field";
  f.style.background = "linear-gradient(180deg," + stops.join(",") + ")";
  w.appendChild(f);

  // 2) ink layers — alpha is 1 inside sections using that ink, eased to 0
  //    across the zones, then intersected with the tiling contour mask.
  //
  //    Only inks some section actually uses are built. Each layer spans the
  //    whole document, carries the tiling mask and runs an animation, so an
  //    unused one is several megapixels re-composited every frame to show
  //    nothing at all.
  const usedInks = new Set(names.map((n) => INK[n]));
  (["gold", "green", "ink"] as const)
    .filter((ink) => usedInks.has(ink))
    .forEach((ink) => {
    const ms: string[] = [];
    const push = (a: number, c: number) =>
      ms.push("rgba(0,0,0," + c + ") " + a.toFixed(1) + "px");
    push(0, INK[names[0]] === ink ? 1 : 0);
    for (let i = 1; i < secs.length; i++) {
      const b = tops[i];
      const prev = INK[names[i - 1]] === ink ? 1 : 0;
      const nxt = INK[names[i]] === ink ? 1 : 0;
      const T = zoneFor(names[i - 1], names[i]);
      push(b - T / 2, prev);
      if (prev !== nxt) {
        for (let k = 1; k < 16; k++) {
          const t = k / 16;
          push(b - T / 2 + T * t, prev + (nxt - prev) * ss(t));
        }
      }
      push(b + T / 2, nxt);
    }
    push(docH, INK[names[names.length - 1]] === ink ? 1 : 0);
    const d = document.createElement("div");
    d.className = "lines " + ink;
    d.style.setProperty("--m", "linear-gradient(180deg," + ms.join(",") + ")");
    w.appendChild(d);
  });

  // 3) horizon glow at each boundary
  for (let i = 1; i < secs.length; i++) {
    const g = document.createElement("div");
    g.className = "glow";
    g.style.top = tops[i] + "px";
    const goldEdge = names[i] === "gold" || names[i - 1] === "gold";
    const creamEdge = names[i] === "cream" || names[i - 1] === "cream";
    g.style.setProperty("--gc", goldEdge ? "201,162,39" : "239,230,210");
    g.style.setProperty("--ga", goldEdge ? ".14" : creamEdge ? ".10" : ".05");
    w.appendChild(g);
  }
}

/** Contour parallax. Skipped entirely when reduced motion is requested. */
export function setParallax() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll<HTMLElement>("#world .lines").forEach((e) => {
    e.style.setProperty("--py", (-window.scrollY * 0.07).toFixed(1) + "px");
  });
}
