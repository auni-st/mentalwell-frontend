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

const daftarForm = document.getElementById('daftar-form');

daftarForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const notelp = document.getElementById('notelp').value;
  const password = document.getElementById('passworddaftar').value;
  const confirmPassword = document.getElementById('confpassword').value;

  if (password !== confirmPassword){
    alert('Password and Confirm Password must match!');
    return;
  }

  const formData = {
    email,
    password,
    password_confirm: confirmPassword,
    phone_number: notelp,
  };

  try {
    const response = await fetch('https://mentalwell-backend.vercel.app/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Registration successful!')
    } else {
      const responseData = await response.json();
      alert(`Registration failed: ${responseData.message}`);
    }
  } catch (error) {
    console.error('Error during registration:', error);
    alert('Register failed. Please try again.')
  }
})