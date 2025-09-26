const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', () => {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Demo login sederhana
  if (username === 'admin' && password === 'punico123') {
    alert('Login berhasil! Anda akan diarahkan ke halaman utama dengan akses admin.');
    // Pada implementasi nyata, gunakan session atau token
    window.location.href = 'index.html?admin=true';
  } else {
    alert('Username atau password salah!');
  }
});
