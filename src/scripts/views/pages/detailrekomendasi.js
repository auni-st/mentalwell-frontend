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
      const fotopsikolog = document.querySelector('.foto-psikolog img');
      const datapsikolog = document.querySelector('h2');
      const biodatapsikolog = document.getElementById('biodata-psikolog');
      const pengalamanpraktik = document.getElementById('praktik');
      const topikKeahlian = document.getElementById('topik-keahlian'); // Updated ID
      const topicList = document.getElementById('topiclist');
  
      const articleData = await fetchArticleById(articleId);
      // Menampilkan data artikel pada elemen HTML
      fotopsikolog.src = `${articleData.profile_image}`;
      datapsikolog.innerHTML = `${articleData.name}`;
      biodatapsikolog.innerHTML = `<p>${articleData.bio}</p>`;
      pengalamanpraktik.innerHTML = `${articleData.experience}`;
      // Menampilkan topik-topik psikolog
      if (articleData.psychologist_topics && articleData.psychologist_topics.length > 0) {
        const topicsList = articleData.psychologist_topics.map(topic => `<li>${topic.topic_name}</li>`).join('');
        topicList.innerHTML = topicsList;
        topikKeahlian.style.display = 'block'; // Show the container if there are topics
      } else {
        topicList.innerHTML = '<li>Tidak ada topik.</li>';
        topikKeahlian.style.display = 'none'; // Hide the container if there are no topics
      }
  
      const ulasanPengguna = document.getElementById('ulasan-pengguna');
      const userReviewsContainer = document.getElementById('userReviews');
  
       if (articleData.counselings && articleData.counselings.length > 0) {
        const userReviews = articleData.counselings.map(counseling => `
          <div class="isi-ulasan">
            <img src="/src/public/beranda/man.png" alt="Foto User" id="userReview" />
            <div class="komentar-user">
              <h3>${counseling.patients || 'Pengguna Tanpa Nama'}</h3>
              <p>${counseling.review}</p>
            </div>
          </div>
        `).join('');
        userReviewsContainer.innerHTML = userReviews;
        ulasanPengguna.style.display = 'block'; // Tampilkan kontainer jika ada ulasan pengguna
      } else {
        userReviewsContainer.innerHTML = '<p>Tidak ada ulasan pengguna.</p>';
        ulasanPengguna.style.display = 'none'; // Sembunyikan kontainer jika tidak ada ulasan pengguna
      }
    } catch (error) {
      console.error('Error rendering article details:', error);
    }
  }
  
  // Render artikel details ketika halaman dimuat
  renderArticleDetails();
  