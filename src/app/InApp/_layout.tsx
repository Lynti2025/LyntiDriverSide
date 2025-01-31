import { Tabs } from "expo-router";
import { View, Image } from "react-native";
import lalala from "@/assets/images/check.png";

const TabIcon = ({ focused, source }: { focused: boolean; source: any }) => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      borderRadius: 999,
      backgroundColor: focused ? "#d1d5db" : undefined,
    }}
  >
    <View
      style={{
        borderRadius: 24,
        width: 48,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: focused ? "#d1d5db" : "transparent",
      }}
    >
      <Image
        source={source}
        style={{ width: 24, height: 24 }}
        resizeMode="contain"
      />
    </View>
  </View>
);

const Layout = () => (
  <Tabs
    screenOptions={{
      tabBarActiveTintColor: "white",
      tabBarStyle: { backgroundColor: "#1E1E1E", height: 60, display: "flex" },
    }}
  >
    <Tabs.Screen
      name="home"
      options={{
        title: "Home",
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={lalala} />
        ),
      }}
    />
    <Tabs.Screen
      name="rides"
      options={{
        title: "Rides",
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={lalala} />
        ),
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: "Profile",
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={lalala} />
        ),
      }}
    />
  </Tabs>
);

export default Layout;
