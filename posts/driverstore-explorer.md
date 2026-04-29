# <img src="https://raw.githubusercontent.com/lostindark/DriverStoreExplorer/refs/heads/master/Rapr/icon.ico" style="vertical-align: middle; margin-right: 10px; width: 40px;"> DriverStore Explorer (RAPR): Windows Sürücü Mağazasını Yönetmenin En Kolay Yolu

[DriverStore Explorer (RAPR)](https://github.com/lostindark/DriverStoreExplorer), Windows DriverStore (Sürücü Mağazası) üzerinde tam kontrol sahibi olmanızı sağlayan, açık kaynaklı ve güçlü bir sistem aracıdır. Özellikle eski, kullanılmayan veya sistemde kalabalık yapan sürücü paketlerini temizlemek isteyen ileri düzey kullanıcılar ve sistem yöneticileri için vazgeçilmez bir çözümdür.

Windows, her sürücü güncellemesinde eski sürücü dosyalarını "ileride gerekebilir" düşüncesiyle DriverStore klasöründe (`C:\Windows\System32\DriverStore`) saklar. Zamanla bu klasör gigabaytlarca yer kaplayabilir. DriverStore Explorer, bu karmaşayı görselleştirerek güvenli bir temizlik yapmanıza olanak tanır.

## Öne Çıkan Özellikler

- **Detaylı Listeleme:** Sisteminizdeki tüm sürücü paketlerini; sürüm, tarih, sağlayıcı ve dosya boyutu gibi detaylarla birlikte listeler.
- **Akıllı Temizleme (Select Old Drivers):** Tek bir tıkla sistemdeki güncel olmayan ve artık ihtiyaç duyulmayan eski sürücü sürümlerini otomatik olarak seçer.
- **Zorlayarak Silme (Force Deletion):** Windows'un normal şartlarda silmenize izin vermediği "kullanımda" görünen ancak aslında silinmesi gereken sürücüleri zorlayarak kaldırabilir.
- **Sürücü Ekleme ve Yükleme:** Yeni sürücü paketlerini (`.inf` dosyaları) DriverStore'a ekleyebilir ve sisteme yükleyebilirsiniz.
- **Dışa Aktarma ve Yedekleme:** Mevcut sürücü paketlerini başka bir konuma yedekleyebilir, sistem kurulumu sonrası sürücüleri kolayca geri yükleyebilirsiniz.
- **Çevrimdışı Destek:** Sadece çalışan sistemi değil, bağlı olan çevrimdışı Windows imajlarındaki sürücüleri de yönetebilir.

## Neden DriverStore Explorer Kullanmalısınız?

1. **Disk Alanı Kazanma:** Özellikle ekran kartı (NVIDIA/AMD) veya ses kartı güncellemeleri sonrası arkada kalan yüzlerce megabaytlık eski sürücü kalıntılarını temizleyerek diskte yer açarsınız.
2. **Sistem Kararlılığı:** Hatalı veya çakışan eski sürücü sürümlerini sistemden tamamen kaldırarak olası mavi ekran (BSOD) hatalarının önüne geçebilirsiniz.
3. **Temiz Kurulum Sonrası:** İhtiyacınız olan tüm sürücüleri tek bir klasöre yedekleyip, format sonrası "Sürücü Ekle" özelliğiyle topluca kurabilirsiniz.

## Dikkat Edilmesi Gerekenler

- **Yönetici Yetkisi:** Uygulamanın DriverStore üzerinde işlem yapabilmesi için mutlaka **Yönetici Olarak Çalıştırılması** gerekir.
- **Dikkatli Silme:** "Force Deletion" özelliğini kullanırken dikkatli olunmalıdır. Halihazırda sistemin çalışması için kritik olan bir sürücüyü silmek donanım sorunlarına yol açabilir. Genellikle "Select Old Drivers" (Eski Sürücüleri Seç) butonunun önerdiği sürücüleri silmek en güvenli yoldur.

DriverStore Explorer, Windows sistem bakım araç kutunuzda bulunması gereken, hafif, kurulum gerektirmeyen (portable) ve son derece etkili bir yardımcı yazılımdır.
