const articleSection = document.getElementById('container-rekomendasi');

const apiUrl = 'https://mentalwell-backend.vercel.app/psychologists_index';
const loadingIndicator = document.getElementById('loading-indicator');

loadingIndicator.style.display = 'block';

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    loadingIndicator.style.display = 'none';

    data.forEach((articleData) => {
      const articleElement = document.createElement('div');
      articleElement.classList.add('content-rekomendasi');

      articleElement.innerHTML = `
                <div class="rekomendasi-image">
                <img src="${articleData.profile_image}" alt="gambar orang" />
                </div>
                <h2 class="nama-psikolog">${articleData.name}</h2>
                <div class="btn-detail">
                    <button type="button" onclick="redirectToDetailPsychologist('${articleData.id}')">
                    Lihat Detail
                    </button>
                </div>
            `;

      articleSection.appendChild(articleElement);
    });
  })
  .catch((error) => {
    console.error('Error fetching data from API:', error)
    loadingIndicator.style.display = 'none';
  });

function redirectToDetailPsychologist(id) {
  window.location.href = `/profilpsikolog?id=${id}`;
}

const logosContainer2 = document.querySelector(".logos-2");
const originalLogosContainer2 = document.querySelector(".logos-2");
const clone2 = originalLogosContainer2.cloneNode(true);
originalLogosContainer2.parentNode.insertBefore(clone2, originalLogosContainer2.nextSibling);

let scrollAmount2 = 0;
const scrollSpeed2 = 2;

function scroll2() {
  scrollAmount2 += scrollSpeed2;
  originalLogosContainer2.scrollLeft = scrollAmount2;

  if (scrollAmount2 >= originalLogosContainer2.scrollWidth - originalLogosContainer2.clientWidth) {
    scrollAmount2 = 0;
  }

  requestAnimationFrame(scroll2);
}

scroll2();
