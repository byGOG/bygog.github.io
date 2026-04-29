# <img src="https://raw.githubusercontent.com/namazso/OpenHashTab/master/OpenHashTab/OpenHashTab/icon.svg" style="vertical-align: middle; margin-right: 10px; width: 40px;"> OpenHashTab: Windows İçin Açık Kaynaklı ve Hızlı Dosya Doğrulama Aracı

[OpenHashTab](https://github.com/namazso/OpenHashTab), Windows Dosya Gezgini'ne (File Explorer) entegre olan, dosyaların bütünlüğünü kontrol etmek için hash değerlerini (parmak izlerini) hesaplamaya ve doğrulamaya yarayan modern ve açık kaynaklı bir kabuk uzantısıdır (shell extension).

Eskiden popüler olan ancak sahipli (proprietary) bir yazılım olan HashTab'den ilham alan bu proje, tamamen sıfırdan ve modern ihtiyaçlara yönelik olarak geliştirilmiştir.

## Öne Çıkan Özellikler

- **Geniş Algoritma Desteği:** 28 farklı algoritma ile sektördeki en kapsamlı hash araçlarından biridir.
- **Yüksek Performans:** Çok çekirdekli işlemciler için optimize edilmiştir; yüzlerce dosyayı aynı anda tararken bile sistem performansını korur.
- **VirusTotal Entegrasyonu:** Tek bir tıklama ile dosyanın hash değerini VirusTotal veritabanında sorgulayarak zararlı yazılım kontrolü yapmanızı sağlar.
- **Checksum Dosya Yönetimi:** `.md5`, `.sha256`, `.sfv` gibi standart checksum dosyalarını oluşturabilir ve mevcut olanları saniyeler içinde doğrulayabilir.
- **Yüksek Çözünürlük Desteği:** High DPI ekranlarla tam uyumludur, bulanık olmayan net bir arayüz sunar.
- **Uzun Dosya Yolu Desteği:** Windows'un sınırlarını zorlayan çok uzun dosya yollarına sahip dosyalarla sorunsuz çalışır.

## Desteklenen Algoritmalar

OpenHashTab, kriptografik ve hızlı hash algoritmalarından oluşan geniş bir yelpazeyi destekler:

- **Hızlı Algoritmalar:** CRC32, CRC64, xxHash (XXH32, XXH64), xxHash3 (64 ve 128 bit).
- **Klasik Algoritmalar:** MD4, MD5, SHA-1.
- **Modern Standartlar:** SHA-2 (SHA-224, SHA-256, SHA-384, SHA-512), SHA-3 (SHA3-224, SHA3-256, SHA3-384, SHA3-512).
- **Gelişmiş Algoritmalar:** BLAKE2sp, BLAKE3, RipeMD160, KangarooTwelve, ParallelHash.
- **Bölgesel Standartlar:** Streebog (GOST R 34.11-12).

## Kullanım Rehberi

Yazılımı kurduktan sonra herhangi bir dosyaya veya klasöre sağ tıklayıp **Özellikler** (Properties) seçeneğine tıkladığınızda, yeni bir **Hashes** sekmesi göreceksiniz.

- **Kopyalama:** Bir hash değerine çift tıklayarak panoya kopyalayabilirsiniz.
- **Karşılaştırma:** Alt kısma elinizdeki bir hash değerini yapıştırarak dosya ile eşleşip eşleşmediğini anında görebilirsiniz.
- **Bağlam Menüsü:** İsteğe bağlı olarak, özellikler sekmesine girmeden doğrudan sağ tık menüsünden erişim sağlayacak bir kısayol eklenebilir.
- **Durum Göstergeleri:** `(eşleşen / eşleşmeyen / kontrol edilmeyen / hata)` formatında anlık istatistik sunar.

## Sistem Gereksinimleri

- **İşletim Sistemi:** Windows 7 veya daha yenisi (x86, x64, ARM64 desteği mevcuttur).
- **Bellek:** 512'den fazla dosyayı aynı anda taramak için en az 1 GB RAM önerilir.

OpenHashTab, hem güvenlik uzmanları hem de sistemlerini temiz tutmak isteyen son kullanıcılar için Windows ekosistemindeki en hafif ve yetenekli dosya doğrulama araçlarından biridir.
