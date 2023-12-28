document.addEventListener("DOMContentLoaded", function() {
    var path = window.location.pathname;
  
    var navLinks = document.querySelectorAll("#navLink a");
    for (var i = 0; i < navLinks.length; i++) {
      if (navLinks[i].getAttribute("href") === path) {
        navLinks[i].classList.add("active");
      } else {
        navLinks[i].classList.remove("active");
      }
    }
  });
  