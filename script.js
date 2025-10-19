const GITHUB_USERNAME = "byGOG";
const MAX_REPOS = 6;
const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${MAX_REPOS * 2}`;

async function loadGitHubProjects() {
  const list = document.querySelector("[data-github-projects]");
  const status = document.querySelector("[data-github-status]");

  if (!list || !status) {
    return;
  }

  status.textContent = "GitHub projeleri yükleniyor...";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`GitHub API hatası: ${response.status}`);
    }

    const data = await response.json();
    const repos = data
      .filter((repo) => !repo.fork && !repo.private)
      .slice(0, MAX_REPOS);

    list.innerHTML = "";

    if (!repos.length) {
      status.textContent = "Şu anda gösterilecek açık kaynak proje bulunmuyor.";
      return;
    }

    repos.forEach((repo) => {
      const item = document.createElement("li");
      item.className = "github-item";

      const link = document.createElement("a");
      link.href = repo.html_url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = repo.name;

      const description = document.createElement("p");
      description.textContent = repo.description || "Açıklama eklenmemiş.";

      item.appendChild(link);
      item.appendChild(description);
      list.appendChild(item);
    });

    status.textContent = "GitHub'dan güncel projeler:";
  } catch (error) {
    console.error(error);
    status.textContent = "Projeler yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.";
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadGitHubProjects);
} else {
  loadGitHubProjects();
}
