const articleSection = document.getElementById('container-psikolog');

const apiUrl = 'https://mentalwell-backend.vercel.app/psychologists';

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((articleData) => {
      const articleElement = document.createElement('div');
      articleElement.classList.add("content-psikolog")
      articleElement.innerHTML = `
                    <img class="image-psikolog" src="${articleData.profile_image}" alt="man" />
                    <div class="data-psikolog">
                        <h2>${articleData.name}</h2>
                        <div class="value-psikolog">
                            <p>${articleData.experience}</p>
                        <i class="far fa-envelope"></i>
                            <p class="ulasan">${articleData.counselings.review.count}</p>
                        </div>
                        <div class="list-button-psikolog">
                            <div class="jadwal-hijau">
                                <p>${articleData.availability}</p>
                            </div>
                            <div class="button-psikolog">
                                <button type="button" onclick="redirectToDetailPsychologist()">Lihat Selengkapnya</button>
                            </div>
                        </div>
                    </div>
                `;
      articleSection.appendChild(articleElement);
    });
  })
  .catch((error) => console.error('Error fetching data from API:', error));

