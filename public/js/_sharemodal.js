document.addEventListener("DOMContentLoaded", function () {
  // Function to open the modal and update its content with the dynamic URL
  function openModal(modalID, dynamicUrl) {
    var modal = document.getElementById(modalID);
    if (modal) {
      // Check if it's the shareModal and update URLs if needed
      if (modalID === "shareModal" && dynamicUrl) {
        updateShareModalUrls(modal, dynamicUrl);
      }
      modal.classList.add("d-block");
      var dialog = modal.querySelector(".dialog");
      if (dialog) {
        setTimeout(() => dialog.classList.add("show"), 10); // Delay needed for the transition to work
      }
      document.body.classList.add("modal-open"); // Add class to body
    }
  }

  // Function to close the modal
  function closeModal(modal) {
    var dialog = modal.querySelector(".dialog");
    if (dialog) {
      dialog.classList.remove("show");
      dialog.addEventListener(
        "transitionend",
        function () {
          modal.classList.remove("d-block");
          document.body.classList.remove("modal-open"); // Remove class from body
          // Reset URLs to placeholder if it's the shareModal
          if (modal.id === "shareModal") {
            resetShareModalUrls(modal);
          }
        },
        { once: true }
      );
    }
  }

  // Update URLs in the shareModal with the dynamic URL
  function updateShareModalUrls(modal, url) {
    // Update share buttons' onclick attributes
    modal.querySelectorAll(".btn.share-btn").forEach(function (button) {
      var shareType = button
        .getAttribute("onclick")
        .match(/shareOn(Whatsapp|Facebook|Twitter)/);
      if (shareType) {
        button.setAttribute("onclick", `shareOn${shareType[1]}('${url}')`);
      }
    });

    // Update the displayed URL and the copyUrl function
    modal
      .querySelector(".shareUrl")
      .setAttribute("onclick", `copyUrl('${url}')`);
    modal.querySelector(".urlHolder span").textContent = url;
  }

  // Reset URLs in the shareModal to placeholders
  function resetShareModalUrls(modal) {
    // Resetting to placeholder values as an example. Adjust based on actual reset logic needed.
    modal.querySelectorAll(".btn.share-btn").forEach(function (button) {
      button.setAttribute("onclick", `shareOnSocialMedia('[POST_URL]')`); // Replace 'shareOnSocialMedia' with actual function names
    });
    modal
      .querySelector(".shareUrl")
      .setAttribute("onclick", "copyUrl('[POST_URL]')");
    modal.querySelector(".urlHolder span").textContent = "[POST_URL]";
  }

  // Attach click event to open-modal buttons and pass the dynamic URL
  var openModalButtons = document.querySelectorAll(
    '[data-toggle="share_modal"]'
  );
  openModalButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var modalID = this.getAttribute("data-target");
      var dynamicUrl = this.getAttribute("data-url"); // Fetch the dynamic URL if available
      openModal(modalID, dynamicUrl);
    });
  });

  // Attach click event to close-modal buttons
  var closeModalButtons = document.querySelectorAll(
    ".share_modal .close-modal"
  );
  closeModalButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (window.pauseVideo) {
        window.pauseVideo();
      }
      var modal = this.closest(".share_modal");
      if (modal) {
        closeModal(modal);
      }
    });
  });
});
