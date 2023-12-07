async function filterArticles() {
  const checkboxes = document.querySelectorAll('.content-keahlian input[type="checkbox"]:checked');
  const selectedTopics = Array.from(checkboxes).map((checkbox) => checkbox.id);

  const searchInput = document.getElementById('search-psikolog').value;

  // Add logic to construct the API URL with selected topics
  const apiUrl = `https://mentalwell-backend.vercel.app/psychologists?topics=${selectedTopics.join('&topics=')}&search=${searchInput}`;

  // Display loading spinner
  document.getElementById('loading-indicator').style.display = 'block';

  try {
    // Fetch data from the API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Display the fetched data (You need to customize this based on your data structure)
    const container = document.getElementById('container-psikolog');
    container.innerHTML = ''; // Clear previous content

    data.forEach((articleData) => {
      const contentDiv = document.createElement('div');
      contentDiv.classList.add('content-psikolog');
      // Add logic to fill the contentDiv with data from articleData
      contentDiv.innerHTML = `
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
                    `
      container.appendChild(contentDiv);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    // Hide loading spinner after fetching data
    document.getElementById('loading-indicator').style.display = 'none';
  }
}
