import { authStyles } from "@/styles/authStyles";
import { commonStyles } from "@/styles/commonStyles";
import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomText from "@/components/shared/CustomText";
import CustomButton from "@/components/shared/CustomButton";
import CustomInput from "@/components/shared/CustomInput";
import { Link, router } from "expo-router";
import { Colors } from "@/utils/Constants";
import OAUth from "@/components/captain/Oauth";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import CheckImage from "@/assets/images/check.png";
import EmailInput from "@/components/shared/EmailInput";

const Auth = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Verify email with Clerk
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (signUpAttempt.status === "complete") {
        // Get Clerk User ID
        const clerkId = signUpAttempt.createdUserId;

        // Save user to NeonDB
        await fetch("https://your-backend.com/api/createUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkId,
            email: form.email,
            name: form.name,
          }),
        });

        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors?.[0]?.longMessage || "An error occurred",
        state: "failed",
      });
    }
  };

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
          Create Your Account
        </CustomText>

        <CustomText
          variant="h5"
          fontFamily="Regular"
          style={commonStyles.lightText}
        >
          Name
        </CustomText>
        <CustomInput
          onChangeText={(value) =>
            setForm({
              ...form,
              name: value,
            })
          }
          value={form.name}
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
          onChangeText={(value) => setForm({ ...form, password: value })}
          value={form.password}
          placeholder="Enter Your Password"
        />

        <CustomText
          variant="h5"
          fontFamily="Regular"
          style={commonStyles.lightText}
        >
          E-mail
        </CustomText>
        <EmailInput
          value={form.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
        ></EmailInput>
        <CustomButton
          title="Sign Up"
          onPress={onSignUpPress}
          loading={false}
          disabled={false}
        />

        <OAUth></OAUth>

        <Link
          href="/sign-in"
          style={{ textAlign: "center", marginTop: 25, fontSize: 15 }}
        >
          <Text>Already have an account?</Text>
          <Text style={{ color: Colors.login }}> Log In</Text>
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
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if ((verification.state = "success")) setShowSuccessModal(true);
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 7, // Equivalent to px-7
              paddingVertical: 9, // Equivalent to py-9
              borderRadius: 16, // Equivalent to rounded-2xl (approx)
              minHeight: 300, // Equivalent to min-h-[300px]
            }}
          >
            <Text style={{ textAlign: "center" }}>verification</Text>
            <Text style={{ textAlign: "center" }}>
              We've sent a verification code to {form.email}
            </Text>

            <Text>Code</Text>
            <CustomInput
              value={verification.code}
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
              placeholder={"enter the verification code"}
            ></CustomInput>
            {verification.error && (
              <Text style={{ color: "red" }}>{verification.error}</Text>
            )}
            <Button title="verify email" onPress={onVerifyPress}></Button>
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={showSuccessModal}>
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 7, // Equivalent to px-7
              paddingVertical: 9, // Equivalent to py-9
              borderRadius: 16, // Equivalent to rounded-2xl (approx)
              minHeight: 300, // Equivalent to min-h-[300px]
            }}
          >
            <Image
              source={CheckImage}
              style={{
                width: 110,
                height: 110,
                margin: "auto",
                marginVertical: 5,
              }}
            />
            <Text style={{ textAlign: "center" }}>Verified</Text>
            <Text style={{ textAlign: "center", marginTop: 20, fontSize: 15 }}>
              You have successfully verified your account
            </Text>
            <Button
              title="Browse Home"
              onPress={() => router.replace("/documentUpload")}
            ></Button>
          </View>
        </ReactNativeModal>
      </View>
    </SafeAreaView>
  );
};

export default Auth;
