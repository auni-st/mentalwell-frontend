const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('search-psikolog');
const contentArticle = document.getElementById('container-psikolog');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();

  // Jika input pencarian tidak kosong, ambil data sesuai dengan kata kunci
  if (searchTerm !== '') {
    const apiUrl = `https://mentalwell-backend.vercel.app/psychologists?name=${encodeURIComponent(searchTerm)}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        contentArticle.innerHTML = '';

        data.forEach((articleData) => {
          const articleElement = document.createElement('div');
          articleElement.classList.add('content-psikolog');
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
                                <div class="${articleData.availability === 'available' ? 'jadwal-hijau' : 'jadwal-merah'}">
                                  <p>${articleData.availability}</p>
                                </div>
                                <div class="button-psikolog">
                                    <button type="button" onclick="redirectToDetailPsychologist()">Lihat Selengkapnya</button>
                                </div>
                            </div>
                        </div>
                    `;
          contentArticle.appendChild(articleElement);
        });
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  } else {
    // Jika input pencarian kosong, tampilkan semua konten
    // Implementasikan kembali logika untuk menampilkan semua konten
    // Sama seperti ketika halaman pertama dimuat
    fetch('https://mentalwell-backend.vercel.app/psychologists')
      .then((response) => response.json())
      .then((data) => {
        contentArticle.innerHTML = '';

        data.forEach((articleData) => {
          const articleElement = document.createElement('div');
          articleElement.classList.add('content-psikolog');
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
                            <div class="${articleData.availability === 'available' ? 'jadwal-hijau' : 'jadwal-merah'}">
                              <p>${articleData.availability}</p>
                            </div>
                            <div class="button-psikolog">
                                <button type="button" onclick="redirectToDetailPsychologist()">Lihat Selengkapnya</button>
                            </div>
                        </div>
                    </div>
                `;
          contentArticle.appendChild(articleElement);
        });
      })
      .catch((error) => {
        console.error('Error fetching all content:', error);
      });
  }
});
