# Önder GÖG | Kişisel Web Sitesi

Bu depo, Önder GÖG'ün GitHub Pages üzerinde yayınlanan kişisel tanıtım sayfasının kaynak dosyalarını içerir. Arayüz, modern bir tek sayfa tasarımıyla geliştirildi ve ziyaretçilere hızlıca iletişim kanallarına erişme, kısa özgeçmişi okuma ve sosyal hesaplara yönlenme imkânı sunar.

- [Hızlı Bakış](#hızlı-bakış)
- [Canlı Demo](#canlı-demo)
- [Özellikler](#özellikler)
- [Kurulum ve Yerel Geliştirme](#kurulum-ve-yerel-geliştirme)
- [Proje Yapısı](#proje-yapısı)
- [Arayüz Bölümleri](#arayüz-bölümleri)
- [Özelleştirme İpuçları](#özelleştirme-ipuçları)
- [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
- [Bakım ve Yayınlama](#bakım-ve-yayınlama)
- [Katkıda Bulunma](#katkıda-bulunma)
- [Teşekkür ve İlham Kaynakları](#teşekkür-ve-ilham-kaynakları)
- [Lisans](#lisans)
- [İletişim](#iletişim)

## Hızlı Bakış
- 🔍 **Tür:** Statik kişisel portföy / özgeçmiş sitesi
- 🚀 **Canlı Yayın:** GitHub Pages üzerinde otomatik olarak yayınlanır
- 🧱 **Teknolojiler:** HTML, CSS, Google Fonts
- 🛠️ **Düzenleme Kolaylığı:** Tek dosya (index.html) üzerinden tüm içerik ve stil güncellenebilir
- 📂 **Depo Sahibi:** [Önder GÖG](https://github.com/byGOG)
- 📬 **Geri Bildirim:** Pull request veya issue açarak katkıda bulunabilirsiniz

## Canlı Demo
GitHub Pages üzerinden son sürümü görüntülemek için aşağıdaki bağlantıyı kullanabilirsiniz:

- **Site Adresi:** <https://bygog.github.io>

## Özellikler
- 🌌 **Animasyonlu arka plan** ile dikkat çeken, koyu temalı modern tasarım
- 🧾 **Öne çıkan profil alanı**: Hexagon biçiminde profil görseli ve isim animasyonu
- ✍️ **Kısa biyografi** ve yetkinlik listesini vurgulayan "Hakkımda" kartı
- 🔗 **Sosyal bağlantılar**: YouTube, LinkedIn, Discord ve e-posta gibi platformlara hızlı erişim
- 📱 **Mobil uyumlu düzen**: Tüm cihazlarda optimize edilmiş görüntüleme
- ⚡ **Performans odaklı**: Harici JavaScript veya ağır kütüphaneler olmadan hızlı yükleme
- 🌐 **SEO hazırlığı**: Başlık, açıklama ve Open Graph etiketleri kolayca güncellenebilir yapıdadır

## Kurulum ve Yerel Geliştirme
Projeyi klonladıktan sonra statik bir HTML sayfası olduğu için ek bağımlılık gerektirmez. Ancak yerel geliştirme sırasında bir HTTP sunucusu üzerinden yayınlamak daha sağlıklı olacaktır.

```bash
# Depoyu klonlayın
git clone https://github.com/byGOG/bygog.github.io.git
cd bygog.github.io

# Python kullanarak basit bir yerel sunucu başlatın
python3 -m http.server 8000
```

Tarayıcınızda <http://localhost:8000> adresine giderek sayfayı görüntüleyebilirsiniz.

## Proje Yapısı
```
.
├── index.html   # Sayfanın temel yapısı, stil ve içerik
├── profil.jpg   # Profil görseli
└── README.md    # Bu dokümantasyon
```

## Arayüz Bölümleri
Aşağıdaki liste, `index.html` dosyasındaki ana içerik bloklarının nasıl yapılandırıldığını gösterir:

| Bölüm | Açıklama | Önemli Seçiciler |
| --- | --- | --- |
| **Hero** | Ziyaretçiyi karşılayan, isim animasyonunu ve sosyal medya bağlantılarını barındıran üst alan. | `.hero`, `.social-links` |
| **Hakkımda Kartı** | Kısa biyografi, uzmanlık alanları ve iletişim butonlarının yer aldığı içerik. | `.about-card`, `.tag-list` |
| **Footer** | Telif, sosyal medya ve ek bağlantılar için alan. | `footer`, `.footer-links` |

Bu bölümleri güncellerken semantic HTML etiketlerinin korunmasına özen gösterin. Animasyonların ritmini değiştirmek isterseniz `@keyframes glow` ve `@keyframes float` tanımlarını düzenleyebilirsiniz.

## Özelleştirme İpuçları
- **Metin içerikleri:** `index.html` dosyasında ilgili başlık ve paragrafları güncelleyerek kişisel bilgilerinizle uyarlayabilirsiniz.
- **Sosyal bağlantılar:** Sosyal ikonların URL'lerini `index.html` içerisinde bulunan `<a>` etiketlerinin `href` değerlerini değiştirerek düzenleyin.
- **Profil görseli:** `profil.jpg` dosyasını kendi fotoğrafınızla değiştirin. Hexagon maskeleme için görselin yeterince geniş bir kırpma payına sahip olmasına dikkat edin.
- **Tema renkleri:** Sayfanın renk paleti `index.html` dosyasının üst kısmındaki `:root` CSS değişkenleri üzerinden kontrol edilir. `--bg`, `--primary`, `--muted` gibi değişkenleri güncelleyerek temayı özelleştirebilirsiniz.
- **Typography:** Google Fonts üzerinden içe aktarılan `Tektur` fontunu değiştirmek için `<link>` etiketindeki URL'yi yeni fontla değiştirin ve `font-family` kurallarını güncelleyin.
- **SEO ayarları:** `<head>` bölümündeki `meta` etiketlerini güncel başlık ve açıklamalarla değiştirin. Paylaşım görseli için `og:image` alanına barındırılan bir görsel URL'si ekleyin.
- **Analytics entegrasyonu:** Google Analytics veya benzeri araçlar eklemek isterseniz kapanış `</body>` etiketinden önce ilgili scriptleri yerleştirin.
- **Dağıtım:** Deponun `main` branch'ine yapılan her push, GitHub Pages yayınının otomatik olarak güncellenmesini tetikler.

## Kullanılan Teknolojiler
- Saf **HTML5** ve **CSS3**
- Google Fonts üzerinden **Tektur** yazı tipi
- Harici kütüphane veya çerçeve kullanılmadan hazırlanmış hafif yapı

## Bakım ve Yayınlama
- **Sürüm Takibi:** Önemli görsel veya içerik güncellemelerinde commit mesajlarında değişiklik kapsamını belirtin.
- **Önbellek Temizliği:** GitHub Pages üzerinde değişiklikler bazen önbelleğe takılabilir. Tarayıcıda sert yenileme (Ctrl/Cmd + Shift + R) veya gizli sekme kullanarak yeni sürümü doğrulayın.
- **Alan Adı (Opsiyonel):** Özel bir alan adı yönlendirmek için deponun kök dizinine `CNAME` dosyası ekleyin ve DNS ayarlarınızı güncelleyin.
- **Erişilebilirlik Kontrolü:** Kontrast değerlerini ve alternatif metinleri (`alt` nitelikleri) düzenli olarak kontrol ederek erişilebilirliği artırın.

## Katkıda Bulunma
Hatalarla karşılaşırsanız veya yeni özellikler önermek isterseniz GitHub Issues üzerinden bildirebilir ya da pull request gönderebilirsiniz. Değişiklik yapmadan önce kısa bir açıklama eklemek, inceleme sürecini hızlandıracaktır.

**Katkı Akışı Önerisi**
1. Depoyu forklayın ve yerel ortamınıza klonlayın.
2. Yeni bir branch açın: `git checkout -b ozellik/isim`.
3. Değişikliklerinizi yapın, test edin ve açıklayıcı commit mesajlarıyla kaydedin.
4. Pull request açarken yaptığınız değişiklikleri özetleyen net bir açıklama ekleyin.

## Teşekkür ve İlham Kaynakları
- Tasarımsal esin için [uiverse.io](https://uiverse.io/) ve [dribbble.com](https://dribbble.com/) üzerindeki modern portföy konseptlerinden yararlanıldı.
- Sosyal ikonlar için [Font Awesome](https://fontawesome.com/) ikon seti temel alındı.

## Lisans
Bu proje, aksi belirtilmedikçe telif hakkı sahibine aittir. Kodun bir bölümünü kullanmak isterseniz lütfen depo sahibiyle iletişime geçin.

## İletişim
- **E-posta:** [ondergog@gmail.com](mailto:ondergog@gmail.com)
- **LinkedIn:** <https://www.linkedin.com/in/onder-gog/>
- **YouTube:** <https://www.youtube.com/@GOGTv>

Geri bildirimleriniz ve katkılarınız için şimdiden teşekkürler!
