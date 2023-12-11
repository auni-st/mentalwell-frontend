const token = sessionStorage.getItem('authToken');
const editProfileImageIcon = document.getElementById('editProfileImage');
const form = document.querySelector('.editpsikolog-form');

document.addEventListener('DOMContentLoaded', async function () {
  // Fetch psychologist data from the backend with authorization
  const response = await fetch('https://mentalwell-backend.vercel.app/psychologist', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const psychologistData = await response.json();

  // Update email
  document.getElementById('email').innerHTML = `<h4>${psychologistData.users.email}</h4>`;

  // Update name
  document.getElementById('namapanggilan').value = psychologistData.users.name;

  // Update phone number
  document.getElementById('nowa').value = psychologistData.users.phone_number;

  // Update birthdate
  document.getElementById('tgllahir').value = psychologistData.users.birthdate;

  // Update gender
  document.getElementById('gender').value = psychologistData.users.gender;

  // Update bio
  document.getElementById('bio').value = psychologistData.bio;

  // Update experience
  document.getElementById('pengalaman').value = psychologistData.experience;

  // Update topics
  const topics = psychologistData.topics;
  topics.forEach((topic) => {
    document.querySelector(`input[value="${topic}"]`).checked = true;
  });
});

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
