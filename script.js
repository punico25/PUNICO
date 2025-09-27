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

const animations = [
  'fade-in',
  'slide-left',
  'slide-right',
  'zoom-in',
  'door-open'
];

let currentIndex = 0;

// Tampilkan gambar awal
hero.style.backgroundImage = `url('${images[currentIndex]}')`;
hero.classList.add('fade-in');

// Fungsi ganti background dengan animasi acak
function changeBackground() {
  // Hitung index gambar berikut
  currentIndex = (currentIndex + 1) % images.length;

  // Pilih animasi acak
  const randomAnim = animations[Math.floor(Math.random() * animations.length)];

  // Hapus semua animasi dulu
  hero.classList.remove(...animations);

  // Ganti gambar
  hero.style.backgroundImage = `url('${images[currentIndex]}')`;

  // Tambahkan animasi
  // Timeout kecil agar class re-trigger (mencegah tidak animasi jika sama)
  setTimeout(() => {
    hero.classList.add(randomAnim);
  }, 10);
}

// Ganti gambar setiap 5 detik
setInterval(changeBackground, 5000);

    // set footer year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Optional: if you want auto-refresh or load more, add here.

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

