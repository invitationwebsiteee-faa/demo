/* =====================================================================
   Code.gs — backend ucapan & kehadiran (Google Apps Script)
   Cara memasangnya ada di PETUNJUK.md, bagian "Ucapan tersimpan ke Google Sheets".
   ===================================================================== */

const NAMA_SHEET = "Ucapan";

function ambilSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(NAMA_SHEET);
  if (!sh) {
    sh = ss.insertSheet(NAMA_SHEET);
    sh.appendRow(["Waktu", "Nama", "Kehadiran", "Ucapan"]);
  }
  return sh;
}

/* cegah isi sel dibaca sebagai rumus oleh Google Sheets */
function aman_(teks, batas) {
  let t = String(teks || "").slice(0, batas);
  if (/^[=+\-@]/.test(t)) t = "'" + t;
  return t;
}

/* dipanggil saat undangan memuat daftar ucapan */
function doGet() {
  const baris = ambilSheet_().getDataRange().getValues().slice(1);
  const data = baris.map(function (r) {
    return { nama: r[1], hadir: r[2], pesan: r[3] };
  });
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/* dipanggil saat tamu menekan tombol Kirim */
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  ambilSheet_().appendRow([
    new Date(),
    aman_(d.nama, 80),
    aman_(d.hadir, 30),
    aman_(d.pesan, 500)
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
