import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

// Store ability name and description
type AbilityInfo = {
  name: string;
  description: string;
};

export default function Details() {
  // Get params and set state for abilities
  const params = useLocalSearchParams();
  const [abilities, setAbilities] = useState<AbilityInfo[]>([]);

  // Fetch Pokemon details
  async function fetchPokemonByName(url: any) {
    try {
      const response = await fetch(url);
      const details = await response.json();

      const abilityInfo = await Promise.all(
        details.abilities.map(async (item: any) => {
          const res = await fetch(item.ability.url);
          const abilityData = await res.json();

          const englishEntry = abilityData.effect_entries.find(
            (entry: any) => entry.language.name === "en",
          );

          return {
            name: item.ability.name,
            // ? only read short_effect if englishEntry exists
            // ?? otherwise use fallback string
            description: englishEntry?.short_effect ?? "No description found",
          };
        }),
      );

      setAbilities(abilityInfo);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchPokemonByName(params.url); // fetch selected pokemon details
  }, [params.url]); // re-fetch whenever URL changes

  return (
    // <> </> (fragment) because component can only return one top-level JSX element
    // <Stack.Screen> and <ScrollView> are siblings and thus need to be wrapped in a single parent
    // satisfies the rule, does not add extra ui, better than View wrap when no styling/layout needed
    <>
      <Stack.Screen options={{ title: params.name as string }} />
      <ScrollView
        contentContainerStyle={{
          gap: 16,
          padding: 16,
        }}
      >
        {abilities.map((ability) => (
          <React.Fragment key={ability.name}>
            <Text style={styles.ability}>{ability.name}</Text>
            <Text style={styles.description}>{ability.description}</Text>
          </React.Fragment>
        ))}
      </ScrollView>
    </>
  );
}

// Styling for page
const styles = StyleSheet.create({
  ability: {
    fontSize: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    color: "grey",
  },
});
