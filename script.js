// === HERO SLIDESHOW ===
const hero = document.querySelector('.hero');
const images = [
  'images/img1.jpg',
  'images/img2.jpg',
  'images/img3.jpg',
  'images/img4.jpg',
  'images/img5.jpg',
  'images/img6.jpg'
];
let currentIndex = 0;

function changeBackground() {
  currentIndex = (currentIndex + 1) % images.length;
  hero.style.backgroundImage = `url('${images[currentIndex]}')`;
}

// Ganti setiap 5 detik
setInterval(changeBackground, 5000);


// === BERITA (Tampilan Publik Saja) ===
// Data berita bisa diambil dari server nanti.
// Untuk demo kita buat statis:
const beritaList = document.getElementById('beritaList');

// === DATA BERITA ===
const contohBerita = [
  {
    judul: 'Punico Matsuri',
    isi: 'Punico Matsuri akan diadakan pada 5 Januari 2026. Diharapkan kepada seluruh anggota untuk bersiap-siap dengan cosplay terbaik!'
  },
  {
    judul: 'Workshop Manga Digital',
    isi: 'Pelatihan menggambar manga secara digital dengan software Clip Studio akan digelar pada 15 November 2025.'
  },
  {
    judul: 'Pameran Figurine PUNICO',
    isi: 'Pameran koleksi figurine karakter anime langka akan diadakan di Aula Kampus pada 20 Desember 2025.'
  },
  {
    judul: 'Lomba Karaoke Anime OST',
    isi: 'Lomba karaoke khusus lagu-lagu anime favorit akan diselenggarakan pada 12 Februari 2026.'
  },
  {
    judul: 'PUNICO Game Night',
    isi: 'Malam game bersama anggota PUNICO dengan turnamen Genshin Impact dan Valorant pada 1 Maret 2026.'
  },
  {
    judul: 'Donasi untuk Komunitas Pecinta Anime',
    isi: 'PUNICO menggalang dana untuk membantu anak-anak yang ingin belajar seni menggambar anime. Program ini dibuka sepanjang tahun 2025–2026.'
  }
];


function renderBerita() {
  beritaList.innerHTML = contohBerita.map(item => `
    <div class="berita-item">
      <h3>${item.judul}</h3>
      <p>${item.isi}</p>
    </div>
  `).join('');
}

renderBerita();

// ===== LOGIN =====
const submitLogin = document.getElementById('submitLogin');

if (submitLogin) {
  submitLogin.addEventListener('click', () => {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    if (user === 'admin' && pass === 'punico123') {
      localStorage.setItem('isAdmin', 'true');
      window.location.href = 'admin.html';  // arahkan ke admin panel
    } else {
      alert('Username / Password salah!');
    }
  });
}

// ===== CEK AKSES ADMIN =====
if (window.location.pathname.includes('admin.html')) {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  if (!isAdmin) {
    alert('Anda harus login dulu!');
    window.location.href = 'login.html';
  }
}

// ===== LOGOUT =====
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('isAdmin');
    window.location.href = 'index.html';
  });
}

// ===== DATA BERITA =====
let daftarBerita = JSON.parse(localStorage.getItem('berita')) ||  [
  {
    judul: 'Punico Matsuri',
    isi: 'Punico Matsuri akan diadakan pada 5 Januari 2026. Diharapkan kepada seluruh anggota untuk bersiap-siap dengan cosplay terbaik!'
  },
  {
    judul: 'Workshop Manga Digital',
    isi: 'Pelatihan menggambar manga secara digital dengan software Clip Studio akan digelar pada 15 November 2025.'
  },
  {
    judul: 'Pameran Figurine PUNICO',
    isi: 'Pameran koleksi figurine karakter anime langka akan diadakan di Aula Kampus pada 20 Desember 2025.'
  },
  {
    judul: 'Lomba Karaoke Anime OST',
    isi: 'Lomba karaoke khusus lagu-lagu anime favorit akan diselenggarakan pada 12 Februari 2026.'
  },
  {
    judul: 'PUNICO Game Night',
    isi: 'Malam game bersama anggota PUNICO dengan turnamen Genshin Impact dan Valorant pada 1 Maret 2026.'
  },
  {
    judul: 'Donasi untuk Komunitas Pecinta Anime',
    isi: 'PUNICO menggalang dana untuk membantu anak-anak yang ingin belajar seni menggambar anime. Program ini dibuka sepanjang tahun 2025–2026.'
  }
];

