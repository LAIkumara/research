import { View, Text, Button, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Layout from '../layout';
import { Picker } from '@react-native-picker/picker';

// Sample data
const locations = [
  {
    id: 'L1',
    name: 'Dehiwala',
    rankings: {
      1: {
        shopName: 'Duluck81 Auto Shop',
        address: '12 Sri Sunandarama Rd, Dehiwala-Mount Lavinia',
        phone: '0777740000',
      },
      2: {
        shopName: 'Selinico Enterprises Accident Repairs',
        address: '81 Templers Rd, Dehiwala-Mount Lavinia',
        phone: '0710331342',
      },
      3: {
        shopName: 'Nitro Zone',
        address: '11 Rajasinghe Rd, Colombo',
        phone: '0112363555',
      },
      4: {
        shopName: 'Nishantha Auto Electricals',
        address: '65/61, Kahawita place, Kahawita Mawatha, Dehiwala-Mount Lavinia',
        phone: '0777799953',
      },
      5: {
        shopName: 'Genuine Motor Tech',
        address: '47C Hospital Rd, Dehiwala-Mount Lavinia',
        phone: '0112730734',
      },
    },
  },
  {
    id: 'L2',
    name: 'Homagama',
    rankings: {
      1: {
        shopName: 'Kings Auto Care',
        address: 'Hokandara',
        phone: '0714427977',
      },
      2: {
        shopName: 'DWS Auto Care',
        address: '23, 1 Kottawa - Malabe Rd, Hokandara 10118',
        phone: '0777123920',
      },
      3: {
        shopName: 'Sunway Automotive (pvt) Ltd',
        address: 'NO 470/5 Nidahas Mawatha, Malabe',
        phone: '0777197597',
      },
      4: {
        shopName: 'MOTOMARK (Hybrid Vehicle Repair Center)',
        address: '174 Athurugiriya Rd, Malabe 10115',
        phone: '0761966183',
      },
      5: {
        shopName: 'Jagath Motors',
        address: 'Athurugiriya Rd, Malabea',
        phone: '0112808280',
      },
    },
  },
  {
    id: 'L3',
    name: 'Kaduwela',
    rankings: {
      1: {
        shopName: 'Halford Care',
        address: '545, 11/A Samurdhi Mawatha, 11650',
        phone: '0762363637',
      },
      2: {
        shopName: 'Kings Auto Care',
        address: 'Hokandara',
        phone: '0714427977',
      },
      3: {
        shopName: 'Sunway Automotive (pvt) Ltd',
        address: 'NO 470/5 Nidahas Mawatha, Malabe',
        phone: '0777197597',
      },
      4: {
        shopName: 'Gayanâ€™s car care',
        address: '16c, pahala Biyagama Rd, Kaduwela',
        phone: '0712424244',
      },
      5: {
        shopName: 'Jagath Motors',
        address: 'Athurugiriya Rd, Malabe',
        phone: '0112808280',
      },
    },
  },
  {
    id: 'L4',
    name: 'Kesbewa',
    rankings: {
      1: {
        shopName: 'Village Auto Kesbewa',
        address: 'No:05, 10300',
        phone: '0777177788',
      },
      2: {
        shopName: 'Hybrid Hub Piliyandala by Edirisinghe Brothers Limited',
        address: '300/1 kottawa - thalagala para Piliyandala 10230',
        phone: '0774777666',
      },
      3: {
        shopName: 'DWS Auto Care',
        address: '23, 1 Kottawa - Malabe Rd, Hokandara 10118',
        phone: '0777123920',
      },
      4: {
        shopName: 'Auto Miraj Maharagama',
        address: 'No: 161 Dehiwala Rd, Maharagama 10280',
        phone: '0112640640',
      },
      5: {
        shopName: 'Udawatta Automobile Repair Center (Pvt) Ltd',
        address: '164 Old Kottawa Rd, Maharagama 10280',
        phone: '0112223938',
      },
    },
  },
  {
    id: 'L5',
    name: 'Maharagama',
    rankings: {
      1: {
        shopName: 'Rasanjana motors (Pvt) Ltd',
        address: '42 Pannipitiya Old Rd, Pannipitiya 10230',
        phone: '0777234081',
      },
      2: {
        shopName: 'Edirisinghe Motor Garage',
        address: '276, Old Road, Udhamulla, Nugegoda, Old Kottawa Rd, Colombo 1025',
        phone: '01128119142',
      },
      3: {
        shopName: 'Tokimo Performance',
        address: 'Jaya Rd, Nugegoda 10250',
        phone: '0772011774',
      },
      4: {
        shopName: 'Auto Miraj Maharagama',
        address: 'No: 161 Dehiwala Rd, Maharagama 10280',
        phone: '0112640640',
      },
      5: {
        shopName: 'Udawatta Automobile Repair Center (Pvt) Ltd',
        address: '164 Old Kottawa Rd, Maharagama 10280',
        phone: '0112223938',
      },
    },
  },
  {
    id: 'L6',
    name: 'Moratuwa',
    rankings: {
      1: {
        shopName: 'Priyanka Motors',
        address: 'No71 Kahatagahawatta Rd, Boralesgamuwa 10290',
        phone: '0775753228',
      },
      2: {
        shopName: 'S&N Tyre Center',
        address: '207/A Moratuwa - Piliyandala Rd, Piliyandala 10300',
        phone: '0112608959',
      },
      3: {
        shopName: 'Nishantha Auto Electricals',
        address: '65/61, Kahawita place, Kahawita Mawatha, Dehiwala-Mount Lavinia',
        phone: '0777799953',
      },
      4: {
        shopName: 'Motor Link',
        address: '21 Lucian J. Silva Mawatha, Moratuwa 10400',
        phone: '0777766867',
      },
      5: {
        shopName: 'Shameera Garage',
        address: 'No. 26, 1 Malani Bulathsinghala Mawatha, Boralesgamuwa 10290',
        phone: '0717701631',
      },
    },
  },
  {
    id: 'L7',
    name: 'Padukka',
    rankings: {
      1: {
        shopName: 'Wiztech Automobile',
        address: '170/2B Diyakada Road, Polgasowita',
        phone: '0757779280',
      },
      2: {
        shopName: 'Kodithuwakku Tyre Service and Wheel Alignment Center',
        address: 'Hanwella Jct Rd, Padukka',
        phone: '0717462141',
      },
      3: {
        shopName: 'Highway Auto Engineer',
        address: 'Highway Auto Engineer Kabellagoda Horana',
        phone: '0342264497',
      },
      4: {
        shopName: 'Sathira Tyre Works',
        address: '125 Horana Rd, Polgasowita',
        phone: '0725199291',
      },
      5: {
        shopName: 'RATHNAYAKA AUTO MART',
        address: '8th mile post bolgoda bandaragama sri lanka, Horana Rd, Bandaragama',
        phone: '0382288500',
      },
    },
  },
  {
    id: 'L8',
    name: 'Panadura',
    rankings: {
      1: {
        shopName: 'Macmi Auto - Panadura',
        address: '175 Horana Rd, Panadura 12500',
        phone: '0384933203',
      },
      2: {
        shopName: 'Motorox Automobiles (Pvt) Ltd',
        address: '53/17, C.T.B, Tourist Depot Rd, Moratuwa',
        phone: '0112632865',
      },
      3: {
        shopName: 'Auto Wheel Centre',
        address: '129 Galle - Colombo Rd, Panadura 12500',
        phone: '0382231133',
      },
      4: {
        shopName: 'Nuwan Madanayaka Auto Hybrid Training Academy ( Pvt ) Ltd',
        address: '134/1 Horana Rd, Panadura',
        phone: '0775124747',
      },
      5: {
        shopName: 'KLS Tyre Center',
        address: '575B Galle Rd, Panadura',
        phone: '0382243244',
      },
    },
  },
  {
    id: 'L9',
    name: 'Rathmalana',
    rankings: {
      1: {
        shopName: 'Selinico Enterprises Accident Repairs',
        address: '81 Templers Rd, Dehiwala-Mount Lavinia',
        phone: '0710331342',
      },
      2: {
        shopName: 'Mag City Ratmalana',
        address: '652 Industrial Estate, Dehiwala-Mount Lavinia 10390',
        phone: '0761122443',
      },
      3: {
        shopName: 'United Motors Lanka PLC- Ratmalana',
        address: '146 Maligawa Rd, Moratuwa',
        phone: '0114225521',
      },
      4: {
        shopName: 'Macro Auto Tech (Pvt) Ltd',
        address: '233 Colombo - Horana Rd, Boralesgamuwa',
        phone: '0112518424',
      },
      5: {
        shopName: 'Auto Miraj Head Office',
        address: 'Auto Miraj Head Office, No: 66 Ratmalana - Attidiya Rd, Dehiwala-Mount Lavinia 10390',
        phone: '0112640640',
      },
    },
  },
  {
    id: 'L10',
    name: 'Sri Jayawardenepura Kotte',
    rankings: {
      1: {
        shopName: 'Selinico Enterprises Accident Repairs',
        address: '81 Templers Rd, Dehiwala-Mount Lavinia',
        phone: '0710331342',
      },
      2: {
        shopName: 'Sasika Garage',
        address: '13 Meegahawatta Rd, Nugegoda 10250',
        phone: '0717484289',
      },
      3: {
        shopName: 'Magic Touch Automobile Repair and Service Center',
        address: 'No.128 Old Kottawa Rd, Nugegoda 10100',
        phone: '0771066083',
      },
      4: {
        shopName: 'The Pink Auto Shop - GREENYARD',
        address: 'Kimbulawala Thalawathugoda, Sri Jayawardenepura Kotte 10100',
        phone: '0112779800',
      },
      5: {
        shopName: 'Udawatta Automobile Repair Center (Pvt) Ltd',
        address: '164 Old Kottawa Rd, Maharagama 1028',
        phone: '0112223938',
      },
    },
  },
];

export default function Repairable() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null); // Store the selected shop details
  const [modalVisible, setModalVisible] = useState(false); // Control the visibility of the modal
  const router = useRouter();
  const params = useLocalSearchParams();
  const { damageType } = params;

  // Get the selected location's rankings
  const selectedLocationData = locations.find((loc) => loc.id === selectedLocation);
  const rankings = selectedLocationData ? Object.entries(selectedLocationData.rankings) : [];

  // Handle shop name click
  const handleShopClick = (shopDetails) => {
    setSelectedShop(shopDetails); // Set the selected shop details
    setModalVisible(true); // Show the modal
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Good news!</Text>
        <Text style={styles.message}>
          Your {damageType} damage is repairable! We can help you find the best shops near you.
        </Text>

        {/* Location Dropdown */}
        <Text style={styles.label}>Select Your Location</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedLocation}
            onValueChange={(itemValue) => setSelectedLocation(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a location" value={null} />
            {locations.map((loc) => (
              <Picker.Item key={loc.id} label={loc.name} value={loc.id} />
            ))}
          </Picker>
        </View>

        {/* Display Top 5 Shops in Two Columns */}
        {selectedLocation && (
          <View style={styles.rankingsContainer}>
            <Text style={styles.subtitle}>Top 5 Shops in {selectedLocationData.name}</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Rank</Text>
                <Text style={styles.tableHeader}>Shop Name</Text>
              </View>
              {rankings.map(([rank, shopDetails]) => (
                <TouchableOpacity
                  key={rank}
                  style={styles.tableRow}
                  onPress={() => handleShopClick(shopDetails)} // Pass shop details to the handler
                >
                  <Text style={styles.tableCell}>{rank}</Text>
                  <Text style={[styles.tableCell, styles.shopNameCell]}>{shopDetails.shopName}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Modal for Shop Details */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)} // Close modal on back button (Android)
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedShop?.shopName}</Text>
              <Text style={styles.modalText}>Address: {selectedShop?.address}</Text>
              <Text style={styles.modalText}>Phone: {selectedShop?.phone}</Text>
              <Button
                title="Close"
                onPress={() => setModalVisible(false)} // Close the modal
                color="#4CAF50"
              />
            </View>
          </View>
        </Modal>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  pickerContainer: {
    width: '80%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android
  },
  picker: {
    width: '100%',
    height: 60,
  },
  rankingsContainer: {
    width: '100%',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center', // Center align header text
  },
  tableCell: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center', // Center align cell text
  },
  shopNameCell: {
    flex: 1, // Allow shop names to take up more space
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
});