# Winget (Windows Package Manager): Windows'ta Yazılım Yönetiminin Modern Yolu

Windows'ta uygulama kurmak için web sitelerinde dolaşmaktan, `.exe` veya `.msi` dosyaları indirip "İleri" butonlarına tıklamaktan sıkıldınız mı? **Winget**, bu süreci tamamen değiştiren, Microsoft'un resmi paket yöneticisidir.

## Winget Nedir?

**Winget** (Windows Package Manager), komut satırı üzerinden yazılımları bulmanıza, kurmanıza, güncellemenize ve yapılandırmanıza olanak tanıyan açık kaynaklı bir araçtır. Linux dünyasındaki `apt` veya `dnf` gibi, Windows kullanıcılarına da merkezi ve hızlı bir uygulama yönetim deneyimi sunar.

## Neden Winget Kullanmalısınız?

-   **Hız ve Kolaylık:** Tarayıcı açmadan, sadece bir komutla istediğiniz uygulamayı kurabilirsiniz.
-   **Toplu Güncelleme:** Bilgisayarınızdaki tüm uygulamaları tek bir komutla (`winget upgrade --all`) güncelleyebilirsiniz.
-   **Güvenilir Kaynaklar:** Microsoft'un denetiminden geçen geniş bir yazılım havuzuna erişim sağlar.
-   **Otomasyon:** Yeni bir bilgisayar kurarken tüm programlarınızı otomatik olarak yükleyen betikler oluşturabilirsiniz.
-   **Temiz Sistem:** Uygulama kurarken karşınıza çıkan "ek araçlar" veya reklam yazılımlarından (bloatware) kaçınmanıza yardımcı olur.

## Temel Komutlar

Winget'i kullanmak için **PowerShell** veya **Komut İstemi**'ni açıp şu temel komutları kullanabilirsiniz:

-   **Arama:** `winget search <uygulama_adı>`
-   **Kurulum:** `winget install <uygulama_id>`
-   **Güncelleme Kontrolü:** `winget upgrade`
-   **Hepsini Güncelle:** `winget upgrade --all`
-   **Kaldırma:** `winget uninstall <uygulama_id>`
-   **Kurulu Uygulamaları Listele:** `winget list`

## Winget Export ve Import

Yeni bir bilgisayara geçtiğinizde veya sisteminizi sıfırladığınızda, mevcut uygulamalarınızın listesini dışa aktarabilir (`winget export -o dosyadi.json`) ve daha sonra bu dosyayı kullanarak tüm uygulamalarınızı tek seferde geri yükleyebilirsiniz (`winget import -i dosyadi.json`).

---
*İpucu: Winget'i daha görsel bir arayüzle kullanmak isterseniz, önceki yazılarımızda bahsettiğimiz **UniGetUI** aracına göz atabilirsiniz.*
