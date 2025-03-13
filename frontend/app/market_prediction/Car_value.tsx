import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';

const HomeScreen = () => {
  const [carType, setCarType] = useState('');
  const [year, setYear] = useState('2020'); // Default year
  const [color, setColor] = useState('Red'); // Default color
  const [mileage, setMileage] = useState('0-50000'); // Default mileage
  const [owners, setOwners] = useState('1'); // Default owners
  const router = useRouter();
  const params = useLocalSearchParams();
  const { vehicle_type } = params;

  const handleSubmit = () => {
    // Define price mappings
    const vehiclePrices = {
      Toyota_Highlander: 5000,
      Toyota_Prius: 3000,
      Toyota_Tacoma: 7000,
      Toyota_Tundra: 8000,
    };

    const yearPrices = {
      2020: 5000,
      2019: 4500,
      2018: 4000,
      2017: 3500,
      2016: 3000,
      2015: 2500,
      2014: 2000,
      2013: 2000,
      2012: 1700,
      2011: 1700,
      2010: 1500,
    };

    const colorPrices = {
      Red: 1000,
      Blue: 800,
      White: 1000,
      Silver: 800,
      Grey: 800,
      Black: 1000,
    };

    const mileagePrices = {
      '0-50000': 3000,
      '50000-100000': 1500,
      '100000-200000': 1000,
      '200000-500000': 800,
      '500000+': 500,
    };

    const ownersPrices = {
      1: 1000,
      2: 800,
      3: 600,
      4: 500,
      5: 400,
    };

    // Calculate total price
    const totalPrice =
      (vehiclePrices[vehicle_type] || 0) +
      (yearPrices[year] || 0) +
      (colorPrices[color] || 0) +
      (mileagePrices[mileage] || 0) +
      (ownersPrices[owners] || 0);

    // Navigate to the result page with the total price
    router.push({
      pathname: '/market_prediction/vehicle_prediction_view',
      params: { totalPrice },
    });
  };

  return (
    <View style={styles.container}>
      {(() => {
        let message = '';
        switch (vehicle_type) {
          case 'Toyota_Tundra':
            message = 'Your vehicle type is Highlander';
            break;
          case 'Toyota_Highlander':
            message = 'Your vehicle type is Tundra';
            break;
          case 'Toyota_Tacoma':
            message = 'Your vehicle type is Prius';
            break;
          case 'Toyota_Prius':
            message = 'Your vehicle type is Tacoma';
            break;
        }
        return <Text>{message}</Text>;
      })()}

      <Text style={styles.label}>Select Year:</Text>
      <Picker
        selectedValue={year}
        style={styles.picker}
        onValueChange={(itemValue) => setYear(itemValue)}
      >
        {[...Array(11).keys()].map((i) => {
          const yearOption = 2010 + i;
          return <Picker.Item key={yearOption} label={`${yearOption}`} value={`${yearOption}`} />;
        })}
      </Picker>

      <Text style={styles.label}>Select Color:</Text>
      <Picker
        selectedValue={color}
        style={styles.picker}
        onValueChange={(itemValue) => setColor(itemValue)}
      >
        <Picker.Item label="Red" value="Red" />
        <Picker.Item label="Blue" value="Blue" />
        <Picker.Item label="Black" value="Black" />
        <Picker.Item label="White" value="White" />
        <Picker.Item label="Silver" value="Silver" />
        <Picker.Item label="Grey" value="Grey" />
      </Picker>

      <Text style={styles.label}>Select Mileage Range:</Text>
      <Picker
        selectedValue={mileage}
        style={styles.picker}
        onValueChange={(itemValue) => setMileage(itemValue)}
      >
        <Picker.Item label="0 - 50,000 km" value="0-50000" />
        <Picker.Item label="50,000 - 100,000 km" value="50000-100000" />
        <Picker.Item label="100,000 - 200,000 km" value="100000-200000" />
        <Picker.Item label="200,000 - 500,000 km" value="200000-500000" />
        <Picker.Item label="500,000+ km" value="500000+" />
      </Picker>

      <Text style={styles.label}>Select Number of Owners:</Text>
      <Picker
        selectedValue={owners}
        style={styles.picker}
        onValueChange={(itemValue) => setOwners(itemValue)}
      >
        <Picker.Item label="1 Owner" value="1" />
        <Picker.Item label="2 Owners" value="2" />
        <Picker.Item label="3 Owners" value="3" />
        <Picker.Item label="4 Owners" value="4" />
        <Picker.Item label="5 or More Owners" value="5" />
      </Picker>

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginTop: 10,
  },
  picker: {
    width: 250,
    height: 50,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
  },
});

export default HomeScreen;