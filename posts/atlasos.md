# AtlasOS: Oyun ve Performans Odaklı Açık Kaynaklı Windows Optimizasyonu

Windows işletim sisteminizin hantallığından ve arka planda çalışan gereksiz servislerden sıkıldınız mı? **AtlasOS**, Windows 10 ve 11'i oyuncular, içerik üreticileri ve güç kullanıcıları için baştan aşağı optimize eden, tamamen açık kaynaklı bir projedir.

## AtlasOS Nedir?

[atlasos.net](https://atlasos.net/), standart bir Windows kurulumunu "debloat" ederek (gereksiz bileşenlerden arındırarak) sistemin ham gücünü ortaya çıkarmayı amaçlar. Microsoft'un yerleşik takip mekanizmalarını (telemetri) kaldıran, sistem gecikmesini (latency) minimize eden ve boşta RAM/CPU kullanımını önemli ölçüde azaltan bir modifikasyon projesidir.

## Temel Özellikler

AtlasOS, sisteminizi şu temel alanlarda iyileştirir:

- **Maksimum Oyun Performansı:** Daha yüksek FPS ve daha kararlı kare zamanlamaları (frame times) için Windows çekirdek ayarlarını ve servislerini optimize eder.
- **Düşük Sistem Gecikmesi:** Giriş gecikmesini (input lag) ve işlemci üzerindeki yükü azaltarak daha tepkisel bir deneyim sunar.
- **Gelişmiş Gizlilik:** Microsoft'un veri toplama ve takip özelliklerini devre dışı bırakarak kullanıcı gizliliğini ön plana çıkarır.
- **Açık Kaynak Güveni:** Tüm playook ve betikler GitHub üzerinden incelenebilir (GPL-3.0 lisansı), bu da projenin şeffaf ve güvenilir kalmasını sağlar.
- **Hafifletilmiş Arayüz:** Windows Store dahil olmak üzere birçok "bloatware" uygulamayı ve arka plan hizmetini temizler.

## Nasıl Kurulur?

AtlasOS, artık klasik bir ISO dosyası yerine daha modern ve güvenli bir yöntem olan **AME Wizard** altyapısını kullanır:

1.  Temiz bir Windows kurulumu yapın (önerilir).
2.  **Atlas Playbook** (`.apbx`) dosyasını resmi web sitesinden indirin.
3.  Açık kaynaklı **AME Wizard** aracını çalıştırın ve Playbook dosyasını bu araca sürükleyin.
4.  İstediğiniz özelleştirmeleri seçin ve sihirbazın sistemi optimize etmesini bekleyin.

## Kimler İçin Uygundur?

- **Rekabetçi Oyuncular:** Her bir milisaniyelik gecikmenin ve FPS artışının kritik olduğu oyunlar için.
- **Eski/Düşük Donanımlı Bilgisayarlar:** Kısıtlı donanım kaynaklarıyla modern bir Windows deneyimi yaşamak isteyenler.
- **Gizlilik Meraklıları:** İşletim sisteminin kendisini izlemesini istemeyen kullanıcılar.
- **Minimalistler:** Sadece işine odaklanmak isteyen, temiz ve hızlı bir masaüstü arayanlar.

---
*Önemli Not: AtlasOS, Windows'un bazı güvenlik ve kullanıcı özelliklerini (örneğin bazı Windows Update bileşenleri veya Windows Defender) opsiyonel hale getirebilir veya kaldırabilir. Kurulum yapmadan önce belgeleri okumanız ve verilerinizi yedeklemeniz tavsiye edilir.*
