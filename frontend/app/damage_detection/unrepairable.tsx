import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import Layout from '../layout'


export default function Unrepairable() {
  const params = useLocalSearchParams();
  const { damageType } = params;

  return (
    <Layout>
      <View style={styles.container}>
        {/* Display "Sorry! this damage is Unrepairable." message */}
        <Text style={styles.message}>Sorry! your {damageType} damage is Unrepairable.</Text>

        {/* Display "Unhappy" sticker (using an emoji for now) */}
        <Text style={styles.emoji}>😞</Text>

        {/* If you want to use an image instead, you can replace the above Text with an Image */}
        {/* 
        <Image 
          source={require('../assets/unhappy_sticker.png')} 
          style={styles.sticker} 
        />
        */}
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 24,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  emoji: {
    fontSize: 50, // You can adjust the size of the emoji
    marginTop: 20,
  },
  sticker: {
    width: 100, // Adjust the sticker size
    height: 100,
    marginTop: 20,
  }
  
})
