import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";

export default function SplashPage({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500); // Show splash for 2.5 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.logoIcon}>🛍️</Text>
        <Text style={styles.logoText}>Shoppy</Text>
        <Text style={styles.tagline}>Your Thrift Shopping Companion</Text>
      </View>
    </View>
  );
}
