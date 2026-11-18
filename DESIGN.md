# BHYONN, arah desain

Reading this as: halaman profil satu orang untuk pengunjung yang datang dari Discord, TikTok, atau Instagram. Suasananya ringan, biru langit, pixel, dan jujur soal tahap belajar. Referensinya "Dispatch Files": glassmorphism biru muda, huruf pixel, kartu, dan partikel bulat. Yang diambil adalah bahasanya, bukan tata letaknya.

## Ide

Nama Bhyonn diperlakukan sebagai plat nama besar. Di bawahnya ada stiker pixel "BELAJAR" dan label peran, lalu satu foto asli di dalam medali kuning-biru. Bulatan kaca, ring, dan titik-titik kecil tidak ditempel di posisi referensi; semuanya diikat ke isi halaman: di belakang foto, di tepi kartu, di sudut panel tautan, dan di ekor kartu penutup. Halaman ini memperkenalkan seorang pemula tanpa mengarang karya, angka, atau pujian.

## Tipografi

- Poppins 400/500/600/800 untuk nama, judul, teks isi, tombol, dan navigasi. Nama memakai 800 dengan tracking rapat; teks isi tetap 400.
- Silkscreen 400/700 untuk label pixel: "BELAJAR", "HALO!", penanda panel, dan angka tautan. Tidak dipakai untuk paragraf.
- Nama di hero: `min(20vw, 16rem)` (256px di layar 1440), line-height 0.8, tracking -0.058em. Di ponsel turun mengikuti lebar layar, bukan ukuran huruf.
- Skala teks UI dirapatkan: 13px untuk catatan kaki, 14px untuk label, navigasi, dan tombol kecil, 16px untuk isi dan tombol utama. Judul memakai clamp; sisa variasi ukuran berasal dari tipe display responsif, bukan ukuran acak.
- Tidak ada font italic. Penekanan dibuat lewat bobot, warna, dan garis bawah kuning.

## Warna

- Sky `#EAF4FE`, sky-deep `#D8EBFC`, paper `#FFFFFF`.
- Ink `#123F60`, ink-soft `#2A5C82`.
- Blue `#2F7FC9`, blue-deep `#1E6098`, blue-surface `#2874B8`, blue-surface-deep `#1E5F9C`.
- Yellow `#FFE04D`, yellow-deep `#F5CF2E`.

Kontras yang diukur: ink di sky 9.9:1, ink-soft di sky 6.4:1, putih di blue-surface 4.9:1, ink di yellow 8.4:1. Biru display di sky 3.8:1 hanya untuk teks besar. Tidak ada teks kecil di atas kuning atau di atas biru terang yang gagal AA.

## Struktur

1. Header: wordmark `bhyonn` dengan titik kuning, dua tautan bagian, dan tombol Discord. Di bawah 720px navigasi teks disembunyikan; tombol Discord dan navigasi footer tetap ada.
2. Hero: nama selebar halaman, baris "BELAJAR" (putih di atas bidang biru, blok kuning offset di belakangnya) dan label peran, paragraf perkenalan, dua aksi, lalu foto di medali. Foto memakai bentuk kuning padat, ring tipis, stiker "halo!", satu titik kuning dan satu titik biru.
3. Tentang ("Kenalan dulu"): catatan pendek di kanan, tiga kartu miring dengan pin dan warna bergantian kuning-biru-kuning. Kedalaman datang dari rotasi, pin, dan tumpukan warna, bukan bayangan palsu. Isinya HTML/CSS, masih belajar, dan siap dikoreksi. Satu baris catatan: tanpa analytics dan cookie.
4. Tautan ("Di tempat lain"): kartu sapaan "HALO!" di kiri, panel bergaris biru di kanan. Panel memuat "Pilih tempat / 3 tautan" dan tiga baris: Discord, TikTok, Instagram. Tidak ada tautan tambahan.
5. Penutup: lengkung kuning "Tanpa framework, analytics, atau cookie." di belakang kartu biru "Makasih sudah mampir." dengan tombol Discord. Tangan pixel kuning menempel di tepi bawah kartu, bukan di tengah halaman.
6. Footer: bidang sky-deep dengan nama besar dan titik kuning, navigasi, dan meta.

