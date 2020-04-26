import "basiclightbox/dist/basicLightbox.min.css";
import * as basicLightbox from "basiclightbox";
import { btnNext } from "./addFavoriteCity";
import markupModal from "../templates/modal.hbs";
import { removeLocalStorageCity } from "./utilities";

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
      } else if (e.target.className === "confirm-btn-no") {
        showModal.close();
      }
      if (!deleteCity.children.length) {
        btnNext.style.visibility = "hidden";
      }
    }

    modalConfirmBtn.addEventListener("click", isCloseModalHandler);
  }
}
