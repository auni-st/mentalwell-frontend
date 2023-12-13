async function fetchConfirmedCounselingData() {
  try {
    const token = sessionStorage.getItem('authToken');

    const response = await fetch('https://mentalwell-backend.vercel.app/confirmedCounseling', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch confirmed counseling data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching confirmed counseling data:', error);
    throw error;
  }
}

async function populateHTMLWithData() {
  try {
    const confirmedCounselingData = await fetchConfirmedCounselingData();

    const valueContainer = document.querySelector('.value');

    valueContainer.innerHTML = `
      <p>${confirmedCounselingData.full_name}</p>
      <p>${confirmedCounselingData.nickname}</p>
      <p>${confirmedCounselingData.phone_number}</p>
      <p>${convertDateFormat(confirmedCounselingData.schedule_date)}</p>
      <p>${convertTimeFormat(confirmedCounselingData.schedule_time)}</p>
      <p>${convertMethodName(confirmedCounselingData.type)}</p>
    `;
  } catch (error) {
    console.error('Error populating HTML with data:', error);
  }
}

function redirectToIndex() {
  // window.location.href = `http://localhost:5501/src/templates/index.html`;
  window.location.href = `https://mentalwell.vercel.app/`;
}

function convertDateFormat(inputDate) {
  const parsedDate = new Date(inputDate);

  if (isNaN(parsedDate.getTime())) {
    return 'Invalid date';
  }

  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const dayOfWeek = dayNames[parsedDate.getDay()];
  const dayOfMonth = parsedDate.getDate();
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April',
    'Mei', 'Juni', 'Juli', 'Agustus',
    'September', 'Oktober', 'November', 'Desember'
  ];
  const month = monthNames[parsedDate.getMonth()];
  const year = parsedDate.getFullYear();

  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;

  return formattedDate;
}

function convertTimeFormat(inputTime) {
  const [startTime, endTime] = inputTime.split('-');

  const [startHours, startMinutes] = startTime.split(':');
  const [endHours, endMinutes] = endTime.split(':');

  const formattedStartTime = `${startHours}.${startMinutes}`;
  const formattedEndTime = `${endHours}.${endMinutes}`;

  const formattedTime = `${formattedStartTime} - ${formattedEndTime}`;

  return formattedTime;
}

function convertMethodName(method) {
  switch (method.toLowerCase()) {
    case 'chat':
      return 'Chat';
    case 'call':
      return 'Call';
    case 'video_call':
      return 'Video Call';
    default:
      return method; 
  }
}

populateHTMLWithData();