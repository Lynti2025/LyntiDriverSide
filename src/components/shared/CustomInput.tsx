import { View, Text, StyleSheet } from "react-native";
import React, { FC } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import CustomText from "./CustomText";
import { TextInput } from "react-native-gesture-handler";

const CustomInput: FC<CustomInputProps> = ({
  value,
  onChangeText,
  placeholder,
}) => {
  return (
    <View style={styles.container}>
      <CustomText fontFamily="Medium" style={styles.text}>
        X
      </CustomText>
      <TextInput
        placeholder={placeholder}
        keyboardType="default"
        value={value}
        maxLength={25}
        onChangeText={onChangeText}
        placeholderTextColor={"#ccc"}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginVertical: 5,
    borderWidth: 3,
    borderColor: "#333333",
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  input: {
    fontSize: RFValue(13),
    fontFamily: "Medium",
    height: 45,
    width: "90%",
    color: "#fff",
  },
  text: {
    fontSize: RFValue(13),
    top: -1,
    fontFamily: "Medium",
  },
});

export default CustomInput;
