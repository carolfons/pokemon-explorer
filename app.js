// Dicionário de tradução de tipos
const typeTranslations = {
  normal: "Normal",
  fire: "Fogo",
  water: "Água",
  electric: "Elétrico",
  grass: "Grama",
  ice: "Gelo",
  fighting: "Lutador",
  poison: "Veneno",
  ground: "Terra",
  flying: "Voador",
  psychic: "Psíquico",
  bug: "Inseto",
  rock: "Pedra",
  ghost: "Fantasma",
  dragon: "Dragão",
  dark: "Sombrio",
  steel: "Aço",
  fairy: "Fada",
};

// Função para traduzir tipos
function translateType(type) {
  return typeTranslations[type] || type;
}

async function fetchPokemonData() {
  const pokemonNameOrId = document
    .getElementById("search-input")
    .value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`;

  //limpa a mensagem de erro ao iniciar uma nova busca
  const errorMessage = document.getElementById("error-message");
  errorMessage.style.display = "none"; // Esconde o erro

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayPokemonData(data);
    } else {
      showErrorMessage("Pokémon not found! Try again!");
    }
  } catch (error) {
    showErrorMessage("Pokémon not found");
    console.error("Error:", error);
  }
}

function displayPokemonData(data) {
  const pokemonName = data.name;
  const translatedTypes = data.types
    .map((type) => translateType(type.type.name))
    .join(", ");
  const pokemonAbilities = data.abilities
    .map((ability) => ability.ability.name)
    .join(", ");

  //   const pokemonHeight = data.height;
  //   const pokemonWeight = data.weight;

  const pokemonDisplay = document.getElementById("pokemon-container");
  pokemonDisplay.innerHTML = `
         <div class="pokemon-card">
                <img src= https://play.pokemonshowdown.com/sprites/ani/${pokemonName}.gif
 alt="Pokémon">
                <h2 id="pokemon-name">${pokemonName}</h2>
                <p id="pokemon-type"><span>Tipo:</span>&nbsp; &nbsp; ${translatedTypes}</p>
                <p id="pokemon-abilities"><span>Habilidade:</span>&nbsp;&nbsp; ${pokemonAbilities}</p>
                 <ul>
            ${data.stats
              .map((stat) => `<li>${stat.stat.name}: ${stat.base_stat}</li>`)
              .join("")}
        </ul>
            </div>
    
    `;
}
{
  /*  */
}

function showErrorMessage(message) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.style.display = "block";
  errorMessage.textContent = message;
  document.getElementById("pokemon-container").innerHTML = ""; //limpa o container de pokemon
}
