import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";

const FeedingsLogScreen = () => {
  const [feedings] = useState([
    { date: "2023-07-01", time: "08:00 AM" },
    { date: "2023-07-01", time: "12:00 PM" },
    { date: "2023-07-01", time: "04:00 PM" },
    { date: "2023-07-01", time: "08:00 PM" },
    { date: "2023-08-01", time: "08:00 AM" },
    { date: "2023-08-01", time: "12:00 PM" },
    { date: "2023-08-01", time: "04:00 PM" },
    { date: "2023-08-01", time: "08:00 PM" },
    { date: "2023-09-01", time: "08:00 AM" },
    { date: "2023-09-01", time: "12:00 PM" },
    { date: "2023-09-01", time: "04:00 PM" },
    { date: "2023-09-01", time: "08:00 PM" },
  ]);

  return (
    <FlatList
      style={styles.container}
      data={feedings}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={<Text style={styles.title}>Feedings Log</Text>}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.dateText}>{`Date: ${item.date}`}</Text>
          <Text style={styles.timeText}>{`Feeding Time: ${item.time}`}</Text>
        </View>
      )}
      ListFooterComponent={<Text style={styles.title2}>By @mvgs</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  title2: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 50,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
  },
  timeText: {
    fontSize: 18,
    fontWeight: "400",
    color: "#777",
  },
});

export default FeedingsLogScreen;
