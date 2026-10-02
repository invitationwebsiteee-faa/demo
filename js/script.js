/* =====================================================================
   script.js — logika undangan. TIDAK PERLU DIEDIT.
   Semua data (nama, tanggal, foto, musik) ada di js/config.js
   ===================================================================== */

(function () {
  "use strict";

  const C = UNDANGAN;

  const HARI  = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const BULAN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
                 "Agustus", "September", "Oktober", "November", "Desember"];

  const el = (id) => document.getElementById(id);

  /* membuat elemen dengan teks biasa (aman dari kode HTML yang disisipkan orang) */
  function buat(tag, kelas, teks) {
    const e = document.createElement(tag);
    if (kelas) e.className = kelas;
    if (teks !== undefined) e.textContent = teks;
    return e;
  }

  function pecahTanggal(iso) {
    return new Date(iso + "T00:00:00Z");
  }
  function tanggalPanjang(iso) {
    const d = pecahTanggal(iso);
    return HARI[d.getUTCDay()] + ", " + String(d.getUTCDate()).padStart(2, "0") +
           " " + BULAN[d.getUTCMonth()] + " " + d.getUTCFullYear();
  }
  function tanggalPendek(iso) {
    const d = pecahTanggal(iso);
    return String(d.getUTCDate()).padStart(2, "0") + " . " +
           String(d.getUTCMonth() + 1).padStart(2, "0") + " . " + d.getUTCFullYear();
  }


  /* ===== 1. ISI HALAMAN DARI CONFIG ===== */
  function isiHalaman() {
    document.title = C.judulHalaman;

    // cover
    el("cover-nama-1").textContent = C.mempelai[0].namaPanggilan;
    el("cover-nama-2").textContent = C.mempelai[1].namaPanggilan;
    el("cover-tanggal").textContent = tanggalPendek(C.tanggal);

    // foto
    if (C.foto.cover)    el("cover").style.backgroundImage = "url('" + C.foto.cover + "')";
    if (C.foto.latar)    el("latar").style.backgroundImage = "url('" + C.foto.latar + "')";
    if (C.foto.mempelai) el("foto-mempelai").src = C.foto.mempelai;

    // video cover (opsional)
    if (C.videoCover) {
      const v = el("cover-video");
      v.src = C.videoCover;
      if (C.foto.cover) v.poster = C.foto.cover;
      v.hidden = false;
      v.play().catch(function () {});
    }

    // ayat
    el("ayat-arab").textContent    = C.ayat.arab;
    el("ayat-terjemah").textContent = C.ayat.terjemah;
    el("ayat-sumber").textContent   = C.ayat.sumber;

    // mempelai
    const wadahMempelai = el("mempelai-daftar");
    C.mempelai.forEach(function (m, i) {
      if (i > 0) wadahMempelai.appendChild(buat("p", "reveal amp-divider", "&"));

      const blok = buat("div", "reveal person");
      blok.appendChild(buat("h2", "person-name", m.namaLengkap));

      const info = buat("p", "person-info");
      info.appendChild(document.createTextNode(m.keterangan));
      info.appendChild(document.createElement("br"));
      info.appendChild(document.createTextNode(m.orangTua));
      blok.appendChild(info);

      wadahMempelai.appendChild(blok);
    });

    // acara
    const wadahAcara = el("acara-daftar");
    C.acara.forEach(function (a) {
      const kartu = buat("div", "reveal event-card");
      kartu.appendChild(buat("h2", "event-title", a.judul));
      kartu.appendChild(buat("p", "event-time", tanggalPanjang(a.tanggal || C.tanggal)));
      kartu.appendChild(buat("p", "event-time", a.jam));
      kartu.appendChild(buat("p", "event-place", a.tempat));

      if (a.peta) {
        const tautan = buat("a", "event-peta", "Lihat Lokasi");
        tautan.href = a.peta;
        tautan.target = "_blank";
        tautan.rel = "noopener";
        kartu.appendChild(tautan);
      }
      wadahAcara.appendChild(kartu);
    });

    // penutup
    el("penutup-teks").textContent = C.penutup;
    el("penutup-nama").textContent = C.mempelai.map(function (m) { return m.namaPanggilan; }).join(" & ");
  }


  /* ===== 2. NAMA TAMU DARI LINK (…/index.html?to=Nama) ===== */
  function isiNamaTamu() {
    const dariLink = new URLSearchParams(window.location.search).get("to");
    el("guest-name").textContent = dariLink || C.tamuDefault;
  }

  isiHalaman();
  isiNamaTamu();


  /* ===== 3. ANIMASI PEMBUKA ===== */
  gsap.registerPlugin(ScrollTrigger);

  gsap.timeline({ defaults: { ease: "power2.out" } })
    .from(".cover",       { opacity: 0, duration: 1.2 })
    .from(".cover-label", { opacity: 0, y: 18, duration: 0.9 }, "-=0.4")
    .from(".cover-names", { opacity: 0, y: 22, duration: 1.2 }, "-=0.6")
    .from(".cover-date",  { opacity: 0, y: 18, duration: 0.9 }, "-=0.8")
    .from(".cover-guest", { opacity: 0, y: 18, duration: 0.9 }, "-=0.7")
    .from(".btn-open",    { opacity: 0, y: 18, duration: 0.8 }, "-=0.6");


  /* ===== 4. MUSIK ===== */
  const musik = el("musik");
  const tombolMusik = document.querySelector(".btn-music");
  const adaMusik = Boolean(C.musik);

  if (adaMusik) {
    musik.src = C.musik;
    musik.volume = 0.5;
  }

  function putarMusik() {
    musik.play().then(function () {
      tombolMusik.classList.add("playing");
      tombolMusik.classList.remove("paused");
    }).catch(function () {});
  }
  function jedaMusik() {
    musik.pause();
    tombolMusik.classList.remove("playing");
    tombolMusik.classList.add("paused");
  }

  tombolMusik.addEventListener("click", function () {
    if (musik.paused) { putarMusik(); } else { jedaMusik(); }
  });


  /* ===== 5. BUKA UNDANGAN ===== */
  const cover = document.querySelector(".cover");

  document.querySelector(".btn-open").addEventListener("click", function () {
    if (adaMusik) {
      putarMusik();
      tombolMusik.classList.add("show");
    }

    gsap.to(cover, {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      onComplete: function () {
        cover.style.display = "none";
        document.body.classList.remove("locked");
        ScrollTrigger.refresh();
        animasiScroll();
      }
    });
  });


  /* ===== 6. ANIMASI SAAT SCROLL ===== */
  function animasiScroll() {
    gsap.utils.toArray(".reveal").forEach(function (elemen) {
      gsap.from(elemen, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elemen,
          start: "top 88%",
          end: "bottom 12%",
          toggleActions: "play reverse play reverse"
        }
      });
    });
  }


  /* ===== 7. UCAPAN & KEHADIRAN ===== */
  const urlAPI   = (C.rsvp && C.rsvp.urlAPI) || "";
  const modeDemo = !urlAPI;

  const daftar    = el("rsvp-list");
  const tombolKirim = document.querySelector(".btn-rsvp");
  const status    = el("rsvp-status");
  let ucapanDemo  = (C.ucapanContoh || []).slice();

  function infoDaftar(teks) {
    daftar.textContent = "";
    daftar.appendChild(buat("p", "rsvp-info", teks));
  }

  function tampilkanUcapan(data) {
    if (!data || data.length === 0) {
      infoDaftar("Belum ada ucapan.");
      return;
    }
    daftar.textContent = "";
    data.forEach(function (d) {
      const item = buat("div", "rsvp-item");
      item.appendChild(buat("p", "rsvp-nama",  String(d.nama  || "")));
      item.appendChild(buat("p", "rsvp-hadir", String(d.hadir || "")));
      item.appendChild(buat("p", "rsvp-pesan", String(d.pesan || "")));
      daftar.appendChild(item);
    });
  }

  function muatUcapan() {
    if (modeDemo) {
      tampilkanUcapan(ucapanDemo);
      return;
    }
    fetch(urlAPI)
      .then(function (res) { return res.json(); })
      .then(function (data) { tampilkanUcapan(data.reverse()); })
      .catch(function () { infoDaftar("Gagal memuat ucapan."); });
  }

  if (modeDemo) el("rsvp-catatan").hidden = false;
  muatUcapan();

  tombolKirim.addEventListener("click", function () {
    const nama  = el("rsvp-nama").value.trim();
    const hadir = el("rsvp-hadir").value;
    const pesan = el("rsvp-pesan").value.trim();

    if (!nama || !hadir || !pesan) {
      status.textContent = "Nama, kehadiran, dan ucapan wajib diisi ya.";
      return;
    }
    status.textContent = "";

    function bersihkanForm() {
      el("rsvp-nama").value = "";
      el("rsvp-hadir").value = "";
      el("rsvp-pesan").value = "";
    }

    if (modeDemo) {
      ucapanDemo.unshift({ nama: nama, hadir: hadir, pesan: pesan });
      bersihkanForm();
      muatUcapan();
      status.textContent = "Terima kasih! (mode demo)";
      return;
    }

    tombolKirim.disabled = true;
    tombolKirim.textContent = "Mengirim...";

    fetch(urlAPI, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ nama: nama, hadir: hadir, pesan: pesan })
    })
      .then(function () {
        bersihkanForm();
        status.textContent = "Terima kasih atas ucapan dan doanya.";
        muatUcapan();
      })
      .catch(function () {
        status.textContent = "Gagal mengirim, coba lagi ya.";
      })
      .finally(function () {
        tombolKirim.disabled = false;
        tombolKirim.textContent = "Kirim";
      });
  });

})();
