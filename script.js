const GITHUB_USERNAME = "byGOG";
const MAX_REPOS = 5;
const REPO_API_BASE = `https://api.github.com/repos/${GITHUB_USERNAME}`;

const CACHE_KEY = "bygog_gh_cache_v3";
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
  "Tamga": {
    displayName: "Tamga",
    description: "Windows uygulamalarını tek yerden keşfetmeyi, topluca kurmayı, kaldırmayı ve güncellemeyi kolaylaştıran açık kaynak masaüstü aracı.",
    homepage: "https://bygog.github.io/Tamga/",
    topics: ["Windows", "PowerShell", "WinGet", "Uygulama Yöneticisi"],
    language: "PowerShell",
  },
  "Windows-Desktop-Icons-Installer": {
    displayName: "Masaüstü Simgeleri",
    description: "Bu Bilgisayar, Kullanıcı Dosyaları, Ağ, Geri Dönüşüm Kutusu ve Denetim Masası simgelerini tek komutla masaüstüne ekler.",
    homepage: "https://bygog.github.io/Windows-Desktop-Icons-Installer/",
    topics: ["Windows", "PowerShell", "Masaüstü", "Tek Komut"],
    language: "PowerShell",
  },
  "Bibata-Cursor-Installer": {
    displayName: "Bibata Cursor Installer",
    description: "Windows için Bibata Modern Ice imleç temasının tek tıkla otomatik kurulumunu sağlayan araç.",
    topics: ["PowerShell", "Windows", "UI", "Theme"],
    language: "PowerShell",
  },
  "bygog.github.io": {
    displayName: "Kişisel Site Kaynağı",
    description: "Bu GitHub Pages deposu kişisel portföyümün tasarımını, animasyonlarını ve bileşenlerini barındırır.",
    homepage: "https://bygog.github.io",
    topics: ["GitHub Pages", "Portföy", "HTML", "CSS"],
    language: "CSS",
  },
  "ZTE-H3601P": {
    displayName: "ZTE H3601P Otomasyonu",
    description: "ZTE H3601P modemini belirli aralıklarla yeniden başlatıp IP değişimini kontrol eden Python uygulaması.",
    topics: ["Python", "Ağ", "Otomasyon"],
    language: "Python",
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
  createFallbackProject("Tamga", "https://github.com/byGOG/Tamga", "PowerShell"),
  createFallbackProject("Windows-Desktop-Icons-Installer", "https://github.com/byGOG/Windows-Desktop-Icons-Installer", "PowerShell"),
  createFallbackProject("Bibata-Cursor-Installer", "https://github.com/byGOG/Bibata-Cursor-Installer", "PowerShell"),
  createFallbackProject("ZTE-H3601P", "https://github.com/byGOG/ZTE-H3601P", "Python"),
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

async function loadGitHubProjects() {
  const list = document.querySelector("[data-github-projects]");
  const status = document.querySelector("[data-github-status]");

  if (!list || !status) {
    return;
  }

  renderSkeletons(list, MAX_REPOS);
  setProjectStatus(status, "projects.loading", "GitHub projeleri yükleniyor...");

  try {
    // Önce önbelleğe bak (1 saatlik TTL)
    const cachedRepos = getCache();
    let repos;

    if (cachedRepos) {
      repos = cachedRepos;
    } else {
      // PROJECT_OVERRIDES'daki repoları tek tek çek — pinned repo benzeri davranış
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
      repos = results.filter((r) => r && !r.fork && !r.private);
      if (repos.length) setCache(repos);
    }

    if (!repos.length) {
      setProjectStatus(status, "projects.fallback", "Öne çıkan projeler:");
      renderProjects(FALLBACK_PROJECTS, list);
      return;
    }

    const enriched = await Promise.all(repos.map(enrichRepository));
    setProjectStatus(status, "projects.current", "GitHub'dan güncel projeler:");
    renderProjects(enriched, list);
  } catch (error) {
    console.error(error);
    setProjectStatus(status, "projects.error", "GitHub projeleri alınamadı. Öne çıkan çalışmalar:");
    renderProjects(FALLBACK_PROJECTS, list);
  }
}

function setProjectStatus(element, key, fallback) {
  element.dataset.i18nKey = key;
  element.textContent = window.siteText ? window.siteText(key, fallback) : fallback;
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
  } catch (error) {
    console.warn("README özetine ulaşılamadı:", error);
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
  const filters = document.querySelector("[data-project-filters]");
  const result = document.querySelector("[data-project-filter-result]");
  let activeTechnology = "Tümü";

  if (!projects.length) {
    list.innerHTML = "";
    const emptyItem = document.createElement("li");
    emptyItem.className = "github-item github-item--empty";
    emptyItem.textContent = "Şu anda listelenecek proje bulunmuyor.";
    list.appendChild(emptyItem);
    return;
  }

  const preferredTechnologies = ["PowerShell", "Windows", "Python", "WinGet", "HTML", "CSS"];
  const availableTechnologies = preferredTechnologies.filter((technology) =>
    projects.some((project) => projectTechnologies(project).includes(technology.toLocaleLowerCase("tr-TR")))
  );

  function drawProjects() {
    const visibleProjects = activeTechnology === "Tümü"
      ? projects
      : projects.filter((project) =>
          projectTechnologies(project).includes(activeTechnology.toLocaleLowerCase("tr-TR"))
        );

    list.innerHTML = "";
    visibleProjects.forEach((project, index) => {
      const item = buildProjectItem(project);
      item.style.setProperty("--i", index);
      list.appendChild(item);
    });

    if (result) {
      const countText = window.siteText ? window.siteText("projects.count", "{count} proje gösteriliyor") : "{count} proje gösteriliyor";
      result.textContent = countText.replace("{count}", visibleProjects.length);
    }
  }

  if (filters) {
    filters.innerHTML = "";
    ["Tümü", ...availableTechnologies].forEach((technology) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.technology = technology;
      button.className = `project-filter${technology === "Tümü" ? " is-active" : ""}`;
      button.textContent = technology === "Tümü" && window.siteText ? window.siteText("projects.all", technology) : technology;
      button.setAttribute("aria-pressed", technology === "Tümü" ? "true" : "false");
      button.addEventListener("click", () => {
        activeTechnology = technology;
        filters.querySelectorAll(".project-filter").forEach((item) => {
          const selected = item === button;
          item.classList.toggle("is-active", selected);
          item.setAttribute("aria-pressed", selected ? "true" : "false");
        });
        drawProjects();
      });
      filters.appendChild(button);
    });
  }

  drawProjects();
}

