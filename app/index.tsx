import { Text, View, Button } from "react-native";
import {styles} from "../styles/auth.styles";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Button title="1 Market Identification (yasith)" onPress={() => router.push("/market_identification/page1")} />
      <Button title="2 Damage Detection (akila)" onPress={() => router.push("/damage_detection/page1")} />
      <Button title="3 Feedback (tishan)" onPress={() => router.push("/feedback/page1")} />
      <Button title="4 Tire Quality Assesment (tanishka)" onPress={() => router.push("/tire_quality_assesment/page1")} />
    </View>
  );
}

