import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Layout from "../app/layout";
import { styles as authStyles } from "../styles/auth.styles";
import { useRouter } from "expo-router";

const Dashboard: React.FC = () => {
  const router = useRouter();

  return (
    <Layout>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Dashboard</Text>
        <View style={authStyles.container}>
          <Text style={authStyles.title}>Home</Text>
        
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
});

export default Dashboard;





// import { Text, View, Button } from "react-native";
// import {styles} from "../styles/auth.styles";
// import { useRouter } from "expo-router";

// export default function Index() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Home</Text>
//       <Button title="1 Market Identification (yasith)" onPress={() => router.push("/market_prediction/page1")} />
//       <Button title="2 Damage Detection (akila)" onPress={() => router.push("/damage_detection/page1")} />
//       <Button title="3 Feedback (tishan)" onPress={() => router.push("/feedback/page1")} />
//       <Button title="4 Tire Quality Assesment (tanishka)" onPress={() => router.push("/tire_quality_assesment/page1")} />
//     </View>
//   );
// }

