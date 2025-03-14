import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Layout from '../layout';

const ResultScreen = () => {
  const params = useLocalSearchParams();
  const { totalPrice } = params;

  // Calculate the range (± 1000)
  const lowerRange = Math.max(0, totalPrice - 1000); // Ensure the lower range is not negative
  const upperRange = parseInt(totalPrice) + 1000;

  return (
    <Layout>
    <View style={styles.container}>
      <Text style={styles.resultText}>Total Calculated Price Range:</Text>
      <Text style={styles.priceText}>
        {lowerRange} USD - {upperRange} USD
      </Text>
    </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  resultText: {
    fontSize: 24,
    marginBottom: 20,
  },
  priceText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default ResultScreen;