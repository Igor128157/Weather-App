import "basiclightbox/dist/basicLightbox.min.css";
import * as basicLightbox from "basiclightbox";
import { btnNext, btnPrev } from "./addFavoriteCity";
import markupModal from "../templates/modal.hbs";
import { removeLocalStorageCity } from "./utilities";
import { addToFavorites } from "./addFavoriteCity";

const deleteCity = document.querySelector(".js-slider-list");

deleteCity.addEventListener("click", isOpenModalHandle);

function isOpenModalHandle(e) {
  e.preventDefault();
  const closeBtn = e.target;
  const elItemCity = closeBtn.parentElement;
  const cityName = closeBtn.previousElementSibling;
  if (closeBtn.id === "js-btnRemove") {
    const showModal = basicLightbox.create(`${markupModal()}`);
    showModal.show();

    const modalConfirmBtn = document.querySelector(".modal__confirm-btn");

    function isCloseModalHandler(e) {
      if (e.target.className === "confirm-btn-yes") {
        elItemCity.remove();
        removeLocalStorageCity(cityName.innerText);
        showModal.close();
        location.reload()
      } else if (e.target.className === "confirm-btn-no") {
        showModal.close();
      }
      const cities = JSON.parse(localStorage.getItem("cities"));
      if (!cities.length) {
        btnNext.style.visibility = "hidden";
        btnPrev.style.visibility = "hidden";
        addToFavorites.classList.remove("activ-bnt");
        addToFavorites.disabled = false;
      }
    }

    modalConfirmBtn.addEventListener("click", isCloseModalHandler);
  }
}
