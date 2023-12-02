const articleSection = document.getElementById('content-articel');

const apiUrl = 'https://mentalwell-backend.vercel.app/articles';

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((articleData) => {
      const articleElement = document.createElement('article');

      articleElement.innerHTML = `
                    <div class="image-articel">
                    <img src="${articleData.image}" alt="articel">
                    </div>
                        <h2>${articleData.title}</h2>
                        <p>${articleData.content}</p>
                        <div class="button-articel">
                        <button type="button" onclick="redirectToDetail()"> Baca Selengkapnya</button>
                    </div>
                `;

      articleSection.appendChild(articleElement);
    });
  })
  .catch((error) => console.error('Error fetching data from API:', error));

function redirectToDetail() {
  window.location.href = '/detailartikel';
}
