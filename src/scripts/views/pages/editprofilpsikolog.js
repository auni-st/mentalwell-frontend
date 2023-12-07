const authToken = sessionStorage.getItem('authToken');

function getPsychologistProfile() {
  fetch('https://mentalwell-backend.vercel.app/psychologist/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data. Status: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      displayPsychologistProfile(data);
    })
    .catch(error => console.error('Error fetching psychologist profile:', error));
}

function displayPsychologistProfile(psychologistData) {
  document.getElementById('namapanggilan').innerText = psychologistData.name;  
  document.getElementById('email').innerText = psychologistData.email;  
  document.getElementById('nowa').value = psychologistData.phone_number;
  document.getElementById('tgllahir').value = psychologistData.birthdate;
  document.getElementById('gender').value = psychologistData.gender;
  document.getElementById('bio').value = psychologistData.bio;
  document.getElementById('topik').value = psychologistData.psychologists_topic;
  document.getElementById('pengalaman').value = psychologistData.experience;
}

function editPsychologistProfile(formData) {
  fetch('https://mentalwell-backend.vercel.app/psychologist', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${authToken}`
    },
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to edit psychologist profile. Status: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log('Psychologist profile edited successfully:', data);
    })
    .catch(error => console.error('Error editing psychologist profile:', error));
}

getPsychologistProfile();

const editIcon = document.querySelector('.fa-edit');
editIcon.addEventListener('click', function () {
  document.getElementById('namapanggilan').contentEditable = true;  
  document.getElementById('nowa').readOnly = false;
  document.getElementById('bio').readOnly = false;
  document.getElementById('topik').readOnly = false;
});

document.querySelector('.editpsikolog-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(this);

  editPsychologistProfile(formData);
});
