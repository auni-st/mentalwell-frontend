const lupasandiForm = document.getElementById('lupasandi-form')

lupasandiForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;

  const formData = {
    email,
  };

  try {
    const response = await fetch('https://mentalwell-backend.vercel.app/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const responseData = await response.json();
      alert(`Password reset link has been sent!`);

      //redirect user to reset-password page

    } else {
      const responseData = await response.json();
      const errorMessage = responseData.message || 'Error occurred';
      alert(`Request failed: ${errorMessage}`)
    }
  } catch (error) {
    console.error('Error during reset password:', error);
    alert('Error. Please try again')
  }
})