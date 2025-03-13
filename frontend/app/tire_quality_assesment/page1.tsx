import { Text, View, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { styles } from "../../styles/auth.styles";
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Platform } from 'react-native';
import Layout from '../layout';

export default function Page1() {
  const [image, setImage] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    } else {
      console.error('No image selected');
    }
  };

  const captureImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      quality: 0.5,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string) => {
    setIsLoading(true);
    const formData = new FormData();

    if (Platform.OS === 'web') {
      const response = await fetch(uri);
      const blob = await response.blob();
      formData.append('image', blob, 'image.jpg');
    } else {
      const file: any = {
        uri: uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      };
      formData.append('image', file);
    }

    try {
      const response = await axios.post('http://192.168.8.162:5000/tire_segmentation/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          setUploadProgress(percentCompleted);
        },
      });

      setUploadMessage('Image uploaded successfully! ' + JSON.stringify(response.data));
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadMessage('Error uploading image');
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Layout>
      <View style={[styles.container, { padding: 20, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={[styles.title, { fontSize: 24, marginBottom: 30, textAlign: 'center', color: '#333' }]}>
          Tire Quality Assessment
        </Text>

        <TouchableOpacity style={{ marginBottom: 20, width: '80%' }}>
          <Button title="Upload Image" onPress={pickImage} color="#2196F3" disabled={isLoading} />
        </TouchableOpacity>

        <TouchableOpacity style={{ width: '80%' }}>
          <Button title="Capture Image" onPress={captureImage} color="#4CAF50" disabled={isLoading} />
        </TouchableOpacity>

        {image && (
          <Image source={{ uri: image }} style={{ width: 250, height: 250, marginTop: 30, borderRadius: 20, borderWidth: 2, borderColor: '#ccc' }} />
        )}

        {uploadProgress > 0 && (
          <Text>Upload Progress: {uploadProgress}%</Text>
        )}

        {uploadMessage && <Text>{uploadMessage}</Text>}
      </View>
    </Layout>
  );
}