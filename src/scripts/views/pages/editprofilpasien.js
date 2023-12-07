const authToken = sessionStorage.getItem('authToken');

function getPatientProfile() {
  fetch('https://mentalwell-backend.vercel.app/patient', {
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
      displayPatientProfile(data);
    })
    .catch(error => console.error('Error fetching patient profile:', error));
}

function displayPatientProfile(patientData) {
  document.querySelector('.editpasien-container h3').innerText = patientData.users.name;
  document.querySelector('.editpasien-form #email h4').innerText = patientData.users.email;
  document.getElementById('namapanggilan').value = patientData.users.nickname;
  document.getElementById('nowa').value = patientData.users.phone_number;
  document.getElementById('tgllahir').value = patientData.users.birthdate;
  document.getElementById('gender').value = patientData.users.gender;
}

function editPatientProfile(formData) {
  fetch('https://mentalwell-backend.vercel.app/patient', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${authToken}`
    },
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to edit patient profile. Status: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log('Patient profile edited successfully:', data);
    })
    .catch(error => console.error('Error editing patient profile:', error));
}

getPatientProfile();

const editIcon = document.querySelector('.fa-edit');
editIcon.addEventListener('click', function () {
  document.getElementById('namapanggilan').readOnly = false;
  document.getElementById('nowa').readOnly = false;
});

document.querySelector('.editpasien-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(this);

  editPatientProfile(formData);
});
