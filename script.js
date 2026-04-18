const GITHUB_USERNAME = "byGOG";
const MAX_REPOS = 6;
const REPO_API_BASE = `https://api.github.com/repos/${GITHUB_USERNAME}`;

const CACHE_KEY = "bygog_gh_cache";
const CACHE_TTL = 3600 * 1000; // 1 saat

function getCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return data;
  } catch { return null; }
}

function setCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch {}
}

const PROJECT_OVERRIDES = {
  "bygog.github.io": {
    displayName: "Kişisel Site Kaynağı",
    description: "Bu GitHub Pages deposu kişisel portföyümün tasarımını, animasyonlarını ve bileşenlerini barındırır.",
    homepage: "https://bygog.github.io",
    topics: ["GitHub Pages", "Portföy", "HTML", "CSS"],
    language: "CSS",
  },
  "byGOG-Lab": {
    displayName: "byGOG Lab",
    description: "Windows ve yazılım araçları için güvenilir bağlantıları tek sayfada sunan PWA; arama ve çevrimdışı destekli.",
    homepage: "https://bygog.github.io/byGOG-Lab/",
    topics: ["PWA", "Windows", "Bağlantı Koleksiyonu"],
  },
  "byGOG-OnlineInstaller": {
    displayName: "Online Installer",
    description: "PowerShell ve cURL kullanarak popüler yazılımları hızlıca indirip kuran menü tabanlı otomasyon betiği.",
    topics: ["PowerShell", "cURL", "Otomasyon"],
  },
  "ZTE-H3601P": {
    displayName: "ZTE H3601P Otomasyonu",
    description: "ZTE H3601P modemini belirli aralıklarla yeniden başlatıp IP değişimini kontrol eden Python uygulaması.",
    topics: ["Python", "Ağ", "Otomasyon"],
    language: "Python",
  },
  GOGon: {
    displayName: "GOGon Yükleyici",
    description: "PySide6 arayüzüyle yazılım kategorilerini listeler, tek tıklamayla indirme ve kurulum akışı sunar.",
    topics: ["PySide6", "Masaüstü Uygulaması", "Yükleyici"],
  },
  "byGOG-OnlineWarez": {
    displayName: "Online Warez",
    description: "PowerShell ile popüler yazılımları ve araçları tek komutta indirmeye odaklanan otomasyon betikleri.",
    topics: ["PowerShell", "Script", "İndirme"],
  },
};

function createFallbackProject(name, url, language) {
  const override = PROJECT_OVERRIDES[name] || {};
  return {
    name,
    displayName: override.displayName || name,
    url,
    description: truncateText(override.description || "Proje detayları yakında güncellenecek."),
    language: override.language || language || null,
    stars: null,
    forks: null,
    updatedAt: null,
    homepage: override.homepage || null,
    topics: override.topics ? [...override.topics] : [],
    isFallback: true,
  };
}

const FALLBACK_PROJECTS = [
  createFallbackProject("byGOG-Lab", "https://github.com/byGOG/byGOG-Lab", "JavaScript"),
  createFallbackProject("byGOG-OnlineInstaller", "https://github.com/byGOG/byGOG-OnlineInstaller", "PowerShell"),
  createFallbackProject("ZTE-H3601P", "https://github.com/byGOG/ZTE-H3601P", "Python"),
  createFallbackProject("GOGon", "https://github.com/byGOG/GOGon", "Python"),
  createFallbackProject("byGOG-OnlineWarez", "https://github.com/byGOG/byGOG-OnlineWarez", "PowerShell"),
  createFallbackProject("bygog.github.io", "https://github.com/byGOG/bygog.github.io", "CSS"),
];

const relativeTimeFormatter =
  typeof Intl !== "undefined" && typeof Intl.RelativeTimeFormat === "function"
    ? new Intl.RelativeTimeFormat("tr", { numeric: "auto" })
    : null;

function renderSkeletons(list, count) {
  list.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const item = document.createElement("li");
    item.className = "github-item github-item--skeleton";
    item.setAttribute("aria-hidden", "true");
    item.innerHTML =
      '<div class="skeleton-line skeleton-line--title"></div>' +
      '<div class="skeleton-line"></div>' +
      '<div class="skeleton-line skeleton-line--short"></div>' +
      '<div class="skeleton-line skeleton-line--meta"></div>';
    list.appendChild(item);
  }
}

