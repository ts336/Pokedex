import { Link, router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function UserInfo() {
  const [name, onChangeName] = useState("");
  const [age, onChangeAge] = useState("");
  const [pokeNumber, onChangePokeNumber] = useState("");

  // Enables button when there is input
  const isEnabled = name.length > 0 && age.length > 0 && pokeNumber.length > 0; 
  const buttonStyle = isEnabled ? styles.enabledButton : styles.disabledButton;

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      
      <View style={styles.container}>
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
            style={buttonStyle}
            disabled={!isEnabled}
            onPress={() => router.dismiss()}
        >
            <Text style={{ color: "white", fontWeight: "600" }}>Done</Text>
        </Link>
      </View>
      
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "SF Pro Display",
    letterSpacing: -0.21,
    marginBottom: 10
  },
  normaltext: {
    marginBottom: 30,
    fontFamily: "SF Pro Display",
    letterSpacing: -0.21,
  },
  input: {
    fontFamily: "SF Pro Display",
    letterSpacing: -0.21,
    width: '80%',
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  enabledButton: {
    backgroundColor: "#211818",
    marginTop: 5,
    width: '80%',
    paddingVertical: 14,
    borderRadius: 12,
    alignSelf: "center",
  },
  disabledButton: {
    backgroundColor: '#77888C', // Disabled color
    marginTop: 5,
    width: '80%',
    paddingVertical: 14,
    borderRadius: 12,
    alignSelf: "center",
  },
  container: {
    display: 'flex',
  }
});
