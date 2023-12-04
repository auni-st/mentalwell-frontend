const urlParams = new URLSearchParams(window.location.search);
const counselingId = urlParams.get('id')

const patientProfile = document.getElementById('patientProfile');
const biodataPasien = document.querySelector('.biodata-pasien');
const tanggalKonseling = document.querySelector('.tanggal-konseling');
const deskripsiKonseling = document.querySelector('.deskripsi-konseling');
const harapanPasien = document.querySelector('.harapan-pasien');
const statusDropdown = document.getElementById('statusDropdown');
const statusKonseling = document.querySelector('.status-konseling')
const btnSimpan = document.getElementById('btnSimpan');

if (btnSimpan) {
  btnSimpan.addEventListener('click', () => {
    window.location.href = 'https://mentalwell.vercel.app/dashboardpsikolog';
    // window.location.href = 'http://localhost:5501/src/templates/aturkonseling.html';
  });
}

const authToken = sessionStorage.getItem('authToken')
fetch(`https://mentalwell-backend.vercel.app/dashboard/counseling/${counselingId}`, {
  headers: {
    'Authorization': `Bearer ${authToken}`,
  },
})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      console.error('Failed to fetch')
      throw new Error('Failed to fetch')
    }
  })
  .then(counselingDetails => {
    const patientDetails = counselingDetails[0];
    patientProfile.src = `${patientDetails.profile_image}`
    biodataPasien.innerHTML = `
        <h2>${patientDetails.full_name}</h2>
        <p>Nama Panggilan: ${patientDetails.nickname}</p>
        <p>Tanggal Lahir: ${patientDetails.birthdate}</p>
        <p>Jenis Kelamin: ${patientDetails.gender}</p>
        <p>Nomor Telepon: ${patientDetails.phone_number}</p>
        <p>Pekerjaan: ${patientDetails.occupation}</p>
    `;
    tanggalKonseling.innerHTML = `
        <p>${patientDetails.schedule_date}</p>
        <p>${patientDetails.schedule_time}</p>
        <p>Via ${patientDetails.type}</p>
      `;
    deskripsiKonseling.innerHTML = `
        <h3>Deskripsi Masalah</h3>
        <p>${patientDetails.problem_description}</p>
      `;
    harapanPasien.innerHTML = `
        <h3>Harapan Setelah Konseling</h3>
        <p>${patientDetails.hope_after}</p>
      `;
    const selectedStatus = patientDetails.status.toLowerCase(); // assuming status is "Selesai" or "Belum Selesai"
    statusDropdown.value = selectedStatus;
  })
  .catch(error => {
    console.error('Error fetching details:', error)
  })

statusDropdown.addEventListener('change', () => {
  const newStatus = statusDropdown.value;

  // Update the status using the backend API
  fetch(`https://mentalwell-backend.vercel.app/dashboard/counseling/${counselingId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newStatus: newStatus,
    }),
  })
    .then(response => {
      if (response.ok) {
        console.log('Status Konseling Berhasil Diubah!');
        alert('status changed!')
      } else {
        console.error('Failed to update status');
        throw new Error('Failed to update status.');
      }
    })
    .catch(error => {
      console.error('Error updating status:', error);
    });
});

// const btnSimpan = document.getElementById('btnSimpan');

// if (btnSimpan) {
//   btnSimpan.addEventListener('click', () => {
//     // window.location.href = 'https://mentalwell.vercel.app/dashboardpsikolog';
//     window.location.href = 'http://localhost:5501/src/templates/aturkonseling.html';
//   });
// }