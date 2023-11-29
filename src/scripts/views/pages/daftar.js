function openDaftarPopup() {
    document.getElementById('daftar-container').style.display = 'flex';
    document.body.classList.add('popup-open');
    document.getElementById('overlay').style.display = 'block';
    var navbarLinks = document.querySelectorAll('.navbar a');
    navbarLinks.forEach(function (link) {
      link.style.pointerEvents = 'none';
    });
  }
  
  function closeDaftarPopup() {
    document.getElementById('daftar-container').style.display = 'none';
    document.body.classList.remove('popup-open');
    document.getElementById('overlay').style.display = 'none';
    var navbarLinks = document.querySelectorAll('.navbar a');
    navbarLinks.forEach(function (link) {
      link.style.pointerEvents = 'auto';
    });
  }