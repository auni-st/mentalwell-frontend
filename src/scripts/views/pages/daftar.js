function openDaftarPopup() {
  document.getElementById('daftar-container').style.display = 'flex';
  document.getElementById('login-container').style.display = 'none';
  document.getElementById('overly').style.display = 'block';
  document.getElementById('overlay').style.display = 'none';
  var navbarLinks = document.getElementById('masuk');
  navbarLinks.style.pointerEvents = 'none';
}

function closeDaftarPopup() {
  document.getElementById('daftar-container').style.display = 'none';
  document.getElementById('overly').style.display = 'none';
  var navbarLinks = document.getElementById('masuk');
  navbarLinks.style.pointerEvents = 'auto';
}

document.getElementById('popupDaftar').addEventListener('click', function (event) {
  event.preventDefault(); // Mencegah tautan mengarahkan ke URL yang sebenarnya
  showPopup();
});

function togglePasswordVisibility() {
  const passwordInput = document.getElementById('passworddaftar');
  const toggleIcon = document.querySelector('.daftar-form .form-control i');

  // Mengubah tipe input dan ikon berdasarkan status input
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon.classList.remove('far', 'fa-eye-slash');
    toggleIcon.classList.add('far', 'fa-eye');
  } else {
    passwordInput.type = 'password';
    toggleIcon.classList.remove('far', 'fa-eye');
    toggleIcon.classList.add('far', 'fa-eye-slash');
  }
}

function toggleConfirmasiPasswordVisibility() {
  const passwordInput = document.getElementById('confpassword');
  const toggleIcon = document.querySelector('.daftar-form .form-control .confpassword');

  // Mengubah tipe input dan ikon berdasarkan status input
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon.classList.remove('far', 'fa-eye-slash');
    toggleIcon.classList.add('far', 'fa-eye');
  } else {
    passwordInput.type = 'password';
    toggleIcon.classList.remove('far', 'fa-eye');
    toggleIcon.classList.add('far', 'fa-eye-slash');
  }
}

const daftarForm = document.getElementById('daftar-form');

daftarForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const notelp = document.getElementById('notelp').value;
  const password = document.getElementById('passworddaftar').value;
  const confirmPassword = document.getElementById('confpassword').value;

  // if (password !== confirmPassword) {
  //   Swal.fire({
  //     title: 'Gagal!',
  //     text: 'Kata Sandi dan Konfirmasi Kata Sandi Harus Sama!',
  //     icon: 'error',
  //     showConfirmButton: true,
  //   });
  //   return;
  // }

  const formData = {
    email,
    password,
    password_confirm: confirmPassword,
    phone_number: notelp,
  };

  Swal.fire({
    title: 'Memuat...',
    allowOutsideClick: false,
    showCancelButton: false,
    showConfirmButton: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const response = await fetch('https://mentalwell-backend.vercel.app/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      Swal.close();

      Swal.fire({
        title: 'Daftar Akun Berhasil!',
        icon: 'success',
        showConfirmButton: true,
      }).then(() => {
        // window.location.href = "http://localhost:5501/src/templates/index.html"
        window.location.href = 'https://mentalwell.vercel.app/';
        event.preventDefault();
      });
    } else {
      const responseData = await response.json();
      Swal.fire({
        title: 'Daftar Akun Gagal!',
        text: error,
        icon: 'error',
        showConfirmButton: true,
      });
    }
  } catch (error) {
    console.error('Error during registration:', error);
    Swal.fire({
      title: 'Daftar Akun Gagal!',
      text: 'Harap isi data dengan benar!',
      icon: 'error',
      showConfirmButton: true,
    });
  }
})

function validateForm() {
  var notelp = document.getElementById("notelp").value;
  var password = document.getElementById("passworddaftar").value;
  var confirmPassword = document.getElementById("confpassword").value;

  setTimeout(function () {
    if (notelp.length >= 14) {
      Swal.fire({
        title: 'Gagal Daftar!',
        text: 'Nomor Whatsapp paling panjang 14 angka!',
        icon: 'error',
        showConfirmButton: true,
      });
      return false;
    }
  }, 2000);

  setTimeout(function () {
    if (!isValidPassword(password)) {
      setTimeout(function () {
        Swal.fire({
          title: 'Gagal Daftar!',
          text: 'Kata Sandi harus paling sedikit 8 karakter dengan setidaknya 1 angka!',
          icon: 'error',
          showConfirmButton: true,
        });
      });
      return false;
    }
  }, 2000);

  setTimeout(function () {
    if (password !== confirmPassword) {
      Swal.fire({
        title: 'Gagal Daftar!',
        text: 'Kata Sandi dan Konfirmasi Kata Sandi Harus Sama!',
        icon: 'error',
        showConfirmButton: true,
      });
    }
  }, 2000);

  return true;
}

function isValidPassword(password) {
  return password.length >= 8 && /\d/.test(password);
}