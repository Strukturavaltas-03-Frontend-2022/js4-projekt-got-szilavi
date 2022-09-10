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
      }
    }
  }
})();

function showCharacter(character) {
  const picture = document.querySelector(".characterinfo__container__img");
  const name = document.querySelector(".characterinfo__container__name");
  const characterInfo = document.querySelector(
    ".characterinfo__container__info"
  );
  picture.src = character.picture;
  picture.alt = character.name;
  name.textContent = character.name;
  characterInfo.textContent = character.bio;

  const houseName = character.house;
  const houseOnBoard = document.querySelector(
    ".characterinfo__container__house"
  );
  houseOnBoard.src = `assets/houses/${houseName}.png`;
}

const input = document.querySelector(".searcher");

input.addEventListener("keyup", searchCaracter);

async function searchCaracter() {
  let findCharacter = input.value.toUpperCase();
  let response = await fetch("./json/got.json").then((response) =>
    response.json()
  );

  response.forEach((i) => {
    if (findCharacter === i.name.toUpperCase()) {
      showCharacter(i);
    }
  });
}

function showCharacterImage() {
  const characterImage = document.querySelector(
    ".characterinfo__container__img"
  );
  console.log(characterImage.alt);
  if (characterImage.alt === "") {
    console.log(characterImage.alt);
    characterImage.classList.add("hidden");
  } else {
    characterImage.classList.remove("hidden");
  }
}

showCharacterImage();

//function resetInfo() {
//  let charContainer = document.querySelector(".characterinfo__container");
//  charContainer.classList.toggle("disabled");
// if (
//   charContainer.children[charContainer.children.length - 1].textContent === ""
// ) {
//   charContainer.classList.add("disabled");
// }
//};
