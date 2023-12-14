const authToken = sessionStorage.getItem('authToken');

let currentCounselingId;

function openUlasanPopup(counselingId, status) {
  currentCounselingId = counselingId
  document.getElementById('container-ulasan').style.display = 'flex';
  document.getElementById('overlay').style.display = 'block';
  var navbarLinks = document.querySelectorAll('.navbar');
  navbarLinks.forEach(function (link) {
    link.style.pointerEvents = 'none';
  });
}

function closeUlasanPopup() {
  document.getElementById('container-ulasan').style.display = 'none';
  document.body.classList.remove('popup-open');
  document.getElementById('overlay').style.display = 'none';
  var navbarLinks = document.querySelectorAll('.navbar');
  navbarLinks.forEach(function (link) {
    link.style.pointerEvents = 'auto';
  });
}

function authenticate(event) {
  event.preventDefault();
  alert('Authentication logic goes here!');
}

function submitUlasan(ulasan) {
  Swal.fire({
    title: 'Memuat...',
    text: 'Harap tunggu sejenak. Ulasan akan segera dikirim',
    allowOutsideClick: false,
    showCancelButton: false,
    showConfirmButton: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });


  fetch(`https://mentalwell-backend.vercel.app/history/counselings/${currentCounselingId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ review: ulasan })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to submit review. Status: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      Swal.close();

      Swal.fire({
        title: 'Berhasil Membuat Ulasan!',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      });
      updateButtonAfterSubmission(currentCounselingId);
    })
    .catch(error => console.error('Error submitting review:', error))
    .finally(() => {
      closeUlasanPopup();
    });
}

function updateButtonAfterSubmission(counselingId) {
  const buttonElement = document.querySelector(`button[data-counseling-id="${counselingId}"]`);

  if (buttonElement) {
    // Disable the button
    buttonElement.disabled = true;

    // Change the color and text
    buttonElement.style.backgroundColor = 'lightgray';
    buttonElement.style.color = 'gray';
    buttonElement.textContent = 'ULASAN TERISI';
  }
}

document.querySelector('.content-ulasan').addEventListener('submit', function (event) {
  event.preventDefault();
  const ulasan = document.getElementById('ulasan').value;

  submitUlasan(ulasan);
});
