import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ICON_URL =
  "https://iconarchive.com/download/i107545/google/noto-emoji-animals-nature/dog.ico";

const TimerScreen = () => {
  const [timeLeft, setTimeLeft] = useState(10 * 60 * 1000); // 10 minutes in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    // Request notification permissions
    const requestPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        if (newStatus !== "granted") {
          Alert.alert("Notification permissions not granted.");
        }
      }
    };
    requestPermissions();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0 && isRunning) {
      setIsRunning(false);
      if (intervalId) {
        clearInterval(intervalId);
      }

      // Schedule a local notification
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Timer Finished",
          body: "Your timer has completed.",
          sound: "default",
          // Set the icon URL
          icon: ICON_URL,
        },
        trigger: null, // Trigger immediately
      });

      Alert.alert("Timer Finished", "Your timer has completed.");
    }
  }, [timeLeft, isRunning]);

  const adjustTime = (amount) => {
    setTimeLeft((prev) => Math.max(prev + amount, 0));
  };

  const startStopTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      if (intervalId) {
        clearInterval(intervalId);
      }
    } else {
      setIsRunning(true);
      const id = setInterval(() => {
        setTimeLeft((prev) => prev - 1000);
      }, 1000);
      setIntervalId(id);
    }
  };

  const resetTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
    setTimeLeft(10 * 60 * 1000); // Reset to default 10 minutes
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => adjustTime(-2 * 60 * 1000)}
            style={(styles.button, styles.buttonLeft)}
          >
            <Text style={styles.buttonText}>Left</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => adjustTime(2 * 60 * 1000)}
            style={(styles.button, styles.buttonRight)}
          >
            <Text style={styles.buttonText}>Right</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={{ fontSize: 24 }}>Total</Text>
      <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      <View style={styles.buttonBarContainer}>
        <TouchableOpacity
          onPress={startStopTimer}
          style={styles.startStopButton}
        >
          <Text style={styles.buttonTextStopStart}>
            {isRunning ? "Stop" : "Start"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetTimer} style={styles.resetButton}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  timer: {
    fontSize: 48,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: "80%",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },

  buttonLeft: {
    backgroundColor: "white",
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    margin: 5,
    borderColor: "black",
    borderWidth: 2,
  },
  buttonRight: {
    backgroundColor: "white",
    padding: 10,
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    margin: 5,
    borderColor: "black",
    borderWidth: 2,
  },

  buttonBarContainer: {
    width: "100%",
    marginTop: "auto",
  },
  buttonText: {
    fontSize: 20,
  },
  buttonTextStopStart: {
    color: "#fff",
    borderColor: "green",
    fontSize: 20,
  },
  startStopButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 15,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    color: "black",

    borderColor: "black",
    borderWidth: 2,
  },
});

export default TimerScreen;
