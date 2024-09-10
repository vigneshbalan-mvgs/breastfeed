import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

// Define your GrowthScreen component
const GrowthScreen = () => {
  const [growthData, setGrowthData] = useState({
    weight: [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
    labels: ["1", "2", "3", "4", "5", "6"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Growth Chart</Text>
        <LineChart
          data={{
            labels: growthData.labels,
            datasets: [
              {
                data: growthData.weight,
              },
            ],
          }}
          width={300}
          height={220}
          chartConfig={{
            backgroundColor: "gray",
            backgroundGradientFrom: "gray",
            backgroundGradientTo: "black",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          style={styles.chart}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chartContainer: {
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  chart: {
    marginTop: 20,
  },
});

export default GrowthScreen;
