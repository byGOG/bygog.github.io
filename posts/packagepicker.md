# PackagePicker: Paket Yöneticileri ile Toplu Yazılım Kurulumu

Yeni bir bilgisayar kurulumunda en sıkıcı aşamalardan biri, tüm uygulamaları tek tek indirip kurmaktır. **PackagePicker**, bu süreci modern paket yöneticilerinin (Winget, Chocolatey, Scoop vb.) gücünü kullanarak inanılmaz derecede hızlandıran web tabanlı bir araçtır.

## PackagePicker Nedir?

**PackagePicker**, temel olarak efsanevi **Ninite** servisinin modern ve komut satırı odaklı bir alternatifidir. Ninite size özel bir `.exe` dosyası hazırlarken, PackagePicker size seçtiğiniz uygulamaları kuracak tek bir **terminal komutu** verir.

Bu araç; Windows, macOS ve Linux kullanıcıları için popüler uygulama kurulum süreçlerini otomatize etmek amacıyla tasarlanmıştır.

## Desteklenen Paket Yöneticileri

PackagePicker'ın en güçlü yanı, sadece bir sisteme bağlı olmamasıdır. Şu popüler paket yöneticilerini destekler:

-   **Windows:** [Winget](https://packagepicker.co/pm/winget), [Chocolatey](https://packagepicker.co/pm/chocolatey), [Scoop](https://packagepicker.co/pm/scoop)
-   **macOS:** [Homebrew](https://packagepicker.co/pm/homebrew)
-   **Linux:** [apt](https://packagepicker.co/pm/apt), [Flatpak](https://packagepicker.co/pm/flatpak), [yay](https://packagepicker.co/pm/yay)

## Neden PackagePicker Kullanmalısınız?

1.  **Kuruluma Gerek Yok:** Bilgisayarınıza ek bir yazılım yüklemeniz gerekmez; sadece mevcut paket yöneticinizi kullanır.
2.  **Esneklik:** Hangi paket yöneticisini kullanmak istediğinize siz karar verirsiniz.
3.  **Hız:** Web sitesinden uygulamaları seçmek, tek tek komut yazmaktan çok daha hızlıdır.
4.  **Güncellik:** Komutlar her zaman uygulamaların en güncel sürümlerini hedef alır.
5.  **Temiz Sistem:** Uygulamalar paket yöneticileri üzerinden kurulduğu için kaldırmak ve güncellemek de çok daha kolaydır.

## Nasıl Kullanılır?

1.  [packagepicker.co](https://packagepicker.co/) adresine gidin.
2.  Kullanmak istediğiniz paket yöneticisini (örneğin **Winget**) seçin.
3.  Listeden yüklemek istediğiniz uygulamaları (Chrome, VS Code, Discord, Spotify vb.) işaretleyin.
4.  Sayfanın altındaki veya yanındaki kutuda otomatik olarak oluşturulan **komutu kopyalayın**.
5.  Terminali (PowerShell, CMD veya Bash) açın, komutu yapıştırın ve Enter'a basın.

## Sonuç

Eğer terminal kullanmaktan çekinmeyen bir "power user" iseniz veya Windows'un dahili **Winget** aracını daha verimli kullanmak istiyorsanız, PackagePicker sizin için vazgeçilmez bir yardımcı olacaktır.

---
*İpucu: Eğer komut satırı ile uğraşmak yerine her şeyi görsel bir arayüzden yönetmek isterseniz, paket yöneticileri için harika bir arayüz sunan **UniGetUI** yazımıza da göz atabilirsiniz.*
