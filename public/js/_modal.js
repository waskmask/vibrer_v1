document.addEventListener("DOMContentLoaded", function () {
  // Function to open the modal
  function openModal(modalID) {
    var modal = document.getElementById(modalID);
    if (modal) {
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
        },
        { once: true }
      );
    }
  }

  // Attach click event to open-modal buttons
  var openModalButtons = document.querySelectorAll('[data-toggle="_modal"]');
  openModalButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var modalID = this.getAttribute("data-target");
      openModal(modalID);
    });
  });

  // Attach click event to close-modal buttons
  var closeModalButtons = document.querySelectorAll(".close-modal");
  closeModalButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (window.pauseVideo) {
        window.pauseVideo();
      }
      var modal = this.closest("._modal");
      if (modal) {
        closeModal(modal);
      }
    });
  });
});
