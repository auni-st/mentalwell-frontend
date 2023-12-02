const articleSection = document.getElementById('container-rekomendasi');

const apiUrl = 'https://mentalwell-backend.vercel.app/psychologists_index';

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((articleData) => {
      const articleElement = document.createElement('div');
      articleElement.classList.add('content-rekomendasi');

      articleElement.innerHTML = `
                <div class="rekomendasi-image">
                <img src="${articleData.profile_image}" alt="gambar orang" />
                </div>
                <h2 class="nama-psikolog">${articleData.name}</h2>
                <div class="btn-detail">
                    <button type="button" onclick="redirectToDetailPsychologist()">
                    Lihat Detail
                    </button>
                </div>
            `;

      articleSection.appendChild(articleElement);
    });
  })
  .catch((error) => console.error('Error fetching data from API:', error));

function redirectToDetail() {
  window.location.href = '/profilpsikolog';
}


