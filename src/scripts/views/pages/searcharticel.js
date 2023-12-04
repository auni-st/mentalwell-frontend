const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const contentArticle = document.getElementById('content-articel');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();

  // Jika input pencarian tidak kosong, ambil data sesuai dengan kata kunci
  if (searchTerm !== '') {
    const apiUrl = `https://mentalwell-backend.vercel.app/articles?title=${encodeURIComponent(searchTerm)}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        contentArticle.innerHTML = '';

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
          contentArticle.appendChild(articleElement);
        });
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  } else {
    fetch('https://mentalwell-backend.vercel.app/articles')
      .then((response) => response.json())
      .then((data) => {
        contentArticle.innerHTML = '';

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
          contentArticle.appendChild(articleElement);
        });
      })
      .catch((error) => {
        console.error('Error fetching all content:', error);
      });
  }
});
