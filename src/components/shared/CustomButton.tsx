import { Colors } from "@/utils/Constants";
import React, { FC } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import CustomText from "./CustomText";

const CustomButton: FC<CustomButtonProps> = ({
  onPress,
  title,
  disabled,
  loading,
  bgVariant = "solid",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.container,
        {
          backgroundColor: disabled
            ? Colors.secondary
            : bgVariant === "outline"
            ? "transparent"
            : Colors.primary,
          borderColor: bgVariant === "outline" ? Colors.primary : "transparent", // Outline border
          borderWidth: bgVariant === "outline" ? 2 : 0, // Add border width for outline variant
        },
      ]}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator color={Colors.text} size="small" />
      ) : (
        <CustomText
          fontFamily="SemiBold"
          style={{
            fontSize: RFValue(12),
            color: disabled
              ? "#fff"
              : bgVariant === "outline"
              ? Colors.text
              : Colors.text,
          }}
        >
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    marginTop: 15,
    padding: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default CustomButton;
