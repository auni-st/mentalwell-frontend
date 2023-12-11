const articleSection = document.getElementById('content-articel');
const loadingIndicator = document.getElementById('loading-indicator');
const apiUrl = 'https://mentalwell-backend.vercel.app/articles';

loadingIndicator.style.display = 'block';

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    loadingIndicator.style.display = 'none';

    data.forEach((articleData) => {
      const articleElement = document.createElement('article');

      articleElement.innerHTML = `
                    <div class="image-articel">
                    <img src="${articleData.image}" alt="articel">
                    </div>
                    <div class="isi-articel">
                        <h2>${articleData.title}</h2>
                        <div class="content"> 
                          <p id="contentParagraph">${articleData.content}</p>
                        </div>
                        <div class="button-articel">
                          <button type="button" onclick="redirectToDetail('${articleData.id}')"> Baca Selengkapnya</button>
                        </div>
                    </div>
                `;

      articleSection.appendChild(articleElement);
    });
  })
  .catch((error) => {
    console.error('Error fetching data from API:', error);
    loadingIndicator.style.display = 'none';
  })

function redirectToDetail(id) {
  window.location.href = `/detailartikel?id=${id}`;
}
