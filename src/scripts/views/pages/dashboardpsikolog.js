const authToken = sessionStorage.getItem('authToken')

if (!authToken) {
  console.error('authToken missing');
  return;
}

try {
  fetch('https://mentalwell-backend.vercel.app/dashboard/psychologist', {
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        console.error('Failed to fetch')
        throw new Error('Failed to fetch data from the backend.')
      }
    })
    .then(data => {
      const tableBody = document.querySelector('tbody');
      tableBody.innerHTML = '';

      data.counselingList.forEach(counseling => {
        const row = tableBody.insertRow();

        const nameCell = row.insertCell(0);
        const dateCell = row.insertCell(1);
        const timeCell = row.insertCell(2);
        const typeCell = row.insertCell(3);
        const statusCell = row.insertCell(4);
        const actionCell = row.insertCell(5);

        nameCell.textContent = counseling.patientName;
        dateCell.textContent = formatDate(counseling.scheduleDate);
        timeCell.textContent = counseling.scheduleTime;
        typeCell.textContent = counseling.type;
        statusCell.textContent = counseling.status;

        const actionImage = document.createElement('img');
        actionImage.src = '/src/public/dashboard/tulis.png';
        actionImage.alt = 'tambah';
        actionCell.appendChild(actionImage);
      })
    })
    .catch(error => {
      console.error('Error during data fetching:', error);
    });
} catch (error) {
  console.error('Error during data fetching:', error);
}