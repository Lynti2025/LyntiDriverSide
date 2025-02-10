import { View, Text, StyleSheet, Image } from "react-native";
import CustomButton from "../shared/CustomButton";
import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { googleOAuth } from "@/lib/googleAuth";
import { useCallback } from "react";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await googleOAuth(startOAuthFlow);

      if (result.code == "session_exists" || result.code == "success") {
        router.push("/documentUpload");
      }
    } catch (err) {
      console.error("Oauth error", err);
    }
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.text}>Or</Text>
        <View style={styles.line} />
      </View>
      <CustomButton
        title="Log In With Google"
        onPress={handleGoogleSignIn}
        loading={false}
        disabled={false}
        bgVariant="outline"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 15,
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  text: {
    marginHorizontal: 10,
    color: "#000",
    fontSize: 15,
  },
});

export default OAuth;

const handleGoogleSignIn = async () => {};
