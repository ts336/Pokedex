import { Link, useRootNavigationState, useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface Pokemon {
  name: string;
  url: string;
  image: string;
  imageBack: string;
  types: PokemonType[]; // array bc there can be more than one type
}

interface PokemonType {
  type: {
      name: string;
      url: string;
  }
}

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
}

export default function Index() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const openedUserInfo = useRef(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const params = useLocalSearchParams();

  // To let app load correctly
  useEffect(() => {
    if (!rootNavigationState?.key) return;
    if (openedUserInfo.current) return;

    openedUserInfo.current = true;
    const id = setTimeout(() => {
      router.push("/userinfo");
    }, 0);

    return () => clearTimeout(id);
  }, [rootNavigationState?.key, router]);

  // fetch pokemon from api
  useEffect(() => {
      fetchPokemons();
  }, []);
  
  async function fetchPokemons() {
    try {
      /* fetch is a function that lets u hit an API,
      takes URL (endpoint) as a parameter and some request info
      endpoint gives 20 pokemon in JSON format*/
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=50"
      );
      
      /* pokemon saved in response variable 
      but we need to convert it to JSON format 
      so it can be used in app
      */
      const data = await response.json();


      // fetch detailed info for each pokemon in parallel      
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default, // get image 
            imageBack: details.sprites.back_default,
            types: details.types,
            url: pokemon.url,
          };
        })
      );

      // set state to detailedPokemons
      setPokemons(detailedPokemons);

    } catch (e) { // catch errors and log to console
        console.log(e);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      <Text style={styles.heading}>Hello {params.userName}!</Text>
      <Text style={styles.normaltext}>
          We are currently displaying {params.pokeNumber} pokemon!
      </Text>
      {/* <TextInput
        style={styles.input}
        placeholder="How many Pokemon do you want to see?"
        onChangeText={onChangePokeNumber}
        value={pokeNumber}
        keyboardType="numeric"
      /> */}
      {pokemons.map((pokemon) => (
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
              
              <View style={{
                flexDirection: "row",
              }}>
                <Image 
                  source={{uri: pokemon.image}}
                  style={{ width: 150, height: 150}}
                />
                <Image 
                  source={{uri: pokemon.imageBack}}
                  style={{ width: 150, height: 150}}
                />
              </View>
          </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: "center",
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
    textAlign: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  normaltext: {
      marginBottom: 5,        
  },
  input: {
      height: 40,
      marginBottom: 10,
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
  },
  button: {
      backgroundColor: "#111",
      paddingHorizontal: 160,
      paddingVertical: 14,
      borderRadius: 12,
      alignSelf: 'center',
  }
})