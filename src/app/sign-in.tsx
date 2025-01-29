import { authStyles } from "@/styles/authStyles";
import { commonStyles } from "@/styles/commonStyles";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomText from "@/components/shared/CustomText";
import PhoneInput from "@/components/shared/PhoneInput";
import CustomButton from "@/components/shared/CustomButton";
import CustomInput from "@/components/shared/CustomInput";
import { Link } from "expo-router";
import { Colors } from "@/utils/Constants";
import OAUth from "@/components/captain/Oauth";

const SignIn = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleNext = async () => {};

  return (
    <SafeAreaView style={authStyles.container}>
      <ScrollView contentContainerStyle={authStyles.container}>
        <View style={commonStyles.flexRowBetween}>
          <Image
            source={require("@/assets/images/captain_logo.png")}
            style={authStyles.logo}
          />
          <TouchableOpacity style={authStyles.flexRowGap}>
            <MaterialIcons name="help" size={18} color="grey" />
            <CustomText fontFamily="Medium" variant="h7">
              Help
            </CustomText>
          </TouchableOpacity>
        </View>

        <CustomText fontFamily="Medium" variant="h3">
          Welcome
        </CustomText>

        <CustomText
          variant="h5"
          fontFamily="Regular"
          style={commonStyles.lightText}
        >
          Name
        </CustomText>
        <CustomInput
          onChangeText={setName}
          value={name}
          placeholder="Enter Your Name"
        />
        <CustomText
          variant="h5"
          fontFamily="Regular"
          style={commonStyles.lightText}
        >
          Password
        </CustomText>
        <CustomInput
          onChangeText={setPassword}
          value={password}
          placeholder="Enter Your Password"
        />

        <CustomButton
          title="Sign In"
          onPress={handleNext}
          loading={false}
          disabled={false}
        />

        <OAUth></OAUth>

        <Link
          href="/auth"
          style={{ textAlign: "center", marginTop: 25, fontSize: 15 }}
        >
          <Text>Dont Have An Account?</Text>
          <Text style={{ color: Colors.login }}> Sign Up</Text>
        </Link>
      </ScrollView>

      <View style={authStyles.footerContainer}>
        <CustomText
          fontFamily="Regular"
          variant="h8"
          style={[
            commonStyles.lightText,
            { textAlign: "center", marginHorizontal: 20 },
          ]}
        >
          By continuing, you agree to the terms and privacy policy of Lynti
        </CustomText>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
