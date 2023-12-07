async function fetchConfirmedCounselingData() {
  try {
    const token = sessionStorage.getItem('authToken'); // Replace with your actual Bearer token

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

    // Reference to the HTML element where data will be populated
    const valueContainer = document.querySelector('.value');

    // Populate HTML elements with received data
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
  // Replace 'index.html' with your actual index page file
  window.location.href = `http://localhost:5501/src/templates/index.html`;
  // window.location.href = `https://mentalwell.vercel.app/`;
}

function convertDateFormat(inputDate) {
  // Parse the input date string
  const parsedDate = new Date(inputDate);

  // Check if the parsed date is valid
  if (isNaN(parsedDate.getTime())) {
    return 'Invalid date';
  }

  // Define an array of day names in Indonesian
  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  // Extract day, month, and year components
  const dayOfWeek = dayNames[parsedDate.getDay()];
  const dayOfMonth = parsedDate.getDate();
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April',
    'Mei', 'Juni', 'Juli', 'Agustus',
    'September', 'Oktober', 'November', 'Desember'
  ];
  const month = monthNames[parsedDate.getMonth()];
  const year = parsedDate.getFullYear();

  // Assemble the formatted date string
  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;

  return formattedDate;
}

function convertTimeFormat(inputTime) {
  // Split the input time into start and end times
  const [startTime, endTime] = inputTime.split('-');

  // Split the start and end times into hours and minutes
  const [startHours, startMinutes] = startTime.split(':');
  const [endHours, endMinutes] = endTime.split(':');

  // Format the time strings with dots and spaces
  const formattedStartTime = `${startHours}.${startMinutes}`;
  const formattedEndTime = `${endHours}.${endMinutes}`;

  // Assemble the final formatted time string
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
      return method; // If the method is not recognized, return the original
  }
}

populateHTMLWithData();