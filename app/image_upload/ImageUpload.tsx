import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { styles } from "../../styles/auth.styles";
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native';
import axios from 'axios'; // Import axios

export default function Page1() {
  const [image, setImage] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  // Function to pick an image from the gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);  // Automatically upload the image after selection
    }
  };

  // Function to capture an image using the camera
  const captureImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);  // Automatically upload the image after capture
    }
  };

  // Function to upload the selected or captured image to the backend
  const uploadImage = async (uri: string) => {
    const formData = new FormData();
  
    // Define the file object
    const file: any = {
      uri: uri,
      name: 'image.jpg', // You can change this based on the image
      type: 'jpg/jpeg', // Adjust MIME type based on the image format
    };
  
    // Check the file object before appending
    console.log("File object being uploaded:", file);
  
    // Append the image file to FormData with the key 'image' (to match backend)
    formData.append('image', file); // Ensure 'image' is consistent with the backend field name
    console.log("FormData contents:", formData);  // Add this to inspect the FormData contents
  
    try {
      // Use your local IP address for the backend
      const response = await axios.post('http://192.168.106.18:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Axios will handle this automatically, but it's okay to keep it
        },
      });
  
      setUploadMessage('Image uploaded successfully!');
      console.log('Server response:', response.data);  // Log server response
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadMessage('Error uploading image');
    }
  };

  return (
    <View style={[styles.container, { padding: 20, justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={[styles.title, { fontSize: 24, marginBottom: 30, textAlign: 'center', color: '#333' }]}>Damage Detection</Text>

      {/* Button to pick image from gallery */}
      <TouchableOpacity style={{ marginBottom: 20, width: '80%' }}>
        <Button title="Upload Image" onPress={() => image && uploadImage(image)} color="#2196F3" />
      </TouchableOpacity>

      {/* Button to capture image using the camera */}
      <TouchableOpacity style={{ width: '80%' }}>
        <Button title="Capture Image" onPress={captureImage} color="#4CAF50" />
      </TouchableOpacity>

      {/* Display selected or captured image */}
      {image && (
        <Image source={{ uri: image }} style={{ width: 250, height: 250, marginTop: 30, borderRadius: 20, borderWidth: 2, borderColor: '#ccc' }} />
      )}

      {/* Display the upload message */}
      {uploadMessage && <Text>{uploadMessage}</Text>}
    </View>
  );
}
