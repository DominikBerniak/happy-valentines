const noBtn = document.querySelector("#btn-no");
const yesBtn = document.querySelector("#btn-yes");
const refreshBtn = document.querySelector("#btn-refresh");
const header = document.querySelector("#header");
const backgroundImage = document.querySelector("#container-background-image");
const mainContainer = document.querySelector("#main-container");
const pearlImg = document.querySelector("#pearl-img");
const btnContainer = document.querySelector("#button-container");

let counter = 0;
let clickCounter = 0;
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

if (isMobileWidth) noBtn.addEventListener("click", moveButtonHandler);
else noBtn.addEventListener("mouseover", moveButtonHandler);

yesBtn.addEventListener("click", () => {
	header.innerHTML = "<b>Kocham Cię</b>"
	header.style.color = "white";
	header.style.fontSize = "6vw";
	pearlImg.style.display = "block";
	mainContainer.classList.add('with-pearl');
	btnContainer.style.display = 'none';
	document.body.style.backgroundColor = "rgb(255 157 173)";
	noBtn.style.visibility = "hidden";
	yesBtn.style.visibility = "hidden";
});


refreshBtn.addEventListener("click", () => {
  header.innerHTML = "Czy zostaniesz moją walentynką?";
  header.style.color = "";
  backgroundImage.style.backgroundImage = "";
  backgroundImage.style.backgroundSize = "";
  noBtn.style.visibility = "visible";
  yesBtn.style.visibility = "visible";
  refreshBtn.style.visibility = "hidden";
  counter = 0;
  clickCounter = 0;

  if (isMobileWidth) noBtn.addEventListener("click", moveButtonHandler);
  else noBtn.addEventListener("mouseover", moveButtonHandler);
});

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

  let randomTop = Math.random() * (maxBottom - rect.height - 5);
  let randomRight = Math.random() * (maxLeft - rect.width);

  noBtn.style.top = randomTop + "px";
  noBtn.style.right = randomRight + "px";
}

function moveButtonHandler() {
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

    if (isMobileWidth) noBtn.removeEventListener("click", moveButtonHandler);
    else noBtn.removeEventListener("mouseover", moveButtonHandler);

    noBtn.addEventListener("click", noBtnClickHandler);
  }
}

function noBtnClickHandler() {
  if (counter > 0 && !hoverActive) return;

  clickCounter++;

  switch (clickCounter) {
    case 1:
      header.innerHTML = "PELESE?";
      header.style.color = "white";
      backgroundImage.style.backgroundImage = "url(./Images/pelese.jpg)";
      break;
    case 2:
      header.innerHTML = "ALE POWIEDZIAŁEM\nPELESE...";
      header.style.color = "white";
      backgroundImage.style.backgroundSize = "auto 70%";
      break;
    case 3:
      header.innerHTML =
        "POCZEKAJ TYLKO,<br> AŻ DOWIE SIĘ O TYM <br><b>DOROTA</b>";
      header.style.color = "white";
      backgroundImage.style.backgroundSize = "auto 100%";
      noBtn.style.visibility = "hidden";
      yesBtn.style.visibility = "hidden";
      refreshBtn.style.visibility = "visible";
      break;

    default:
      break;
  }
}
