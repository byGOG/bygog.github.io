# Bitwarden: Şifrelerinizi Güvende Tutmanın En Akıllı Yolu

Her yerde aynı şifreyi mi kullanıyorsunuz? Tarayıcının "şifreyi kaydet" özelliğine mi güveniyorsunuz? O zaman Bitwarden'ı tanımanın tam zamanı. Açık kaynaklı, ücretsiz ve gerçekten güvenli bir şifre yöneticisi.

## Şifre Yöneticisi Neden Şart?

Ortalama bir internet kullanıcısının 80-100 arasında çevrimiçi hesabı var. Bu hesapların her birine güçlü ve benzersiz bir şifre oluşturup aklınızda tutmanız imkânsız. İşte tam bu noktada şifre yöneticileri devreye giriyor.

Şifre yöneticisi kullanmadığınızda muhtemelen şunlardan birini yapıyorsunuz:

- Her yerde aynı şifreyi kullanıyorsunuz (bir site sızıntısında tüm hesaplarınız tehlikede)
- Basit ve tahmin edilebilir şifreler oluşturuyorsunuz
- Şifreleri bir not defterine veya metin dosyasına yazıyorsunuz
- Tarayıcının dahili şifre yöneticisine güveniyorsunuz (ki bunlar genellikle sınırlı ve daha az güvenli)

Bitwarden bu sorunların hepsini tek kalemde çözer.

## Bitwarden Nedir?

Bitwarden, 2016 yılında Kyle Spearrin tarafından başlatılan açık kaynaklı bir şifre yöneticisidir. Şifrelerinizi, notlarınızı, kredi kartı bilgilerinizi ve kimlik verilerinizi uçtan uca şifreleyerek güvenli bir kasada saklar. Tüm platformlarda (Windows, macOS, Linux, Android, iOS) ve tüm büyük tarayıcılarda çalışır.

Açık kaynak olması, güvenlik denetimlerinden geçmesi ve şeffaf bir yapıya sahip olması onu diğer şifre yöneticilerinden ayıran en önemli özelliklerdir.

## Temel Özellikler

### Uçtan Uca Şifreleme (E2E)

Bitwarden'daki tüm verileriniz cihazınızda şifrelenir ve yalnızca sizin ana parolanızla (master password) çözülebilir. Bitwarden sunucuları bile verilerinizi okuyamaz. AES-256 bit şifreleme, PBKDF2 SHA-256 veya Argon2id anahtar türetme algoritmaları kullanılır.

Bu ne anlama geliyor? Bitwarden'ın sunucuları hacklense bile, şifreleriniz okunamaz.

### Şifre Oluşturucu (Password Generator)

Güçlü ve benzersiz şifreler oluşturmak artık sizin sorumluluğunuz değil. Bitwarden'ın dahili oluşturucusu ile:

- Uzunluk, büyük/küçük harf, rakam ve özel karakter tercihlerinizi belirleyebilirsiniz
- Parola yerine hatırlanması kolay "passphrase" (kelime dizisi) oluşturabilirsiniz
- Her hesap için benzersiz bir şifre üretebilirsiniz

### Otomatik Doldurma (Auto-fill)

Tarayıcı eklentisi sayesinde giriş sayfalarında kullanıcı adı ve şifrenizi otomatik olarak doldurur. Mobilde ise sistem düzeyinde otomatik doldurma desteği sunar. Artık şifreleri kopyala-yapıştır yapmanıza gerek yok.

### Kasa Türleri — Sadece Şifre Değil

Bitwarden'da dört farklı öğe türü saklayabilirsiniz:

- **Giriş Bilgileri:** Kullanıcı adı, şifre, URL ve TOTP anahtarı
- **Kartlar:** Kredi kartı ve banka kartı bilgileri
- **Kimlik:** Ad, adres, telefon gibi kişisel bilgiler (form doldurma için)
- **Güvenli Notlar:** Düz metin formatında hassas notlar (lisans anahtarları, Wi-Fi şifreleri vb.)

### Klasör ve Koleksiyon Yönetimi

Kasanızdaki öğeleri klasörlere ayırarak düzenleyebilirsiniz. "Sosyal Medya", "Bankacılık", "İş" gibi kategoriler oluşturup her şeyi derli toplu tutabilirsiniz.

Organizasyon (takım) hesaplarında ise "Koleksiyonlar" özelliği ile belirli şifreleri belirli kişilerle paylaşabilirsiniz.

## İki Faktörlü Kimlik Doğrulama (2FA)

Bitwarden hesabınızı korumak için birden fazla 2FA yöntemi destekler:

- **Authenticator uygulamaları** (Google Authenticator, Authy vb.)
- **E-posta doğrulaması**
- **YubiKey** ve **FIDO2 WebAuthn** güvenlik anahtarları (premium)
- **Duo Security** (kurumsal)

Ayrıca Bitwarden'ın kendisi de TOTP (zamana dayalı tek kullanımlık parola) oluşturucu olarak kullanılabilir. Premium hesapla, kasanızdaki girişlere TOTP anahtarı ekleyip 2FA kodlarını doğrudan Bitwarden üzerinden alabilirsiniz.

## Send Özelliği — Güvenli Paylaşım

