import { Text, View, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Platform } from 'react-native';
import { router } from 'expo-router';
import Layout from '../layout';
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native'; // For animated image
import { Easing } from 'react-native-reanimated';
import Loading from '../../styles/loading'; // Import the Loading component
import { styles as authStyles } from '../../styles/auth.styles';

export default function Page1() {
  const [image, setImage] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Animation values for button collapse
  const buttonWidthUpload = useRef(new Animated.Value(80)).current;
  const buttonWidthCapture = useRef(new Animated.Value(80)).current;
  const buttonOpacityUpload = useRef(new Animated.Value(1)).current;
  const buttonOpacityCapture = useRef(new Animated.Value(1)).current;

  // Animation for rotating tire (Lottie)
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start rotating animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const pickImage = async () => {
    // Collapse the upload button
    collapseButton(buttonWidthUpload, buttonOpacityUpload);

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    } else {
      console.error('No image selected');
      resetButtons();
    }
  };

  const captureImage = async () => {
    // Collapse the capture button
    collapseButton(buttonWidthCapture, buttonOpacityCapture);

    let result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    } else {
      resetButtons();
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
      });
      
      setUploadMessage('Image uploaded successfully! ' + JSON.stringify(response.data));
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadMessage('Error uploading image');
    } finally {
      setIsLoading(false);
      resetButtons();
    }
  };

  // Function to collapse a button
  const collapseButton = (width: Animated.Value, opacity: Animated.Value) => {
    Animated.parallel([
      Animated.timing(width, {
        toValue: 60, // Reduce width to 60 (smaller but not 0)
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0.7, // Reduce opacity to 0.7 (slightly transparent but not invisible)
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  // Function to reset buttons
  const resetButtons = () => {
    Animated.parallel([
      Animated.timing(buttonWidthUpload, {
        toValue: 80,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(buttonOpacityUpload, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(buttonWidthCapture, {
        toValue: 80,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(buttonOpacityCapture, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <Layout>
      {/* Gradient Background */}
      <LinearGradient
        colors={['#ffffff', '#e6f7ff']}
        style={styles.gradientBackground}
      >
        <View style={styles.container}>
          {/* Header */}
          {isLoading && <Loading />}
          <View style={styles.header}>
            <Text style={styles.subtitle}>
              Tire Quality Assessment
            </Text>
            <Text style={styles.description}>
              Upload or capture an image of a tire to assess its quality.
            </Text>
          </View>

          {/* Image Display Area */}
          <View style={styles.imageContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <LottieView
                source={require('../../assets/tire-assesment.json')} // Add your Lottie animation file
                autoPlay
                loop
                style={styles.animatedImage}
              />
            )}
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {/* Upload Button */}
            <TouchableOpacity
              onPress={pickImage}
              disabled={isLoading}
            >
              <Animated.View
                style={[
                  styles.button,
                  styles.uploadButton,
                  { width: buttonWidthUpload, opacity: buttonOpacityUpload },
                ]}
              >
                <Ionicons name="image" size={32} color="white" />
              </Animated.View>
            </TouchableOpacity>

            {/* Capture Button */}
            <TouchableOpacity
              onPress={captureImage}
              disabled={isLoading}
            >
              <Animated.View
                style={[
                  styles.button,
                  styles.captureButton,
                  { width: buttonWidthCapture, opacity: buttonOpacityCapture },
                ]}
              >
                <Ionicons name="camera" size={32} color="white" />
              </Animated.View>
            </TouchableOpacity>
          </View>

          {/* Upload Message */}
          {uploadMessage && <Text style={styles.messageText}>{uploadMessage}</Text>}
        </View>
        {isLoading && <Loading />}
      </LinearGradient>
    </Layout>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  animatedImage: {
    width: 450,
    height: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
  },
  uploadButton: {
    backgroundColor: '#007bff',
  },
  captureButton: {
    backgroundColor: '#28a745',
  },
  messageText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});