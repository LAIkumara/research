import React, { useState } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';


const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) return alert('Please select an image first');

    setLoading(true);
    let formData = new FormData();
    formData.append('file', {
      uri: image,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await axios.post('http://YOUR_BACKEND_URL/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Upload Successful!');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert('Upload Failed');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Pick Image" onPress={pickImage} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Upload Image" onPress={uploadImage} disabled={!image} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default ImageUpload;
