function openLoginPopup() {
  document.getElementById('login-container').style.display = 'flex';
  document.getElementById('daftar-container').style.display = 'none';
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('overly').style.display = 'none';
  var navbarLinks = document.getElementById('masuk');
  navbarLinks.style.pointerEvents ='none';
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

function redirectToDetailPsychologist() {
  window.location.href = '/profilpsikolog';
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

      sessionStorage.setItem('authToken', token);

      setTimeout(() => {
        alert('Login successful!');

        if (userRole === 'patient') {
          // window.location.href = 'http://localhost:5501/src/templates/index.html';

          window.location.href = 'https://mentalwell.vercel.app/';
        } else if (userRole === 'psychologist') {

          // window.location.href = 'http://localhost:5501/src/templates/dashboardpsikolog.html';
          window.location.href = 'https://mentalwell.vercel.app/dashboardpsikolog';
        } else {
          window.location.href = 'https://mentalwell.vercel.app/'
        }

        // Redirect to the specified URL
        // window.location.href = 'https://mentalwell.vercel.app/';
      }, 100);
    } else {
      const responseData = await response.json();
      const errorMessage = responseData.message || 'Error!'
      alert(`Login failed: ${errorMessage}`);
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('Login failed. Please try again');
  }
})