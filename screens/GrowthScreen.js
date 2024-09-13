import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { SegmentedButtons } from "react-native-paper";

// importing datas

import feedingData from "./feedingData";

// Define your GrowthScreen component
const GrowthScreen = () => {
  const [value, setValue] = useState("weekly");
  // Sample data for the chart
  const [growthData, setGrowthData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        data: [350, 400, 450, 300, 420],
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      },
    ],
  });
  return (
    <ScrollView style={styles.container}>
      {/* Title and Timeframe Selection */}
      <View style={styles.header}>
        <Text style={styles.title}>6 Feedings 360ml</Text>
      </View>

      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "daily",
            label: "Daily",
            style: value === "daily" ? styles.selectedButton : styles.button,
            labelStyle: value === "daily" ? styles.selectedLabel : styles.label,
          },
          {
            value: "weekly",
            label: "Weekly",
            style: value === "weekly" ? styles.selectedButton : styles.button,
            labelStyle:
              value === "weekly" ? styles.selectedLabel : styles.label,
          },
        ]}
      />

      {/* Growth Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Feeding Chart</Text>
        <LineChart
          data={growthData}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#fff", // Set background to white
            backgroundGradientFrom: "#FADFA1", // Set gradient start color
            backgroundGradientTo: "#FF6F61", // Set gradient end color
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Line color remains white
            strokeWidth: 2, // Optional: Set stroke width for the line
            fillShadowGradient: "#FF6F61", // Fill below the line with a shadow color
            fillShadowGradientOpacity: 0.3, // Shadow opacity below the line
            decimalPlaces: 2, // Optional: Set number of decimal places in the labels
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label text color (black)
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: "#fff", // Dot stroke color
            },
          }}
          bezier // Enable wave-like curved lines
          withDots={true} // Show dots on the line
          withShadow={true} // Enable shadow for the line
          style={styles.chart}
        />

        <Text style={styles.chartInfo}>Range, Average</Text>
      </View>

      {/* Feeding Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Entries for the day</Text>
        <Text style={styles.detailsSubtitle}>2:00 PM - 6:00 PM</Text>
      </View>
      <FlatList
        data={feedingData}
        keyExtractor={(item) => item.time}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.cardDetail}>Date: {item.date}</Text>
              <Text style={styles.cardDetail}>Time: {item.time}</Text>
            </View>
            <Text style={styles.cardDetail}>Amount: {item.amount}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  timeframeContainer: {
    flexDirection: "row",
  },
  timeframe: {
    fontSize: 16,
    marginHorizontal: 10,
    color: "#ff6f61",
  },
  button: {
    backgroundColor: "#FADFA1",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#FADFA1",
  },
  selectedButton: {
    backgroundColor: "#ff6f61",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ff6f61",
  },
  label: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  selectedLabel: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  chartContainer: {
    backgroundColor: "#fff", // Set background to white
    borderRadius: 10, // Optionally add border radius for rounded corners
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FF6F61",
  },
  chart: {
    width: "auto", // Adjust the width as per requirement
    borderRadius: 8, // Add some border radius for aesthetics
  },
  chartInfo: {
    fontSize: 14,
    marginTop: 10,
  },
  detailsContainer: {
    backgroundColor: "#FADFA1", // Light peach-like background
    marginTop: 20,
    marginBottom: 50,
    backgroundColor: "white", // Light peach-like background
    padding: 15, // Optional for padding around content
    borderRadius: 10, // Optional for rounded corners
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FF6F61", // Bold peach-like color for the title
  },
  detailsSubtitle: {
    fontSize: 16,
    color: "#555", // Keeping the subtitle gray
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fffcf1", // Light peach-like background
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#FF6F61",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FF6F61", // Peach-like color for the title
  },
  cardDetail: {
    fontSize: 14,
    color: "#333", // Keeping the detail text dark for readability
  },
});

export default GrowthScreen;
