let isPageLoaded = false;
let isTimerDone = false;

const loader = document.getElementById("loader");

// Function to hide the loader
function hideLoader() {
  if (isPageLoaded && isTimerDone) {
    loader.style.display = "none";
  }
}

// Hide the loader after 1 second
setTimeout(function () {
  isTimerDone = true;
  hideLoader();
}, 100); // 1 second

// Hide the loader when the page is fully loaded
window.addEventListener("load", function () {
  isPageLoaded = true;
  hideLoader();
});

document.getElementById("username").addEventListener("click", function () {
  // Get the text and remove the '@' character
  const text = this.innerText.replace("@", "");

  // Copy the modified text to Clipboard
  navigator.clipboard
    .writeText(text)
    .then(() => {
      // Create and show the copied notification
      const alertDiv = document.createElement("div");
      alertDiv.setAttribute("class", "copyUname");
      alertDiv.innerText = "Copied!";

      // Append the alert div to the username div
      this.appendChild(alertDiv);

      // Hide and remove the notification after 1 second
      setTimeout(() => {
        alertDiv.remove();
      }, 700);
    })
    .catch((error) => {
      console.error("Copy failed", error);
    });
});

// profile dropdown
document.querySelector(".hphead").addEventListener("click", function (event) {
  let dropDown = document.querySelector(".hpdd");
  dropDown.classList.toggle("show");
  event.stopPropagation(); // Prevents the document click listener from immediately executing
});

document.addEventListener("click", function (event) {
  let dropDown = document.querySelector(".hpdd");
  if (!dropDown.contains(event.target)) {
    dropDown.classList.remove("show");
  }
});

// Function to toggle sidebar
function toggleSidebar() {
  document.querySelector(".app_sidebar").classList.toggle("show");
  document.querySelector(".app_sb_overlay").style.display = document
    .querySelector(".app_sidebar")
    .classList.contains("show")
    ? "block"
    : "none";
}

// Event listener for burger menu
document.querySelector(".burger_menu").addEventListener("click", toggleSidebar);

// Event listener for closing the sidebar
document
  .querySelector(".app_sb_overlay")
  .addEventListener("click", toggleSidebar);
document
  .querySelector(".close_sidebar")
  .addEventListener("click", toggleSidebar);
