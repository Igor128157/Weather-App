import Siema from "siema";
import { listCities } from "./utilities";

const slider = new Siema({
  perPage: {
    319: 2,
    767: 3,
    1119: 4,
  },
  duration: 200,
  draggable: true,
  multipleDrag: true,
  threshold: 20,
  loop: false,
});

document.querySelector(".next").addEventListener("click", () => {
  slider.next();
});
document.querySelector(".prev").addEventListener("click", () => {
  slider.prev();
});

const append = document.querySelector(".append");

append.addEventListener("click", () => {
  const lastNewElement = listCities.children[listCities.children.length - 1];
  slider.append(lastNewElement);
});
