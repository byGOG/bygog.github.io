# GoodbyeDPI ve GoodbyeDPI UI: İnternet Engellerini Aşmanın En Hafif Yolu

İnternet servis sağlayıcıları (ISS), belirli web sitelerine erişimi engellemek veya internet trafiğini izlemek için **Derin Paket İncelemesi (DPI - Deep Packet Inspection)** adı verilen bir yöntem kullanır. **GoodbyeDPI**, bu engelleri aşmak için geliştirilmiş, VPN veya proxy gerektirmeyen son derece hafif bir çözümdür.

![GoodbyeDPI Logo](https://raw.githubusercontent.com/ValdikSS/GoodbyeDPI/master/src/icon.ico)

## GoodbyeDPI Nedir?

ValdikSS tarafından geliştirilen **GoodbyeDPI**, Windows işletim sistemlerinde çalışan açık kaynaklı bir DPI zaafiyet sömürme aracıdır. Diğer birçok çözümün aksine trafiğinizi uzak bir sunucuya yönlendirmez (VPN gibi); bunun yerine yerel bilgisayarınızdaki ağ paketlerini manipüle ederek ISS filtrelerini yanıltır.

### Nasıl Çalışır?

GoodbyeDPI, HTTP ve HTTPS trafik paketlerini ISS'nin DPI yazılımının tanıyamayacağı şekilde modifiye eder. Bunu şu tekniklerle başarır:
- **Paket Fragmantasyonu:** HTTP istek paketlerini parçalara ayırarak DPI'ın tüm isteği bir bütün olarak görmesini engeller.
- **Header Manipülasyonu:** HTTP başlıklarındaki karakterleri (örneğin `Host:` yerine `hoSt:`) değiştirerek basit filtreleri aşar.
- **TCP Pencere Boyutu Küçültme:** Bağlantı başlangıcındaki paket boyutlarını manipüle eder.

Bu yöntemlerin en büyük avantajı, trafiğin şifrelenmesine veya başka bir konuma tünellenmesine gerek duymamasıdır. Bu da internet hızınızda neredeyse hiç kayıp yaşanmaması anlamına gelir.

## GoodbyeDPI UI: Modern ve Kolay Kullanım

GoodbyeDPI temel olarak komut satırı üzerinden çalışır. Ancak her kullanıcı terminal komutlarıyla uğraşmak istemeyebilir. **GoodbyeDPI UI**, bu noktada devreye giren modern bir grafik arayüzdür.

Storik4pro tarafından geliştirilen bu arayüz şunları sunar:
- **Tek Tıkla Başlatma:** Servisi kolayca başlatıp durdurabilme.
- **Hazır Ayar Setleri:** Farklı engelleme seviyeleri için optimize edilmiş ayarlar arasından seçim yapabilme.
- **Otomatik Başlatma:** Bilgisayar açıldığında arka planda otomatik çalışma seçeneği.
- **Çoklu Araç Desteği:** Sadece GoodbyeDPI değil, `zapret` ve `GreenTunnel` gibi diğer popüler araçları da destekler.

## Neden Kullanmalısınız?

- **Performans:** VPN'lerin aksine gecikme (ping) sürenizi artırmaz ve hızınızı düşürmez.
- **Gizlilik:** Trafiğiniz üçüncü taraf bir VPN sağlayıcısı yerine doğrudan hedefe gider.
- **Hafiflik:** Sistem kaynaklarını neredeyse hiç tüketmez.
- **Açık Kaynak:** Her iki proje de tamamen şeffaftır ve topluluk tarafından denetlenebilir.

---

- **GoodbyeDPI (Çekirdek):** [ValdikSS/GoodbyeDPI](https://github.com/ValdikSS/GoodbyeDPI)
- **GoodbyeDPI UI (Arayüz):** [Storik4pro/goodbyeDPI-UI](https://github.com/Storik4pro/goodbyeDPI-UI)
