async function fetchArticleById(articleId) {
  try {
    const response = await fetch(`https://mentalwell-backend.vercel.app/psychologists/${articleId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching article data:', error);
    throw error; // Re-throw the error to propagate it further
  }
}

async function renderArticleDetails() {
  try {
    // Mendapatkan ID artikel dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    // Mendapatkan elemen HTML untuk menampilkan data artikel
    // const fotopsikolog = document.getElementById('foto-psikolog');
    const datapsikolog = document.querySelector('h2');
    const biodatapsikolog = document.getElementById('biodata-psikolog');
    const articleData = await fetchArticleById(articleId);

    // Menampilkan data artikel pada elemen HTML
    // fotopsikolog.innerHTML = `<img src="${articleData.image}" alt="image detail artice"/>`;
    datapsikolog.innerHTML = `${articleData.name}`;
    biodatapsikolog.innerHTML = `<p>${articleData.bio}</p> `;

  } catch (error) {
    console.error('Error rendering article details:', error);
  }
}

// Render artikel details ketika halaman dimuat
renderArticleDetails();


