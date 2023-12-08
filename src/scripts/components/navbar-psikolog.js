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
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                margin-left: 2rem;
              }
        
              .navbar .navbar-brand h1 {
                color: #044b77;
                font-size: 25px;
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
                background-color: #000;
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

                // dropdown menu
                .button-user {
                  position: relative;
                  display: inline-block;
              }
              
              .dropdown-content {
                  display: none;
                  position: absolute;
                  background-color: #f9f9f9;
                  min-width: 160px;
                  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                  z-index: 1;
                  top: 90px;
                  right: 0;
                  border-bottom-left-radius: 10px;
              }
              
              .dropdown-content a {
                  color: black;
                  padding: 12px 16px;
                  display: block;
                  text-decoration: none;
              }
              
              .dropdown-content a:hover {
                  background-color: #044B77;
                  color: #fff;
              }

              .keluar {
                border-bottom-left-radius: 10px;
              }
            </style>
            
            <nav>
                <div class="navbar">
                    <div class="navbar-brand">
                        <img src="/src/public/logo/logo-mentalwell.jpg" width="50px" alt="logo mentalwell">
                        <h1>MentalWell</h1>
                    </div>
                    <div class="navbar-list">
                        <div class="button-user" id="userDropdown">
                            <img src="/src/public/beranda/man.png" alt="Foto User" id="photoUser" >
                            <button type="submit">John Doe</button>
                            <div class="dropdown-content">
                                <a id="profilLink" href="#">Profil saya</a>
                                <a class="keluar" href="#">Keluar</a>
                            </div>
                        </div>
                    <div>
                </div>
            </nav>
          `;

          // Get userDropdown element within Shadow DOM
          const userDropdown = this.shadowRoot.getElementById("userDropdown");
          const profilLink = this.shadowRoot.getElementById("profilLink");

          // Add event listeners for mouseover and mouseout within Shadow DOM
          userDropdown.addEventListener("mouseover", () => {
            userDropdown.querySelector(".dropdown-content").style.display = "block";
          });

          userDropdown.addEventListener("mouseout", () => {
            userDropdown.querySelector(".dropdown-content").style.display = "none";
          });

          // Add event listener for "Profil saya" link click
          profilLink.addEventListener("click", () => {
            // Redirect to /editprofilpsikolog
            window.location.href = "/editprofilpsikolog";
          });

          // Add event listener for "Keluar" (logout) link click
          this.shadowRoot.querySelector(".keluar").addEventListener("click", () => {
            this.logout();
          });
        }

        logout() {
          sessionStorage.removeItem('authToken');
          window.location.href = '/'; 
        }
}

// Define the custom element
customElements.define("navbar-psikolog", NavBar);

//     // Get userDropdown element within Shadow DOM
//     const userDropdown = this.shadowRoot.getElementById("userDropdown");
//     const profilLink = this.shadowRoot.getElementById("profilLink");

//     // Add event listeners for mouseover and mouseout within Shadow DOM
//     userDropdown.addEventListener("mouseover", () => {
//       userDropdown.querySelector(".dropdown-content").style.display = "block";
//     });

//     userDropdown.addEventListener("mouseout", () => {
//       userDropdown.querySelector(".dropdown-content").style.display = "none";
//     });

//     // Add event listener for "Profil saya" link click
//     profilLink.addEventListener("click", () => {
//       // Redirect to /editprofilpsikolog
//       window.location.href = "/editprofilpsikolog";
//     });
//   }
// }

// // Define the custom element
// customElements.define("navbar-psikolog", NavBar);

// // Get userDropdown element outside Shadow DOM
// const userDropdown = document.getElementById("userDropdown");

// // Add event listeners for mouseover and mouseout outside Shadow DOM
// userDropdown.addEventListener("mouseover", () => {
//   userDropdown.querySelector(".dropdown-content").style.display = "block";
// });

// userDropdown.addEventListener("mouseout", () => {
//   userDropdown.querySelector(".dropdown-content").style.display = "none";
// });

// function logout() {
//   sessionStorage.removeItem('authToken');
//   window.location.href = '/'; 
// }

// document.getElementById("profilLink").addEventListener("click", () => {
//   window.location.href = "/editprofilpsikolog";
// });

// document.querySelector(".keluar").addEventListener("click", () => {
//   logout();
// });