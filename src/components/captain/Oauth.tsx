import { View, Text, StyleSheet, Image } from "react-native";
import CustomButton from "../shared/CustomButton";

const OAUth = () => (
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

export default OAUth;

const handleGoogleSignIn = async () => {};
