import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface HeaderProps {
  userName: string;
  userPhoto: string;
}

const Header: React.FC<HeaderProps> = ({ userName, userPhoto }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.appName}>My Application</Text>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{userName}</Text>
        <Image source={{ uri: userPhoto }} style={styles.userPhoto} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#007bff",
  },
  appName: { color: "white", fontSize: 20, fontWeight: "bold" },
  userInfo: { flexDirection: "row", alignItems: "center" },
  userName: { color: "white", fontSize: 16, marginRight: 10 },
  userPhoto: { width: 40, height: 40, borderRadius: 20 },
});

export default Header;