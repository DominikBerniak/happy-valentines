const noBtn = document.querySelector("#btn-no");
const yesBtn = document.querySelector("#btn-yes");

let counter = 0;
let hoverActive = true;

setNoButtonBasePosition();

noBtn.addEventListener("mouseover", mouseOverHandler);
noBtn.addEventListener("click", noBtnClickHandler);

function setNoButtonBasePosition() {
  const yesBtnRect = yesBtn.getBoundingClientRect();
  noBtn.style.top = yesBtnRect.top + "px";
  noBtn.style.right = yesBtnRect.left + "px";
}

function setButtonRandomPosition() {
  const rect = noBtn.getBoundingClientRect();

  const maxBottom = window.scrollY + window.innerHeight;
  const maxLeft = window.scrollX + window.innerWidth;

  let randomTop = Math.random() * (maxBottom - 5);
  let randomRight = Math.random() * (maxLeft - rect.width);

  noBtn.style.top = randomTop + "px";
  noBtn.style.right = randomRight + "px";
}

function mouseOverHandler() {
  if (!hoverActive) return;
  hoverActive = false;
  counter++;
  setButtonRandomPosition();

  setTimeout(() => {
    hoverActive = true;
  }, 500);

  if (counter >= 5) {
    setNoButtonBasePosition();
    counter = 0;
    hoverActive = false;
    noBtn.removeEventListener("mouseover", mouseOverHandler);
  }
}

function noBtnClickHandler() {
  if (counter > 0 && !hoverActive) return;
}
