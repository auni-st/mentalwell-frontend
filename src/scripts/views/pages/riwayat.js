const authToken = sessionStorage.getItem('authToken');
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
        // Tidak ada data riwayat
        const noDataElement = document.createElement('p');
        noDataElement.textContent = 'Tidak ada riwayat konseling.';
        containerRiwayat.appendChild(noDataElement);
      } else {
        // Menampilkan data riwayat
        data.forEach(riwayat => {
          const riwayatElement = document.createElement('div');
          riwayatElement.classList.add('container-riwayat');

          riwayatElement.innerHTML = `
            <img src="/src/public/beranda/man.png" alt="Foto Psikolog" id="psychologPhoto" />
            <div class="info-riwayat">
              <div class="info-text">
                <p>
                  ${riwayat.psychologist_name}<br />
                  ${riwayat.schedule_date}<br />
                  ${riwayat.schedule_time}<br />
                  Via ${riwayat.type}
                </p>
              </div>
              <div class="status-button">
                <span class="status-riwayat">${riwayat.status}</span>
                <button type="button" onclick="openUlasanPopup()">ISI ULASAN</button>
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
