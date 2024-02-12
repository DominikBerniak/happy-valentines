const noBtn = document.querySelector("#btn-no");
const yesBtn = document.querySelector("#btn-yes");

let counter = 0;
let hoverActive = true;

const windowWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
const windowHeight =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;
const isMobileWidth = windowWidth < 800;

setNoButtonBasePosition();

if (isMobileWidth) {
  noBtn.addEventListener("click", mouseOverHandler);
} else {
  noBtn.addEventListener("mouseover", mouseOverHandler);
}

function setNoButtonBasePosition() {
  const yesBtnRect = yesBtn.getBoundingClientRect();
  noBtn.style.top = yesBtnRect.top + "px";
  noBtn.style.right = yesBtnRect.left + "px";
  noBtn.style.visibility = "visible";
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

  if (!noBtn.classList.contains("btn-transition"))
    noBtn.classList.add("btn-transition");
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

	if(isMobileWidth)
    	noBtn.removeEventListener("click", mouseOverHandler);
	else
    	noBtn.removeEventListener("mouseover", mouseOverHandler);

    noBtn.addEventListener("click", noBtnClickHandler);
  }
}

function noBtnClickHandler() {
  if (counter > 0 && !hoverActive) return;

  console.log("click time!");
}
