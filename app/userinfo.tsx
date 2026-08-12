import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput } from "react-native";

export default function UserInfo() {
    const [name, onChangeName] = useState('');
    const [age, onChangeAge] = useState('');

    return (
        <ScrollView
        contentContainerStyle={{
            gap: 16,
            padding: 16,
        }}
        >
            <Text>Welcome to Basic Pokedex! Enter the following to get started!</Text>
            <TextInput
                //style={}
                placeholder="What is your name?"
                onChangeText={onChangeName}
                value={name}
            />
            <TextInput
                //style={}
                placeholder="What is your age?"
                onChangeText={onChangeAge}
                value={age}
                keyboardType="numeric"
            />

        <Pressable
        onPress={() => router.back()}
        style={{
          backgroundColor: "#111",
          padding: 14,
          borderRadius: 12,
          alignSelf: "flex-start",
        }}
        >
            <Text style={{ color: "white", fontWeight: "600" }}>Done</Text>
        </Pressable>
        </ScrollView>
  );
}
