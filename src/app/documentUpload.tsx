import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "@/components/shared/CustomButton";

const CLOUDINARY_CLOUD_NAME = "dvztjsim2"; // Replace with your Cloudinary cloud name
const UPLOAD_PRESET = "ImageUpload"; // Replace with your Cloudinary upload preset

export default function DocumentUpload() {
  const [images, setImages] = useState<{
    aadhaar: string | null;
    rc: string | null;
    license: string | null;
  }>({ aadhaar: null, rc: null, license: null });

  const [uploading, setUploading] = useState(false);

  const pickImageAndUpload = async (docType: "aadhaar" | "rc" | "license") => {
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
      setImages((prev) => ({ ...prev, [docType]: result.assets[0].uri }));
      await uploadToCloudinary(result.assets[0].uri, docType);
    }
  };

  const uploadToCloudinary = async (
    imageUri: string,
    docType: "aadhaar" | "rc" | "license"
  ) => {
    setUploading(true);
    const data = new FormData();
    data.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: `${docType}.jpg`,
    } as any);

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
      console.log(`Cloudinary Upload Response (${docType}):`, json);
      Alert.alert(`${docType.toUpperCase()} Uploaded`, "Upload successful!");
      setImages((prev) => ({ ...prev, [docType]: json.secure_url }));
    } catch (error) {
      console.error("Upload failed:", error);
      Alert.alert("Upload Failed", "An error occurred while uploading.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!images.aadhaar || !images.rc || !images.license) {
      Alert.alert("Error", "Please upload all documents before submitting.");
      return;
    }

    try {
      const clerkId = "user_clerk_id"; // Replace with actual Clerk ID from authentication
      const response = await fetch("/api/saveDocuments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId,
          licenseUrl: images.license,
          rcUrl: images.rc,
          aadhaarUrl: images.aadhaar,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Documents submitted successfully!");
      } else {
        Alert.alert("Error", data.message || "Failed to submit documents.");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Upload Your Documents</Text>

        {["aadhaar", "rc", "license"].map((doc) => (
          <View key={doc} style={styles.uploadSection}>
            <Text style={styles.label}>
              {doc.charAt(0).toUpperCase() + doc.slice(1)}
            </Text>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() =>
                pickImageAndUpload(doc as "aadhaar" | "rc" | "license")
              }
            >
              <Text style={styles.uploadButtonText}>Pick & Upload</Text>
            </TouchableOpacity>
            {images[doc as "aadhaar" | "rc" | "license"] && (
              <Image
                source={{ uri: images[doc as "aadhaar" | "rc" | "license"]! }}
                style={styles.image}
              />
            )}
          </View>
        ))}

        {uploading && <ActivityIndicator size="large" color="blue" />}
      </View>
      // Save to neon DB
      <View>
        <CustomButton
          title={"Submit Documents"}
          onPress={handleSubmit}
        ></CustomButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    marginTop: 50,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  uploadSection: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#444",
  },
  uploadButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 10,
    borderRadius: 5,
  },
});
