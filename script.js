/* ✏️ FAQAT SHU YERNI O'ZGARTIRING — ism va havolalar */
const CONFIG = {
  name: "Bahtiyarov Behruz",
  short: "Behruz",
  roles: ["Frontend Developer", "Veb-sayt yaratuvchi", "UI dizayn ixlosmandi", "Kelajak dasturchisi"],
  github: "https://github.com/baxtiyarov",
  demo: "https://portfolio-baxtiyarov.vercel.app",
  telegram: "https://t.me/998 91 861 34 381",
  email: "mailto:behruz.baxtiyarov@gmail.com",
  linkedin: "https://linkedin.com/in/baxtiyarov"
};
CONFIG.repo = CONFIG.github + "/portfolio";

const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);
const calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
const root = document.documentElement;

// Ism va havolalarni joylash
$$("[data-name]").forEach(e => e.textContent = CONFIG.name);
$$("[data-short]").forEach(e => e.textContent = CONFIG.short);
document.title = CONFIG.name + " | Frontend Developer";
$$("[data-link]").forEach(a => { a.href = CONFIG[a.dataset.link]; if (a.href.startsWith("http")) a.target = "_blank"; a.rel = "noopener"; });

// Qorong'i / yorug' rejim
const icon = () => $("#theme").textContent = root.dataset.theme === "dark" ? "🌙" : "☀️";
try { root.dataset.theme = localStorage.getItem("theme") || "dark"; } catch (e) {}
icon();
$("#theme").onclick = () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  icon();
};

// Telefon menyusi
$("#burger").onclick = () => document.body.classList.toggle("menu");
$$("nav a").forEach(a => a.onclick = () => document.body.classList.remove("menu"));

// Yuklash ekrani
let p = 0;
const load = setInterval(() => {
  p = Math.min(100, p + Math.random() * 14 + 4);
  $("#pct").textContent = Math.floor(p);
  $("#lbar").style.width = p + "%";
  if (p >= 100) { clearInterval(load); setTimeout(() => $("#loader").classList.add("hide"), 250); }
}, 90);

// Yozuv effekti
let ri = 0, ci = 0, del = false;
(function type() {
  const w = CONFIG.roles[ri];
  ci += del ? -1 : 1;
  $("#type").textContent = w.slice(0, ci);
  let t = del ? 40 : 90;
  if (!del && ci === w.length) { del = true; t = 1400; }
  else if (del && ci === 0) { del = false; ri = (ri + 1) % CONFIG.roles.length; t = 300; }
  setTimeout(type, t);
})();

// Skroll chizig'i va kursor nuri
addEventListener("scroll", () => {
  $("#prog").style.width = scrollY / (root.scrollHeight - innerHeight) * 100 + "%";
}, { passive: true });
addEventListener("pointermove", e => {
  const g = $("#glow"); g.style.left = e.clientX + "px"; g.style.top = e.clientY + "px";
});

// Ochilish animatsiyasi, ko'nikma chiziqlari, sanagichlar
const count = el => {
  const n = +el.dataset.n; let v = 0;
  const s = setInterval(() => { v += Math.max(1, n / 40); if (v >= n) { v = n; clearInterval(s); } el.textContent = Math.round(v); }, 35);
};
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add("on");
  e.target.querySelectorAll("[data-n]").forEach(count);
  io.unobserve(e.target);
}), { threshold: .15 });
$$(".rv").forEach((e, i) => { e.style.transitionDelay = (i % 3) * 0.12 + "s"; io.observe(e); });

// Menyuda joriy bo'lim
const so = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) $$("nav a").forEach(a => a.classList.toggle("on", a.hash === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
$$("main section").forEach(s => so.observe(s));

// Kartalarning 3D burilishi
$$(".tilt").forEach(c => {
  c.onpointermove = e => {
    const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    c.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateY(-6px)`;
  };
  c.onpointerleave = () => c.style.transform = "";
});

// Sichqonchaga javob beruvchi zarrachalar
const cv = $("#cv"), x = cv.getContext("2d"), m = { x: -999, y: -999 };
let W, H, P = [];
const size = () => {
  W = cv.width = innerWidth; H = cv.height = innerHeight;
  P = Array.from({ length: Math.min(80, W / 16 | 0) }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: Math.random() - .5, vy: Math.random() - .5 }));
};
size(); addEventListener("resize", size);
addEventListener("pointermove", e => { m.x = e.clientX; m.y = e.clientY; });
(function draw() {
  x.clearRect(0, 0, W, H);
  const c = root.dataset.theme === "dark" ? "255,190,120" : "200,80,30";
  P.forEach((a, i) => {
    a.x += a.vx; a.y += a.vy;
    if (a.x < 0 || a.x > W) a.vx *= -1;
    if (a.y < 0 || a.y > H) a.vy *= -1;
    x.fillStyle = `rgba(${c},.7)`; x.beginPath(); x.arc(a.x, a.y, 2, 0, 7); x.fill();
    for (let j = i + 1; j < P.length; j++) {
      const b = P[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 120) { x.strokeStyle = `rgba(${c},${.25 * (1 - d / 120)})`; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke(); }
    }
    const d = Math.hypot(a.x - m.x, a.y - m.y);
    if (d < 170) { x.strokeStyle = `rgba(255,93,143,${.5 * (1 - d / 170)})`; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(m.x, m.y); x.stroke(); }
  });
  if (!calm) requestAnimationFrame(draw);
})();

// Loyiha demosini oynada ochish
const M = $("#modal"), F = $("#frame");
$$("[data-demo]").forEach(a => a.onclick = e => {
  e.preventDefault(); const u = a.dataset.demo;
  if (window.DEMOS && DEMOS[u]) F.srcdoc = DEMOS[u]; else { F.removeAttribute("srcdoc"); F.src = u; }
  $("#mo").href = u; $("#mt").textContent = a.closest(".card").querySelector("h3").textContent;
  M.classList.add("open"); document.body.style.overflow = "hidden";
});
const shut = () => { M.classList.remove("open"); F.removeAttribute("srcdoc"); F.src = "about:blank"; document.body.style.overflow = ""; };
$("#mx").onclick = shut; M.onclick = e => { if (e.target === M) shut(); };
addEventListener("keydown", e => e.key === "Escape" && shut());
