import navbar from "./static-components/navbar.html";
import footer from "./static-components/footer.html";
document.onload = function () {
  document.getElementById("root").innerHTML = navbar + footer;
};
