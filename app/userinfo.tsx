import { Link, router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput } from "react-native";

export default function UserInfo() {
  const [name, onChangeName] = useState("");
  const [age, onChangeAge] = useState("");
  const [pokeNumber, onChangePokeNumber] = useState("");

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      <Text style={styles.heading}>Welcome to Basic Pokedex!</Text>
      <Text style={styles.normaltext}>Enter the following to get started!</Text>
      <TextInput
        style={styles.input}
        placeholder="What is your name?"
        onChangeText={onChangeName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="What is your age?"
        onChangeText={onChangeAge}
        value={age}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="How many Pokemon do you want to see?"
        onChangeText={onChangePokeNumber}
        value={pokeNumber}
        keyboardType="numeric"
      />
      <Link
        href={{
          pathname: "/welcome",
          params: { name: name, pokeNumber: pokeNumber },
        }}
        style={styles.button}
        onPress={() => router.dismiss()}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>Done</Text>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: "bold",
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
    alignSelf: "center",
  },
});
