import AppProvider from "@/components/AppProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerTitle:'Tabs', headerShown:false }}/>
      </Stack>
    </AppProvider>
  );
}
