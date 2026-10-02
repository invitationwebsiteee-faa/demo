/* =====================================================================
   config.js — SATU-SATUNYA FILE YANG PERLU KAMU EDIT

   Ganti tulisan di dalam tanda kutip "…". Jangan hapus tanda kutip,
   koma, atau kurung. Simpan (Ctrl + S), lalu refresh browser.
   Bagian lain (index.html, css, script.js) tidak perlu disentuh.
   ===================================================================== */

const UNDANGAN = {

  /* ---------- JUDUL TAB BROWSER ---------- */
  judulHalaman: "Undangan Pernikahan Sekar & Raka",


  /* ---------- TANGGAL (format: tahun-bulan-tanggal) ----------
     Hari ("Sabtu", dst.) dihitung otomatis. Cukup ganti di sini. */
  tanggal: "2027-06-12",


  /* ---------- MEMPELAI ----------
     Urutan tampil = urutan di bawah (yang pertama tampil di atas).
     "namaPanggilan" dipakai di cover dan penutup. */
  mempelai: [
    {
      namaPanggilan: "Sekar",
      namaLengkap:   "Sekar Ayu Pramesti",
      keterangan:    "Putri pertama dari",
      orangTua:      "Bapak Nama Ayah & Ibu Nama Ibu"
    },
    {
      namaPanggilan: "Raka",
      namaLengkap:   "Raka Adi Pratama",
      keterangan:    "Putra kedua dari",
      orangTua:      "Bapak Nama Ayah & Ibu Nama Ibu"
    }
  ],


  /* ---------- ACARA ----------
     Tambah acara dengan menyalin satu blok { … }, atau hapus blok
     yang tidak dipakai. "peta" boleh dikosongkan ("") kalau tidak
     ingin ada tombol Lihat Lokasi.
     "tanggal" boleh dikosongkan; kalau kosong, memakai tanggal di atas. */
  acara: [
    {
      judul:   "Akad Nikah",
      tanggal: "",
      jam:     "09.00 WIB – selesai",
      tempat:  "Gedung Contoh, Jl. Contoh No. 1, Kota Contoh",
      peta:    ""
    },
    {
      judul:   "Resepsi",
      tanggal: "",
      jam:     "11.00 WIB – selesai",
      tempat:  "Gedung Contoh, Jl. Contoh No. 1, Kota Contoh",
      peta:    ""
    }
  ],


  /* ---------- AYAT / KUTIPAN ---------- */
  ayat: {
    arab:    "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    terjemah: "Dan di antara tanda-tanda kekuasaan-Nya diciptakan-Nya untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya.",
    sumber:  "QS. Ar-Rum : 21"
  },


  /* ---------- PENUTUP ---------- */
  penutup: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara berkenan hadir dan memberikan doa restu.",


  /* ---------- FOTO ----------
     Taruh file di folder asset/foto/ lalu tulis namanya di sini.
     Cara paling gampang: timpa file lama dengan nama yang sama.
       cover      → latar halaman pembuka          (tegak, 1080 × 1920 px)
       latar      → latar samar seluruh halaman    (tegak, 1080 × 1920 px)
       mempelai   → foto berbingkai lengkung       (660 × 870 px)             */
  foto: {
    cover:    "asset/foto/cover.jpg",
    latar:    "asset/foto/latar.jpg",
    mempelai: "asset/foto/mempelai.jpg"
  },


  /* ---------- VIDEO COVER (opsional) ----------
     Isi dengan lokasi file, misalnya "asset/video/cover.mp4", untuk
     memakai video sebagai latar halaman pembuka. Biarkan "" kalau
     tidak mau memakai video. Pakai video pendek (5–15 detik), tanpa
     suara, kurang dari 5 MB supaya cepat dibuka di HP. */
  videoCover: "",


  /* ---------- MUSIK (opsional) ----------
     Taruh file mp3 di asset/musik/, lalu tulis, misalnya,
     "asset/musik/lagu.mp3". Biarkan "" kalau tidak ada musik
     (tombol musik akan otomatis tersembunyi).
     Pakai lagu bebas royalti atau yang kamu punya izinnya. */
  musik: "",


  /* ---------- NAMA TAMU ----------
     Dipakai kalau link dibuka tanpa ?to=Nama.
     Contoh link per tamu:  …/index.html?to=Bapak%20Budi */
  tamuDefault: "Bapak / Ibu / Saudara",


  /* ---------- UCAPAN & KEHADIRAN ----------
     urlAPI diisi alamat Google Apps Script milikmu (lihat PETUNJUK.md).
     Kalau dikosongkan, form berjalan dalam mode demo: ucapan hanya
     tampil di layar dan tidak disimpan. */
  rsvp: {
    urlAPI: ""
  },

  /* Ucapan contoh yang tampil di mode demo (urlAPI kosong).
     Hapus semua isinya kalau tidak mau ada contoh: ucapanContoh: [] */
  ucapanContoh: [
    { nama: "Tamu Contoh 1", hadir: "Hadir",            pesan: "Selamat menempuh hidup baru, semoga sakinah mawaddah warahmah." },
    { nama: "Tamu Contoh 2", hadir: "Belum bisa hadir", pesan: "Mohon maaf belum bisa hadir. Semoga acaranya lancar dan penuh berkah." }
  ]
};
