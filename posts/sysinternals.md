# <img src="https://learn.microsoft.com/tr-tr/sysinternals/media/index/sysinternals.png" style="vertical-align: middle; margin-right: 10px; height: 40px;"> Microsoft Sysinternals: Windows İçin İleri Düzey Sistem ve Sorun Giderme Araçları

**Microsoft Sysinternals**, Windows işletim sistemlerini yönetmek, teşhis etmek ve sistem aktivitelerini en ince ayrıntısına kadar analiz etmek için geliştirilmiş, 70'den fazla profesyonel araçtan oluşan ücretsiz bir yazılım setidir. IT uzmanları, sistem yöneticileri ve meraklı kullanıcılar için Windows'un "arka planında" neler olup bittiğini anlamanın en güçlü yoludur.

1996 yılında Mark Russinovich ve Bryce Cogswell (Winternals) tarafından başlatılan bu proje, 2006 yılında Microsoft tarafından satın alınmış ve o günden bu yana resmi olarak desteklenmeye devam etmektedir.

## Neden Sysinternals Kullanmalısınız?

Windows'un standart Görev Yöneticisi veya Olay Görüntüleyicisi çoğu zaman yüzeysel bilgiler sunar. Bir programın neden çöktüğünü, hangi dosyanın bir klasörü kilitlediğini veya sisteminize sızmış olabilecek bir zararlı yazılımın nereye gizlendiğini bulmak için Sysinternals araçları vazgeçilmezdir. Bu araçlar, işletim sisteminin kernel seviyesine kadar inerek size tam şeffaflık sağlar.

## En Çok Kullanılan Temel Araçlar

Sysinternals seti çok geniş olsa da, günlük kullanımda öne çıkan bazı "yıldız" araçlar şunlardır:

- **Process Explorer:** Görev Yöneticisi'nin steroidli versiyonudur. Çalışan süreçleri hiyerarşik olarak gösterir, hangi sürecin hangi dosyayı veya kayıt defteri anahtarını açık tuttuğunu (Handle) anında bulmanızı sağlar.
- **Autoruns:** Bilgisayar açıldığında, siz oturum açtığınızda veya tarayıcıyı başlattığınızda otomatik olarak çalışan "her şeyi" listeler. Sadece "Başlangıç" sekmesini değil, kayıt defterindeki en gizli otomatik çalıştırma noktalarını bile gösterir.
- **Process Monitor (Procmon):** Sistemdeki dosya sistemi, kayıt defteri ve süreç aktivitelerini gerçek zamanlı olarak izler. Bir programın hangi dosyaya erişemediği için hata verdiğini bulmak için kullanılır.
- **TCPView:** Sisteminizdeki tüm aktif ağ bağlantılarını gösterir. Hangi uygulamanın hangi IP adresine bağlandığını ve ne kadar veri transfer ettiğini anlık olarak takip edebilirsiniz.
- **Coreinfo:** İşlemcinizin desteklediği komut setlerini (AVX, AES vb.) ve sanallaştırma özelliklerini detaylıca listeler.
- **Desktops:** Tek bir Windows oturumunda 4 adete kadar sanal masaüstü oluşturmanıza ve aralarında hızlıca geçiş yapmanıza olanak tanır.

## Nasıl Edinilir?

Sysinternals araçlarını kullanmanın birkaç farklı yolu vardır:

1. **Sysinternals Suite:** Tüm araçların bir arada bulunduğu ZIP paketini indirebilirsiniz.
2. **Microsoft Store:** "Sysinternals Suite" olarak mağazadan yükleyip otomatik güncellenmesini sağlayabilirsiniz.
3. **Winget:** Komut satırına `winget install sysinternals` yazarak hızlıca kurabilirsiniz.
4. **Sysinternals Live:** Hiçbir şey indirmeden, Windows Gezgini adres çubuğuna `\\live.sysinternals.com\tools` yazarak araçları doğrudan internet üzerinden çalıştırabilirsiniz.

## Kullanıcılar İçin İpuçları

1. **Process Explorer'ı Varsayılan Yapın:** Process Explorer içinde `Options > Replace Task Manager` seçeneğini kullanarak, Ctrl+Shift+Esc yaptığınızda standart Görev Yöneticisi yerine bu gelişmiş aracın açılmasını sağlayabilirsiniz.
2. **VirusTotal Entegrasyonu:** Hem Process Explorer hem de Autoruns içinde "Check VirusTotal" özelliğini aktif ederek, çalışan süreçlerin veya başlangıç öğelerinin zararlı olup olmadığını saniyeler içinde kontrol edebilirsiniz.
3. **Filtreleme Gücü:** Procmon kullanırken milyonlarca satır veri akabilir. "Include" ve "Exclude" filtrelerini kullanarak sadece ilgilendiğiniz uygulamanın hareketlerine odaklanın.

Sysinternals, Windows dünyasının "İsviçre Çakısı" gibidir. Her bir aracın ne işe yaradığını öğrendikçe, sisteminiz üzerindeki kontrolünüzün ne kadar arttığını fark edeceksiniz.

---
**Resmi Web Sitesi:** [learn.microsoft.com/sysinternals](https://learn.microsoft.com/en-us/sysinternals/)
