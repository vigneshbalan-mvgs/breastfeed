import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// icons
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// // Import your screen components
import TimerScreen from "./screens/TimerScreen";
import FeedingLogScreen from "./screens/FeedingLogScreen";
import GrowthScreen from "./screens/GrowthScreen";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case "Timer":
                iconName = "timer";
                break;
              case "FeedingLog":
                iconName = "restaurant";
                break;
              case "Growth":
                iconName = "show-chart";
                break;
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Timer"
          component={TimerScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="FeedingLog"
          component={FeedingLogScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Growth"
          component={GrowthScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
