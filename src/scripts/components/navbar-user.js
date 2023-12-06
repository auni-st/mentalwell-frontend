class NavBar extends HTMLElement {
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

    .navbar .navbar-list .button button {
      width: 95px;
      height: 44px;
      border-radius: 10px;
      background-color: white;
      color: black;
      font-size: 17px;
      border: none;
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
  </style>
  
  <nav>
      <div class="navbar">
          <div class="navbar-brand">
              <h1>MentallWell</h1>
              <img src="/src/public/logo/logo-mentalwell.jpg" alt="imagelogo" width="50px" height="50px">
          </div>
          <div class="navbar-list">
              <ul class="navbar-list-item">
                  <li class="list-item"><a href="./">Beranda</a></li>
                  <li class="list-item"><a href="/artikel">Artikel</a></li>
                  <li class="list-item"><a href="/listpsikolog">Cari Psikolog</a></li>
                  <li class="list-item"><a href="/tentangkami">Tentang Kami</a></li>
              </ul>
              <div class="button">
                   <img src="/src/public/beranda/man.png" alt="Foto User" id="photoUser" width="60px" height="60px">
                  <button type="button">
                    John Doe
                  </button>
              </div>
          </div>
      </div>
  </nav>
        `;
  }
}

// Define the custom element
customElements.define('navbar-user', NavBar);
