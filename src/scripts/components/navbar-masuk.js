class NavBar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
        <style>
          /* Add your styling for the navbar here */
          nav {
            position: fixed;
            top: 0;
            z-index: 99;
            width: 100%;
          }
          .navbar {
            width: 100%;
            height: 89px;
            display: flex;
            justify-content: space-between;
            z-index: 99;
            background-color: white;
          }
    
          .navbar .navbar-brand {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-left: 4rem;
          }
    
          .navbar .navbar-brand h1 {
            color: #044b77;
            font-size: 25px;
            margin-left: 10px;
            /* text-transform: uppercase; */
            margin-left: 5px;
          }
    
          .navbar .navbar-list {
            display: flex;
            gap: 2rem;
            justify-content: center;
          }
    
          .navbar .navbar-list .button {
            display: flex;
            align-items: center;
            margin-right: 4rem;
          }

          .navbar .navbar-list .button button {
            width: 110px;
            height: 44px;
            border-radius: 30px;
            background-color: #044b77;
            color: #ffffff;
            font-size: 17px;
            border:none;
          }
    
          .navbar .navbar-list .button button:hover {
            background-color: #3ad0ea;
            color: #ffffff;
            background-color: #02bbdd;
            cursor: pointer;
            color: white;
            border: none;
          }
    
          .navbar .navbar-list .navbar-list-item {
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 2rem;
          }
    
          .navbar .navbar-list .list-item {
            list-style: none;
          }
    
          .navbar .navbar-list .navbar-list-item .list-item a {
            text-decoration: none;
            list-style: none;
            color: black;
            font-size: 17px;
            font-weight: 500px;
            padding-top: 10px;
            padding-bottom: 10px;
          }
    
          /* animasi */
          .navbar .navbar-list .navbar-list-item .list-item a::after {
            content: "";
            width: 0;
            height: 2px;
            background-color: #044b77;
            display: block;
            transition: 0.2s linear;
          }
    
          .navbar .navbar-list .navbar-list-item .list-item a:hover::after {
            width: 100%;
          }
        </style>
        
        <nav>
            <div class="navbar">
                <div class="navbar-brand">
                    <img src="/src/public/logo/logo-mentalwell.jpg" width="50px" height="50px">
                    <h1>MentalWell</h1>
                </div>
                <div class="navbar-list">
                    <ul class="navbar-list-item">
                        <li class="list-item"><a href="./">Beranda</a></li>
                        <li class="list-item"><a href="/artikel">Artikel</a></li>
                        <li class="list-item"><a href="/listpsikolog">Cari Psikolog</a></li>
                        <li class="list-item"><a href="/tentangkami">Tentang Kami</a></li>
                    </ul>
                    <div class="button">
                      <button type="button" id="btnnMasuk" onclick="openLoginPopup()">
                          Masuk
                      </button>
                    </div>
                </div>
            </div>
        </nav>
      `;
  }
}

class NavBarLogin extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({ mode: 'open' });

    // Define the HTML content for the component
    this.shadowRoot.innerHTML = `
            <style>
            /* Add your styling for the navbar here */
            nav {
              position: fixed;
              top: 0;
              z-index: 99;
              width: 100%;
            }
            .navbar {
              width: 100%;
              height: 89px;
              display: flex;
              justify-content: space-between;
              z-index: 99;
              background-color: white;
            }

            .navbar .navbar-brand {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              margin-left: 2rem;
            } 

            .navbar .navbar-brand h1 {
              color: #044b77;
              font-size: 25px;
              margin-left: 5px;
              /* text-transform: uppercase; */
            }

            .navbar .navbar-list {
              display: flex;
              gap: 2rem;
              justify-content: center;
            }

            .navbar .navbar-list .button {
              display: flex;
              flex-direction: row;
              align-items: center;
              margin-right: 20px;
            }

            .navbar .navbar-list .button img {
              border-radius: 30px
            }
      
            .navbar .navbar-list .button h2 {
              margin-left: 1rem;
            }

            .navbar .navbar-list .button button:hover {
              color: #ffffff;
              background-color: #02bbdd;
              cursor: pointer;
              color: white;
            }

            .navbar .navbar-list .navbar-list-item {
              text-decoration: none;
              display: flex;
              align-items: center;
              gap: 2rem;
            }

            .navbar .navbar-list .list-item {
              list-style: none;
            }

            .navbar .navbar-list .navbar-list-item .list-item a {
              text-decoration: none;
              list-style: none;
              color: black;
              font-size: 17px;
              font-weight: 500px;
              padding-top: 10px;
              padding-bottom: 10px;
            }

            /* animasi */
            .navbar .navbar-list .navbar-list-item .list-item a::after {
              content: "";
              width: 0;
              height: 2px;
              background-color: #000;
              display: block;
              transition: 0.2s linear;
            }

            .navbar .navbar-list .navbar-list-item .list-item a:hover::after {
              width: 100%;
            }

            #photoUser {
              margin-right: 1rem;
            }

            .button h4 {
              margin-right: 1rem;
            }

            .dropdown-content {
              display: none;
              position: absolute;
              background-color: #f9f9f9;
              min-width: 160px;
              box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
              z-index: 1;
              top: 88px;
              right: 0;
              border-bottom-left-radius: 10px;
          }

          .dropdown-content .profile-button {
            display: flex;
            flex-direction: row; 
          }

          .dropdown-content .keluar-button {
            display: flex;
            flex-direction: row;
          }

          .dropdown-content .riwayat-button {
            display: flex;
            flex-direction: row;
          }

          .profilLink {
            display: flex;
            align-items: center; /* Pusatkan elemen secara vertikal */
            text-decoration: none; /* Hilangkan garis bawah pada tautan */
            color: black; /* Ubah warna teks jika diinginkan */
            padding: 12px 16px;
          }

          .profilLink img {
            margin-right: 5px;
          }
          

          .dropdown-content .profile-button:hover {
            background-color: #044B97;
            color: #fff;
            cursor: pointer;
          }

          .dropdown-content .keluar-button:hover {
            background-color: #044B97;
            color: #fff;
            cursor: pointer;
          }

          .dropdown-content .riwayat-button:hover {
            background-color: #044B97;
            color: #fff;
            cursor: pointer;
          }

          .riwayat {
            border-bottom-left-radius: none;
            display: flex;
            align-items: center; /* Pusatkan elemen secara vertikal */
            text-decoration: none; /* Hilangkan garis bawah pada tautan */
            color: black; /* Ubah warna teks jika diinginkan */
            padding: 12px 16px;
          }

          .riwayat img {
            margin-right: 8px;
          }

          #dropdown- {
            width: 40px;
            height: 40px;
          }


          .keluar {
            border-bottom-left-radius: none;
            display: flex;
            align-items: center; /* Pusatkan elemen secara vertikal */
            text-decoration: none; /* Hilangkan garis bawah pada tautan */
            color: black; /* Ubah warna teks jika diinginkan */
            padding: 12px 16px;
          }

          .keluar img {
            margin-right: 5px;
          }

          .dropdown-content a:hover {
            color: white;
          }

          </style>
          
          <nav>
              <div class="navbar">
                  <div class="navbar-brand">
                      <img src="/src/public/logo/logo-mentalwell.jpg" alt="imagelogo" width="50px" height="50px">
                      <h1>MentalWell</h1>
                  </div>
                  <div class="navbar-list">
                      <ul class="navbar-list-item">
                          <li class="list-item"><a href="./">Beranda</a></li>
                          <li class="list-item"><a href="/artikel">Artikel</a></li>
                          <li class="list-item"><a href="/listpsikolog">Cari Psikolog</a></li>
                          <li class="list-item"><a href="/tentangkami">Tentang Kami</a></li>
                      </ul>
                      <div class="button" id="userDropdown">
                          <img src="" alt="Foto User" id="photoUser" width="60px" height="60px">
                          <h4 id="nicknameTag">Memuat...</h4>
                          <img src="/src/public/dropdown/dropdown.png" alt="Foto User" id="dropdown-" >
                          <div class="dropdown-content">
                            <div class="profile-button" id="profile-button">
                              <a id="profilLink" class="profilLink" href="#">
                                <img src="/src/public/dropdown/man.png" width="30px" height="30px"> 
                                <span>Profil saya</span>
                              </a>
                            </div>
                            <div class="riwayat-button" id="keluar-button">
                              <a class="riwayat" id="riwayat" href="#">
                                <img src="/src/public/dropdown/histori.png" width="25px" height="25px">
                                <span>Riwayat</span>
                              </a>
                            </div>
                            <div class="keluar-button" id="keluar-button">
                              <a class="keluar" href="#">
                                <img src="/src/public/dropdown/exit.png" width="30px" height="30px">
                                <span>Keluar</span>
                              </a>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
          </nav>
          <script src="/src/scripts/components/navbar-masuk.js"></script>
        `;
    this.connectedCallback();
  }

  connectedCallback() {
    const photoUser = this.shadowRoot.getElementById('photoUser');
    const nicknameTag = this.shadowRoot.getElementById('nicknameTag');

    const token = sessionStorage.getItem('authToken');
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    fetch('https://mentalwell-backend.vercel.app/currentUser', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const currentUser = data[0];

        if (nicknameTag && photoUser) {
          nicknameTag.innerText = currentUser.nickname;
          photoUser.src = currentUser.profile_image;
        } else {
          console.error('Element with ID "nicknameTag" not found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    const userDropdown = this.shadowRoot.getElementById('userDropdown');
    const profilLink = this.shadowRoot.getElementById('profilLink');
    const riwayat = this.shadowRoot.getElementById('riwayat');

    userDropdown.addEventListener('mouseover', () => {
      userDropdown.querySelector('.dropdown-content').style.display = 'block';
    });

    userDropdown.addEventListener('mouseout', () => {
      userDropdown.querySelector('.dropdown-content').style.display = 'none';
    });

    profilLink.addEventListener('click', () => {
      const urlParams = new URLSearchParams(window.location.search);
      const articleId = urlParams.get('id');
      window.location.href = `https://mentalwell.vercel.app/editprofilpasien`;
    });

    riwayat.addEventListener('click', () => {
      window.location.href = '/riwayat';
    });

    this.shadowRoot.querySelector('.keluar').addEventListener('click', () => {
      this.logout();
    });
  }

  logout() {
    sessionStorage.removeItem('authToken');
    window.location.href = '/';
  }
}

const authToken = sessionStorage.getItem('authToken');

if (authToken) {
  customElements.define('navbar-masuk', NavBarLogin);
} else {
  customElements.define('navbar-masuk', NavBar);
}
