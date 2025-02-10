import * as Linking from "expo-linking";
import { fetchAPI } from "./fetch";

export const googleOAuth = async (startOAuthFlow: any) => {
  try {
    const { createdSessionId, signIn, signUp, setActive } =
      await startOAuthFlow({
        redirectUrl: Linking.createURL("/(root)/(tabs)/home", {
          scheme: "myapp",
        }),
      });

    // If sign in was successful, set the active session
    if (createdSessionId) {
      if (setActive) {
        await setActive!({ session: createdSessionId });

        if (signUp.createdUserId) {
          await fetchAPI("/(api)/user", {
            method: "POST",
            body: JSON.stringify({
              name: `${signUp.firstName} ${signUp.lastName}`,
              email: signUp.emailAddress,
              clerkId: signUp.createdUserId,
            }),
          });
        }

        return {
          success: true,
          code: "success",
          message: "You have successfully authenticated",
        };
      }
    }

    return {
      success: false,
      code: "Success",
      message: "An error occurred",
    };
  } catch (error: any) {
    console.log(error);

    return {
      success: false,
      code: error.code,
      message: error?.errors[0]?.longMessage,
    };
  }
};
