async function fetchPsychologists(topics) {
  const apiUrl = `https://mentalwell-backend.vercel.app/psychologists?${topics.map((topic) => `topics=${topic}`).join('&')}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

// Fungsi untuk menampilkan psikolog di dalam kontainer
function displayPsychologists(psychologists) {
  const container = document.getElementById('container-psikolog');
  container.innerHTML = ''; 

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
    const psychologists = await fetchPsychologists(selectedFilters);
    displayPsychologists(psychologists);
  });
});

fetchPsychologists([]).then((psychologists) => displayPsychologists(psychologists));
