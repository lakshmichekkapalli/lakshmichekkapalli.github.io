document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle, persisted in localStorage.
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function systemPrefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(theme) {
  if (theme) {
    root.setAttribute("data-theme", theme);
  } else {
    root.removeAttribute("data-theme");
  }
  const isDark = theme ? theme === "dark" : systemPrefersDark();
  themeToggle.textContent = isDark ? "☀️" : "🌙";
}

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || (systemPrefersDark() ? "dark" : "light");
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
