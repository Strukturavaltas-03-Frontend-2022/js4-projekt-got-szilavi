const table = document.querySelector(".tabble__characters");

fetch("./json/got.json")
  .then((response) => response.json())
  .then((charactersAllData) => {
    for (let i = 0; i < charactersAllData.length; i++) {
      charactersAllData.sort((a, b) => {
        let nameA = a.name;
        let nameB = b.name;
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      });
      const character = `     <div class="character">
       <img class=character__image src="${charactersAllData[i].portrait}" alt="${charactersAllData[i].name}" />
       <div class="character__name">${charactersAllData[i].name}</div>
       </div>`;
      if (!charactersAllData[i].dead) {
        table.innerHTML += character;
      }
    }
  });

(async function clickCharacter() {
  const container = document.querySelector(".characterinfo__container");
  container.classList.remove("hidden");
  let response = await fetch("./json/got.json").then((response) =>
    response.json()
  );
  let character = document.querySelectorAll(".character");
  character.forEach((i) => {
    i.addEventListener("click", chosedCharacter);
  });

  async function chosedCharacter(e) {
    let characterNameOnBoard =
      e.currentTarget.children[e.currentTarget.children.length - 1].textContent;
    let characters = await response;
    for (let i = 0; i < characters.length; i++) {
      if (characterNameOnBoard === characters[i].name) {
        showCharacter(characters[i]);
        showCharacterImage();
        e.currentTarget.children[e.currentTarget.children.length - 2];
      }
    }
  }
})();

function showCharacter(character) {
  const picture = document.querySelector(".characterinfo__container__img");
  const houseOnBoard = document.querySelector(
    ".characterinfo__container__house"
  );
  const name = document.querySelector(".characterinfo__container__name");
  const characterInfo = document.querySelector(
    ".characterinfo__container__info"
  );
  picture.src =
    character.picture ||
    `https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png`;
  picture.alt = character.name;
  name.textContent = character.name || "Name Not Found";
  characterInfo.textContent = character.bio || "Bio Not Found";
  houseOnBoard.src = `assets/houses/${character.house}.png`;
}

const input = document.querySelector(".searcher");

input.addEventListener("keyup", searchCaracter);

async function searchCaracter() {
  claerAllInfo();
  let findCharacter = input.value.toUpperCase();
  let response = await fetch("./json/got.json").then((response) =>
    response.json()
  );
  response.forEach((i) => {
    if (findCharacter === i.name.toUpperCase()) {
      showCharacter(i);
      showCharacterImage();
    }
  });

  setTimeout(() => {
    const characterName = document.querySelector(
      ".characterinfo__container__name"
    );

    if (characterName.textContent === "" && findCharacter !== "") {
      console.log(findCharacter);
      characterName.textContent = `Character not found`;
    }
  }, 3000);
}

function showCharacterImage() {
  const characterImage = document.querySelector(
    ".characterinfo__container__img"
  );
  if (characterImage.alt === "") {
    characterImage.classList.add("hidden");
  } else {
    characterImage.classList.remove("hidden");
  }
}

function claerAllInfo() {
  showCharacterImage();
  const picture = document.querySelector(".characterinfo__container__img");
  const name = document.querySelector(".characterinfo__container__name");
  const characterInfo = document.querySelector(
    ".characterinfo__container__info"
  );
  picture.src = "";
  picture.alt = "";
  name.textContent = "";
  characterInfo.textContent = "";
  const houseOnBoard = document.querySelector(
    ".characterinfo__container__house"
  );
  houseOnBoard.src = ``;
}

arrow = document.querySelector(".fa-angle-right");
aside = document.querySelector(".search__container");
header = document.querySelector(".header");
searcher = document.querySelector(".searcher");
searchIcon = document.querySelector(".fa-magnifying-glass");
info = document.querySelector(".characterinfo__container");

arrow.addEventListener("click", closeTab);

function closeTab() {
  aside.style.width === "8vh"
    ? (aside.style.width = "30vw")
    : (aside.style.width = "8vh");
  header.style.visibility === "hidden"
    ? (header.style.visibility = "visible")
    : (header.style.visibility = "hidden");
  searcher.style.visibility === "hidden"
    ? (searcher.style.visibility = "visible")
    : (searcher.style.visibility = "hidden");
  searchIcon.style.visibility === "hidden"
    ? (searchIcon.style.visibility = "visible")
    : (searchIcon.style.visibility = "hidden");
  info.style.visibility === "hidden"
    ? (info.style.visibility = "visible")
    : (info.style.visibility = "hidden");
  arrow.classList.toggle("fa-angle-left");
}

showCharacterImage();