async function fetchPinnedRepos() {
  const names = Object.keys(PROJECT_OVERRIDES);
  const results = await Promise.all(
    names.map((name) =>
      fetch(`${REPO_API_BASE}/${name}`, {
        headers: { Accept: "application/vnd.github.mercy-preview+json" },
      })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null)
    )
  );
  return results.filter((r) => r && !r.fork && !r.private);
}

async function renderRepos(repos, list, status) {
  const enriched = await Promise.all(repos.map(enrichRepository));
  status.textContent = "GitHub'dan güncel projeler:";
  renderProjects(enriched, list);
}

async function loadGitHubProjects() {
  const list = document.querySelector("[data-github-projects]");
  const status = document.querySelector("[data-github-status]");

  if (!list || !status) {
    return;
  }

  // Stale-while-revalidate: cache varsa hemen göster, arkada güncelle
  const cachedRepos = getCache();
  if (cachedRepos && cachedRepos.length) {
    await renderRepos(cachedRepos, list, status);
    fetchPinnedRepos()
      .then((repos) => {
        if (repos.length) {
          setCache(repos);
          renderRepos(repos, list, status);
        }
      })
      .catch(() => {});
    return;
  }

  renderSkeletons(list, MAX_REPOS);
  status.textContent = "GitHub projeleri yükleniyor...";

  try {
    const repos = await fetchPinnedRepos();
    if (!repos.length) {
      status.textContent = "Öne çıkan projeler:";
      renderProjects(FALLBACK_PROJECTS, list);
      return;
    }
    setCache(repos);
    await renderRepos(repos, list, status);
  } catch {
    status.textContent = "GitHub projeleri alınamadı. Öne çıkan çalışmalar:";
    renderProjects(FALLBACK_PROJECTS, list);
  }
}

async function enrichRepository(repo) {
  const override = PROJECT_OVERRIDES[repo.name] || {};
  let description = override.description || repo.description;

  if (!description) {
    description = await fetchReadmeSummary(repo);
  }

  if (!description) {
    description = "Bu proje için açıklama henüz eklenmedi.";
  }

  const topics = uniqueTopics([
    ...(override.topics || []),
    ...(Array.isArray(repo.topics) ? repo.topics : []),
  ]);

  const language = override.language || repo.language || null;
  const stars = typeof repo.stargazers_count === "number" ? repo.stargazers_count : 0;
  const forks = typeof repo.forks_count === "number" ? repo.forks_count : 0;
  const updatedAt = repo.pushed_at || repo.updated_at || null;

  return {
    name: repo.name,
    displayName: override.displayName || repo.name,
    url: repo.html_url,
    description: truncateText(description),
    language,
    stars,
    forks,
    updatedAt,
    homepage: override.homepage || repo.homepage || null,
    topics,
    isFallback: false,
  };
}

function uniqueTopics(topics) {
  return Array.from(new Set(topics.filter(Boolean).map((topic) => topic.trim())));
}

async function fetchReadmeSummary(repo) {
  const owner = repo.owner?.login || GITHUB_USERNAME;
  const branch = repo.default_branch || "main";
  const readmeUrl = `https://raw.githubusercontent.com/${owner}/${repo.name}/${branch}/README.md`;

  try {
    const response = await fetch(readmeUrl);

    if (!response.ok) {
      return null;
    }

    const markdown = await response.text();
    return extractSummary(markdown);
  } catch {
    return null;
  }
}

function extractSummary(markdown) {
  if (!markdown) {
    return null;
  }

  const lines = markdown.split(/\r?\n/);
  let inCodeBlock = false;

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();

    if (!trimmed) {
      continue;
    }

    if (trimmed.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      continue;
    }

    if (trimmed.startsWith("<!--") && trimmed.endsWith("-->")) {
      continue;
    }

    if (trimmed.startsWith(">")) {
      continue;
    }

    if (trimmed.startsWith("`")) {
      continue;
    }

    const sanitized = sanitizeLine(rawLine);

    if (!sanitized) {
      continue;
    }

    if (trimmed.startsWith("#") && sanitized.length < 30) {
      continue;
    }

    if (sanitized.length < 25 && sanitized.split(" ").length <= 3) {
      continue;
    }

    return truncateText(sanitized);
  }

  return null;
}

