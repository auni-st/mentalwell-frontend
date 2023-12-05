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

      setTimeout(() => {
        // alert('Login successful!');
        Swal.fire({
          title: 'Hello world!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
        // Swal({

        //   title: "Berhasil!",

        //   text: "Pop-up berhasil ditampilkan",

        //   icon: "success",

        //   button: true

        // });
        // Swal.fire({
        //   title: 'Anda Berhasil Masuk!',
        //   icon: 'success',
        //   timer: 2000, // Set the timer to close the alert after 2000 milliseconds (2 seconds)
        //   showConfirmButton: false, // Hide the "OK" button
        // });

        if (userName === null && userRole === 'patient') {
          alert("it seems like it's your first time logged in as User. Let's edit your profile!");
          // window.location.href = 'http://localhost:5501/src/templates/editprofilpasien.html';
          window.location.href = 'https://mentalwell.vercel.app/editprofilpasien';
        } else if (userName === null && userRole === 'psychologist') {
          alert("it seems like it's your first time logged in as User. Let's edit your profile!");
          // window.location.href = 'http://localhost:5501/src/templates/editprofilpsikolog.html';
          window.location.href = 'https://mentalwell.vercel.app/editprofilpsikolog';
        } else if (userRole === 'patient') {
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