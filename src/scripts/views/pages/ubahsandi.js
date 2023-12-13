const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

if (!token) {
  console.error(`Token doesn't exist`);
  Swal.fire({
    title: "Gagal!",
    text: "Tautan Ubah Kata Sandi Tidak Valid",
    icon: "error",
    showConfirmButton: true,
  });
}

const ubahsandiForm = document.getElementById("ubahsandi-form");

ubahsandiForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const newPassword = document.getElementById("sandibaru").value;
  const newPasswordConfirmation = document.getElementById("konfirmasi").value;

  const formData = {
    newPassword,
    newPasswordConfirmation,
  };

  try {
    const response = await fetch(
      `https://mentalwell-backend.vercel.app/reset-password/${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      Swal.fire({
        title: "Ubah Sandi Berhasil!",
        text: "Anda Bisa Masuk Sekarang",
        icon: "success",
        showConfirmButton: true,
      });

      window.location.href = "https://mentalwell.vercel.app/";
    } else {
      const responseData = await response.json();
      const errorMessage = responseData.message || "Error occured";
      Swal.fire({
        title: "Gagal!",
        text: `Ubah Sandi Gagal!`,
        icon: "error",
        showConfirmButton: true,
      });
    }
  } catch (error) {
    console.error("Password reset error:", error);
    alert("Error during password reset. Try again");
  }
});
