const searchBtn = document.getElementById('searchBtn');
const resultContainer = document.getElementById('resultContainer');

async function fetchPokemon() {
    const pokemonName = document.getElementById('pokemonInput').value.toLowerCase().trim();

    if (!pokemonName) {
        resultContainer.innerHTML = "<p style='color: orange;'>Por favor, escribe el nombre de un Pokémon.</p>";
        return;
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
    resultContainer.innerHTML = "Cargando...";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Pokémon no encontrado. Revisa la ortografía.");
        }

        // --- EL PASO QUE FALTABA ---
        const data = await response.json(); 
        // ---------------------------

        const name = data.name.toUpperCase();
        const types = data.types.map(t => t.type.name).join(", ");
        const spriteUrl = data.sprites.front_default;

        resultContainer.innerHTML = `
            <div style="border: 2px solid #3b4cca; padding: 20px; border-radius: 15px; text-align: center; width: fit-content; background-color: #f0f0f0;">
                <h3 style="color: #3b4cca;">¡Pokémon Encontrado!</h3>
                <img src="${spriteUrl}" alt="${name}" style="width: 150px; height: 150px;">
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Tipo:</strong> ${types}</p>
            </div>
        `;

    } catch (error) {
        resultContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        console.error("Hubo un problema:", error);
    }
}

searchBtn.addEventListener('click', fetchPokemon);