// ===== RENDER BERITA DI HALAMAN UTAMA =====
const beritaList1 = document.getElementById('beritaList');
if (beritaList) renderBeritaPengunjung();

function renderBeritaPengunjung() {
  beritaList.innerHTML = '';
  daftarBerita.forEach(b => {
    const div = document.createElement('div');
    div.className = 'berita-item';
    div.innerHTML = `<h4>${b.judul}</h4><p>${b.isi}</p>`;
    beritaList.appendChild(div);
  });
}

// ===== RENDER BERITA DI ADMIN =====
const beritaAdminList = document.getElementById('beritaAdminList');
if (beritaAdminList) renderBeritaAdmin();

function renderBeritaAdmin() {
  beritaAdminList.innerHTML = '';
  daftarBerita.forEach((b, i) => {
    const div = document.createElement('div');
    div.className = 'berita-item';
    div.innerHTML = `
      <h4>${b.judul}</h4>
      <p>${b.isi}</p>
      <button onclick="hapusBerita(${i})">Hapus</button>
    `;
    beritaAdminList.appendChild(div);
  });
}

function hapusBerita(index) {
  daftarBerita.splice(index, 1);
  renderBeritaAdmin();
}

// ===== TAMBAH BERITA DI ADMIN =====
const tambahBeritaBtn = document.getElementById('tambahBeritaBtn');
if (tambahBeritaBtn) {
  tambahBeritaBtn.addEventListener('click', () => {
    const judul = document.getElementById('judulBerita').value.trim();
    const isi = document.getElementById('isiBerita').value.trim();
    if (judul && isi) {
      daftarBerita.push({ judul, isi });
      renderBeritaAdmin();
      document.getElementById('judulBerita').value = '';
      document.getElementById('isiBerita').value = '';
    }
  });
}

// ===== SAVE PERUBAHAN =====
const saveChanges = document.getElementById('saveChanges');
if (saveChanges) {
  saveChanges.addEventListener('click', () => {
    localStorage.setItem('berita', JSON.stringify(daftarBerita));
    alert('Perubahan disimpan!');
  });
}

// ===== GAMBAR TERBANG DI KIRI DAN KANAN =====
const leftLayer = document.querySelector('.floating-layer.left');
const rightLayer = document.querySelector('.floating-layer.right');

// daftar gambar yang ingin ditampilkan
const imageSources = [
  'images/hexagon.png',
  'images/pentagon.png',
  'images/triangle.png',
  'images/logo.png'
];

// fungsi untuk membuat gambar terbang
function createFloatingImage(layer) {
  const img = document.createElement('img');
  img.src = imageSources[Math.floor(Math.random() * imageSources.length)];
  img.classList.add('floating-img');

  // posisi horizontal acak di dalam lapisan (supaya tak selalu di tengah)
  img.style.left = Math.random() * 60 + 'px';

  // ukuran acak
  const scale = 0.5 + Math.random() * 0.8;
  img.style.width = 40 * scale + 20 + 'px';

  // animasi durasi acak
  img.style.animationDuration = 8 + Math.random() * 6 + 's';

  layer.appendChild(img);

  // hapus setelah animasi selesai agar tidak memenuhi DOM
  setTimeout(() => img.remove(), 15000);
}

// buat gambar terus muncul tiap beberapa detik
setInterval(() => createFloatingImage(leftLayer), 1500);
setInterval(() => createFloatingImage(rightLayer), 2000);

// Animasi fade-in-up saat scroll
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-in-up");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
});

// ===== FILTER AKTIVITAS =====
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("categorySelect");
  const frames = document.querySelectorAll(".activity-frame");

  select.addEventListener("change", () => {
    const value = select.value;

    frames.forEach(frame => {
      if (value === "all") {
        frame.style.display = "block";
      } else {
        // tampilkan hanya frame yang URL src-nya mengandung value yang dipilih
        if (frame.getAttribute("src").includes(value)) {
          frame.style.display = "block";
        } else {
          frame.style.display = "none";
        }
      }
    });
  });
});
document.getElementById('activityFilter').addEventListener('change', function() {
  const iframe = document.getElementById('activityFrame');
  if (this.value === 'show-all') {
    iframe.src = 'activities/show-all.html';  // bisa buat khusus untuk tampil semua
  } else {
    iframe.src = this.value;
  }
});

