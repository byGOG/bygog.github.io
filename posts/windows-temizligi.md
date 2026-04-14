# Windows'u Hızlandırmanın Kolay Yolları

Yeni bir Windows kurulumu zamanla yavaşlar. Arka planda çalışan servisler, gereksiz başlangıç programları, şişirilmiş geçici dosyalar... Bunları temizlemek için üçüncü parti yazılıma gerek yok — Windows'un kendi araçları yeterli.

## Başlangıç Programlarını Kısalt

En kolay kazanım burası. Her kurduğun program kendini başlangıca ekliyor.

`Ctrl + Shift + Esc` → Görev Yöneticisi → **Başlangıç Uygulamaları** sekmesi.

Kullanmadıklarını devre dışı bırak. Discord, Spotify, OneDrive, Teams — hepsi burada. Gerçekten açılışta lazım olan ne kadar az program varsa o kadar iyi.

## Geçici Dosyaları Temizle

```powershell
# PowerShell ile tek satırda
Remove-Item "$env:TEMP\*" -Recurse -Force -ErrorAction SilentlyContinue
```

Ya da klasik yol: `Win + R` → `%temp%` → hepsini seç → sil.

Windows ayrıca kendi temizlik aracına sahip: **Disk Temizleme** (`cleanmgr`). "Sistem dosyalarını temizle" seçeneğiyle eski Windows güncellemelerini de siler — bazen birkaç GB kazanırsın.

## Güç Planını Değiştir

Dizüstü bilgisayarlarda varsayılan plan "Dengeli" geliyor. Masaüstünde veya şarjda kullanıyorsan:

**Denetim Masası → Güç Seçenekleri → Yüksek Performans**

Ya da PowerShell ile:

```powershell
powercfg /setactive SCHEME_MIN
```

## Görsel Efektleri Azalt

Windows'un cam efektleri, animasyonlar, gölgeler — bunlar GPU ve CPU yer tutuyor. Düşük donanımlı makinelerde fark edilir.

`Win + R` → `sysdm.cpl` → **Gelişmiş** → Performans → **Ayarlar** → "En iyi performans için ayarla".

Hepsini kapatmak çirkin görünüyor, sadece şunları açık bırakabilirsin:
- Masaüstü simgeleri için pürüzsüz kenarlar
- Ekran yazı tiplerinin pürüzsüz kenarları

## SSD Varsa TRIM Aktif Mi?

```powershell
fsutil behavior query DisableDeleteNotify
```

`0` dönüyorsa TRIM açık, iyisindir. `1` dönüyorsa:

```powershell
fsutil behavior set DisableDeleteNotify 0
```

## Hızlı Başlatmayı Kapat

Paradoks gibi görünüyor ama "Hızlı Başlatma" bazen sorunlara yol açıyor. Tam bir yeniden başlatma yerine hibern modundan devam ettiği için sürücü sorunları çıkabiliyor.

**Güç Seçenekleri → Güç düğmelerinin yapacaklarını seçin → Hızlı başlatmayı aç → Kapat**

---

Bu adımlar çoğu makinede belirgin fark yaratıyor. Üçüncü parti "optimizer" yazılımlarından uzak dur — genellikle işe yaramaz, bazen zararlı olur.
