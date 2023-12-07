const authToken = sessionStorage.getItem('authToken');

function openUlasanPopup() {
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
  fetch('https://mentalwell-backend.vercel.app/history/counselings/38', {
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
      console.log('Review submitted successfully:', data);
    })
    .catch(error => console.error('Error submitting review:', error))
    .finally(() => {
      closeUlasanPopup();
    });
}

document.querySelector('.content-ulasan').addEventListener('submit', function (event) {
  event.preventDefault();
  const ulasan = document.getElementById('ulasan').value;

  submitUlasan(ulasan);
});