function projectTechnologies(project) {
  return Array.from(new Set([project.language, ...(project.topics || [])]
    .filter(Boolean)
    .map((technology) => technology.toLocaleLowerCase("tr-TR"))));
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

  const detailsButton = document.createElement("button");
  detailsButton.className = "github-item__details";
  detailsButton.type = "button";
  detailsButton.textContent = window.siteText ? window.siteText("projects.details", "Ayrıntılar") : "Ayrıntılar";
  detailsButton.setAttribute("aria-label", `${displayName} proje ayrıntılarını göster`);
  detailsButton.addEventListener("click", () => openProjectDialog(project));
  item.appendChild(detailsButton);

  return item;
}

function openProjectDialog(project) {
  const dialog = document.querySelector("[data-project-dialog]");
  if (!dialog) return;
  const displayName = project.displayName || project.name;
  const image = dialog.querySelector("[data-project-dialog-image]");
  image.src = project.image || `https://opengraph.githubassets.com/bygog-site/${GITHUB_USERNAME}/${project.name}`;
  image.alt = `${displayName} proje önizlemesi`;
  dialog.querySelector("[data-project-dialog-title]").textContent = displayName;
  dialog.querySelector("[data-project-dialog-description]").textContent = project.description || "Bu proje için ayrıntılı açıklama henüz eklenmedi.";

  const topics = dialog.querySelector("[data-project-dialog-topics]");
  topics.innerHTML = "";
  Array.from(new Set([project.language, ...(project.topics || [])].filter(Boolean))).forEach((topic) => {
    const item = document.createElement("li");
    item.textContent = topic;
    topics.appendChild(item);
  });

  dialog.querySelector("[data-project-dialog-github]").href = project.url;
  dialog.showModal();
}

function initProjectDialog() {
  const dialog = document.querySelector("[data-project-dialog]");
  if (!dialog) return;
  dialog.querySelector("[data-project-dialog-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

initProjectDialog();

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

async function loadLatestNotes() {
  const list = document.querySelector("[data-latest-notes]");
  if (!list) return;

  try {
    const response = await fetch("/posts/index.json");
    if (!response.ok) throw new Error("Not listesi alınamadı");
    const posts = await response.json();
    const latest = [...posts]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

    list.innerHTML = "";
    latest.forEach((post) => {
      const item = document.createElement("li");
      item.className = "latest-note";

      const link = document.createElement("a");
      link.className = "latest-note__link";
      link.href = `/notlar.html?p=${encodeURIComponent(post.slug)}`;

      const date = document.createElement("time");
      date.className = "latest-note__date";
      date.dateTime = post.date;
      date.textContent = new Date(`${post.date}T12:00:00`).toLocaleDateString("tr-TR", {
        day: "numeric", month: "long", year: "numeric",
      });

      const title = document.createElement("h3");
      title.className = "latest-note__title";
      title.textContent = post.title;

      const excerpt = document.createElement("p");
      excerpt.className = "latest-note__excerpt";
      excerpt.textContent = truncateText(post.excerpt || "", 150);

      const action = document.createElement("span");
      action.className = "latest-note__action";
      action.textContent = window.siteText ? window.siteText("latest.read", "Notu oku →") : "Notu oku →";

      link.append(date, title, excerpt, action);
      item.appendChild(link);
      list.appendChild(item);
    });
  } catch (error) {
    list.innerHTML = '<li class="latest-note latest-note--empty">Son notlar şu anda yüklenemedi.</li>';
  }
}

loadLatestNotes();

document.addEventListener("site-language-change", () => {
  document.querySelectorAll("[data-github-status][data-i18n-key]").forEach((status) => {
    status.textContent = window.siteText(status.dataset.i18nKey, status.textContent);
  });
  document.querySelectorAll(".project-filter").forEach((button) => {
    if (button.dataset.technology === "Tümü") button.textContent = window.siteText("projects.all", "Tümü");
  });
  document.querySelectorAll(".github-item__details").forEach((button) => {
    button.textContent = window.siteText("projects.details", "Ayrıntılar");
  });
  document.querySelectorAll(".latest-note__action").forEach((action) => {
    action.textContent = window.siteText("latest.read", "Notu oku →");
  });
  const result = document.querySelector("[data-project-filter-result]");
  if (result) {
    result.textContent = window.siteText("projects.count", "{count} proje gösteriliyor")
      .replace("{count}", document.querySelectorAll("[data-github-projects] .github-item").length);
  }
});





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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    loadGitHubProjects();


    initNavToggle();
  });
} else {
  loadGitHubProjects();


  initNavToggle();
}
