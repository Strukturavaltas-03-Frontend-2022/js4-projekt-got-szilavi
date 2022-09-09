const table = document.querySelector(".tabble__characters");

fetch("./json/got.json")
  .then((response) => response.json())
  .then((charactersAllData) => {
    for (let i = 0; i < charactersAllData.length; i++) {
      const character = `     <div class="character">
       <img class=character__image src="${charactersAllData[i].portrait}" />
       <div class="character__name">${charactersAllData[i].name}</div>
       </div>`;
      if (!charactersAllData[i].dead) {
        table.innerHTML += character;
      }
    }
  });

(async function clickCharacter() {
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

//function resetInfo() {
//  let charContainer = document.querySelector(".characterinfo__container");
//  charContainer.classList.toggle("disabled");
// if (
//   charContainer.children[charContainer.children.length - 1].textContent === ""
// ) {
//   charContainer.classList.add("disabled");
// }
//};
