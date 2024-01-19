window.addEventListener("DOMContentLoaded", function () {
  const customCheckSelects = document.querySelectorAll(".custom-check-select");

  customCheckSelects.forEach(function (customCheckSelect) {
    const checkOptions = customCheckSelect.querySelector(".check-options");
    const closeOptions = customCheckSelect.querySelector(".close-options");
    const hiddenField = checkOptions.querySelector('input[type="hidden"]');
    const attributeExists = hiddenField.hasAttribute("selectedValues");
    let selectedValuesArray = [];
    let selectedItemsArray = [];

    if (attributeExists) {
      const alreadyselectedValues = hiddenField.getAttribute("value");
      selectedValuesArray = alreadyselectedValues.split(",");

      const alreadyselectedItems = hiddenField.getAttribute("selectedValues");
      selectedItemsArray = alreadyselectedItems.split(",");
    }

    const checkboxContainerInputs = customCheckSelect.querySelectorAll(
      ".checkbox-container input"
    );
    const selectedItems = customCheckSelect.nextElementSibling;

    function updateSelectedItems() {
      selectedItems.innerHTML = selectedItemsArray
        .map(
          (itemName) => `
            <div class="item">
                <div class="item-name">${itemName}</div>
            </div>
          `
        )
        .join("");
    }

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
        const itemRealName = this.getAttribute("data-value");

        if (this.checked) {
          selectedValuesArray.push(itemName);
          selectedItemsArray.push(itemRealName);
        } else {
          const itemToRemove = selectedItemsArray.indexOf(itemRealName);
          if (itemToRemove !== -1) {
            selectedItemsArray.splice(itemToRemove, 1);
          }
          const indexToRemove = selectedValuesArray.indexOf(itemName);
          if (indexToRemove !== -1) {
            selectedValuesArray.splice(indexToRemove, 1);
          }
        }

        updateSelectedItems();
        hiddenField.value = selectedValuesArray.join(",");
        hiddenField.dataset.selectedValues = selectedItemsArray.join(",");

        if (selectedValuesArray.length > 0) {
          selectedItems.style.display = "flex";
        } else {
          selectedItems.style.display = "none";
        }
      });
    });
  });
});
