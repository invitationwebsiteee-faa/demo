# Petunjuk Undangan Digital

Semua yang biasa diganti ada di **satu file: `js/config.js`**.
File lain (`index.html`, `css/style.css`, `js/script.js`) tidak perlu disentuh.

## Isi folder

```
index.html          kerangka halaman
css/style.css       tampilan (warna ada di bagian paling atas)
js/config.js        ← EDIT DI SINI: nama, tanggal, acara, foto, musik
js/script.js        logika dan animasi
asset/foto/         cover.jpg, latar.jpg, mempelai.jpg
asset/video/        video cover (opsional)
asset/musik/        musik (opsional)
apps-script/Code.gs backend ucapan ke Google Sheets (opsional)
```

## Cara menjalankan di komputer

1. Buka folder ini di VS Code.
2. Pasang ekstensi **Live Server**, klik kanan `index.html` → **Open with Live Server**.
3. Setiap kamu simpan file (Ctrl + S), halaman ikut menyegarkan.

## Mengganti data

Buka `js/config.js`, ganti tulisan di dalam tanda kutip `"…"`, simpan. Beberapa hal:

| Yang diganti | Di mana |
|---|---|
| Nama, orang tua | `mempelai` |
| Tanggal (hari dihitung otomatis) | `tanggal` → format `"2027-06-12"` |
| Jam dan tempat acara | `acara` (salin satu blok `{ … }` untuk menambah acara) |
| Tombol Lihat Lokasi | isi `peta` dengan link Google Maps; kosongkan kalau tidak perlu |
| Ayat dan penutup | `ayat`, `penutup` |

## Mengganti foto

Cara paling gampang: **timpa file di `asset/foto/` dengan nama yang sama.**

| File | Ukuran saran | Dipakai untuk |
|---|---|---|
| `cover.jpg` | 1080 × 1920 px (tegak) | latar halaman pembuka |
| `latar.jpg` | 1080 × 1920 px (tegak) | latar samar seluruh halaman |
| `mempelai.jpg` | 660 × 870 px | foto berbingkai lengkung |

Tips: kompres foto (misalnya di squoosh.app) supaya tiap file di bawah 300 KB. Undangan jadi cepat dibuka di HP.
Kalau mau nama file lain, ubah juga tulisannya di bagian `foto` pada `config.js`.

## Memakai video sebagai cover (opsional)

1. Taruh video di `asset/video/`, misalnya `cover.mp4` (5–15 detik, tanpa suara, di bawah 5 MB).
2. Di `config.js` isi: `videoCover: "asset/video/cover.mp4"`.

Foto cover tetap tampil sebagai gambar awal sebelum video siap.

## Musik (opsional)

1. Taruh mp3 di `asset/musik/`, misalnya `lagu.mp3`.
2. Di `config.js` isi: `musik: "asset/musik/lagu.mp3"`.

Kalau `musik` dikosongkan, tombol musik otomatis tidak muncul.
Pakai lagu bebas royalti atau yang kamu punya izinnya.

## Nama tamu per link

Tambahkan `?to=Nama` di akhir link, spasi ditulis `%20`:

```
https://…/index.html?to=Bapak%20Budi
```

## Ucapan tersimpan ke Google Sheets (opsional)

Tanpa langkah ini, form ucapan hanya mode demo (tampil di layar, tidak disimpan).

1. Buat Google Sheet baru → menu **Extensions → Apps Script**.
2. Hapus isinya, tempel seluruh isi `apps-script/Code.gs`, simpan.
3. Klik **Deploy → New deployment → Web app**.
   - *Execute as*: **Me**
   - *Who has access*: **Anyone**
4. Klik **Deploy**, izinkan akses, lalu salin **Web app URL**.
5. Tempel URL itu di `config.js`:  `rsvp: { urlAPI: "https://script.google.com/macros/s/…/exec" }`
6. Setiap kamu mengubah `Code.gs` nanti, buat **New deployment** lagi supaya berlaku.

Gunakan **satu Google Sheet per undangan**, jangan dipakai bersama.

## Preview saat link dibagikan

Di bagian atas `index.html` ada tiga baris `og:title`, `og:description`, `og:image`. Edit langsung di sana.
Untuk `og:image`, isi alamat lengkap setelah undangan online
(contoh: `https://namakamu.github.io/undangan/asset/foto/cover.jpg`).

## Menaruh undangan di internet (gratis)

- **Netlify Drop**: buka `app.netlify.com/drop`, seret seluruh folder, link langsung jadi.
- **GitHub Pages**: unggah folder ke repo → Settings → Pages → pilih branch `main`.

## Ganti warna

Di `css/style.css` bagian paling atas (`:root`) ada lima variabel warna. Ganti kodenya, seluruh undangan ikut berubah.
