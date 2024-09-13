import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import * as Notifications from "expo-notifications"; // Ensure you have expo-notifications installed
import Icon from "react-native-vector-icons/Feather"; // icon from feather react native icons

const BreastfeedingTimer = () => {
  const [leftTime, setLeftTime] = useState(0);
  const [rightTime, setRightTime] = useState(0);
  const [currentSide, setCurrentSide] = useState("left"); // 'left' or 'right'
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
    if (isRunning) {
      const id = setInterval(() => {
        if (currentSide === "left") {
          setLeftTime((prev) => prev + 1000);
        } else {
          setRightTime((prev) => prev + 1000);
        }
      }, 1000);
      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning, currentSide]);

  const handleButtonPress = (side) => {
    if (currentSide !== side) {
      setCurrentSide(side);
      if (isRunning) {
        setIsRunning(false); // Stop timer if switching sides
        setTimeout(() => {
          setIsRunning(true); // Start timer on the new side
        }, 0);
      } else {
        setIsRunning(true); // Start timer immediately if not running
      }
    } else {
      setIsRunning((prev) => !prev); // Toggle timer on the same side
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setLeftTime(0);
    setRightTime(0);
    setCurrentSide("left");
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const totalFormattedTime = formatTime(leftTime + rightTime);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.instructionText}>
        Tap the left or right button to start the timer
      </Text>

      <View style={styles.timerContainer}>
        <TouchableOpacity
          onPress={() => handleButtonPress("left")}
          style={[
            styles.button,
            styles.buttonLeft,
            currentSide === "left" && styles.buttonActive,
          ]}
        >
          <Icon
            name={isRunning && currentSide === "left" ? "pause" : "play"}
            size={28}
            color="black"
            marginRight={12}
          />
          <View style={styles.buttonContent}>
            <Text style={styles.buttonLabel}>Left</Text>
            <Text style={styles.buttonTime}>{formatTime(leftTime)}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleButtonPress("right")}
          style={[
            styles.button,
            styles.buttonRight,
            currentSide === "right" && styles.buttonActive,
          ]}
        >
          <Icon
            name={isRunning && currentSide === "right" ? "pause" : "play"}
            size={28}
            color="black"
            marginRight={12}
          />
          <View style={styles.buttonContent}>
            <Text style={styles.buttonLabel}>Right</Text>
            <Text style={styles.buttonTime}>{formatTime(rightTime)}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalTitle}>Total</Text>
        <Text style={styles.totalTime}>{totalFormattedTime}</Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          onPress={() => setIsRunning(false)}
          style={styles.stopButton}
        >
          <Text style={styles.stopText}>STOP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetTimer} style={styles.resetButton}>
          <Text style={styles.resetText}>RESET</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  instructionText: {
    fontSize: 20,
    marginTop: 50,
    textAlign: "center",
  },
  timerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 50,
    backgroundColor: "#FADFA1",
    width: "48%",
    height: 100,
    justifyContent: "center",
  },
  buttonLeft: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  buttonRight: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  buttonActive: {
    backgroundColor: "#FFBE98",
  },
  buttonContent: {
    alignItems: "center",
  },
  buttonLabel: {
    color: "black",
    fontSize: 18,
  },
  buttonTime: {
    color: "black",
    fontSize: 16,
  },
  totalContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  totalTitle: {
    fontSize: 32,
    marginBottom: 10,
    fontWeight: "bold",
  },
  totalTime: {
    fontSize: 30,
    fontWeight: "bold",
  },
  actionContainer: {
    width: "100%",
  },
  stopButton: {
    backgroundColor: "#FF6F61", // Peach-like background for the stop button
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  stopText: {
    color: "white", // Keep the text white for contrast
    fontSize: 18,
  },
  resetButton: {
    borderColor: "#FF6F61", // Peach-like border for the reset button
    borderWidth: 2,
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  resetText: {
    color: "#FF6F61", // Peach color for the reset text
    fontSize: 18,
  },
});

export default BreastfeedingTimer;
