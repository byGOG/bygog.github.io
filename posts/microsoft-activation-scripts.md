# Microsoft Activation Scripts (MAS): Windows ve Office Etkinleştirmenin En Temiz Yolu

Windows veya Microsoft Office kullanırken karşılaşılan "Windows'u Etkinleştir" uyarısı hem görsel olarak rahatsız edici olabilir hem de bazı kişiselleştirme özelliklerini kısıtlar. Piyasada birçok "crack" aracı bulunsa da, bunların çoğu zararlı yazılım içerme riski taşır. İşte bu noktada topluluk tarafından güvenilen, açık kaynaklı ve son derece şeffaf bir çözüm olan **Microsoft Activation Scripts (MAS)** devreye giriyor.

## Microsoft Activation Scripts (MAS) Nedir?

MAS, Windows ve Microsoft Office ürünlerini çeşitli yöntemler kullanarak etkinleştirmek için geliştirilmiş bir PowerShell betik koleksiyonudur. Diğer aktivasyon araçlarının aksine, MAS tamamen açık kaynaklıdır ve GitHub üzerinde şeffaf bir şekilde geliştirilmektedir. Arka planda ne yaptığını görebildiğiniz için güvenlik açısından en çok tercih edilen yöntemdir.

## MAS Tarafından Desteklenen Etkinleştirme Yöntemleri

MAS'ı bu kadar popüler yapan şey, sunduğu akıllı ve kalıcı çözüm yöntemleridir:

### 1. HWID (Digital License) - Kalıcı Windows Etkinleştirme
Bu yöntem, Windows 10 ve 11 için en ideal olanıdır. Bilgisayarınızın donanım kimliğini (Hardware ID) kullanarak Microsoft sunucularından resmi bir dijital lisans alır. Bilgisayarınıza format atsanız bile, internete bağlandığınızda Windows otomatik olarak tekrar etkinleşir.

### 2. Ohook - Kalıcı Office Etkinleştirme
Microsoft Office (2021, 365 vb.) sürümlerini kalıcı olarak etkinleştirmek için kullanılır. Sistem dosyalarına zarar vermez ve Office güncellemelerini almanıza engel olmaz.

### 3. KMS38 - 2038 Yılına Kadar Etkinleştirme
Genellikle Windows Server sürümleri veya HWID desteklemeyen özel Windows sürümleri için tercih edilir. Sistemi 2038 yılına kadar "etkin" durumda tutar.

### 4. Online KMS
Geleneksel KMS yöntemidir. Genellikle 180 günlük bir süre sağlar ve betik bu süreyi otomatik olarak yeniler.

## Neden MAS Kullanmalısınız?

-   **Güvenlik:** Kodları herkes tarafından incelenebilir. İçinde gizli bir virüs veya trojan yoktur.
-   **Temizlik:** Sisteminize ağır dosyalar kurmaz, kayıt defterini kirletmez.
-   **Hız:** Sadece birkaç saniye içinde işlem tamamlanır.
-   **Ücretsiz ve Reklamsız:** Hiçbir ücret talep etmez ve sizi reklamlarla boğmaz.
-   **Anti-Virüs Dostu:** Çoğu zaman antivirüs programları tarafından tehdit olarak algılanmaz (yine de bazıları genel 'hacktool' uyarısı verebilir).

## Nasıl Kullanılır? (En Hızlı Yöntem)

MAS'ı kullanmak için herhangi bir dosya indirmenize bile gerek yoktur. PowerShell üzerinden tek bir komutla çalıştırabilirsiniz:

1.  **Başlat** menüsüne sağ tıklayın ve **PowerShell (Yönetici)** veya **Terminal (Yönetici)** seçeneğini açın.
2.  Aşağıdaki komutu kopyalayın ve PowerShell penceresine yapıştırıp Enter tuşuna basın:

```powershell
irm https://get.activated.win | iex
```

3.  Karşınıza çıkan menüde yapmak istediğiniz işlemi seçin:
    -   `[1]` Windows HWID (Kalıcı Windows)
    -   `[2]` Ohook (Kalıcı Office)
    -   `[3]` KMS38 (2038'e kadar Windows)
    -   `[4]` Online KMS
4.  İşlemin bitmesini bekleyin. "Successfully Activated" yazısını gördüğünüzde işlem tamamlanmıştır.

## Sonuç

Microsoft Activation Scripts, Windows dünyasında "crack" kültürünü değiştiren, şeffaflığı ve güvenliği ön plana koyan harika bir araçtır. Eğer sisteminizi yasal sınırlar dahilinde (deneme amaçlı veya kişisel kullanım için) etkinleştirmek istiyorsanız, MAS şu an için dünyadaki en güvenilir ve en stabil çözümdür.

---
*Not: Bu yazı bilgilendirme amaçlıdır. Yazılımları her zaman resmi kanallardan satın alarak geliştiricilere destek olmanızı öneririm.*
