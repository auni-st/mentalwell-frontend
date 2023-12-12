const token = sessionStorage.getItem('authToken');
const editProfileImageIcon = document.getElementById('editProfileImage');
const form = document.querySelector('.editpsikolog-form');

document.addEventListener('DOMContentLoaded', async function () {
  // Fetch psychologist data from the backend with authorization
  const response = await fetch('https://mentalwell-backend.vercel.app/psychologist/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const psychologistData = await response.json();

  document.getElementById('profileimage').innerHTML = `
  <div id="imagePreviewContainer">
    <img src="${psychologistData.profile_image}" id="gambar">
  </div>
  <label for="inputImage" class="inputImage">Update Gambar</label>
  <input type="file" id="inputImage" onchange="previewImage(event)">
  `;

  document.getElementById('email').innerHTML = `<h4>${psychologistData.email}</h4>`;
  document.getElementById('namapanggilan').value = psychologistData.name;
  document.getElementById('nowa').value = psychologistData.phone_number;
  document.getElementById('tgllahir').value = psychologistData.birthdate;
  document.getElementById('gender').value = psychologistData.gender;
  document.getElementById('bio').value = psychologistData.bio;
  document.getElementById('pengalaman').value = psychologistData.experience;
  const expertiseCheckboxes = document.querySelectorAll('input[name="topik"]');
  const expertiseTopics = psychologistData.psychologists_topics || [];
  console.log(psychologistData);
  expertiseCheckboxes.forEach((checkbox) => {
    console.log(expertiseTopics.map((row) => row.topic_name));
    checkbox.checked = expertiseTopics.map((row) => row.topic_name).includes(checkbox.value);
  });
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

  const newName = document.getElementById('namapanggilan').value;
  const newPhone_number = document.getElementById('nowa').value;
  const newBirthdate = document.getElementById('tgllahir').value;
  const newGender = document.getElementById('gender').value;
  const newBio = document.getElementById('bio').value;
  const newExperience = document.getElementById('pengalaman').value;
  const image = document.getElementById('inputImage').files[0];
  const formData = new FormData();

  formData.append('newName', newName);
  formData.append('newPhone_number', newPhone_number);
  formData.append('newBirthdate', newBirthdate);
  formData.append('newGender', newGender);
  formData.append('newBio', newBio);
  formData.append('newExperience', newExperience);
  formData.append('profile_image', image);

  const response = await fetch('https://mentalwell-backend.vercel.app/psychologist', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (response.ok) {
    console.log(response);
  } else {
    const errorMessage = await response.text();
    alert(`Failed to update profile. Error: ${errorMessage}`);
  }
});
