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
  event.preventDefault(); // Prevent the default form submission for this example
  // Add your authentication logic here
  alert('Authentication logic goes here!');
}
