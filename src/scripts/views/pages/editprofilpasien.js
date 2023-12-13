const token = sessionStorage.getItem('authToken');
const editIcon = document.getElementById('editIcon');
const form = document.querySelector('.editpasien-form');

document.addEventListener('DOMContentLoaded', async function () {
  // Fetch patient data from the backend with authorization
  const response = await fetch('https://mentalwell-backend.vercel.app/patient', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const patientData = await response.json();

  document.getElementById('profileimage').innerHTML = `
    <div id="imagePreviewContainer">
      <img src="${patientData.users.profile_image}" id="gambar">
    </div>
    <label for="inputImage" class="inputImage">Ubah Gambar</label>
    <input type="file" id="inputImage" onchange="previewImage(event)">
  `;

  // Update email
  document.getElementById('email').innerHTML = `<h4>${patientData.users.email}</h4>`;

  // Update name
  document.getElementById('namalengkap').value = patientData.users.name;

  // Update nickname
  document.getElementById('namapanggilan').value = patientData.users.nickname;

  // Update phone number
  document.getElementById('nowa').value = patientData.users.phone_number;

  // Update birthdate
  document.getElementById('tgllahir').value = patientData.users.birthdate;

  // Update gender
  document.getElementById('gender').value = patientData.users.gender;
});

function previewImage(event) {
  const inputImage = event.target;
  const imagePreview = document.getElementById('gambar');
  const imagePreviewContainer = document.getElementById('imagePreviewContainer');

  if (inputImage.files && inputImage.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreviewContainer.style.display = 'block';
    };

    reader.readAsDataURL(inputImage.files[0]);
  } else {
    imagePreview.src = '';
    imagePreviewContainer.style.display = 'none';
  }
}

form.addEventListener('submit', async function (event) {
  event.preventDefault();
  const newName = document.getElementById('namalengkap').value;
  const newNickname = document.getElementById('namapanggilan').value;
  const newPhone_number = document.getElementById('nowa').value;
  const newBirthdate = document.getElementById('tgllahir').value;
  const newGender = document.getElementById('gender').value;
  const image = document.getElementById('inputImage').files[0];
  const formData = new FormData();

  formData.append('newName', newName);
  formData.append('newNickname', newNickname);
  formData.append('newPhone_number', newPhone_number);
  formData.append('newBirthdate', newBirthdate);
  formData.append('newGender', newGender);
  formData.append('profile_image', image);

  Swal.fire({
    title: 'Memuat...',
    text: 'Harap tunggu sejenak. Profil anda akan segera berubah. ',
    allowOutsideClick: false,
    showCancelButton: false,
    showConfirmButton: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });

  const response = await fetch('https://mentalwell-backend.vercel.app/patient', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (response.ok) {
    Swal.close();

    Swal.fire({
      title: 'Profil Berhasil Diubah',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
    });
    location.reload();
  } else {
    const errorMessage = await response.text();
    Swal.fire({
      title: 'Gagal!',
      text: 'Profil Gagal Diubah, Format Gambar Harus .JPG',
      icon: 'error',
      showConfirmButton: true,
    });
  }
});
