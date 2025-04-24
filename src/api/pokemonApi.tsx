// Importieren der Typen für die API-Antworten
// Diese Typen definieren die Struktur der Daten, die von der API zurückgegeben werden
import {
  PokemonListResponse,
  PokemonDetails,
  PokemonType,
} from '../types/pokemonTypes';

// Funktion: fetchPokemonList
// Zweck: Ruft eine Liste von Pokémon von der PokeAPI ab
// Parameter: limit (optional, Standardwert 151) - Anzahl der Pokémon, die abgerufen werden sollen
// Rückgabewert: Promise<PokemonListResponse> - Eine Liste von Pokémon mit Namen und URLs
export const fetchPokemonList = async (
  limit: number = 151
): Promise<PokemonListResponse> => {
  try {
    // API-Anfrage an die PokeAPI, um eine Liste von Pokémon abzurufen
    // Die URL enthält den Parameter "limit", um die Anzahl der abgerufenen Pokémon zu begrenzen
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
    );

    // Überprüfen, ob die Anfrage erfolgreich war (Statuscode 200)
    // Wenn nicht, wird ein Fehler ausgelöst
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon list');
    }

    // Die Antwort in JSON-Format umwandeln
    const data = await response.json();

    // Die Daten zurückgeben
    return data;
  } catch (error) {
    // Fehlerbehandlung: Fehler in der Konsole ausgeben und weiterwerfen
    console.error('Error fetching Pokémon list:', error);
    throw error;
  }
};

// Funktion: fetchPokemonDetails
// Zweck: Ruft detaillierte Informationen zu einem bestimmten Pokémon ab
// Parameter: name - Der Name des Pokémon, dessen Details abgerufen werden sollen
// Rückgabewert: Promise<PokemonDetails> - Detaillierte Informationen zu einem Pokémon (z. B. ID, Sprites, Typen)
export const fetchPokemonDetails = async (
  name: string
): Promise<PokemonDetails> => {
  try {
    // API-Anfrage an die PokeAPI, um Details zu einem bestimmten Pokémon abzurufen
    // Die URL enthält den Namen des Pokémon
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    // Überprüfen, ob die Anfrage erfolgreich war (Statuscode 200)
    // Wenn nicht, wird ein Fehler ausgelöst
    if (!response.ok) {
      throw new Error(`Failed to fetch details for ${name}`);
    }

    // Die Antwort in JSON-Format umwandeln
    const data = await response.json();

    // Die Daten zurückgeben
    return data;
  } catch (error) {
    // Fehlerbehandlung: Fehler in der Konsole ausgeben und weiterwerfen
    console.error(`Error fetching details for ${name}:`, error);
    throw error;
  }
};

// Funktion: fetchPokemonTypes
// Zweck: Ruft eine Liste aller Pokémon-Typen von der PokeAPI ab
// Parameter: Keine
// Rückgabewert: Promise<{ results: PokemonType[] }> - Eine Liste von Pokémon-Typen (z. B. "grass", "fire")
export const fetchPokemonTypes = async (): Promise<{
  results: PokemonType[];
}> => {
  try {
    // API-Anfrage an die PokeAPI, um eine Liste aller Typen abzurufen
    const response = await fetch('https://pokeapi.co/api/v2/type');

    // Überprüfen, ob die Anfrage erfolgreich war (Statuscode 200)
    // Wenn nicht, wird ein Fehler ausgelöst
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon types');
    }

    // Die Antwort in JSON-Format umwandeln
    const data = await response.json();

    // Die Daten zurückgeben
    return data;
  } catch (error) {
    // Fehlerbehandlung: Fehler in der Konsole ausgeben und weiterwerfen
    console.error('Error fetching Pokémon types:', error);
    throw error;
  }
};

export async function fetchPokemonByType(type: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await res.json();
  return data;
}
