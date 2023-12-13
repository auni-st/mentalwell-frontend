async function fetchCounselingData() {
  try {
    const articleId = new URLSearchParams(window.location.search).get('id');
    const token = sessionStorage.getItem('authToken')

    const response = await fetch(`https://mentalwell-backend.vercel.app/counselings/patient`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error("Something's wrong")
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching counseling data:', error);
    throw error;
  }
}

async function populateFormFields() {
  try {
    showLoadingIndicator();

    const counselingData = await fetchCounselingData();

    const fullNameInput = document.querySelector('input[placeholder="Nama Lengkap"]');
    const nicknameInput = document.querySelector('input[placeholder="Nama Panggilan"]');
    const birthdateInput = document.querySelector('input[placeholder="01-02-2023"]');
    const genderInput = document.querySelector('input[placeholder="laki-Laki"]');
    const phoneNumberInput = document.querySelector('input[placeholder="08123456789"]');

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const formattedBirthdate = new Date(counselingData.users.birthdate).toLocaleDateString('id-ID', options);

    let formattedGender;
    if (counselingData.users.gender == 'laki_laki') {
      formattedGender = 'Laki-laki';
    } else {
      formattedGender = 'Perempuan';
    }

    // Populate form fields with counseling data
    fullNameInput.value = counselingData.users.name || '';
    nicknameInput.value = counselingData.users.nickname || '';
    birthdateInput.value = formattedBirthdate || '';
    genderInput.value = formattedGender || '';
    phoneNumberInput.value = counselingData.users.phone_number || '';

    hideLoadingIndicator();

  } catch (error) {
    console.error('Error populating form fields:', error);
  }
}

populateFormFields();

let counselingData = {};

function saveDataToSessionStorage() {
  // Retrieve existing data from sessionStorage
  const existingDataString = sessionStorage.getItem('counselingData');
  const existingData = existingDataString ? JSON.parse(existingDataString) : {};

  // Merge existing data with new data
  const newData = { ...existingData, ...counselingData };

  // Save the merged data back to sessionStorage
  sessionStorage.setItem('counselingData', JSON.stringify(newData))
  // sessionStorage.setItem('counselingData', JSON.stringify(counselingData));
}

function getPsychologistIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

async function fetchPsychologistSchedule(psychologistId) {
  const url = `https://mentalwell-backend.vercel.app/schedule/psychologist/${psychologistId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    // Handle the error as needed
    return null;
  }
}

async function selectDate() {
  const selectedDate = document.getElementById('tanggalInput').value;

  // Extract psychologist ID from the URL
  const psychologistId = getPsychologistIdFromUrl();

  const scheduleData = await fetchPsychologistSchedule(psychologistId);

  if (scheduleData) {
    const conflicts = scheduleData.counselings.filter(counseling =>
      counseling.schedule_date === selectedDate && counseling.status === 'belum_selesai'
    );

    const timeOptions = document.querySelectorAll('.time');

    timeOptions.forEach(card => {
      card.disabled = false;
      card.classList.remove('disabled'); // Remove the class to reset their color
    });

    if (conflicts.length > 0) {

      conflicts.forEach(conflict => {
        const normalizedHtmlTime = normalizeTimeFormat(conflict.schedule_time).trim();

        const timeOptionsArray = Array.from(timeOptions);

        const conflictingButton = timeOptionsArray.find(card => {
          const normalizedCardTime = normalizeTimeFormat(card.innerText.trim());
          return normalizedCardTime.replace(/\s+/g, ' ') === normalizedHtmlTime && card.classList.contains('time');
        });


        if (conflictingButton) {
          conflictingButton.disabled = true;
          conflictingButton.classList.add('disabled');
        } else {
          console.warn('Button not found for schedule time:', normalizedHtmlTime);
        }

      });
    }
  }

  counselingData.schedule_date = selectedDate;
  saveDataToSessionStorage();
}

function selectTime(selectedCard) {
  // Get all card elements
  const timeOptions = document.querySelectorAll('.card');

  // Remove the 'selected' class from all cards
  timeOptions.forEach(card => {
    card.classList.remove('selected');
  });

  // Add the 'selected' class to the clicked card
  selectedCard.classList.add('selected');

  const selectedTime = selectedCard.innerText.trim();

  if (selectedTime === "13.00 - 14.00") {
    counselingData.schedule_time = "13:00-14:00";
  } else if (selectedTime === "16.00 - 17.00") {
    counselingData.schedule_time = "16:00-17:00";
  } else if (selectedTime === "19.30 - 20.30") {
    counselingData.schedule_time = "19:30-20:30";
  } else {
    // Handle other cases if needed
    counselingData.schedule_time = selectedTime; // Default to the original value
  }
}

function selectMethod(selectedCard) {
  // Get all method cards
  const methodCards = document.querySelectorAll('.metode .card');

  // Remove the 'selected' class from all method cards
  methodCards.forEach(card => {
    card.classList.remove('selected');
  });

  // Add the 'selected' class to the clicked method card
  selectedCard.classList.add('selected');

  const selectedMethod = selectedCard.innerText.trim();

  if (selectedMethod === "Chat") {
    counselingData.type = "chat";
  } else if (selectedMethod === "Call") {
    counselingData.type = "call";
  } else if (selectedMethod === "Video Call") {
    counselingData.type = "video_call";
  } else {
    // Handle other cases if needed
    counselingData.type = selectedMethod.toLowerCase(); // Default to the original value in lowercase
  }

  console.log(counselingData);

}

async function redirectToCounseling2() {
  const currentId = new URLSearchParams(window.location.search).get('id');
  const selectedDate = counselingData.schedule_date;
  const selectedTime = counselingData.schedule_time;
  const selectedMethod = counselingData.type;

  if (!selectedDate || !selectedTime || !selectedMethod) {
    alert('Please select date, time, and counseling method.');
    return;
  }

  saveDataToSessionStorage();

  const token = sessionStorage.getItem('authToken');
  const dataStorage = sessionStorage.getItem('counselingData');

  if (!token || !dataStorage) {
    console.error('Token or data storage is missing.');
    return;
  }

  // window.location.href = `http://localhost:5501/src/templates/jadwalkonseling-permasalahan.html?id=${currentId}`;
  window.location.href = `https://mentalwell.vercel.app/jadwalkonseling-permasalahan?id=${currentId}`;

}

async function sendCounselingData() {
  // Get the description and hope_after values from the textarea elements
  const description = document.getElementById('descriptionTextarea').value;
  const hopeAfter = document.getElementById('hopeAfterTextarea').value;

  counselingData.problem_description = description;
  counselingData.hope_after = hopeAfter;

  saveDataToSessionStorage();


  try {
    const currentId = new URLSearchParams(window.location.search).get('id');
    const token = sessionStorage.getItem('authToken');
    const counselingDataStorage = JSON.parse(sessionStorage.getItem('counselingData'));
    console.log(counselingDataStorage)

    const result = await Swal.fire({
      title: 'Konfirmasi',
      text: 'Apakah Anda Yakin untuk Mendaftar Konseling? Hal Ini Tidak Bisa Dibatalkan',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
    });

    if (result.isConfirmed) {

      Swal.fire({
        title: 'Memuat...',
        text: 'Harap tunggu sejenak. Jadwal akan segera dikonfirmasi. ',
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      // User clicked "Yes," proceed with sending data
      const response = await fetch(`https://mentalwell-backend.vercel.app/counselings/psychologists/${currentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(counselingDataStorage),
      });

      // Hide loading state
      Swal.close();

      // Replace this with your actual redirection logic
      // window.location.href = `http://localhost:5501/src/templates/jadwalkonseling-selesai.html?id=${currentId}`;
      window.location.href = `http://mentalwell.vercel.app/jadwalkonseling-selesai?id=${currentId}`;
      // console.log(counselingData);

      if (!response.ok) {
        throw new Error('Failed to send counseling data');
      }

      // If the data was sent successfully, you can redirect or perform other actions
    } else {
      // User clicked "No" or closed the confirmation dialog
      console.log('Sending canceled.');
    }
    // const response = await fetch(`https://mentalwell-backend.vercel.app/counselings/psychologists/${currentId}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`,
    //   },
    //   body: JSON.stringify(counselingDataStorage),
    // });

    if (!response.ok) {
      throw new Error('Failed to send counseling data');
    }

  } catch (error) {
    console.error('Error sending counseling data:', error);
  }
}

function normalizeTimeFormat(time) {
  // Replace colons with dots and add a single space (e.g., "13:00-14:00" to "13.00 - 14.00")
  return time.replace(/:/g, '.').replace('-', ' - ');
}

// Searching for normalized schedule time: 13.00 - 14.00
// Comparing to: 13.00  -  14.00

function showLoadingIndicator() {
  // Get loading indicator element and show it
  const loadingIndicator = document.getElementById('loading-indicator');
  loadingIndicator.style.display = 'block';
}

function hideLoadingIndicator() {
  // Hide loading indicator
  const loadingIndicator = document.getElementById('loading-indicator');
  loadingIndicator.style.display = 'none';
}


function confirmAndRedirect() {
  console.log(counselingData)

  // Use SweetAlert for confirmation

  // Swal.fire({
  //   title: 'Apakah Anda Yakin?',
  //   text: 'Do you want to proceed to the next step?',
  //   icon: 'warning',
  //   showCancelButton: true,
  //   confirmButtonText: 'Yes, proceed!',
  //   cancelButtonText: 'No, cancel!',
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     // User clicked "Yes"
  //     // redirectToCounseling3(); // Call the redirection function
  //   }
  //   // If the user clicked "No", no action is needed
  // });
}