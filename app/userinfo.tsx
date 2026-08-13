import { Link, router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function UserInfo() {
  const [name, onChangeName] = useState("");
  const [age, onChangeAge] = useState("");
  const [pokeNumber, onChangePokeNumber] = useState("");

  const [errorMessage, setErrorMessage] = useState('');

  const isEnabled = name.trim().length > 0 && age.trim().length > 0 && pokeNumber.trim().length > 0;
  const buttonStyle = isEnabled ? styles.enabledButton : styles.disabledButton;

  const handleUserInfo = () => {
    const trimmedName = name.trim();
    const ageValue = Number(age);
    const pokeValue = Number(pokeNumber);

    if (!trimmedName || !age || !pokeNumber) {
      setErrorMessage('Name, age and number of Pokemon cannot be empty. Please enter your details!');
      return false;
    }

    if (trimmedName.length < 3 || trimmedName.length > 15) {
      setErrorMessage('Name must be longer than 3 characters and less than 16 characters!');
      return false;
    }

    if (!/^[A-Za-z]+$/.test(trimmedName)) {
      setErrorMessage('Only letters are allowed in your name! No spaces, symbols, or special characters!');
      return false;
    }

    if (!Number.isInteger(ageValue) || ageValue < 12 || ageValue > 110) {
      setErrorMessage('Only people over age 12 and below 110 can use this program. Please use numbers for your age.');
      return false;
    }

    if (!Number.isInteger(pokeValue) || pokeValue < 1 || pokeValue > 100) {
      setErrorMessage('Please pick a number of Pokemon between 1 to 100 to display');
      return false;
    }

    setErrorMessage('');
    return true;
  };

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
            autoCorrect = {false}
            autoCapitalize="words"
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
            onPress={(e) => {
              // validate inputs; prevent navigation if invalid
              if (!handleUserInfo()) {
                e.preventDefault();
              } else {
                router.dismiss();
              }
            }}
        >
            <Text style={{ color: "white", fontWeight: "600" }}>Done</Text>
        </Link>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
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
    width: '100%',
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
  },
  enabledButton: {
    backgroundColor: "#211818",
    marginTop: 5,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignSelf: "center",
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#737373', // Disabled color
    marginTop: 5,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignSelf: "center",
    textAlign: 'center',
  },
  container: {
    display: 'flex',
  },
  errorText: {
    fontFamily: "SF Pro Display",
    letterSpacing: -0.21,
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
  }
});
