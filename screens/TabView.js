import * as React from "react";
import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import FeedingLogScreen from "./FeedingLogScreen";
import GrowthScreen from "./GrowthScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Define your routes
const FirstRoute = () => <FeedingLogScreen />;
const SecondRoute = () => <GrowthScreen />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

// Custom Tab Bar Component
const CustomTabBar = (props) => (
  <TabBar
    {...props}
    style={styles.tabBar}
    indicatorStyle={styles.indicator}
    labelStyle={styles.label}
    tabStyle={styles.tab}
  />
);

export default function TwoView() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Log" },
    { key: "second", title: "Growth" },
  ]);

  return (
    <SafeAreaProvider>
      <TabView
        style={styles.container}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => <CustomTabBar {...props} />}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {},
  tabBar: {
    backgroundColor: "#FFFFFF",
    color: "#FF6F61",
  },
  indicator: {
    backgroundColor: "#FADFA1",
  },
  label: {
    color: "#FF6F61",
    fontSize: 16,
    fontWeight: "bold",
  },
  tab: {
    marginTop: 200,
  },
});
