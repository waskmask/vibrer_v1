const form = document.getElementById("mailingList");
const btn = document.querySelector(".ml-btn");
const successPop = document.querySelector(".success-pop");
const successPopClose = document.querySelector(".success-pop-close");

// Close the popup when the close button is clicked
successPopClose.addEventListener("click", () => {
  successPop.style.display = "none";
});

// Disable HTML5 validation
form.setAttribute("novalidate", "");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  // Change button text to "Sending..."
  btn.textContent = "Sending...";

  setTimeout(async () => {
    let isValid = true;
    let customErrors = {};

    const formData = new FormData(form);
    const formDataJSON = Object.fromEntries(formData.entries());

    formDataJSON.firstName = formDataJSON.firstName.trim();
    formDataJSON.lastName = formDataJSON.lastName.trim();
    formDataJSON.email = formDataJSON.email.trim();

    const firstName = formDataJSON.firstName;
    const lastName = formDataJSON.lastName;
    const email = formDataJSON.email;

    // Validate first name
    if (firstName.length < 2) {
      isValid = false;
      customErrors.firstName = "Must be at least 2 characters";
    } else if (!firstName) {
      isValid = false;
      customErrors.firstName = "First name is required";
    }

    // Validate last name
    if (lastName.length < 2) {
      isValid = false;
      customErrors.lastName = "Must be at least 2 characters";
    } else if (!lastName) {
      isValid = false;
      customErrors.lastName = "Last name is required";
    }

    // Validate email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      isValid = false;
      customErrors.email = "Invalid email format";
    } else if (!email) {
      isValid = false;
      customErrors.email = "Email is required";
    }

    // Clear previous error alerts
    const prevAlerts = document.querySelectorAll(".form-alert");
    prevAlerts.forEach((alert) => alert.remove());

    if (isValid) {
      const response = await fetch("/api/v1/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataJSON),
      });

      const data = await response.json();

      if (data.status === "fail") {
        for (const key in data.message) {
          const inputElement = form.querySelector(`[name="${key}"]`);
          const alertDiv = document.createElement("div");
          alertDiv.className = "form-alert error";
          alertDiv.textContent = data.message[key];
          inputElement.parentNode.insertBefore(
            alertDiv,
            inputElement.nextSibling
          );
        }
      } else {
        successPop.style.display = "block";

        setTimeout(() => {
          successPop.style.display = "none";
        }, 3000);

        form.reset();
      }
    } else {
      for (const key in customErrors) {
        const inputElement = form.querySelector(`[name="${key}"]`);
        const alertDiv = document.createElement("div");
        alertDiv.className = "form-alert error";
        alertDiv.textContent = customErrors[key];
        inputElement.parentNode.insertBefore(
          alertDiv,
          inputElement.nextSibling
        );
      }
    }

    btn.textContent = "Subscribe";
  }, 1000);
});
