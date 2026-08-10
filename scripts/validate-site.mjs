import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = ['index.html', 'en/index.html', 'notlar.html', 'style.css', 'script.js', 'app.js', 'sw.js', 'manifest.json', 'onder-gog.vcf', 'vendor/marked.min.js'];
const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) throw new Error(`Eksik dosyalar: ${missing.join(', ')}`);

const posts = JSON.parse(fs.readFileSync(path.join(root, 'posts/index.json'), 'utf8'));
const slugs = new Set();
for (const post of posts) {
  if (!post.slug || !post.title || !post.date || !post.category || !Array.isArray(post.tags)) {
    throw new Error(`Eksik not alanı: ${JSON.stringify(post)}`);
  }
  if (slugs.has(post.slug)) throw new Error(`Tekrarlanan slug: ${post.slug}`);
  slugs.add(post.slug);
  if (!fs.existsSync(path.join(root, 'posts', `${post.slug}.md`))) throw new Error(`Not dosyası yok: ${post.slug}.md`);
}

for (const htmlFile of ['index.html', 'en/index.html', 'notlar.html', '404.html']) {
  const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');
  if (!/<html[^>]+lang="[a-z-]+"/i.test(html)) throw new Error(`${htmlFile}: lang eksik`);
  if (!/<meta[^>]+name="description"/i.test(html)) throw new Error(`${htmlFile}: description eksik`);
}

console.log(`${posts.length} not ve ${required.length} temel dosya doğrulandı.`);
