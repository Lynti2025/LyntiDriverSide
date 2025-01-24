import { ScrollView, Text, View } from "react-native";

const SignUp = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Text className="text-2xl text-black">Create Your Account</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
