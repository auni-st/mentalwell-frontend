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
    showLoadingIndicator();
    // Mendapatkan ID artikel dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    // Mendapatkan elemen HTML untuk menampilkan data artikel
    const fotopsikolog = document.querySelector('.foto-psikolog img');
    const datapsikolog = document.querySelector('.data-psikolog h2');
    const biodatapsikolog = document.getElementById('biodata-psikolog');
    const pengalamanpraktik = document.getElementById('praktik');
    const topikKeahlian = document.getElementById('topik-keahlian'); // Updated ID
    const topicList = document.getElementById('topiclist');

    const articleData = await fetchArticleById(articleId);
    let formattedExperience;
    if (articleData.experience == "<2_tahun") {
      formattedExperience = "< 2 tahun"
    } else if (articleData.experience == "2-4_tahun") {
      formattedExperience = "2-4 tahun"
    } else if (articleData.experience == ">4_tahun") {
      formattedExperience = "> 4 tahun"
    }

    // Menampilkan data artikel pada elemen HTML
    fotopsikolog.src = `${articleData.profile_image}`;
    datapsikolog.innerHTML = `${articleData.name}`;
    biodatapsikolog.innerHTML = `<p>${articleData.bio}</p>`;
    pengalamanpraktik.innerHTML = `${formattedExperience}`;
    // Menampilkan topik-topik psikolog
    if (articleData.psychologist_topics && articleData.psychologist_topics.length > 0) {
      const formattedTopics = articleData.psychologist_topics.map((topic) => {
        let formattedTopicName = '';

        if (topic.topic_name === 'adiksi') {
          formattedTopicName = 'Adiksi';
        } else if (topic.topic_name === 'anak_dan_remaja') {
          formattedTopicName = 'Anak dan Remaja';
        } else if (topic.topic_name === 'trauma') {
          formattedTopicName = 'Trauma';
        } else if (topic.topic_name === 'seksualitas') {
          formattedTopicName = 'Seksualitas';
        } else if (topic.topic_name === 'fobia') {
          formattedTopicName = 'Fobia';
        } else if (topic.topic_name === 'kecenderungan_bunuh_diri') {
          formattedTopicName = 'Kecenderungan Bunuh Diri';
        } else {
          formattedTopicName = topic.topic_name;
        }

        return formattedTopicName;
      });

      const formattedTopicsList = formattedTopics.map((formattedTopic) => `<li>${formattedTopic}</li>`).join('');
      topicList.innerHTML = formattedTopicsList;

      topikKeahlian.style.display = 'block'; // Show the container if there are topics
    } else {
      topicList.innerHTML = '<li>Tidak ada topik.</li>';
      originalTopicList.innerHTML = ''; // Clear the original topic list
      topikKeahlian.style.display = 'none'; // Hide the container if there are no topics
    }

    const ulasanPengguna = document.getElementById('ulasan-pengguna');
    const userReviewsContainer = document.getElementById('userReviews');

    if (articleData.counselings && articleData.counselings.length > 0) {
      const userReviews = articleData.counselings
        .map(
          (counseling) => `
        <div class="isi-ulasan">
          <img src="/src/public/beranda/man.png" alt="Foto User" id="userReview" />
          <div class="komentar-user">
            <h3>${counseling.patients || 'Pengguna Tanpa Nama'}</h3>
            <p>${counseling.review}</p>
          </div>
        </div>
      `
        )
        .join('');
      userReviewsContainer.innerHTML = userReviews;
      ulasanPengguna.style.display = 'block'; // Tampilkan kontainer jika ada ulasan pengguna
    } else {
      userReviewsContainer.innerHTML = '<p>Tidak ada ulasan pengguna.</p>';
      ulasanPengguna.style.display = 'none'; // Sembunyikan kontainer jika tidak ada ulasan pengguna
    }
    hideLoadingIndicator();
  } catch (error) {
    console.error('Error rendering article details:', error);
  }
}

async function fetchPsychologistAvailability() {
  const urlParams = new URLSearchParams(window.location.search);
  const psychologistId = urlParams.get('id');
  const url = `https://mentalwell-backend.vercel.app/availability/psychologist/${psychologistId}`;

  try {
    showLoadingIndicator();
    const response = await fetch(url);
    const data = await response.json();

    // Update the button state directly based on availability
    updateButtonState(data.availability);
    hideLoadingIndicator();
  } catch (error) {
    console.error(error);
    // Handle the error as needed
    hideLoadingIndicator();
  }
}

function updateButtonState(availability) {
  const btnDaftar = document.getElementById('btnDaftar');

  if (availability === 'available') {
    btnDaftar.disabled = false;
    btnDaftar.classList.remove('disabled');
  } else {
    btnDaftar.disabled = true;
    btnDaftar.classList.add('disabled');
  }
}

function showLoadingIndicator() {
  // Get loading indicator element and show it
  const loadingIndicator = document.getElementById('loading-indicator');
  loadingIndicator.style.display = 'block';
}

function hideLoadingIndicator() {
  // Hide loading indicator
  const loadingIndicator = document.getElementById('loading-indicator');
  loadingIndicator.style.display = 'none';
}

// Render artikel details ketika halaman dimuat
renderArticleDetails();
fetchPsychologistAvailability();

const logosContainer2 = document.querySelector(".logos-2");
const originalLogosContainer2 = document.querySelector(".logos-2");
const clone2 = originalLogosContainer2.cloneNode(true);
originalLogosContainer2.parentNode.insertBefore(clone2, originalLogosContainer2.nextSibling);

let scrollAmount2 = 0;
const scrollSpeed2 = 2;

function scroll2() {
  scrollAmount2 += scrollSpeed2;
  originalLogosContainer2.scrollLeft = scrollAmount2;

  // Reset to the beginning when it reaches the end
  if (scrollAmount2 >= originalLogosContainer2.scrollWidth - originalLogosContainer2.clientWidth) {
    scrollAmount2 = 0;
  }

  requestAnimationFrame(scroll2);
}

scroll2();


// Add an event listener to the Daftar Konseling button
const daftarKonselingButton = document.getElementById('btnDaftar');
daftarKonselingButton.addEventListener('click', redirectToCounseling);
