import { Link, useRootNavigationState, useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// defining properties then pokemon for stronger typescript
// Types for API data
interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonTypeInfo {
  type: {
    name: string;
    url: string;
  };
}

interface PokemonDetailsResponse {
  sprites: {
    front_default?: string | null;
    back_default?: string | null;
  };
  types: PokemonTypeInfo[];
}

interface PokemonListResponse {
  results: PokemonListItem[];
}

interface AbilityEntry {
  language: {
    name: string;
  };
  short_effect?: string;
}

interface AbilityResponse {
  effect_entries: AbilityEntry[];
}

interface Pokemon {
  name: string;
  url: string;
  image: string | null;
  imageBack: string | null;
  types: PokemonTypeInfo[]; // array bc there can be more than one type
}

// Colours for each Pokemon type
const colorsByType = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

// Overall function that creates the page
export default function Index() {
  // Const variables and states for page navigation
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const openedUserInfo = useRef(false);

  // Const variables and states for displaying Pokemon
  const params = useLocalSearchParams();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokeNumber, onChangePokeNumber] = useState<string>(
    String(params.pokeNumber ?? "20"),
  );
  // separate input value from the displayed/active pokeNumber
  const [inputValue, setInputValue] = useState<string>("");
  const [displayPokeNumber, setDisplayPokeNumber] = useState<string>(
    String(params.pokeNumber ?? "20"),
  );

  // State for error messages + handling loading state
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handling smoother navigation
  useEffect(() => {
    if (!rootNavigationState?.key) return;
    if (openedUserInfo.current) return;

    openedUserInfo.current = true;
    const id = setTimeout(() => {
      router.push("/userinfo");
    }, 0);

    return () => clearTimeout(id);
  }, [rootNavigationState?.key, router]);

  // Update pokeNumber and related states when params change
  useEffect(() => {
    if (params.pokeNumber) {
      onChangePokeNumber(String(params.pokeNumber));
      setDisplayPokeNumber(String(params.pokeNumber));
      fetchPokemons(Number(params.pokeNumber));
    }
  }, [params.pokeNumber]);

  // Default/placeholder fetch pokemon from API
  useEffect(() => {
    fetchPokemons(20);
  }, []);

  // Async function to fetch Pokemon data from API
  async function fetchPokemons(num: number) {
    setIsLoading(true);
    try {
      /* fetch is a function that lets u hit an API,
      takes URL (endpoint) as a parameter and some request info
      endpoint gives 20 pokemon in JSON format*/
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${num}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon list");
      }

      /* pokemon saved in response variable 
      but we need to convert it to JSON format 
      so it can be used in app
      */
      const data: PokemonListResponse = await response.json();

      // fetch detailed info for each pokemon in parallel
      const detailedPokemons: Pokemon[] = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          if (!res.ok) {
            throw new Error(`Failed to fetch ${pokemon.name}`);
          }

          const details: PokemonDetailsResponse = await res.json();

          const primaryType = details.types?.[0]?.type?.name ?? "normal";

          return {
            name: pokemon.name,
            url: pokemon.url,
            image: details.sprites?.front_default ?? null,
            imageBack: details.sprites?.back_default ?? null,
            types: details.types ?? [],
            primaryType,
          };
        }),
      );

      // set state to detailedPokemons
      setPokemons(detailedPokemons);
      return true;
    } catch (e) {
      // catch errors and log to console
      console.log(e);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  // Error handling for user input
  const handlePokeNumber = (value: string) => {
    const pokeValue = Number(value);

    if (!Number.isInteger(pokeValue) || pokeValue < 1 || pokeValue > 100) {
      setErrorMessage(
        "Please pick a number of Pokemon between 1 to 100 to display",
      );
      return false;
    }

    setErrorMessage("");
    return true;
  };

  // Returning GUI, which maps Pokemon to GUI components
  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      <Text style={styles.heading}>Hello {params.userName ?? "there"}!</Text>
      <Text style={styles.normaltext}>
        We are currently displaying {displayPokeNumber} pokemon!
      </Text>

      <View style={styles.inline}>
        <TextInput
          style={styles.input}
          placeholder="How many Pokemon do you want to see?"
          onChangeText={setInputValue}
          value={inputValue}
          keyboardType="numeric"
        />
        <Pressable
          style={styles.button}
          onPress={async (e) => {
            // validate inputs; prevent fetching pokemon if invalid
            if (!handlePokeNumber(inputValue)) {
              e.preventDefault();
            } else {
              const ok = await fetchPokemons(Number(inputValue));
              if (ok) {
                setDisplayPokeNumber(String(inputValue));
                setInputValue("");
                onChangePokeNumber(String(inputValue));
              }
            }
          }}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>Done</Text>
        </Pressable>
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#111"
          style={{ marginTop: 24 }}
        />
      ) : (
        pokemons.map((pokemon) => (
          <Link
            key={pokemon.name}
            href={{
              pathname: "/details",
              params: { name: pokemon.name, url: pokemon.url },
            }}
            style={{
              // @ts-ignore this is happening because the types were not defined but not needed
              backgroundColor: colorsByType[pokemon.types[0].type.name] + 50,
              padding: 20,
              borderRadius: 15,
            }}
          >
            <View>
              <Text style={styles.name}>{pokemon.name}</Text>
              <Text style={styles.type}>{pokemon.types[0].type.name}</Text>

              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Image
                  source={{ uri: pokemon.image ?? "" }}
                  style={{ width: 150, height: 150 }}
                />
                <Image
                  source={{ uri: pokemon.imageBack ?? "" }}
                  style={{ width: 150, height: 150 }}
                />
              </View>
            </View>
          </Link>
        ))
      )}
    </ScrollView>
  );
}

// Styling for page
const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: 700,
    textAlign: "center",
    fontFamily: "SF Pro Display",
    letterSpacing: -0.25,
  },
  type: {
    fontSize: 20,
    fontWeight: 400,
    color: "grey",
    textAlign: "center",
    letterSpacing: -0.14,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "SF Pro Display",
    letterSpacing: -0.21,
  },
  normaltext: {
    marginBottom: 5,
    fontFamily: "SF Pro Display",
    letterSpacing: -0.21,
  },
  input: {
    height: 40,
    width: 260,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "#211818",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 12,
    alignSelf: "center",
  },
  inline: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  errorText: {
    fontFamily: "SF Pro Display",
    letterSpacing: -0.21,
    color: "red",
    fontSize: 14,
    textAlign: "center",
    margin: 10,
  },
});
