const urlParams = new URLSearchParams(window.location.search);
const counselingId = urlParams.get('id')
const loadingIndicator = document.getElementById('loading-indicator');

const patientProfile = document.getElementById('patientProfile');
const biodataPasien = document.querySelector('.biodata-pasien');
const tanggalKonseling = document.querySelector('.tanggal-konseling');
const deskripsiKonseling = document.querySelector('.deskripsi-konseling');
const harapanPasien = document.querySelector('.harapan-pasien');
const statusDropdown = document.getElementById('statusDropdown');
const statusKonseling = document.querySelector('.status-konseling')
const btnSimpan = document.getElementById('btnSimpan');

loadingIndicator.style.display = 'block';

if (btnSimpan) {
  btnSimpan.addEventListener('click', () => {
    window.location.href = 'https://mentalwell.vercel.app/dashboardpsikolog';
    // window.location.href = 'http://localhost:5501/src/templates/dashboardpsikolog.html';
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
    loadingIndicator.style.display = 'none';
    const patientDetails = counselingDetails[0];
    const birthdateString = patientDetails.birthdate;
    const birthdate = new Date(birthdateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedBirthdate = birthdate.toLocaleDateString('id-ID', options);

    const scheduleDateString = patientDetails.schedule_date;
    const scheduleDate = new Date(scheduleDateString);
    const optionsSchedule = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const formattedScheduleDate = scheduleDate.toLocaleDateString('id-ID', optionsSchedule)

    const backendValues = {
      call: 'Call',
      video_call: 'Video Call',
      chat: 'Chat',
      laki_laki: 'Laki-laki',
      perempuan: 'Perempuan'
    };

    const backendType = patientDetails.type;
    const backendGender = patientDetails.gender;
    const displayTextType = backendValues[backendType]
    const displayTextGender = backendValues[backendGender]

    patientProfile.src = `${patientDetails.profile_image}`
    biodataPasien.innerHTML = `
        <h2>${patientDetails.full_name}</h2>
        <p>Nama Panggilan: ${patientDetails.nickname}</p>
        <p>Tanggal Lahir: ${formattedBirthdate}</p>
        <p>Jenis Kelamin: ${displayTextGender}</p>
        <p>Nomor WhatsApp: ${patientDetails.phone_number}</p>
    `;
    tanggalKonseling.innerHTML = `
        <p>${formattedScheduleDate}</p>
        <p>${patientDetails.schedule_time}</p>
        <p>Via ${displayTextType}</p>
      `;
    deskripsiKonseling.innerHTML = `
        <h3>Deskripsi Masalah</h3>
        <p>${patientDetails.problem_description}</p>
      `;
    harapanPasien.innerHTML = `
        <h3>Harapan Setelah Konseling</h3>
        <p>${patientDetails.hope_after}</p>
      `;
    const selectedStatus = patientDetails.status.toLowerCase();
    statusDropdown.value = selectedStatus;
  })
  .catch(error => {
    console.error('Error fetching details:', error)
    loadingIndicator.style.display = 'none';
  })

statusDropdown.addEventListener('change', () => {
  const newStatus = statusDropdown.value;

  Swal.fire({
    title: 'Memuat...',
    text: 'Harap tunggu sejenak. Status konseling akan segera berubah ',
    allowOutsideClick: false,
    showCancelButton: false,
    showConfirmButton: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });

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
        Swal.close();

        Swal.fire({
          title: 'Status Konseling Berhasil Diubah!',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        });

      } else {
        console.error('Failed to update status');
        throw new Error('Failed to update status.');
      }
    })
    .catch(error => {
      console.error('Error updating status:', error);
    });
});

