document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle, persisted in localStorage. Default is dark (this is a dev
// portfolio) unless the system explicitly prefers light — matches the CSS,
// which is dark by default and only flips via [data-theme="light"] or an
// explicit `prefers-color-scheme: light` media query.
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function systemPrefersLight() {
  return window.matchMedia("(prefers-color-scheme: light)").matches;
}

function applyTheme(theme) {
  if (theme) {
    root.setAttribute("data-theme", theme);
  } else {
    root.removeAttribute("data-theme");
  }
  const isDark = theme ? theme === "dark" : !systemPrefersLight();
  themeToggle.textContent = isDark ? "☀️" : "🌙";
}

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || (systemPrefersLight() ? "light" : "dark");
  const next = current === "dark" ? "light" : "dark";
  localStorage.setItem("theme", next);
  applyTheme(next);
});

// Mobile nav toggle.
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Reveal-on-scroll for below-the-fold content. Elements already in the
// viewport at load stay visible (CSS default) rather than depending on the
// observer to reveal them — content should never be gated on JS running.
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("pending");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);
revealEls.forEach((el) => {
  const rect = el.getBoundingClientRect();
  const alreadyInViewport = rect.top < window.innerHeight && rect.bottom > 0;
  if (!alreadyInViewport) {
    el.classList.add("pending");
  }
  observer.observe(el);
});
