import React, { useState } from "react";
import { View, Button, Image, ActivityIndicator, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const CLOUDINARY_CLOUD_NAME = "dvztjsim2"; // Replace with your Cloudinary cloud name
const UPLOAD_PRESET = "ImageUpload"; // Replace with your Cloudinary upload preset

export default function DocumentUpload() {
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickImageAndUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "You need to grant permission to access photos."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadToCloudinary(result.assets[0].uri);
    }
  };

  const uploadToCloudinary = async (imageUri: string) => {
    setUploading(true);
    const data = new FormData();
    data.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "upload.jpg",
    } as any); // TypeScript workaround

    data.append("upload_preset", UPLOAD_PRESET);
    data.append("cloud_name", CLOUDINARY_CLOUD_NAME);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const json = await response.json();
      console.log("Cloudinary Upload Response:", json);
      Alert.alert("Upload Success", "Image uploaded successfully!");
      return json.secure_url; // This is the uploaded image URL
    } catch (error) {
      console.error("Upload failed:", error);
      Alert.alert("Upload Failed", "An error occurred while uploading.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Pick and Upload Image" onPress={pickImageAndUpload} />
      {uploading && (
        <ActivityIndicator
          size="large"
          color="blue"
          style={{ marginTop: 10 }}
        />
      )}
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, marginTop: 10 }}
        />
      )}
    </View>
  );
}
