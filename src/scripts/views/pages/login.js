function openLoginPopup() {
  document.getElementById('login-container').style.display = 'flex';
  document.getElementById('daftar-container').style.display = 'none';
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('overly').style.display = 'none';
  var navbarLinks = document.getElementById('masuk');
  navbarLinks.style.pointerEvents = 'none';
}

function closeLoginPopup() {
  document.getElementById('login-container').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
  var navbarLinks = document.getElementById('masuk');
  navbarLinks.style.pointerEvents = 'auto';
}

function authenticate(event) {
  event.preventDefault(); // Prevent the default form submission for this example
  // Add your authentication logic here
  alert('Authentication logic goes here!');
}

function redirectToList() {
  window.location.href = '/listpsikolog';
}


function togglePasswordLoginVisibility() {
  const passwordInput = document.getElementById('loginpassword');
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

// import Swal from 'sweetalert2';

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const emaillogin = document.getElementById('emaillogin').value;
  const password = document.getElementById('loginpassword').value;

  const formData = {
    email: emaillogin,
    password,
  };

  try {
    const response = await fetch('https://mentalwell-backend.vercel.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {

      const responseData = await response.json();
      const token = responseData.data.token;
      const userRole = responseData.data.role;
      const userName = responseData.data.name;

      sessionStorage.setItem('authToken', token);

      setTimeout(async () => {
        // Display success message
        await Swal.fire({
          title: 'Anda Berhasil Masuk!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });

        // Check if it's the first time login as a patient
        if (userName === null && userRole === 'patient') {
          const result = await Swal.fire({
            title: "Selamat Datang!",
            text: "Sepertinya ini pertama kalinya anda masuk. Ayo isi profilmu!",
            icon: 'info',
            showConfirmButton: true,
          });
          if (result.isConfirmed) {
            // Redirect to the edit profile page
            window.location.href = 'http://localhost:5501/src/templates/editprofilpasien.html';
            // or use the production URL
            // window.location.href = 'https://mentalwell.vercel.app/editprofilpasien';
          }
        } else if (userName === null && userRole === 'psychologist') {
          const result = await Swal.fire({
            title: "Selamat Datang!",
            text: "Sepertinya ini pertama kalinya anda masuk. Ayo isi profilmu!",
            icon: 'info',
            showConfirmButton: true,
          });
          if (result.isConfirmed) {
            // Redirect to the edit profile page
            window.location.href = 'http://localhost:5501/src/templates/editprofilpsikolog.html';
            // or use the production URL
            // window.location.href = 'https://mentalwell.vercel.app/editprofilpasien';
          }
        } else if (userRole === 'patient') {
          // Handle patient login
          window.location.href = 'http://localhost:5501/src/templates/index.html';
          // window.location.href = 'https://mentalwell.vercel.app/';
        } else if (userRole === 'psychologist') {
          // Handle psychologist login
          window.location.href = 'http://localhost:5501/src/templates/dashboardpsikolog.html';
          // window.location.href = 'https://mentalwell.vercel.app/dashboardpsikolog';
        } else {
          // Handle other cases
          window.location.href = 'https://mentalwell.vercel.app/';
        }
      }, 100);
    } else {
      const responseData = await response.json();
      const errorMessage = responseData.message || 'Error!'
      await Swal.fire({
        title: 'Gagal Masuk!',
        text: 'Email atau Kata Sandi Salah!',
        icon: 'error',
        showConfirmButton: true,
      });
    }
  } catch (error) {
    console.error('Error during login:', error);
    await Swal.fire({
      title: 'Gagal Masuk!',
      text: 'Silahkan Coba Lagi',
      icon: 'error',
      showConfirmButton: true,
    });
  }
})