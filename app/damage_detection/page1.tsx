import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { styles } from "../../styles/auth.styles";
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native';


export default function Page1() {
  const [image, setImage] = useState<string | null>(null);

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

  const captureImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={[styles.container, { padding: 20, justifyContent: 'center', alignItems: 'center' }]}> 
      <Text style={[styles.title, { fontSize: 24, marginBottom: 30, textAlign: 'center', color: '#333' }]}>Damage Detection</Text>

      <TouchableOpacity style={{ marginBottom: 20, width: '80%' }}>
      <Button title="Upload Image" onPress={pickImage} color="#2196F3" />
      </TouchableOpacity>

      <TouchableOpacity style={{ width: '80%' }}>
      <Button title="Capture Image" onPress={captureImage} color="#4CAF50" />
      </TouchableOpacity>

      {image && (
        <Image source={{ uri: image }} style={{ width: 250, height: 250, marginTop: 30, borderRadius: 20, borderWidth: 2, borderColor: '#ccc' }} />
      )}
    </View>
  );
}
