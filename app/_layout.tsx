import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="userinfo"
        options={() =>
          Platform.OS === "android"
            ? {
                title: "User Details",
                headerBackButtonDisplayMode: "minimal",
                headerBackVisible: false,
              }
            : {
                title: "User Details",
                headerBackButtonDisplayMode: "minimal",
                presentation: "formSheet",
                sheetAllowedDetents: [0.55, 0.7],
                sheetGrabberVisible: true,
                gestureEnabled: false,
                headerBackVisible: false,
              }
        }
      />
      <Stack.Screen
        name="welcome"
        options={() =>
          Platform.OS === "android"
            ? {
                title: "Welcome",
                headerBackButtonDisplayMode: "minimal",
                headerBackVisible: false,
              }
            : {
                title: "Welcome",
                headerBackButtonDisplayMode: "minimal",
                presentation: "formSheet",
                sheetAllowedDetents: [0.45],
                gestureEnabled: false,
                headerBackVisible: false,
              }
        }
      />
      <Stack.Screen
        name="details"
        options={{
          title: "Details",
          headerBackButtonDisplayMode: "minimal",
          presentation: "formSheet",
          sheetAllowedDetents: [0.3, 0.5],
          sheetGrabberVisible: true,
        }}
      />
    </Stack>
  );
}
