function openDaftarPopup() {
  document.getElementById('daftar-container').style.display = 'flex';
  document.getElementById('login-container').style.display = 'none';
  document.body.classList.add('popup-open');
  document.getElementById('overly').style.display = 'block';
  document.getElementById('overlay').style.display = 'none';
  var navbarLinks = document.querySelectorAll('.navbar a');
  navbarLinks.forEach(function (link) {
    link.style.pointerEvents = 'none';
  });
}

function closeDaftarPopup() {
  document.getElementById('daftar-container').style.display = 'none';
  document.body.classList.remove('popup-open');
  document.getElementById('overly').style.display = 'none';
  var navbarLinks = document.querySelectorAll('.navbar a');
  navbarLinks.forEach(function (link) {
    link.style.pointerEvents = 'auto';
  });
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
