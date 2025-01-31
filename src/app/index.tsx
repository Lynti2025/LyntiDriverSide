import { View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { commonStyles } from "@/styles/commonStyles";
import { splashStyles } from "@/styles/splashStyles";
import CustomText from "@/components/shared/CustomText";
import { useFonts } from "expo-font";
import { resetAndNavigate } from "@/utils/Helpers";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

const Main = () => {
  const [loaded] = useFonts({
    Bold: require("../assets/fonts/NotoSans-Bold.ttf"),
    Regular: require("../assets/fonts/NotoSans-Regular.ttf"),
    Medium: require("../assets/fonts/NotoSans-Medium.ttf"),
    Light: require("../assets/fonts/NotoSans-Light.ttf"),
    SemiBold: require("../assets/fonts/NotoSans-SemiBold.ttf"),
  });

  const [hasNavigated, setHasNavigated] = useState(false);

  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/InApp/home"} />;
  }

  const tokenCheck = async () => {
    resetAndNavigate("/auth");
  };

  useEffect(() => {
    if (loaded && !hasNavigated) {
      const timeoutId = setTimeout(() => {
        tokenCheck();
        setHasNavigated(true);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [loaded, hasNavigated]);

  return (
    <View style={commonStyles.container}>
      <Image
        source={require("@/assets/images/logo_t.png")}
        style={splashStyles.img}
      />
      <CustomText variant="h5" fontFamily="Medium" style={splashStyles.text}>
        Made for Drivers
      </CustomText>
    </View>
  );
};

export default Main;
