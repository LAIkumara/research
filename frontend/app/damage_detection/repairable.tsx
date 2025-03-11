import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Layout from '../layout';
import { Picker } from '@react-native-picker/picker';

export default function Repairable() {
  const [location, setLocation] = useState<string | null>(null);

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Good news!</Text>
        <Text style={styles.message}>
          
          
            <Text style={styles.message}>This damage is repairable! We can help you find the best shops near you.</Text>

          Start by selecting your nearest location from the dropdown, and we'll guide you to trusted repair shops!
        </Text>
        
        {/* Happy Emoji */}
        <Text style={styles.emoji}>😊</Text>
        
        {/* Location Dropdown */}
        <Text style={styles.label}>Select Your Location</Text>
        <Picker
          selectedValue={location}
          onValueChange={(itemValue) => setLocation(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Not chosen -" value="location1" />
          <Picker.Item label="Malabe" value="location2" />
          <Picker.Item label="Koswatta" value="location3" />
          <Picker.Item label="Kollupitiya" value="location4" />
        </Picker>

        {/* Search Mechanic Shop Button */}
        <Button
          title="Search Mechanic Shops"
          onPress={() => {
            // Here, you can add logic for searching mechanic shops based on the selected location
            console.log('Searching shops for location:', location);
          }}
          color="#4CAF50"
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 40,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2F4F4F',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  emoji: {
    fontSize: 40, // Larger size for the emoji
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  picker: {
    width: '80%',
    height: 60,
    marginBottom: 20,
  },
});
