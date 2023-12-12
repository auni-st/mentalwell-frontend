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

  //Update profile_image
  document.getElementById('profileimage').innerHTML = `<img src="${psychologistData.profile_image}">
  <i class="fas fa-edit edit-icon" id="editProfileImage"></i>
  `;

  // Update email
  document.getElementById('email').innerHTML = `<h4>${psychologistData.email}</h4>`;

  // Update name
  document.getElementById('namapanggilan').value = psychologistData.name;

  // Update phone number
  document.getElementById('nowa').value = psychologistData.phone_number;

  // Update birthdate
  document.getElementById('tgllahir').value = psychologistData.birthdate;

  // Update gender
  document.getElementById('gender').value = psychologistData.gender;

  // Update bio
  document.getElementById('bio').value = psychologistData.bio;

  // Update experience
  document.getElementById('pengalaman').value = psychologistData.experience;

  // Update topics
  const topics = psychologistData.topics;
  const checkboxGroup = document.querySelectorAll('input[name="topik"]');

  // topics.forEach((topic) => {
  //   document.querySelector(`input[value="${topic}"]`).checked = true;
  // });

  topics.forEach((topic) => {
    // Cek apakah nilai topik ada dalam checkboxGroup
    const matchingCheckbox = Array.from(checkboxGroup).find((checkbox) => checkbox.value === topic);
  
    if (matchingCheckbox) {
      matchingCheckbox.checked = true;
    }
  });
});

// const fileInput = document.getElementById('fileInput');
const editImageIcon = document.getElementById('editProfileImage');

editImageIcon.addEventListener('click', function () {
  fileInput.click();
});

// fileInput.addEventListener('change', function () {
//   const file = fileInput.files[0];
//   if (file) {
//     uploadProfileImage(file);
//   }
// });

// async function uploadProfileImage(file) {
//   const formData = new FormData();
//   formData.append('profileImage', file);

//   const response = await fetch('https://mentalwell-backend.vercel.app/psychologist', {
//     method: 'PUT',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     body: formData,
//   });

//   if (response.ok) {
//     const psychologistData = await response.json();
//     document.getElementById('profileimage').innerHTML = `<img src="${psychologistData.profile_image}" alt="Profile Image">
//       <i class="fas fa-edit edit-icon" id="editProfileImage"></i>`;
//     alert('Profile image updated successfully!');
//   } else {
//     const errorMessage = await response.text();
//     alert(`Failed to update profile image. Error: ${errorMessage}`);
//   }
// }

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const newName = document.getElementById('namapanggilan').value;
  const newPhone_number = document.getElementById('nowa').value;
  const newBirthdate = document.getElementById('tgllahir').value;
  const newGender = document.getElementById('gender').value;
  const newBio = document.getElementById('bio').value;
  const newExperience = document.getElementById('pengalaman').value;

  const newTopics = [];
  document.querySelectorAll('input[name="topik"]:checked').forEach((checkbox) => {
    newTopics.push(checkbox.value);
  });

  const response = await fetch('https://mentalwell-backend.vercel.app/psychologist', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      newName: newName,
      newPhone_number: newPhone_number,
      newBirthdate: newBirthdate,
      newGender: newGender,
      newBio: newBio,
      newExperience: newExperience,
      newTopics: newTopics,
    }),
  });

  if (response.ok) {
    console.log(response);
    // alert('Profile updated successfully!');
  } else {
    const errorMessage = await response.text();
    alert(`Failed to update profile. Error: ${errorMessage}`);
  }
});
