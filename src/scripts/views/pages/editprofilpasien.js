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

  // Get the updated values from the form
  const name = document.getElementById('namalengkap').value;
  const nickname = document.getElementById('namapanggilan').value;
  const phone_number = document.getElementById('nowa').value;
  const birthdate = document.getElementById('tgllahir').value;
  const gender = document.getElementById('gender').value;

  // Send the updated data to the backend using the PUT method
  const response = await fetch('https://mentalwell-backend.vercel.app/patient', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      nickname,
      phone_number,
      birthdate,
      gender,
    }),
  });

  // Handle the response from the backend (you can customize this based on your needs)
  if (response.ok) {
    alert('Profile updated successfully!');
  } else {
    const errorMessage = await response.text();
    alert(`Failed to update profile. Error: ${errorMessage}`);
  }
});
