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

  document.getElementById('profil-image').innerHTML = `<img src="${patientData.users.profile_image}">
  <i class="fas fa-edit edit-icon" id="editProfileImage"></i>
  `

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

form.addEventListener('submit', async function (event) {
  event.preventDefault();
  const newName = document.getElementById('namalengkap').value;
  const newNickname = document.getElementById('namapanggilan').value;
  const newPhone_number = document.getElementById('nowa').value;
  const newBirthdate = document.getElementById('tgllahir').value;
  const newGender = document.getElementById('gender').value;

  const response = await fetch('https://mentalwell-backend.vercel.app/patient', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      newName: newName,
      newNickname: newNickname,
      newPhone_number: newPhone_number,
      newBirthdate: newBirthdate,
      newGender: newGender,
    }),
  });

  if (response.ok) {
    console.log(response)
    // alert('Profile updated successfully!');
  } else {
    const errorMessage = await response.text();
    alert(`Failed to update profile. Error: ${errorMessage}`);
  }
});
