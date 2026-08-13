import { Link, router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function UserInfo() {
  const params = useLocalSearchParams();

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      <Text style={styles.heading}>Welcome {params.name}!</Text>
      <Text style={styles.normaltext}>
        This program will let you look at basic Pokemon information, depending
        on how many you want to see!
        {"\n\n"}Right now, you want to see {params.pokeNumber}, but you can see
        more or less than that if you want!
        {"\n\n"}Change the number of Pokemon at the top of the Home page!
      </Text>

      <Link
        href={{
          pathname: "./",
          params: { userName: params.name, pokeNumber: params.pokeNumber },
        }}
        style={styles.button}
        onPress={() => router.dismissAll()}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>Done</Text>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "SF Pro Display",
    letterSpacing: -0.21,
  },
  normaltext: {
    marginBottom: 20,
    fontFamily: "SF Pro Display",
    letterSpacing: -0.21,
  },
  button: {
    backgroundColor: "#211818",
    paddingHorizontal: 160,
    paddingVertical: 14,
    borderRadius: 12,
    alignSelf: "center",
    width: "100%",
  },
});
