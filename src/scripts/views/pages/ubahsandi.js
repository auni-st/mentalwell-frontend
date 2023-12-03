const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

if (!token) {
  console.error(`Token doesn't exist`);
  alert('Password reset link invalid');
}

const ubahsandiForm = document.getElementById('ubahsandi-form');

ubahsandiForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const newPassword = document.getElementById('sandibaru').value;
  const newPasswordConfirmation = document.getElementById('konfirmasi').value;

  const formData = {
    newPassword,
    newPasswordConfirmation,
  };

  try {
    const response = await fetch(`https://mentalwell-backend.vercel.app/reset-password/${token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Password reset successful. You can login now');

      window.location.href = 'https://mentalwell.vercel.app/'
      
    } else {
      const responseData = await response.json();
      const errorMessage = responseData.message || 'Error occured';
      alert(`Password reset failed: ${errorMessage}`)
    }

  } catch (error) {
    console.error('Password reset error:', error);
    alert('Error during password reset. Try again')
  }
})