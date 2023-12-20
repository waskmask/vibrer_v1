window.addEventListener("DOMContentLoaded", function () {
  const customCheckSelects = document.querySelectorAll(".custom-check-select");

  customCheckSelects.forEach(function (customCheckSelect) {
    const checkOptions = customCheckSelect.querySelector(".check-options");
    const closeOptions = customCheckSelect.querySelector(".close-options");
    const checkboxContainerInputs = customCheckSelect.querySelectorAll(
      ".checkbox-container input"
    );
    const selectedItems = customCheckSelect.nextElementSibling;

    customCheckSelect.addEventListener("click", function (event) {
      event.stopPropagation();
      if (checkOptions.classList.contains("active")) {
        checkOptions.classList.remove("active");
      } else {
        checkOptions.classList.add("active");
        repositionOptions();
      }
    });

    closeOptions.addEventListener("click", function (event) {
      checkOptions.classList.remove("active");
    });

    document.body.addEventListener("click", function (event) {
      checkOptions.classList.remove("active");
    });

    checkOptions.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    checkboxContainerInputs.forEach(function (input) {
      input.addEventListener("change", function () {
        const itemName = this.value;
        if (this.checked) {
          selectedItems.innerHTML += `
                        <div class="item">
                            <div class="item-name">${itemName}</div>
                        </div>
                    `;
        } else {
          const itemToRemove = Array.from(
            selectedItems.querySelectorAll(".item")
          ).find(function (item) {
            return item.querySelector(".item-name").textContent === itemName;
          });
          if (itemToRemove) {
            selectedItems.removeChild(itemToRemove);
          }
        }

        if (selectedItems.querySelector(".item")) {
          selectedItems.style.display = "flex";
        } else {
          selectedItems.style.display = "none";
        }
      });
    });
  });
});
