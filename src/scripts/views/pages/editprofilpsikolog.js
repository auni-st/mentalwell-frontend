const token = sessionStorage.getItem('authToken');
const form = document.querySelector('.editpsikolog-form');

document.addEventListener('DOMContentLoaded', async function () {
  try {
    const response = await fetch('https://mentalwell-backend.vercel.app/psychologist/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch psychologist data. Status: ${response.status}`);
    }

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
    psychologistData.psychologists_topics.forEach((topic, index) => {
      document.getElementById(`topik${index + 1}`).checked = true;
    });
  } catch (error) {
    console.error('Error fetching psychologist data:', error);
  }
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
  const checkboxes = document.querySelectorAll('input[name="topik"]:checked');
  checkboxes.forEach((checkbox) => {
    newTopics.push(checkbox.value);
  });

  const formData = new FormData();
  formData.append('newName', newName);
  formData.append('newPhone_number', newPhone_number);
  formData.append('newBirthdate', newBirthdate);
  formData.append('newGender', newGender);
  formData.append('newTopics[]', newTopics.join(','));
  formData.append('newBio', newBio);
  formData.append('newExperience', newExperience);

  try {
    const response = await fetch('https://mentalwell-backend.vercel.app/psychologist', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      console.log(response);
    } else {
      const errorMessage = await response.text();
      alert(`Failed to update profile. Error: ${errorMessage}`);
    }
  } catch (error) {
    console.error('Error updating psychologist profile:', error);
  }
});
