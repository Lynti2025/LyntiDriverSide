import { ScrollView, Text, View } from "react-native";
import {
  SafeAreaFrameContext,
  SafeAreaView,
} from "react-native-safe-area-context";

const SignUp = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, backgroundColor: "wrazer-black" }}>
        <View style={{ width: "100%", height: 250, position: "relative" }}>
          <Text
            style={{
              fontSize: 24,
              color: "black",
              marginTop: 200,
              textAlign: "center",
            }}
          >
            Join Lynti Rides
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
