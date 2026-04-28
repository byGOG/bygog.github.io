# Subloader: Video Dosyalarınız İçin En Hızlı Altyazı Bulucu

**Subloader**, video dosyalarınız için en uygun altyazıları otomatik olarak bulup indirmenize olanak tanıyan, açık kaynaklı ve son derece hafif bir Windows aracıdır. Manuel olarak altyazı arama, indirme ve dosya adını eşleştirme zahmetini ortadan kaldırır.

## Subloader Nedir?

Subloader, video dosyalarınızın dijital parmak izini (hash) kullanarak **OpenSubtitles** veri tabanında arama yapar. Bu sayede, video dosyanızın adı ne olursa olsun, o sürüme (FPS, süre, kalite) %100 uyumlu olan altyazıyı bulmanızı sağlar.

### Öne Çıkan Özellikleri:

*   **Windows Sağ Tık Entegrasyonu:** Kurulumdan sonra herhangi bir video dosyasına (.mp4, .mkv, .avi vb.) sağ tıklayıp "Find subtitles" diyerek anında arama başlatabilirsiniz.
*   **OpenSubtitles Desteği:** Dünyanın en büyük altyazı arşiviyle doğrudan entegre çalışır.
*   **Akıllı Eşleşme:** Sadece dosya adına değil, videonun içeriğine (hash) göre arama yaptığı için senkronizasyon sorunu yaşama ihtimalinizi minimize eder.
*   **Toplu İndirme:** Bir klasör dolusu dizi bölümü için tek bir komutla toplu altyazı araması yapabilir.
*   **Minimalist Tasarım:** Gereksiz karmaşadan uzak, hem grafik arayüzü (GUI) hem de komut satırı (CLI) üzerinden kullanılabilir.
*   **Açık Kaynak:** Güvenli, şeffaf ve tamamen ücretsizdir.

## Nasıl Kullanılır?

1.  **Kurulum:** GitHub üzerindeki "Releases" sayfasından en güncel sürümü indirin.
2.  **Arama:** Video dosyanıza sağ tıklayın ve "Find subtitles" seçeneğine basın.
3.  **Seçim:** Karşınıza çıkan listeden tercih ettiğiniz dili ve altyazıyı seçip indirin. Altyazı otomatik olarak videonun yanına, video ile aynı isimde kaydedilecektir.

Alternatif olarak, **Scoop** paket yöneticisi kullanıyorsanız şu komutla da yükleyebilirsiniz:
```powershell
scoop install subloader
```

**Resmi Depo:** [GitHub - Valyreon/Subloader](https://github.com/Valyreon/Subloader)
