// Function to create and append the cookie banner HTML
function createCookieBanner() {
  const banner = document.createElement("div");
  banner.id = "cookie-banner";
  banner.className = "cookie-banner";

  const text = document.createElement("p");
  text.innerHTML =
    "We use cookies and other technologies to improve and personalize your user experience. We use our own cookies and third-party cookies. If you click Accept, you accept the use of all cookies. We always set necessary cookies. Select Manage settings to decide which cookies you want to accept.";

  const buttonDiv = document.createElement("div");

  const acceptButton = document.createElement("button");
  acceptButton.className = "btn btn-sm btn-primary";
  acceptButton.id = "accept-cookies";
  acceptButton.innerText = "Accept";

  const settingsButton = document.createElement("button");
  settingsButton.className = "btn btn-sm";
  settingsButton.id = "settings";
  settingsButton.innerText = "Manage settings";

  buttonDiv.appendChild(acceptButton);
  buttonDiv.appendChild(settingsButton);

  banner.appendChild(text);
  banner.appendChild(buttonDiv);

  // Append the banner to the body
  document.body.appendChild(banner);
}

// Function to remove the cookie banner HTML
function removeCookieBanner() {
  const banner = document.getElementById("cookie-banner");
  if (banner) {
    banner.remove();
  }
}

// Function to check if it's okay to load YouTube based on consent
function canLoadYouTube() {
  // Check consent for categories relevant to YouTube videos, e.g., 'analytics'
  // Adjust the category as per your categorization and consent mechanism
  const analyticsConsent = localStorage.getItem("analytics") === "true";
  return analyticsConsent;
}

// Function to dynamically load YouTube videos after consent
function loadYouTubeVideo() {
  if (canLoadYouTube()) {
    // Example: Load YouTube iframe API or embed iframe directly
    // This is a placeholder; replace with your actual YouTube loading logic
    console.log("Loading YouTube video...");
    // For demonstration, replace with actual YouTube iframe/API integration
  } else {
    console.log("Consent not given for YouTube video.");
  }
}

// Main function to handle the cookie banner logic
function handleCookieBanner() {
  const cookieAcceptance = localStorage.getItem("cookies-accepted");
  if (cookieAcceptance === "true") {
    removeCookieBanner();
    loadYouTubeVideo(); // Attempt to load YouTube video after checking consent
  } else {
    createCookieBanner();

    const acceptButton = document.getElementById("accept-cookies");
    const settingsButton = document.getElementById("settings");

    acceptButton.addEventListener("click", () => {
      // Simulate giving consent for all categories for simplicity
      // Adjust based on your actual consent categories and logic
      localStorage.setItem("cookies-accepted", "true");
      localStorage.setItem("analytics", "true"); // Assuming YouTube falls under this or similar category
      localStorage.setItem("marketing", "true");
      localStorage.setItem("preference", "true");
      localStorage.setItem("socialMedia", "true");

      removeCookieBanner();
      loadYouTubeVideo(); // Load YouTube video after consent is given
    });

    settingsButton.addEventListener("click", () => {
      // Redirect to settings page for granular consent management
      window.location.href = "/cookies";
    });
  }
}

// Initialize cookie banner logic when DOM is loaded
document.addEventListener("DOMContentLoaded", handleCookieBanner);
