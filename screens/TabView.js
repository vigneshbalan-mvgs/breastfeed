import * as React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import FeedingLogScreen from "./FeedingLogScreen";
import TimerScreen from "./TimerScreen";
import GrowthScreen from "./GrowthScreen";
import Cards from "./Cards";

const FirstRoute = () => <FeedingLogScreen />;

const SecondRoute = () => <TimerScreen />;

const ThirdRoute = () => <GrowthScreen />;

const FourthRoute = () => <Cards />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
});
export default function TwoView() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "second", title: "Growth" },
    { key: "first", title: "Log" },
    { key: "third", title: "Timer" },
    { key: "fourth", title: "Cards" },
  ]);

  return (
    <TabView
      style={{
        marginTop: 30,
        borderRadius: 15,
      }}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      tabBarPosition="hide"
    />
  );
}
