# Jellyfin: Kendi Medya Evreninizi Yaratın

Streaming servislerinin sayısının her geçen gün arttığı ve fiyatlarının sürekli zamlandığı bir dönemdeyiz. Netflix, Prime Video, Disney+, HBO Max, BluTV, Exxen derken hepsine abone olmak artık küçük bir servet gerektiriyor. Üstelik bir platformda severek izlediğiniz bir içerik, yarın lisans anlaşmaları nedeniyle oradan kaldırılabiliyor. İşte tam bu noktada **Jellyfin** devreye giriyor.

Jellyfin, kendi bilgisayarınızda veya sunucunuzda kendi kişisel "Netflix"inizi kurmanızı sağlayan harika bir medya sunucusu. 


Peki onu rakiplerinden (Plex, Emby) ayıran özellikleri neler?

## Tamamen Özgür ve Ücretsiz

Plex ve Emby gibi rakipleri temel özellikleri ücretsiz sunsa da, donanımsal video dönüştürme (hardware transcoding), çevrimdışı izleme, detaylı kullanıcı yetkilendirmesi gibi gelişmiş özellikler için ücretli üyelik (Plex Pass vb.) talep ediyorlar. 

Jellyfin ise açık kaynak kodlu (Open Source) bir projedir. Arkasında ticari bir şirket yoktur, tamamen gönüllüler tarafından geliştirilir. Bu yüzden **hiçbir gizli ücreti, premium sürümü veya kilitli özelliği yoktur**. Tüm özellikler herkese ücretsiz ve açık olarak sunulur.

## Sizi Asla İzlemez

Günümüzde veri gizliliği en büyük sorunlardan biri. Hangi diziyi izlediğiniz, nerede durdurduğunuz, hangi tür filmleri sevdiğiniz... Bunların hepsi toplanan ve satılan verilerdir. 

Jellyfin tamamen yerel çalışır (local-first). Kurulumu sırasında sizden bir hesap açmanızı veya merkeze bağlanmanızı istemez. Tüm verileriniz kendi sunucunuzda kalır. Hiçbir telemetri veya izleme aracı içermez.

## Donanımsal Hızlandırma (Hardware Transcoding)

Bence en önemli avantajlarından biri bu. Eğer izlemek istediğiniz cihaz (örneğin akıllı televizyonunuz) videonun formatını veya ses kodeğini desteklemiyorsa, Jellyfin videoyu anında desteklenen bir formata çevirip (transcode) gönderir. Bunu yaparken bilgisayarınızın ekran kartını (NVIDIA, AMD veya Intel QuickSync) kullanarak işlemciye yük bindirmeden çok yüksek performanslı bir şekilde yapabilir. Rakiplerinde bu özellik sadece ücretli sürümlerde bulunur.

## Geniş Cihaz Desteği

Jellyfin'i her yerde izleyebilirsiniz:
- Android ve iOS cihazlarda (uygulaması üzerinden)
- Android TV ve Fire TV'de
- Web tarayıcınızda
- Roku, WebOS (LG) ve Tizen (Samsung) TV'lerde (kısmen geliştirme aşamaları devam etse de gayet kullanılabilir durumda)
- Windows/macOS/Linux için masaüstü istemcilerle (Jellyfin Media Player)

## Senkronize İzleme (SyncPlay)

Arkadaşlarınızla veya ailenizle uzaktan aynı filmi veya diziyi aynı anda izleyebilirsiniz. Biriniz videoyu durdurduğunda diğerlerinde de durur. İzleme deneyimini senkronize eder. Bu da yine varsayılan olarak gelen ve ücretsiz bir özelliktir.


## Sonuç

Eğer filmlerinizi ve dizilerinizi kendi disklerinizde arşivlemeyi sevenlerdenseniz, bir kez Jellyfin kurduktan sonra bir daha geri dönmek istemeyeceksiniz. Kendi kapak fotoğraflarını indiren, oyuncu kadrosunu, IMDB puanlarını otomatik çeken, altyazıları otomatik bulan ve size mükemmel bir arayüz sunan bu sistem, dijital bağımsızlığın en güzel örneklerinden biridir. 

Açık kaynağın gücü adına, iyi ki varsın Jellyfin!
