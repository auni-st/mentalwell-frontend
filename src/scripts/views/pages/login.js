function openLoginPopup() {
  document.getElementById('login-container').style.display = 'flex';
  document.getElementById('daftar-container').style.display = 'none';
  document.body.classList.add('popup-open');
  document.getElementById('overlay').style.display = 'block';
  var navbarLinks = document.querySelectorAll('.navbar a');
  navbarLinks.forEach(function (link) {
    link.style.pointerEvents = 'none';
  });
}

function closeLoginPopup() {
  document.getElementById('login-container').style.display = 'none';
  document.body.classList.remove('popup-open');
  document.getElementById('overlay').style.display = 'none';
  var navbarLinks = document.querySelectorAll('.navbar a');
  navbarLinks.forEach(function (link) {
    link.style.pointerEvents = 'auto';
  });
}

function authenticate(event) {
  event.preventDefault(); // Prevent the default form submission for this example
  // Add your authentication logic here
  alert('Authentication logic goes here!');
}

function redirectToList() {
  window.location.href = '/listpsikolog';
}

function redirectToDetailPsychologist() {
  window.location.href = '/profilpsikolog';
}

function togglePasswordVisibility() {
  const passwordInput = document.getElementById('password');
  const toggleIcon = document.querySelector('.form-control i');

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
