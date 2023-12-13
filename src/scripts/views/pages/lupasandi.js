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
      Swal.fire({
        title: 'Berhasil Mengirim Email!',
        text: 'Tautan untuk Mengubah Kata Sandi Telah Dikirim ke Email Anda!',
        icon: 'success',
        timer: 2000, 
        showConfirmButton: false, 
      });

    } else {
      const responseData = await response.json();
      const errorMessage = responseData.message || 'Error occurred';
      alert(`Request failed: ${errorMessage}`)
      await Swal.fire({
        title: 'Gagal Mengirim Email!',
        text: 'Silahkan Coba Lagi',
        icon: 'error',
        showConfirmButton: true,
      });

    }
  } catch (error) {
    console.error('Error during reset password:', error);
    await Swal.fire({
      title: 'Gagal Mengirim Email!',
      text: 'Silahkan Coba Lagi',
      icon: 'error',
      showConfirmButton: true,
    });
  }
})