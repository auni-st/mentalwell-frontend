class NavBar extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({ mode: "open" });

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
              position: sticky;
              top: 0;
              z-index: 99;
              background-color: #fff;
            }
      
            .navbar .navbar-brand {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-left: 2rem;
            }
      
            .navbar .navbar-brand h1 {
              color: #044b77;
              font-size: 25px;
              /* text-transform: uppercase; */
            }
      
            .navbar .navbar-list {
              display: flex;
              gap: 2rem;
              justify-content: center;
            }
      
            .navbar .navbar-list .button {
              display: flex;
              align-items: center;
              margin-right: 2rem;
            }
      
            .navbar .navbar-list .button button {
              width: 95px;
              height: 44px;
              border-radius: 10px;
              background-color: #044b77;
              color: #ffffff;
              font-size: 17px;
            }
      
            .navbar .navbar-list .button button:hover {
              background-color: #3ad0ea;
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
              background-color: #044b77;
              display: block;
              transition: 0.2s linear;
            }
      
            .navbar .navbar-list .navbar-list-item .list-item a:hover::after {
              width: 100%;
            }

            .navbar .navbar-list .button-user {
                display: flex;
                align-items: center;
              }
              
              .navbar .navbar-list .button-user button {
                width: 95px;
                height: 40px;
                background-color: white;
                border: none;
                font-size: 20px;
                cursor: pointer;
              }

            #photoUser {
                border-radius: 50%;
                width: 50px;
                height: 50px;
                cursor: pointer;
              }
          </style>
          
          <nav>
              <div class="navbar">
                  <div class="navbar-brand">
                      <h1>MentalWell</h1>
                  </div>
                  <div class="navbar-list">
                      <ul class="navbar-list-item">
                          <li class="list-item"><a href="./">Beranda</a></li>
                          <li class="list-item"><a href="/artikel">Artikel</a></li>
                          <li class="list-item"><a href="/listpsikolog">Cari Psikolog</a></li>
                          <li class="list-item"><a href="/tentangkami">Tentang Kami</a></li>
                      </ul>
                      <div class="button-user">
                          <img src="/src/public/beranda/man.png" alt="Foto User" id="photoUser" >
                      <button type="submit">John Doe</button>
                    </div>
                  </div
              </div>
          </nav>
        `;
  }
}

// Define the custom element
customElements.define("navbar-user", NavBar);
