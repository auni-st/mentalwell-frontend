const authToken = sessionStorage.getItem('authToken');
const editIcon = document.getElementById('editIcon');

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
  document.querySelector('.editpasien-container h3').innerText = patientData.full_name;
  document.querySelector('.editpasien-form #email h4').innerText = patientData.email;
  document.getElementById('namalengkap').value = patientData.full_name;
  document.getElementById('namapanggilan').value = patientData.nickname;
  document.getElementById('nowa').value = patientData.phone_number;
  document.getElementById('tgllahir').value = patientData.birthdate;
  document.getElementById('gender').value = patientData.gender;

  document.getElementById('namalengkap').readOnly = true;
  document.getElementById('email').readOnly = true;

  editIcon.addEventListener('click', function () {
    document.getElementById('namalengkap').readOnly = false;
    document.getElementById('namapanggilan').readOnly = false;
    document.getElementById('nowa').readOnly = false;
    document.getElementById('tgllahir').readOnly = false;
    document.getElementById('gender').readOnly = false;
  });
}

function editPatientProfile(formData) {
  fetch('https://mentalwell-backend.vercel.app/patient', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      full_name: formData.get('namalengkap'),
      nickname: formData.get('namapanggilan'),
      phone_number: formData.get('nowa'),
      birthdate: formData.get('tgllahir'),
      gender: formData.get('gender')
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to edit patient profile. Status: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log('Patient profile edited successfully:', data);
      displayPatientProfile(data);
    })
    .catch(error => console.error('Error editing patient profile:', error));
}

getPatientProfile();

document.querySelector('.editpasien-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(this);

  document.getElementById('namalengkap').readOnly = true;
  document.getElementById('namapanggilan').readOnly = true;
  document.getElementById('nowa').readOnly = true;
  document.getElementById('tgllahir').readOnly = true;
  document.getElementById('gender').readOnly = true;

  editPatientProfile(formData);
});
