import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";

const Page1 = () => {
  const [comment, setComment] = useState("");
  const [result, setResult] = useState("");

  const getPrediction = async () => {
    if (!comment.trim()) {
      Alert.alert("Error", "Please enter a comment.");
      return;
    }

    try {
      // ✅ Replace with your Flask server's IP
      const response = await axios.post("http://192.168.1.100:5000/predict", {
        text: comment,
      });

      setResult(`Prediction: ${response.data.prediction}`);
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("Error", "Failed to connect to the server.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Sentiment Analysis</Text>
      <TextInput
        style={{
          height: 100,
          borderColor: "gray",
          borderWidth: 1,
          marginTop: 10,
          padding: 10,
          textAlignVertical: "top",
        }}
        placeholder="Enter your comment..."
        value={comment}
        onChangeText={setComment}
        multiline
      />
      <Button title="Check Sentiment" onPress={getPrediction} />
      {result ? <Text style={{ marginTop: 20, fontSize: 18 }}>{result}</Text> : null}
    </View>
  );
};

export default Page1;