## Penempatan partikel

- Hero: orb kaca besar di kanan (24%, -8%) bersinggungan dengan tepi foto; orb tipis di kiri bawah dekat paragraf; ring di kiri atas foto; stiker "halo!" di kanan atas; dua titik di kanan bawah foto.
- Tentang: orb di kiri tengah dan kanan atas, ring di kanan bawah. Pin di tiap kartu menjadi jangkar partikel, bukan hiasan lepas.
- Tautan: orb di kanan tengah (tepi panel), orb di kiri bawah (dekat kartu sapaan), ring di kiri atas. Dua titik kecil menempel di border panel: kuning di atas, biru di bawah.
- Penutup: orb di kiri tengah dan kanan bawah, ring di kanan atas. Tangan pixel berada di `bottom: -2.4rem`, `left: 50%`, rotasi -7deg, tepat di bawah tombol Discord.
- Footer tidak memakai orb; bidang sky-deep dan nama besar sudah menutup komposisi.
- Di bawah 960px orb kanan-atas About disembunyikan karena akan jatuh di belakang paragraf pembuka. Di ponsel orb hero turun ke 64% supaya mengikat foto, bukan teks perkenalan.
- Ring selalu lingkaran penuh; ukurannya ikut lebar layar, bukan garis hias yang terpotong.

Semua partikel memakai `pointer-events: none`, `aria-hidden`, dan `overflow: clip` per bagian supaya tidak menimbulkan scroll horizontal.

## Gerak

- Script inline di `<head>` menambahkan kelas `.js`; `script.js` lalu mengatur reveal lewat IntersectionObserver (threshold 0.12, rootMargin -10%). Delay 90ms dan 180ms untuk anak kartu.
- Ada fallback 1600ms di `<head>`: kalau script gagal, semua `.reveal` tetap tampil. Tanpa JavaScript, CSS tidak menyembunyikan konten.
- Orb bergeser halus mengikuti pointer di perangkat hover (maksimal 22px, depth 0.25-1). Orb tidak beranimasi sendiri; hanya stiker "halo!" yang bergoyang pelan 0.4rem. Label "BELAJAR" dan label peran masuk bersama sebagai satu baris.
- `prefers-reduced-motion: reduce` mematikan drift, reveal, animasi masuk, dan goyangan stiker; konten langsung terlihat.

## Aksesibilitas

- Skip link ke `#isi`, heading berurutan (h1 nama, h2 per bagian, h3 kartu), dan `lang="id"`.
- Fokus 3px ink; di kartu penutup biru memakai outline putih. Tombol minimal 52px, tombol kecil dan tautan navigasi 44px.
- Dekorasi (orb, ring, titik, stiker, tangan, ikon) memakai `aria-hidden`. Foto punya alt yang menyebut jaket cokelat dan ransel biru.
- Tautan eksternal memakai `target="_blank"`, `rel="noopener noreferrer"`, dan teks sr-only "buka di tab baru".

## Batasan yang disengaja

- Satu foto asli. Tidak ada stok foto, avatar buatan, atau gambar pengganti hanya untuk memenuhi jumlah gambar.
- Hanya tiga tujuan tautan yang diberikan pemilik. Tidak ada tautan karangan.
- Tidak ada angka, pencapaian, testimoni, atau demo palsu. Kartu "Masih belajar" dan "Siap dikoreksi" memang menyatakan keterbatasan.
- Tanpa analytics, cookie, atau pelacakan.
- Tidak ada video. Halaman ini profil satu orang, bukan studi kasus; tidak ada klip jujur yang bisa ditambahkan tanpa mengarang kegiatan.
- Tidak ada `box-shadow` atau `drop-shadow`. Blok kuning di belakang "BELAJAR" adalah lapisan datar, dan kedalaman kartu dibuat lewat rotasi, pin, serta warna.
- Gradient kaca, teks pixel, dan blok offset dipertahankan karena itu bahasa referensi. Ini bukan sisa template; semua posisi partikel ditentukan ulang terhadap konten Bhyonn.
