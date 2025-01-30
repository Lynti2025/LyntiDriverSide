import { Stack } from "expo-router";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { tokenCache } from "@/lib/auth";

import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Slot } from "expo-router";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

const Layout = () => {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="home" />
          <Stack.Screen name="sign-in" />
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default gestureHandlerRootHOC(Layout);