Bitwarden Send, hassas bilgileri başkalarıyla güvenli bir şekilde paylaşmanızı sağlar. Metin veya dosya gönderebilir, şu seçenekleri ayarlayabilirsiniz:

- Son kullanma tarihi
- Maksimum erişim sayısı
- Parola koruması
- Otomatik silme

Bir şifreyi veya gizli notu birine iletmeniz gerektiğinde, WhatsApp veya e-posta ile düz metin olarak göndermek yerine Bitwarden Send kullanmak çok daha güvenlidir.

## Platform Desteği — Her Yerde Yanınızda

Bitwarden'ın en güçlü yanlarından biri her yerde erişilebilir olmasıdır:

- **Masaüstü Uygulamaları:** Windows, macOS, Linux
- **Mobil Uygulamalar:** Android, iOS
- **Tarayıcı Eklentileri:** Chrome, Firefox, Edge, Safari, Opera, Brave ve daha fazlası
- **Web Kasası:** Herhangi bir tarayıcıdan `vault.bitwarden.com` üzerinden erişim
- **Komut Satırı Aracı (CLI):** Gelişmiş kullanıcılar ve otomasyon için

Tüm verileriniz bulut üzerinden senkronize edilir. Telefonunuzda kaydettiğiniz bir şifreye bilgisayardan anında ulaşabilirsiniz.

## Ücretsiz Plan — Cömert ve Yeterli

Bitwarden'ın ücretsiz planı, çoğu kullanıcı için fazlasıyla yeterlidir:

- Sınırsız şifre ve cihaz
- Şifre oluşturucu
- Otomatik doldurma
- Güvenli not ve kart saklama
- İki cihaz arasında senkronizasyon (aslında sınırsız cihaz)
- Bitwarden Send (metin)

Premium plan yıllık sadece 10 dolar gibi son derece makul bir fiyata gelişmiş özellikler sunar:

- TOTP doğrulayıcı (2FA kodlarını Bitwarden'da saklama)
- 1 GB şifreli dosya depolama
- Acil durum erişimi
- Gelişmiş 2FA seçenekleri (YubiKey, FIDO2)
- Kasa sağlık raporları

## Self-Hosting — Kendi Sunucunuzda Barındırın

Verilerinizi tamamen kendi kontrolünüzde tutmak istiyorsanız, Bitwarden'ı kendi sunucunuzda barındırabilirsiniz. Resmi Docker imajları ile kurulum oldukça basittir. Bu, özellikle gizliliğe çok önem veren kullanıcılar veya şirketler için muazzam bir avantaj.

Alternatif olarak topluluk tarafından geliştirilen **Vaultwarden** (eski adıyla bitwarden_rs) projesi, daha az kaynak tüketen hafif bir self-hosted çözüm sunar ve tüm resmi istemcilerle uyumlu çalışır.

## Güvenlik Denetimleri ve Şeffaflık

Bitwarden düzenli olarak bağımsız güvenlik denetimleri yaptırmaktadır. Cure53, Insight Risk Consulting gibi saygın firmalar tarafından denetlenmiştir. Denetim raporları herkese açık olarak yayımlanır.

Kaynak kodu GitHub'da tamamen açıktır. Herhangi biri kodu inceleyebilir, hata bildirebilir veya katkıda bulunabilir. "Bize güvenin" demek yerine "kendiniz kontrol edin" diyen bir yaklaşım.

## Tarayıcının Şifre Yöneticisi Yetmez mi?

Chrome, Firefox ve diğer tarayıcıların dahili şifre yöneticileri pratik görünebilir, ancak önemli eksiklikleri var:

- **Tek platforma bağlılık:** Chrome'daki şifrelerinize Firefox'tan erişemezsiniz
- **Sınırlı güvenlik:** Genellikle ana parola koruması yok, cihaza erişen herkes şifreleri görebilir
- **Kısıtlı özellikler:** Not saklama, güvenli paylaşım, 2FA üretici gibi özellikler yok
- **Dışa aktarma zorluğu:** Şifrelerinizi başka bir platforma taşımak zahmetli

Bitwarden tüm bu sorunları çözer ve tarayıcıdan bağımsız çalışır.

## İlk Kurulum — 5 Dakikada Hazır

1. `bitwarden.com` adresinden ücretsiz hesap oluşturun
2. Güçlü bir ana parola belirleyin (bunu asla unutmayacağınızdan emin olun!)
3. Kullandığınız tarayıcıya Bitwarden eklentisini kurun
4. Telefonunuza Bitwarden uygulamasını indirin
5. Mevcut şifrelerinizi tarayıcıdan dışa aktarıp Bitwarden'a içe aktarın
6. Tarayıcının dahili şifre yöneticisini kapatın

Birkaç gün içinde tüm şifreleriniz düzenli ve güvenli bir şekilde Bitwarden kasanızda olacak.

## Sonuç

Dijital güvenlik artık lüks değil, zorunluluk. Bitwarden, açık kaynak olması, ücretsiz planının cömertliği, uçtan uca şifreleme ve çapraz platform desteği ile herkesin kullanması gereken bir araçtır. Şifrelerinizi tarayıcıya veya hafızanıza emanet etmeyi bırakın — Bitwarden'a geçin ve dijital hayatınızı güvence altına alın.
