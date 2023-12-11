const articleSection = document.getElementById('container-psikolog');
const loadingIndicator = document.getElementById('loading-indicator');
const apiUrl = 'https://mentalwell-backend.vercel.app/psychologists';

loadingIndicator.style.display = 'block';

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    loadingIndicator.style.display = 'none';
    data.forEach((articleData) => {
      const articleElement = document.createElement('div');
      articleElement.classList.add('content-psikolog');

      let formattedExperience
      if (articleData.experience == "<2_tahun") {
        formattedExperience = "< 2 tahun"
      } else if (articleData.experience == "2-4_tahun") {
        formattedExperience = "2-4 tahun"

      } else if (articleData.experience == ">4_tahun") {
        formattedExperience = "> 4 tahun"
      }
      

      let formattedketersediaan;
      if (articleData.availability === 'available') {
        formattedketersediaan = "Tersedia";
      } else {
        formattedketersediaan = "Tidak Tersedia";
      }
      
      articleElement.innerHTML = `
                    <img class="image-psikolog" src="${articleData.profile_image}" alt="man" />
                    <div class="data-psikolog">
                        <h2>${articleData.name}</h2>
                        <div class="value-psikolog">
                            <p>Pengalaman Kerja ${formattedExperience}</p>
                            <i class="fa-solid fa-comments"></i>
                            <p class="ulasan">${articleData.counselings.review.count}</p>
                        </div>
                        <div class="list-button-psikolog">
                            <div class="${articleData.availability === 'available' ? 'jadwal-hijau' : 'jadwal-merah'}">
                                <p>${formattedketersediaan}</p>
                            </div>
                            <div class="button-psikolog">
                                <button type="button" onclick="redirectToDetailPsychologist('${articleData.id}')">Lihat Selengkapnya</button>
                            </div>
                        </div>
                    </div>
                `;
      articleSection.appendChild(articleElement);
    });
  })
  .catch((error) => {
    console.error('Error fetching data from API:', error);
    loadingIndicator.style.display = 'none';
  });

function redirectToDetailPsychologist(id) {
  window.location.href = `/profilpsikolog?id=${id}`;
}
