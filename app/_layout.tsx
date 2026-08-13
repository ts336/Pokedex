import { Stack } from "expo-router";

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
        options={{
          title: "User Details",
          headerBackButtonDisplayMode: "minimal",
          presentation: "formSheet",
          sheetAllowedDetents: [0.7, 0.9],
          sheetGrabberVisible: true,
          gestureEnabled: false,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="welcome"
        options={{
          title: "Welcome",
          headerBackButtonDisplayMode: "minimal",
          presentation: "formSheet",
          sheetAllowedDetents: [0.45],
          sheetGrabberVisible: true,
        }}
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
