const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const contentArticle = document.getElementById('content-articel')

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();

  if (searchTerm !== '') {
    const apiUrl = `https://mentalwell-backend.vercel.app/articles?title=${encodeURIComponent(searchTerm)}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        contentArticle.innerHTML = '';

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
          contentArticle.appendChild(articleElement);
        });
      })
      .catch(error => {
        console.error('Error fetching search results:', error)
      })
  }
})