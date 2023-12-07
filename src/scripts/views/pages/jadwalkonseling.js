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
    const counselingData = await fetchCounselingData();
    // console.log(counselingData)

    const fullNameInput = document.querySelector('input[placeholder="Nama Lengkap"]');
    const nicknameInput = document.querySelector('input[placeholder="Nama Panggilan"]');
    const birthdateInput = document.querySelector('input[placeholder="01-02-2023"]');
    const genderInput = document.querySelector('input[placeholder="laki-Laki"]');
    const phoneNumberInput = document.querySelector('input[placeholder="08123456789"]');
    const occupationInput = document.querySelector('input[placeholder="Pekerjaan"]');

    // Populate form fields with counseling data
    fullNameInput.value = counselingData.users.name;
    nicknameInput.value = counselingData.users.nickname;
    birthdateInput.value = counselingData.users.birthdate;
    genderInput.value = counselingData.users.gender;
    phoneNumberInput.value = counselingData.users.phone_number;
    occupationInput.value = ''; // Assuming this field should be empty, as it is not present in the example response

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

function selectDate() {
  const selectedDate = document.getElementById('tanggalInput').value;

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
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });

    if (result.isConfirmed) {
      // User clicked "Yes," proceed with sending data
      const response = await fetch(`https://mentalwell-backend.vercel.app/counselings/psychologists/${currentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(counselingDataStorage),
      });

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