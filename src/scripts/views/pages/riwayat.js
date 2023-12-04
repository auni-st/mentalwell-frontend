const authToken = sessionStorage.getItem('authToken');
const contentRiwayat = document.querySelector('.content-riwayat');

try {
  fetch('https://mentalwell-backend.vercel.app/history', {
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('Failed to fetch');
        throw new Error('Failed to fetch data from the backend.');
      }
    })
    .then(data => {
      contentRiwayat.innerHTML = '';

      data.forEach(history => {
        const containerRiwayat = document.createElement('div');
        containerRiwayat.classList.add('container-riwayat');

        const psychologPhoto = document.createElement('img');
        psychologPhoto.src = '/src/public/beranda/man.png';
        psychologPhoto.alt = 'Foto Psikolog';

        const infoRiwayat = document.createElement('div');
        infoRiwayat.classList.add('info-riwayat');

        const infoText = document.createElement('div');
        infoText.classList.add('info-text');

        const pInfo = document.createElement('p');
        pInfo.innerHTML = `<strong>${history.psychologist_name}</strong><br />
          ${history.schedule_date}<br />
          ${history.schedule_time}<br />
          Via ${history.type}`;

        infoText.appendChild(pInfo);

        const statusButton = document.createElement('div');
        statusButton.classList.add('status-button');

        const statusRiwayat = document.createElement('span');
        statusRiwayat.classList.add('status-riwayat');
        statusRiwayat.textContent = history.status;

        const buttonRiwayat = document.createElement('button');
        buttonRiwayat.type = 'button';
        buttonRiwayat.textContent = history.status === 'Selesai' ? 'ISI ULASAN' : 'Belum Selesai';

        statusButton.appendChild(statusRiwayat);
        statusButton.appendChild(buttonRiwayat);

        infoRiwayat.appendChild(infoText);
        infoRiwayat.appendChild(statusButton);

        containerRiwayat.appendChild(psychologPhoto);
        containerRiwayat.appendChild(infoRiwayat);

        contentRiwayat.appendChild(containerRiwayat);

        buttonRiwayat.addEventListener('click', function () {
          if (history.status === 'Selesai') {
            // Implement logic to open ulasan popup or navigate to ulasan page
            console.log('Redirect to ulasan page or open ulasan popup for counseling id:', history.id);
          } else {
            // Implement logic for handling counseling that is not yet completed
            console.log('Handle counseling that is not yet completed for id:', history.id);
          }
        });
      });
    })
    .catch(error => {
      console.error('Error during data fetching:', error);
    });
} catch (error) {
  console.error('Error during data fetching:', error);
}
