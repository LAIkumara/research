import { Text, View, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { styles } from "../../styles/auth.styles";
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Platform } from 'react-native';  // Import Platform to check for web
import Layout from '../layout';

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
    } else {
      console.error('No image selected');
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
  
    if (Platform.OS === 'web') {
      // For web: Get the base64 string from the URI
      const base64String = uri.split(',')[1]; // Extract base64 from the URI
  
      // Append base64 string for web upload
      formData.append('image', base64String); 
    } else {
      // For mobile: Append file normally
      const file: any = {
        uri: uri,
        name: 'image.jpg', 
        type: 'image/jpeg', 
      };
      formData.append('image', file);
    }
  
    try {
      const response = await axios.post('http://192.168.106.18:5000/vehicle_classification/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Axios will handle this automatically, but it's okay to keep it
        },
      });
  
      // Check the vehicle type and display the corresponding message
      let message = 'Image uploaded successfully!';
  
      switch (response.data.vehicle_type) {
        case 'Toyota_Tundra':
          message += ' and vehicle type is Toyota Highlander';
          break;
        case 'Toyota_Highlander':
          message += ' and vehicle type is Toyota Tundra';
          break;
        case 'Toyota_Tacoma':
          message += ' and vehicle type is Toyota Prius';
          break;
        case 'Toyota_Prius':
          message += ' and vehicle type is Toyota Tacoma';
          break;
        default:
          message = 'Image uploaded successfully, but unknown vehicle type.';
      }
      setUploadMessage(message);
      console.log(message);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadMessage('Error uploading image');
    }
  };
  
  

  return (
    <Layout>
    <View style={[styles.container, { padding: 20, justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={[styles.title, { fontSize: 24, marginBottom: 30, textAlign: 'center', color: '#333' }]}>
        market prediction
      </Text>

      {/* Button to pick image from gallery */}
      <TouchableOpacity style={{ marginBottom: 20, width: '80%' }}>
        <Button title="Upload Image" onPress={pickImage} color="#2196F3" />
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
    </Layout>);
}
