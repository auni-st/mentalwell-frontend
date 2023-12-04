const authToken = sessionStorage.getItem('authToken')

const statusDropdown = document.getElementById('statusDropdown2')
const tableBody = document.querySelector('tbody');

const redirectToCounselingDetail = (counselingId) => {
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
      // window.location.href = `http://localhost:5501/src/templates/aturkonseling.html?id=${counselingDetails[0].id}`
      window.location.href = `http://mentalwell.vercel.app/aturkonseling?id=${counselingDetails[0].id}`
    })
    .catch(error => {
      console.error('Error fetching details:', error)
    })
}

statusDropdown.addEventListener('change', () => {
  const selectedValue = statusDropdown.value;

  fetch('https://mentalwell-backend.vercel.app/counselings/psychologist', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newAvailability: selectedValue }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update availability');
      }
      return response.json();
    })
    .then(data => {
      alert('Availibility updated! : ', data)
      console.log('Availibility updated:', data)
    })
    .catch(error => {
      console.error('Error update availability:', error)
    })
})

tableBody.addEventListener('click', (event) => {
  // const targetRow = event.target.closest('tr');
  const isIcon = event.target.tagName === 'IMG' && event.target.alt === 'tulis';

  // console.log(targetRow)
  console.log(isIcon)

  const counselingId = event.target.closest('tr').querySelector('img').getAttribute('data-counseling-id');  ;
  console.log(counselingId)

  if(counselingId) {
    redirectToCounselingDetail(counselingId);
  }
})

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
      if (data.psychologistAvailability === 'not_available') {
        statusDropdown.value = 'unavailable';
      } else {
        statusDropdown.value = 'available';
      }

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
        actionImage.alt = 'tulis';
        actionImage.setAttribute('data-counseling-id', `${counseling.id}`)
        actionCell.appendChild(actionImage);
      })
    })
    .catch(error => {
      console.error('Error during data fetching:', error);
    });
} catch (error) {
  console.error('Error during data fetching:', error);
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
}

