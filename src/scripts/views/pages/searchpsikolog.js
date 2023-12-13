document.addEventListener('DOMContentLoaded', function () {
  let checkboxes = document.querySelectorAll('.filter-checkbox');
  let contentArticle = document.getElementById('container-psikolog');
  let searchForm = document.getElementById('searchForm');
  let searchInput = document.getElementById('search-psikolog');

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('click', function () {
      let checkedValues = Array.from(checkboxes)
        .filter((chk) => chk.checked)
        .map((chk) => chk.value);

      let searchValue = searchInput.value.trim();

      if (checkedValues.length > 0 || searchValue !== '') {
        let backendURL = 'https://mentalwell-backend.vercel.app/psychologists';
        let queryParams = [];

        if (checkedValues.length > 0) {
          queryParams.push(`topics=${encodeURIComponent(checkedValues.join(','))}`);
        }

        if (searchValue !== '') {
          queryParams.push(`name=${encodeURIComponent(searchValue)}`);
        }

        let queryString = queryParams.join('&');
        let fullURL = `${backendURL}?${queryString}`;

        fetch(fullURL)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            contentArticle.innerHTML = '';

            data.forEach((articleData) => {
              const articleElement = document.createElement('div');
              articleElement.classList.add('content-psikolog');

              let formattedExperience;
              if (articleData.experience === '<2_tahun') {
                formattedExperience = '< 2 tahun';
              } else if (articleData.experience === '2-4_tahun') {
                formattedExperience = '2-4 tahun';
              } else if (articleData.experience === '>4_tahun') {
                formattedExperience = '> 4 tahun';
              }

              let formattedketersediaan;
              if (articleData.availability === 'available') {
                formattedketersediaan = 'Tersedia';
              } else {
                formattedketersediaan = 'Tidak Tersedia';
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
              contentArticle.appendChild(articleElement);
            });
          })
          .catch((error) => {
            console.error('Error fetching results:', error);
          });
      } else {
        contentArticle.innerHTML = ''; 
      }
    });
  });

  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    let searchValue = searchInput.value.trim();

    if (searchValue !== '') {
      let apiUrl = `https://mentalwell-backend.vercel.app/psychologists?name=${encodeURIComponent(searchValue)}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          contentArticle.innerHTML = '';

          data.forEach((articleData) => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('content-psikolog');

            let formattedExperience;
            if (articleData.experience === '<2_tahun') {
              formattedExperience = '< 2 tahun';
            } else if (articleData.experience === '2-4_tahun') {
              formattedExperience = '2-4 tahun';
            } else if (articleData.experience === '>4_tahun') {
              formattedExperience = '> 4 tahun';
            }

            let formattedketersediaan;
            if (articleData.availability === 'available') {
              formattedketersediaan = 'Tersedia';
            } else {
              formattedketersediaan = 'Tidak Tersedia';
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
            contentArticle.appendChild(articleElement);
          });
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });
    } else {
      fetch('https://mentalwell-backend.vercel.app/psychologists')
        .then((response) => response.json())
        .then((data) => {
          contentArticle.innerHTML = '';

          data.forEach((articleData) => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('content-psikolog');

            let formattedExperience;
            if (articleData.experience === '<2_tahun') {
              formattedExperience = '< 2 tahun';
            } else if (articleData.experience === '2-4_tahun') {
              formattedExperience = '2-4 tahun';
            } else if (articleData.experience === '>4_tahun') {
              formattedExperience = '> 4 tahun';
            }

            let formattedketersediaan;
            if (articleData.availability === 'available') {
              formattedketersediaan = 'Tersedia';
            } else {
              formattedketersediaan = 'Tidak Tersedia';
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
            contentArticle.appendChild(articleElement);
          });
        })
        .catch((error) => {
          console.error('Error fetching all content:', error);
        });
    }
  });
});

