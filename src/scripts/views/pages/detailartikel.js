// Function to fetch data from the API based on article ID
async function fetchArticleById(articleId) {
  try {
    const response = await fetch(`https://mentalwell-backend.vercel.app/articles/${articleId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error('Error fetching article data:', error);
    throw error; // Re-throw the error to propagate it further
  }
}

// Function to render article details
async function renderArticleDetails() {
  try {
    // Mendapatkan ID artikel dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    // Mendapatkan elemen HTML untuk menampilkan data artikel
    const judulDetailArticel = document.getElementById('judul-detail-articel');
    const createdArticel = document.getElementById('created-articel');
    const imageDetailArticel = document.getElementById('image-detail-articel');
    const contentDetailArticel = document.getElementById('content-detail-articel');
    const referensiArticel = document.getElementById('referensi-articel');
    // Fetch data artikel berdasarkan ID
    const articleData = await fetchArticleById(articleId);

    // Menampilkan data artikel pada elemen HTML
    judulDetailArticel.innerHTML = `<h2>${articleData.title}</h2>`;
    createdArticel.innerHTML = `<time> Dibuat pada: ${articleData.created_at}</time>`;
    imageDetailArticel.innerHTML = `<img src="${articleData.image}" alt="image detail artice" />`;
    const formattedContent = articleData.content ? articleData.content.replace(/\n/g, '<br>') : '';
    contentDetailArticel.innerHTML = `<p>${formattedContent}</p>`;
    referensiArticel.innerHTML = `<p>Referensi : ${articleData.references}<p>`;
    // Menampilkan referensi artikel jika ada
    // if (articleData.references && articleData.references.length > 0) {
    //   referensiArticel.innerHTML = `<h2>Referensi</h2><ol>${articleData.references.map((ref) => `<li>${ref}</li>`).join('')}</ol>`;
    // }
  } catch (error) {
    console.error('Error rendering article details:', error);
  }
}

// Render artikel details ketika halaman dimuat
renderArticleDetails();
