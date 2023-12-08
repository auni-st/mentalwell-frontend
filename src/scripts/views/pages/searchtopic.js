// async function filterArticles() {
//   const checkboxes = document.querySelectorAll('.content-keahlian input[type="checkbox"]:checked');
//   const selectedTopics = Array.from(checkboxes).map((checkbox) => checkbox.id);

//   const searchInput = document.getElementById('search-psikolog').value;

//   // Add logic to construct the API URL with selected topics
//   const apiUrl = `https://mentalwell-backend.vercel.app/psychologists?topics=${selectedTopics.join('&topics=')}&search=${searchInput}`;

//   // Display loading spinner
//   document.getElementById('loading-indicator').style.display = 'block';

//   try {
//     // Fetch data from the API
//     const response = await fetch(apiUrl);
//     const data = await response.json();

//     // Display the fetched data (You need to customize this based on your data structure)
//     const container = document.getElementById('container-psikolog');
//     container.innerHTML = ''; // Clear previous content

//     data.forEach((articleData) => {
//       const contentDiv = document.createElement('div');
//       contentDiv.classList.add('content-psikolog');
//       // Add logic to fill the contentDiv with data from articleData
//       contentDiv.innerHTML = `
//                         <img class="image-psikolog" src="${articleData.profile_image}" alt="man" />
//                         <div class="data-psikolog">
//                             <h2>${articleData.name}</h2>
//                             <div class="value-psikolog">
//                                 <p>${articleData.experience}</p>
//                             <i class="far fa-envelope"></i>
//                                 <p class="ulasan">${articleData.counselings.review.count}</p>
//                             </div>
//                             <div class="list-button-psikolog">
//                                 <div class="${articleData.availability === 'available' ? 'jadwal-hijau' : 'jadwal-merah'}">
//                                   <p>${articleData.availability}</p>
//                                 </div>
//                                 <div class="button-psikolog">
//                                     <button type="button" onclick="redirectToDetailPsychologist()">Lihat Selengkapnya</button>
//                                 </div>
//                             </div>
//                         </div>

//                     `
//       container.appendChild(contentDiv);
//     });
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   } finally {
//     // Hide loading spinner after fetching data
//     document.getElementById('loading-indicator').style.display = 'none';
//   }
// }

// Fungsi untuk mengambil data psikolog dari API
async function fetchPsychologists(topics) {
  const apiUrl = `https://mentalwell-backend.vercel.app/psychologists?${topics.map((topic) => `topics=${topic}`).join('&')}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

// Fungsi untuk menampilkan psikolog di dalam kontainer
function displayPsychologists(psychologists) {
  const container = document.getElementById('container-psikolog');
  container.innerHTML = ''; // Bersihkan konten sebelumnya

  psychologists.forEach((psychologist) => {
    const content = `
      <div class="content-psikolog">
        <img class="image-psikolog" src="${psychologist.profile_image}" alt="man" />
        <div class="data-psikolog">
          <h2>${psychologist.name}</h2>
          <div class="value-psikolog">
            <p>${psychologist.experience}</p>
            <i class="far fa-envelope"></i>
            <p class="ulasan">${psychologist.counselings.review.count}</p>
          </div>
          <div class="list-button-psikolog">
            <div class="${psychologist.availability === 'available' ? 'jadwal-hijau' : 'jadwal-merah'}">
              <p>${psychologist.availability}</p>
            </div>
            <div class="button-psikolog">
              <button type="button" onclick="redirectToDetailPsychologist('${psychologist.id}')">Lihat Selengkapnya</button>
            </div>
          </div>
        </div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', content);
  });
}

// Pasang event listener pada perubahan checkbox
document.querySelectorAll('.filter-checkbox').forEach((checkbox) => {
  checkbox.addEventListener('change', async () => {
    const selectedFilters = Array.from(document.querySelectorAll('.filter-checkbox:checked')).map((checkbox) => checkbox.dataset.filter);
    console.log(selectedFilters)
    const psychologists = await fetchPsychologists(selectedFilters);
    displayPsychologists(psychologists);
  });
});

// Tampilkan awal (menampilkan semua psikolog)
fetchPsychologists([]).then((psychologists) => displayPsychologists(psychologists));
