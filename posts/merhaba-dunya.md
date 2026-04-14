# Merhaba, Dünya

İlk notu yazmak için iyi bir konu arıyordum. En mantıklısı bu siteyi nasıl yaptığımı anlatmak oldu.

## Neden Framework Kullanmadım?

React, Next.js gibi araçlar çok güçlü ama küçük bir portföy sitesi için gereksiz karmaşıklık getiriyor. Tercihim:

- Saf HTML, CSS, JavaScript
- Sıfır bağımlılık
- Anında yükleme, sıfır build adımı

GitHub Pages üzerinde doğrudan çalışıyor. Dosyayı kaydet, push et, canlıya geç.

## Öğrendiklerim

**Service Worker** düşündüğümden basit çıktı. Cache-first stratejisiyle çevrimdışı çalışma birkaç satır kod.

**CSS custom properties** ile tema sistemi çok şık. Bir `data-theme` attribute değişince tüm renkler cascade ediliyor.

**GitHub API** beklenmediği yerde sorun çıkardı — saatte 60 istek limiti. localStorage cache ile çözdüm.

## Sonraki Notlar

Daha spesifik konulara gireceğim: PWA kurulumu, animasyon teknikleri, API önbellekleme.