function sanitizeLine(line) {
  let sanitized = line;

  sanitized = sanitized.replace(/<!--[\s\S]*?-->/g, "");
  sanitized = sanitized.replace(/!\[[^\]]*\]\([^\)]*\)/g, "");
  sanitized = sanitized.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");
  sanitized = sanitized.replace(/`{1,3}([^`]+)`{1,3}/g, "$1");
  sanitized = sanitized.replace(/<[^>]+>/g, " ");
  sanitized = sanitized.replace(/^\s*[>*+-]\s+/g, "");
  sanitized = sanitized.replace(/^\s*#{1,6}\s+/g, "");
  sanitized = sanitized.replace(/\*\*([^*]+)\*\*/g, "$1");
  sanitized = sanitized.replace(/__([^_]+)__/g, "$1");
  sanitized = sanitized.replace(/\*([^*]+)\*/g, "$1");
  sanitized = sanitized.replace(/_([^_]+)_/g, "$1");
  sanitized = sanitized.replace(/\s+/g, " ");

  return sanitized.trim();
}

function truncateText(text, maxLength = 220) {
  if (!text) {
    return "";
  }

  const trimmed = text.trim();

  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  return `${trimmed.slice(0, maxLength - 1).trim()}…`;
}

function formatRelativeTime(dateString) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  if (!relativeTimeFormatter) {
    return date.toLocaleDateString("tr-TR");
  }

  let duration = (date.getTime() - Date.now()) / 1000;
  const divisions = [
    { amount: 60, unit: "second" },
    { amount: 60, unit: "minute" },
    { amount: 24, unit: "hour" },
    { amount: 7, unit: "day" },
    { amount: 4.34524, unit: "week" },
    { amount: 12, unit: "month" },
    { amount: Infinity, unit: "year" },
  ];

  for (const division of divisions) {
    if (Math.abs(duration) < division.amount) {
      return relativeTimeFormatter.format(Math.round(duration), division.unit);
    }

    duration /= division.amount;
  }

  return null;
}

function formatAbsoluteDate(dateString) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  try {
    return new Intl.DateTimeFormat("tr-TR", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(date);
  } catch (error) {
    return date.toLocaleString();
  }
}

function renderProjects(projects, list) {
  list.innerHTML = "";

  if (!projects.length) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "github-item github-item--empty";
    emptyItem.textContent = "Şu anda listelenecek proje bulunmuyor.";
    list.appendChild(emptyItem);
    return;
  }

  projects.forEach((project, index) => {
    const item = buildProjectItem(project);
    item.style.setProperty("--i", index);
    list.appendChild(item);
  });
}

function buildProjectItem(project) {
  const item = document.createElement("li");
  item.className = "github-item";
  item.dataset.source = project.isFallback ? "fallback" : "github";

  const titleRow = document.createElement("div");
  titleRow.className = "github-item__title-row";

  const title = document.createElement("a");
  title.className = "github-item__title";
  title.href = project.url;
  title.target = "_blank";
  title.rel = "noopener";
  const displayName = project.displayName || project.name;
  title.textContent = displayName;
  title.setAttribute("aria-label", `${displayName} GitHub deposunu yeni sekmede aç`);
  titleRow.appendChild(title);

  if (project.homepage) {
    const demoLink = document.createElement("a");
    demoLink.className = "github-item__demo";
    demoLink.href = project.homepage;
    demoLink.target = "_blank";
    demoLink.rel = "noopener";
    demoLink.textContent = "Canlı demo";
    titleRow.appendChild(demoLink);
  }

  item.appendChild(titleRow);

  if (project.description) {
    const description = document.createElement("p");
    description.className = "github-item__description";
    description.textContent = project.description;
    item.appendChild(description);
  }

  if (project.topics && project.topics.length) {
    const topicList = document.createElement("ul");
    topicList.className = "github-topics";

    project.topics.forEach((topic) => {
      const topicItem = document.createElement("li");
      topicItem.textContent = topic;
      topicList.appendChild(topicItem);
    });

    item.appendChild(topicList);
  }

  const metaItems = [];

  if (project.language) {
    metaItems.push({
      icon: "🛠️",
      label: project.language,
      srLabel: `Ana dil ${project.language}`,
    });
  }

  if (typeof project.stars === "number") {
    metaItems.push({
      icon: "⭐",
      label: project.stars.toString(),
      srLabel: `${project.stars} GitHub yıldızı`,
    });
  }

  if (typeof project.forks === "number") {
    metaItems.push({
      icon: "🍴",
      label: project.forks.toString(),
      srLabel: `${project.forks} çatal`,
    });
  }

  if (project.updatedAt) {
    const relative = formatRelativeTime(project.updatedAt);
    const absolute = formatAbsoluteDate(project.updatedAt);

    if (relative) {
      metaItems.push({
        icon: "🕒",
        label: relative,
        srLabel: `Son güncellenme tarihi ${absolute}`,
        title: absolute,
      });
    }
  }

  if (metaItems.length) {
    const metaList = document.createElement("ul");
    metaList.className = "github-meta";

    metaItems.forEach((meta) => {
      metaList.appendChild(createMetaItem(meta));
    });

    item.appendChild(metaList);
  }

  return item;
}

function createMetaItem({ icon, label, srLabel, title }) {
  const item = document.createElement("li");
  item.className = "github-meta__item";

  if (title) {
    item.title = title;
  }

  if (icon) {
    const iconSpan = document.createElement("span");
    iconSpan.setAttribute("aria-hidden", "true");
    iconSpan.textContent = icon;
    item.appendChild(iconSpan);
  }

  const text = document.createElement("span");
  text.textContent = label;
  item.appendChild(text);

  if (srLabel) {
    const sr = document.createElement("span");
    sr.className = "sr-only";
    sr.textContent = srLabel;
    item.appendChild(sr);
  }

  return item;
}

function applyLang(lang) {
  document.querySelectorAll("[data-tr]").forEach(function (el) {
    el.textContent = lang === "en" ? (el.dataset.en || el.dataset.tr) : el.dataset.tr;
  });
  document.querySelectorAll("[data-tr-placeholder]").forEach(function (el) {
    el.placeholder = lang === "en"
      ? (el.dataset.enPlaceholder || el.dataset.trPlaceholder)
      : el.dataset.trPlaceholder;
  });
  document.documentElement.setAttribute("lang", lang === "en" ? "en" : "tr");
  var langText = document.querySelector(".lang-toggle__text");
  if (langText) langText.textContent = lang === "en" ? "TR" : "EN";
}

function initLangToggle() {
  var saved = localStorage.getItem("lang") || "tr";
  applyLang(saved);
  var btn = document.querySelector(".lang-toggle");
  if (!btn) return;
  btn.addEventListener("click", function () {
    var current = localStorage.getItem("lang") || "tr";
    var next = current === "tr" ? "en" : "tr";
    localStorage.setItem("lang", next);
    applyLang(next);
  });
}

function initNavToggle() {
  var nav = document.querySelector(".site-nav");
  var toggle = document.querySelector(".nav-toggle");
  if (!nav || !toggle) return;

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("site-nav--open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.setAttribute("aria-label", isOpen ? "Menüyü kapat" : "Menüyü aç");
  });

  nav.querySelectorAll(".site-nav__link").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("site-nav--open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Menüyü aç");
    });
  });

  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target) && nav.classList.contains("site-nav--open")) {
      nav.classList.remove("site-nav--open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Menüyü aç");
    }
  });
}

function initThemeToggle() {
  var btn = document.querySelector(".theme-toggle");
  if (!btn) return;
  btn.addEventListener("click", function () {
    var current = document.documentElement.getAttribute("data-theme");
    var next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    var metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.content = next === "light" ? "#f5f5f5" : "#0a0a0a";
  });
}

function initFooterYear() {
  var el = document.getElementById("footer-year");
  if (el) el.textContent = new Date().getFullYear();
}

function initNavScrollState() {
  var nav = document.querySelector(".site-nav");
  var hero = document.getElementById("hero");
  if (!nav || !hero || !("IntersectionObserver" in window)) return;
  new IntersectionObserver(function (entries) {
    nav.classList.toggle("site-nav--scrolled", !entries[0].isIntersecting);
  }, { threshold: 0.1 }).observe(hero);
}

function initServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch(function () {});
  }
}

function initAll() {
  loadGitHubProjects();
  initLangToggle();
  initNavToggle();
  initThemeToggle();
  initFooterYear();
  initNavScrollState();
  initServiceWorker();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAll);
} else {
  initAll();
}
