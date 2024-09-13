import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  ScrollViewComponent,
} from "react-native";
import feedingData from "./feedingData";

const FeedingsLogScreen = () => {
  return (
    <FlatList
      style={styles.container}
      data={feedingData}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={<Text style={styles.title}>Feedings Log</Text>}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title2}>{item.title}</Text>
          <Text style={styles.dateText}>{`Date: ${item.date}`}</Text>
          <Text style={styles.timeText}>{`Feeding Time: ${item.time}`}</Text>
          <Text style={styles.timeText}>{`Amount: ${item.amount}`}</Text>
        </View>
      )}
      ListFooterComponent={<Text style={styles.title2}>End of the List</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
    textAlign: "center",
  },
  title2: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff6f61",
    marginBottom: 10,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#f5f5f5",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ff6f61",
    marginBottom: 8,
  },
  timeText: {
    fontSize: 18,
    fontWeight: "400",
    color: "black",
  },
});

export default FeedingsLogScreen;
