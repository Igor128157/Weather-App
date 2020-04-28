const qouteArr = [
  ["No act of kindness, no matter how small, is ever wasted", "Aesop"],
  [
    "So divinely is the world organized that every one of us, in our place and time, is in balance with everything else.",
    "Johann Wolfgang von Goethe",
  ],
  [
    "The will to win, the desire to succeed, the urge to reach your full potential… these are the keys that will unlock the door to personal excellence.",
    "Confucius",
  ],
  [
    "Always dream and shoot higher than you know you can do. Do not bother just to be better than your contemporaries or predecessors. Try to be better than yourself.",
    "William Faulkner",
  ],
  [
    "Never make fun of someone who speaks broken English. It means they know another language",
    "H. Jackson Brown, Jr.",
  ],
];

function renderRandomQuote() {
  const element = qouteArr[Math.floor(Math.random() * qouteArr.length)];
  document.querySelector(".quote__text").textContent = element[0];
  document.querySelector(".quote__author").textContent = element[1];
}

export { renderRandomQuote };
