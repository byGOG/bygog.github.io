# Wiresock ve wgcf: Cloudflare WARP'ı Windows'ta Özgürleştirin

Cloudflare WARP, internet bağlantınızı hızlandırmak ve gizliliğinizi artırmak için harika bir araçtır. Ancak resmi WARP istemcisi bazen hantal olabilir, sistem kaynaklarını tüketebilir veya gelişmiş yönlendirme seçenekleri sunmayabilir. İşte bu noktada **Wiresock** ve **wgcf** ikilisi devreye giriyor.

## WireSock Nedir? (wiresock.net)

[WireSock](https://www.wiresock.net/), WireGuard protokolü üzerine inşa edilmiş, Windows için geliştirilmiş yüksek performanslı ve "şeffaf" bir VPN istemcisidir. Standart WireGuard istemcisinden ayrılan en önemli özellikleri şunlardır:

*   **Uygulama Bazlı Tünelleme (Split Tunneling):** Belirli uygulamaların VPN üzerinden geçmesini sağlarken, diğerlerini yerel ağınızda bırakabilirsiniz. Örneğin, sadece tarayıcınızı VPN'e bağlayıp oyunlarınızın düşük ping ile yerel ağdan devam etmesini sağlayabilirsiniz.
*   **Düşük Gecikme ve Yüksek Performans:** WireSock, kernel seviyesinde değil, kullanıcı modunda çalışmasına rağmen son derece optimize edilmiştir.
*   **IP Dışlama (Exclusion):** Belirli IP adreslerini veya web sitelerini VPN kapsamı dışında bırakmak çok kolaydır.
*   **WireSock VPN Gateway:** Windows makinenizi bir VPN sunucusuna dönüştürerek internetinizi diğer cihazlarla paylaşmanıza olanak tanır.

## wgcf Nedir? (github.com/ViRb3/wgcf)

[wgcf](https://github.com/ViRb3/wgcf), Cloudflare WARP için resmi olmayan, açık kaynaklı bir komut satırı aracıdır. Temel amacı şudur:

*   **WireGuard Profili Oluşturma:** Cloudflare, WARP kullanıcılarına doğrudan standart `.conf` dosyası vermez. `wgcf` aracı, Cloudflare API'si ile konuşarak sizin için bir hesap oluşturur ve standart WireGuard istemcileriyle (veya WireSock ile) kullanabileceğiniz bir yapılandırma dosyası üretir.
*   **Çapraz Platform:** Windows, Linux ve macOS üzerinde çalışabilir.

## Neden Birlikte Kullanmalısınız?

Resmi WARP istemcisi yerine bu ikiliyi tercih etmenin birkaç kritik avantajı vardır:

1.  **Hafiflik:** WireSock, resmi WARP istemcisinden çok daha az RAM ve işlemci tüketir.
2.  **Esneklik:** Sadece istediğiniz programları VPN'e sokabilirsiniz.
3.  **Kararlılık:** Bazı sistemlerde resmi istemcinin neden olduğu bağlantı kopmaları veya DNS sorunları bu yöntemle aşılabilir.
4.  **Kontrol:** Bağlantınızın her parametresini (MTU ayarları, DNS sunucuları vb.) kendiniz kontrol edebilirsiniz.

## Nasıl Kullanılır?

1.  **Profil Oluşturun:** `wgcf` aracını indirin ve komut satırında `wgcf register` ve ardından `wgcf generate` komutlarını çalıştırın. Bu size `wgcf-profile.conf` dosyasını verecektir.
2.  **WireSock'ı Kurun:** `wiresock.net` üzerinden WireSock istemcisini indirin ve yükleyin.
3.  **Bağlantıyı Başlatın:** Oluşturduğunuz `.conf` dosyasını WireSock ile açarak bağlantınızı başlatın.

Bu ikili, özellikle internet kısıtlamalarını aşmak, oyunlarda rota iyileştirmek veya sadece daha temiz bir VPN deneyimi yaşamak isteyen Windows kullanıcıları için "altın standart" niteliğindedir.
