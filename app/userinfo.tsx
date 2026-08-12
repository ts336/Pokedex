import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text } from "react-native";

export default function UserInfo() {
    return (
        <ScrollView
        contentContainerStyle={{
            gap: 16,
            padding: 16,
        }}
        >
            <Text>Hello</Text>

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
