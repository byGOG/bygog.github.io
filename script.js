const GITHUB_USERNAME = "byGOG";
const MAX_REPOS = 6;
const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${MAX_REPOS * 2}`;

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

async function loadGitHubProjects() {
  const list = document.querySelector("[data-github-projects]");
  const status = document.querySelector("[data-github-status]");

  if (!list || !status) {
    return;
  }

  status.textContent = "GitHub projeleri yükleniyor...";

  try {
    const response = await fetch(API_URL, {
      headers: {
        Accept: "application/vnd.github.mercy-preview+json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API hatası: ${response.status}`);
    }

    const data = await response.json();
    const repos = data.filter((repo) => !repo.fork && !repo.private).slice(0, MAX_REPOS);

    if (!repos.length) {
      status.textContent =
        "GitHub profilinde henüz öne çıkarılmış repo bulunmuyor. Öne çıkan seçkiyi keşfedin:";
      renderProjects(FALLBACK_PROJECTS, list);
      return;
    }

    const enriched = await Promise.all(repos.map(enrichRepository));

    let combined = enriched;
    let statusText = "GitHub'dan güncel projeler:";

    if (enriched.length < MAX_REPOS) {
      const missing = MAX_REPOS - enriched.length;
      const fallbackAppend = FALLBACK_PROJECTS.filter(
        (fallback) => !enriched.some((repo) => repo.name === fallback.name),
      ).slice(0, missing);

      if (fallbackAppend.length) {
        combined = [...enriched, ...fallbackAppend];
        statusText = "GitHub'dan güncel projeler ve seçilmiş ek çalışmalar:";
      }
    }

    status.textContent = statusText;
    renderProjects(combined, list);
  } catch (error) {
    console.error(error);
    status.textContent =
      "GitHub projeleri canlı olarak alınamadı. Öne çıkan çalışmaları aşağıda görebilirsiniz:";
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

  sanitized = sanitized.replace(/<!-\-[\s\S]*?-\->/g, "");
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

  projects.forEach((project) => {
    list.appendChild(buildProjectItem(project));
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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadGitHubProjects);
} else {
  loadGitHubProjects();
}
