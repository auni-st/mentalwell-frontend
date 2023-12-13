// const authToken = sessionStorage.getItem('authToken');
const containerRiwayat = document.querySelector('.content-riwayat');

fetch('https://mentalwell-backend.vercel.app/history', {
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
    if (data && Array.isArray(data)) {
      if (data.length === 0) {
        const noDataElement = document.createElement('p');
        noDataElement.textContent = 'Tidak ada riwayat konseling.';
        containerRiwayat.appendChild(noDataElement);
      } else {
        data.forEach(riwayat => {
          const riwayatElement = document.createElement('div');
          riwayatElement.classList.add('container-riwayat');

          const isReviewFilled = riwayat.review !== null;
          const scheduleDateString = riwayat.schedule_date;
          const scheduleDate = new Date(scheduleDateString);
          const optionsSchedule = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

          const formattedScheduleDate = scheduleDate.toLocaleDateString('id-ID', optionsSchedule)

          let formattedType;

          if (riwayat.type == "chat") {
            formattedType = "Chat"
          } else if (riwayat.type == "call") {
            formattedType = "Call"
          } else if (riwayat.type == "video_call") {
            formattedType = "Video Call"
          }

          let formattedStatus;

          if (riwayat.status == "belum_selesai") {
            formattedStatus = "Belum Selesai"
          } else if (riwayat.status == "selesai") {
            formattedStatus = "Selesai"
          }

          let formattedScheduleTime;

          if (riwayat.schedule_time == "13:00-14:00") {
            formattedScheduleTime = "13.00 - 14.00"
          } else if (riwayat.schedule_time == "16:00-17:00") {
            formattedScheduleTime = "16.00 - 17.00"
          } else if (riwayat.schedule_time == "19:30-20:30") {
            formattedScheduleTime = "19.30 - 20.30"
          }

          riwayatElement.innerHTML = `
            <img src="${riwayat.profile_image}" alt="Foto Psikolog" id="psychologPhoto" />
            <div class="info-riwayat">
              <div class="info-text">
                <p>
                  ${riwayat.psychologist_name}<br />
                  ${formattedScheduleDate}<br />
                  ${formattedScheduleTime} WIB<br />
                  Via ${formattedType}
                </p>
                </div>
                <div class="status-button">
                  <span class="status-riwayat">${formattedStatus}</span>
                  <button type="button" data-counseling-id="${riwayat.id}" onclick="openUlasanPopup(${riwayat.id}, '${riwayat.status}')"
                    ${riwayat.status === 'belum_selesai' || isReviewFilled ? 'disabled' : ''}
                    style="${(riwayat.status === 'belum_selesai' || isReviewFilled) ? 'background-color: lightgray; color: gray; cursor: default' : ''}">
                    ${isReviewFilled ? 'ULASAN TERISI' : 'ISI ULASAN'}
                  </button>
                </div>
              </div>
          `;

          containerRiwayat.appendChild(riwayatElement);
        });
      }
    } else {
      console.error('Invalid data format received from the server.');
    }
  })
  .catch(error => console.error('Error fetching data from API:', error));
